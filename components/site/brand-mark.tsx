import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function BrandMark({
  href = '/',
  product = false,
  className,
}: { href?: string; product?: boolean; className?: string }) {
  return (
    <Link href={href} className={cn('group inline-flex items-center gap-3', className)}>
      <Image
        src="/logos/vespera-mark-dark.svg"
        alt=""
        width={44}
        height={44}
        priority
        className="size-11"
      />
      <span>
        <span className="block text-sm font-semibold uppercase tracking-[0.3em] text-white">
          {product ? 'vespera.systems' : 'Vespera'}
        </span>
        <span className="block text-xs text-neutral-500 transition group-hover:text-neutral-200">
          {product ? 'Research workbench' : 'Independent quant R&D'}
        </span>
      </span>
    </Link>
  );
}
