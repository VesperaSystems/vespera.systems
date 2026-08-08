import { NextResponse, type NextRequest } from 'next/server';

// Single-site routing: vesperasystems.com is the canonical home for the
// company and the vespera tool. The legacy product domain (vespera.systems)
// permanently redirects here, path preserved.
const CANONICAL_ORIGIN = 'https://vesperasystems.com';
const LEGACY_HOSTS = new Set(['vespera.systems', 'www.vespera.systems']);

function isLegacyHost(hostHeader: string | null) {
  if (!hostHeader) return false;
  const host = hostHeader.split(':')[0].toLowerCase();
  return LEGACY_HOSTS.has(host);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Health check
  if (pathname.startsWith('/ping')) {
    return new Response('pong', { status: 200 });
  }

  // Legacy product domain → canonical .com, before any other handling so
  // every old URL (pages and assets alike) carries over.
  if (isLegacyHost(request.headers.get('host'))) {
    const url = new URL(request.nextUrl.pathname + request.nextUrl.search, CANONICAL_ORIGIN);
    return NextResponse.redirect(url, 308);
  }

  // Skip middleware for static files, source maps, and other non-chat routes
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/sitemap.xml') ||
    pathname.startsWith('/robots.txt') ||
    pathname.includes('.') || // Skip files with extensions
    pathname.startsWith('/images/') ||
    pathname.startsWith('/logos/')
  ) {
    return NextResponse.next();
  }

  // Retired routes fold into the root page: /home (old product landing)
  // and /contact (contact now lives in the footer).
  if (pathname === '/home' || pathname === '/contact') {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/chat/:id',
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
