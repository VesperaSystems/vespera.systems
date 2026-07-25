import Link from 'next/link';
import { cn } from '@/lib/utils';

export function BrandMark({
  href = '/',
  product = false,
  className,
}: { href?: string; product?: boolean; className?: string }) {
  return (
    <Link href={href} className={cn('group inline-flex items-center gap-3', className)}>
      <span className="grid h-11 w-11 place-items-center rounded-[1.05rem] border border-white/22 bg-white/8 text-sm font-semibold text-white shadow-[0_0_44px_rgba(255,255,255,0.08)]">
        VS
      </span>
      <span>
        <span className="block text-sm font-semibold uppercase tracking-[0.3em] text-white">
          {product ? 'vespera.systems' : 'Vespera Systems'}
        </span>
        <span className="block text-xs text-neutral-500 transition group-hover:text-neutral-200">
          {product ? 'Flagship product endpoint' : 'Graph-native finance technology'}
        </span>
      </span>
    </Link>
  );
}
