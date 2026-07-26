import { Reveal } from '@/components/site/reveal';

const privateChain = [
  {
    name: 'Limited partners',
    detail: 'Pensions, endowments and family offices with capital to put to work.',
    connector: 'commit capital to',
  },
  {
    name: 'Venture capital funds',
    detail: 'Pick and back private companies, with law firms engaged on every deal.',
    connector: 'buy stakes in',
  },
  {
    name: 'Private companies',
    detail: 'Founders building. Shares rarely change hands, and there is no daily price.',
    connector: null,
  },
];

const publicChain = [
  {
    name: 'Exchanges and market data',
    detail: 'Shares trade all day, every day. Prices move second by second.',
    connector: 'orders placed through',
  },
  {
    name: 'Brokerages',
    detail: 'The regulated doorway anyone uses to buy and sell.',
    connector: 'used by',
  },
  {
    name: 'Investors',
    detail: 'Funds, quants and self-directed people deciding what to buy — and when.',
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
          Two worlds of capital. We work in the one with prices.
        </h2>
        <p className="mt-5 text-base leading-7 text-neutral-300">
          Money lives in two worlds. In <strong className="text-white">private markets</strong>,
          investors back companies directly — deals move on relationships and diligence, and a
          company might be priced once every couple of years. In{' '}
          <strong className="text-white">public markets</strong>, shares trade on an exchange with
          a price that moves every second — so <em>when</em> you act matters as much as{' '}
          <em>what</em> you buy. Vespera lives in that second world: research, tested strategies
          and signals about the moment to trade.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Reveal className="hud-panel rounded-3xl p-6 opacity-80">
          <p className="hud-label">Private markets</p>
          <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-neutral-300">
            Relationships, not prices
          </h3>
          <div className="mt-5">
            {privateChain.map((step) => (
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
            Around every deal: law firms, fund administrators, auditors. The two worlds meet when a
            private company lists on an exchange — an IPO — and crosses into the world of prices.
          </p>
        </Reveal>

        <Reveal delay={0.12} className="hud-panel rounded-3xl p-6">
          <p className="hud-label">Public markets</p>
          <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em]">
            Prices, timing — our focus
          </h3>
          <div className="mt-5">
            {publicChain.map((step) => (
              <div key={step.name}>
                <div className="rounded-2xl border border-white/[0.12] bg-white/[0.06] px-5 py-4">
                  <p className="text-sm font-semibold text-white">{step.name}</p>
                  <p className="mt-1 text-sm leading-6 text-neutral-400">{step.detail}</p>
                </div>
                {step.connector && <Connector label={step.connector} />}
              </div>
            ))}
            <Connector label="informed by" />
            <div className="rounded-2xl bg-white px-5 py-4">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-neutral-950">
                Vespera
              </p>
              <p className="mt-1 text-sm leading-6 text-neutral-700">
                Commissioned research, validated in-house and licensed as live signals that suggest
                when to act. Published findings land here; the research workbench runs at{' '}
                <a href="https://vespera.systems" className="font-semibold underline">
                  vespera.systems
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
