import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vespera | Free tools for dealmakers',
  description:
    'vespera is a free, open-source, local-first due-diligence CLI. It reads a dataroom, cross-checks its claims, and scores the deal against your investment thesis — without your documents ever leaving your machine.',
  alternates: {
    canonical: 'https://vesperasystems.com',
  },
  openGraph: {
    type: 'website',
    url: 'https://vesperasystems.com',
    siteName: 'Vespera Systems',
    title: 'Vespera | Free tools for dealmakers',
    description:
      'Free, open-source tools for people who read deals — starting with a local-first due-diligence CLI that analyzes a dataroom without your documents ever leaving your machine.',
  },
};

export default function DisplayLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#050505] text-neutral-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.09),transparent_28%),linear-gradient(180deg,#050505_0%,#0a0a0a_48%,#050505_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] [background-size:5rem_5rem]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
