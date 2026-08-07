import { Reveal } from '@/components/site/reveal';

const manualChain = [
  {
    name: 'Dataroom opens',
    detail: 'Hundreds of documents land — contracts, accounts, decks, cap tables — days before a decision.',
    connector: 'read by',
  },
  {
    name: 'Associates and counsel',
    detail: 'Teams skim under deadline. Cross-checking claims across documents is the first thing squeezed.',
    connector: 'assembled into',
  },
  {
    name: 'A findings memo',
    detail: 'Built by hand, late in the process, with the contradictions that slipped through.',
    connector: null,
  },
];

const vesperaChain = [
  {
    name: 'The same dataroom',
    detail: 'Pointed at vespera on your own machine — no upload, no account, no third-party AI provider.',
    connector: 'read by',
  },
  {
    name: 'vespera, locally',
    detail: 'A free, open-source CLI running local models via Ollama. Confidential documents never leave the laptop.',
    connector: 'which produces',
  },
  {
    name: 'Structured findings',
    detail: 'Key metrics, contradictions between documents, thesis fit, and an indicative valuation range.',
    connector: null,
  },
];

function Connector({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 py-1 pl-6" aria-hidden="true">
      <span className="h-6 w-px bg-white/20" />
      <span className="text-[11px] uppercase tracking-[0.18em] text-neutral-500">{label}</span>
    </div>
  );
}

export function MarketsMap() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 pb-20 lg:px-10 lg:pb-28">
      <Reveal className="max-w-3xl">
        <p className="hud-label">Where we sit</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
          Two ways to read a dataroom. We build for the fast one.
        </h2>
        <p className="mt-5 text-base leading-7 text-neutral-300">
          Every deal turns on the same moment: a dataroom opens and someone has to read it. In
          most firms that means <strong className="text-white">weeks of manual review</strong>{' '}
          under deadline. vespera reads the same room{' '}
          <strong className="text-white">locally, in minutes</strong> — cross-checking claims and
          surfacing what a tired reader misses — so the contradictions are on the table{' '}
          <em>before</em> you commit. Vespera Systems builds free, open tools for that moment.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Reveal className="hud-panel rounded-3xl p-6 opacity-80">
          <p className="hud-label">Diligence today</p>
          <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-neutral-300">
            Weeks of reading, by hand
          </h3>
          <div className="mt-5">
            {manualChain.map((step) => (
              <div key={step.name}>
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-4">
                  <p className="text-sm font-semibold text-neutral-200">{step.name}</p>
                  <p className="mt-1 text-sm leading-6 text-neutral-500">{step.detail}</p>
                </div>
                {step.connector && <Connector label={step.connector} />}
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs leading-5 text-neutral-500">
            Around every deal: VCs, PE firms, corporate finance and law firms — all reading the
            same room against the same clock.
          </p>
        </Reveal>

        <Reveal delay={0.12} className="hud-panel rounded-3xl p-6">
          <p className="hud-label">Diligence with vespera</p>
          <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em]">
            Minutes, on your machine — our focus
          </h3>
          <div className="mt-5">
            {vesperaChain.map((step) => (
              <div key={step.name}>
                <div className="rounded-2xl border border-white/[0.12] bg-white/[0.06] px-5 py-4">
                  <p className="text-sm font-semibold text-white">{step.name}</p>
                  <p className="mt-1 text-sm leading-6 text-neutral-400">{step.detail}</p>
                </div>
                {step.connector && <Connector label={step.connector} />}
              </div>
            ))}
            <Connector label="built by" />
            <div className="rounded-2xl bg-white px-5 py-4">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-neutral-950">
                Vespera
              </p>
              <p className="mt-1 text-sm leading-6 text-neutral-700">
                Free, open-source tools from the studio of Daniel Molloy Ltd, a technical
                due-diligence consultancy. The tool lives at{' '}
                <a href="https://vespera.systems" className="font-semibold underline">
                  vespera.systems
                </a>
                ; integration and advisory at{' '}
                <a href="https://danielmolloy.com" className="font-semibold underline">
                  danielmolloy.com
                </a>
                .
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
