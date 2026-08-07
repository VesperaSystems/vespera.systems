import type { Metadata } from 'next';
import Link from 'next/link';

import { BrandMark } from '@/components/site/brand-mark';

export const metadata: Metadata = {
  title: 'Contact - Vespera',
  description: 'Contact Vespera about the free due-diligence tool, demos, or integration work.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen px-6 py-6 text-white lg:px-10">
      <header className="mx-auto flex max-w-7xl items-center justify-between">
        <BrandMark />
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
        >
          Back
        </Link>
      </header>
      <main className="mx-auto grid max-w-5xl gap-8 py-20">
        <div className="hud-panel rounded-[40px] p-8 sm:p-10">
          <p className="hud-label">Get in touch</p>
          <h1 className="mt-5 text-5xl font-semibold tracking-[-0.06em] sm:text-7xl">
            Talk to us.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-300">
            For a demo of the free tool, press, or partnerships, contact Vespera directly.
            For integration into your firm&apos;s workflow — or technical due-diligence
            engagements — the consultancy behind Vespera is at{' '}
            <a href="https://danielmolloy.com" className="font-semibold text-white underline">
              danielmolloy.com
            </a>
            .
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="mailto:hello@vespera.systems?subject=Vespera%20Systems%20private%20briefing"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] text-neutral-950 transition hover:bg-neutral-200"
            >
              hello@vespera.systems
            </a>
            <a
              href="https://vespera.systems"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-white transition hover:border-white/40 hover:bg-white/10"
            >
              View the product
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
