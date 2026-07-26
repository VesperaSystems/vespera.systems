import Image from 'next/image';
import Link from 'next/link';

import { BrandMark } from '@/components/site/brand-mark';
import { MarketsMap } from '@/components/site/markets-map';
import { Float, Reveal } from '@/components/site/reveal';
import { companyFacingModuleIds, productModuleMap } from '@/lib/modules';

const companyProof = [
  'A researcher network of PhD-level quants, commissioned per programme — the IP stays with Vespera.',
  'Every function ships with its evidence: methodology, data, and backtests you can interrogate.',
  'Built as UK R&D — qualifying research for R&D tax relief, with an Innovate UK application in progress.',
];

const howItWorks = [
  {
    step: '01',
    title: 'Commission',
    detail:
      'We pay researchers to attack one precise question — a strike point on a specific public-market instrument. Not a thesis. A tradable answer.',
  },
  {
    step: '02',
    title: 'Validate',
    detail:
      'The resulting strategy is backtested and stress-checked in our Strategy Lab, with the method written up so a diligent allocator can pull it apart.',
  },
  {
    step: '03',
    title: 'License',
    detail:
      'Family offices and funds subscribe to the live signal or license the function outright — the output of a quant desk, without hiring one.',
  },
];

const companyModules = companyFacingModuleIds
  .map((id) => productModuleMap.get(id))
  .filter((module): module is NonNullable<typeof module> => Boolean(module));

export default function CompanyLandingPage() {
  return (
    <div className="min-h-screen text-white">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <BrandMark />
        <nav className="flex items-center gap-2">
          <a
            href="https://vespera.systems"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
          >
            See what we do
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-200"
          >
            Contact
          </Link>
        </nav>
      </header>

      <section className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 pb-16 pt-10 lg:grid-cols-[1.02fr_0.98fr] lg:px-10 lg:pb-24 lg:pt-20">
        <div>
          <Reveal onMount>
            <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-neutral-300">
              Independent quant R&amp;D — London
            </span>
          </Reveal>
          <Reveal onMount delay={0.1}>
            <h1 className="mt-8 max-w-6xl text-5xl font-semibold leading-[0.9] tracking-[-0.065em] sm:text-7xl lg:text-8xl">
              We turn quant research into trade-timing signals.
            </h1>
          </Reveal>
          <Reveal onMount delay={0.22}>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-neutral-300 sm:text-xl">
              Vespera is an independent research and development company. We commission
              PhD-level researchers to find strike points in public-market instruments, validate
              and own the resulting strategies, and license them to family offices and funds —
              investors who want a quant&apos;s edge without having to speak quant.
            </p>
          </Reveal>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="https://vespera.systems"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] text-neutral-950 transition hover:bg-neutral-200"
            >
              See what we do
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-white transition hover:border-white/40 hover:bg-white/10"
            >
              Request private briefing
            </Link>
          </div>
          <div className="mt-10 grid gap-3">
            {companyProof.map((point, index) => (
              <Reveal key={point} onMount delay={0.34 + index * 0.09}>
                <div className="hud-panel rounded-3xl px-5 py-4 text-sm leading-6 text-neutral-200">
                  {point}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Float className="relative">
          <div className="absolute -inset-8 rounded-[56px] bg-white/10 blur-3xl" />
          <div className="hud-panel relative overflow-hidden rounded-[42px] p-5">
            <div className="rounded-[32px] border border-white/10 bg-black/40 p-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="hud-label">Capability stack</p>
                  <h2 className="mt-2 text-3xl font-semibold tracking-[-0.05em]">
                    Niche by design.
                  </h2>
                </div>
                <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-300">
                  Live MVP
                </span>
              </div>
              <div className="mt-5 grid gap-3">
                {companyModules.map((module) => (
                  <article
                    key={module.id}
                    className="rounded-3xl border border-white/[0.08] bg-white/[0.045] p-5"
                  >
                    <p className="hud-label">{module.eyebrow}</p>
                    <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em]">
                      {module.label}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-neutral-400">{module.summary}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Float>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-20 lg:px-10 lg:pb-28">
        <Reveal>
          <p className="hud-label">How it works</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
            We sit between the researcher and the investor.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {howItWorks.map((item, index) => (
            <Reveal key={item.step} delay={index * 0.12}>
              <div className="hud-panel h-full rounded-3xl p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
                  {item.step}
                </p>
                <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-400">{item.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <MarketsMap />

      <footer className="mx-auto w-full max-w-7xl px-6 pb-12 lg:px-10">
        <div className="flex flex-col items-center gap-4 border-t border-white/10 pt-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-4">
            <Image
              src="/logos/vespera-mark-dark.svg"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <p className="text-sm text-neutral-400">Vespera</p>
          </div>
          <a
            href="mailto:hello@vespera.systems"
            className="text-sm text-neutral-400 transition hover:text-white"
          >
            hello@vespera.systems
          </a>
        </div>
        <p className="mt-8 text-center text-[11px] leading-5 text-neutral-600 sm:text-left">
          Vespera Systems is a trading name of Daniel Molloy Ltd, a company registered in England
          and Wales. Company number: 15228212. Registered office: 5 Providence Court, Pynes Hill,
          Exeter, Devon, United Kingdom, EX2 5JL. VAT number: GB452010546.
        </p>
      </footer>
    </div>
  );
}
