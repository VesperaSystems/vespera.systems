import Image from 'next/image';
import Link from 'next/link';

import { BrandMark } from '@/components/site/brand-mark';
import { MarketsMap } from '@/components/site/markets-map';
import { Float, Reveal } from '@/components/site/reveal';
import { companyFacingModuleIds, productModuleMap } from '@/lib/modules';

const companyProof = [
  'Free and open source, Apache-2.0 — install it, read the code, keep it forever.',
  'Local-first by design: analysis runs on your machine, and your documents never leave it.',
  'Built from real due-diligence engagements at Daniel Molloy Ltd, the consultancy behind Vespera.',
];

const howItWorks = [
  {
    step: '01',
    title: 'Build',
    detail:
      'We build the tools we kept wishing existed on real due-diligence engagements — starting with vespera, a CLI that reads a dataroom and cross-checks its claims.',
  },
  {
    step: '02',
    title: 'Give away',
    detail:
      'Every tool is free and open source. No accounts, no tiers, no cloud upload — inference runs locally, so confidential deal documents stay on your machine.',
  },
  {
    step: '03',
    title: 'Integrate',
    detail:
      'When a firm wants Vespera wired into its own deal workflow — or a deeper technical review — Daniel Molloy Ltd does the integration and advisory work.',
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
            href="#get-vespera"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
          >
            Get vespera
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
              Software studio of Daniel Molloy Ltd
            </span>
          </Reveal>
          <Reveal onMount delay={0.1}>
            <h1 className="mt-8 max-w-6xl text-5xl font-semibold leading-[0.9] tracking-[-0.065em] sm:text-7xl lg:text-8xl">
              We build free tools for people who read deals.
            </h1>
          </Reveal>
          <Reveal onMount delay={0.22}>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-neutral-300 sm:text-xl">
              Vespera is the software studio of Daniel Molloy Ltd, a technical due-diligence
              consultancy for investment firms. We turn what we learn on real engagements into
              free, open-source tools — starting with vespera, a local-first CLI that reads a
              dataroom, cross-checks its claims, and scores it against your thesis without your
              documents ever leaving your machine.
            </p>
          </Reveal>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#get-vespera"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] text-neutral-950 transition hover:bg-neutral-200"
            >
              Get vespera
            </a>
            <a
              href="https://danielmolloy.com"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-white transition hover:border-white/40 hover:bg-white/10"
            >
              Integration &amp; advisory
            </a>
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
                  <p className="hud-label">The tool</p>
                  <h2 className="mt-2 text-3xl font-semibold tracking-[-0.05em]">
                    Niche by design.
                  </h2>
                </div>
                <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-300">
                  Free on PyPI
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
                <article className="rounded-3xl border border-white/[0.08] bg-white/[0.045] p-5">
                  <p className="hud-label">Open source</p>
                  <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em]">
                    Built in the open.
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-400">
                    Read the code, star it, fork it, ship a pull request — the whole tool is
                    public.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a
                      href="https://github.com/VesperaSystems/vespera"
                      className="rounded-full bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-950 transition hover:bg-neutral-200"
                    >
                      Star on GitHub
                    </a>
                    <a
                      href="https://github.com/VesperaSystems/vespera/fork"
                      className="rounded-full border border-white/15 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-200 transition hover:border-white/40"
                    >
                      Fork
                    </a>
                    <a
                      href="https://pypi.org/project/vespera/"
                      className="rounded-full border border-white/15 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-200 transition hover:border-white/40"
                    >
                      PyPI
                    </a>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </Float>
      </section>

      <section
        id="get-vespera"
        className="mx-auto w-full max-w-7xl scroll-mt-10 px-6 pb-20 lg:px-10 lg:pb-28"
      >
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_0.92fr]">
          <div>
            <Reveal>
              <p className="hud-label">Get vespera</p>
              <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
                Read a dataroom without uploading it.
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-7 text-neutral-300">
                vespera reads a dataroom, cross-checks its claims, scores it against your
                investment thesis, and suggests an indicative valuation range — with inference
                running locally on Ollama. No account, no cloud upload, no third-party AI
                provider.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="hud-panel mt-8 max-w-3xl rounded-3xl p-5 font-mono text-sm">
                <p className="text-neutral-500"># install</p>
                <p className="mt-1 text-neutral-100">pip install vespera</p>
                <p className="mt-3 text-neutral-500"># review a dataroom against your thesis</p>
                <p className="mt-1 text-neutral-100">
                  vespera review ./dataroom --thesis my-thesis.md
                </p>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-4 text-sm">
                <a
                  href="https://github.com/VesperaSystems/vespera"
                  className="rounded-full bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-neutral-950 transition hover:bg-neutral-200"
                >
                  View on GitHub
                </a>
                <a
                  href="https://pypi.org/project/vespera/"
                  className="rounded-full border border-white/15 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-neutral-200 transition hover:border-white/40"
                >
                  PyPI
                </a>
                <span className="text-xs text-neutral-500">Apache-2.0 · runs on your laptop</span>
              </div>
              <p className="mt-5 max-w-3xl text-sm leading-6 text-neutral-500">
                Not a terminal person? A one-click desktop version is on the way —{' '}
                <a
                  href="mailto:hello@vespera.systems"
                  className="underline hover:text-neutral-300"
                >
                  email us
                </a>{' '}
                and we&apos;ll let you know when it lands, or set it up for your team in the
                meantime.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="hud-panel rounded-[32px] p-3">
              <div className="aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-black/40">
                <iframe
                  src="https://www.loom.com/embed/4fbb590c00754501a8459f874ecbdb93"
                  title="Vespera — local-first AI for due diligence (3-minute demo)"
                  loading="lazy"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
              <p className="px-3 py-3 text-xs uppercase tracking-[0.18em] text-neutral-500">
                Watch the 3-minute demo
              </p>
            </div>
          </Reveal>
        </div>
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static VideoObject JSON-LD, no user input
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'VideoObject',
              name: 'Vespera — local-first AI for due diligence',
              description:
                'A 3-minute demo of vespera, the free, open-source CLI that reads a dataroom, cross-checks its claims, and scores it against your investment thesis — locally, without your documents ever leaving your machine.',
              thumbnailUrl:
                'https://cdn.loom.com/sessions/thumbnails/4fbb590c00754501a8459f874ecbdb93-22d6d2acd9e749ef-full.jpg',
              duration: 'PT2M58S',
              embedUrl: 'https://www.loom.com/embed/4fbb590c00754501a8459f874ecbdb93',
              contentUrl: 'https://www.loom.com/share/4fbb590c00754501a8459f874ecbdb93',
            }),
          }}
        />
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-20 lg:px-10 lg:pb-28">
        <Reveal>
          <p className="hud-label">How it works</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
            The consultancy funds the tools. The tools stay free.
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
