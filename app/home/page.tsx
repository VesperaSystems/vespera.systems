import Link from 'next/link';
import { desc } from 'drizzle-orm';

import { db } from '@/lib/db';
import { backtestRuns, signals } from '@/lib/db/schema';
import { getLabEntries } from '@/lib/lab';
import { BrandMark } from '@/components/site/brand-mark';

// Public, read-only shop window for vespera.systems: the latest signals and
// published research, refreshed after each scheduled run. The workbench
// (chat, files, admin) lives behind /chat.
export const revalidate = 300;

const STATE_STYLES: Record<string, string> = {
  long: 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300',
  short: 'border-red-400/40 bg-red-400/10 text-red-300',
  flat: 'border-white/20 bg-white/5 text-neutral-300',
};

function formatEvent(event: string | null) {
  if (!event) return 'no crossover yet';
  return event.replaceAll('_', ' ');
}

export default async function HomePage() {
  // Signals is append-only per run; the current state is the newest row per
  // (strategy, ticker) pair.
  const [latestSignals, latestRuns] = await Promise.all([
    db
      .selectDistinctOn([signals.strategy, signals.ticker])
      .from(signals)
      .orderBy(signals.strategy, signals.ticker, desc(signals.createdAt))
      .limit(6),
    db.select().from(backtestRuns).orderBy(desc(backtestRuns.createdAt)).limit(3),
  ]).catch(() => [[], []] as const);

  const labEntries = getLabEntries().slice(0, 3);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#050505] text-neutral-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.09),transparent_28%),linear-gradient(180deg,#050505_0%,#0a0a0a_48%,#050505_100%)]" />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 pt-8 lg:px-10">
        <header className="flex items-center justify-between gap-4">
          <BrandMark product />
          <nav className="flex items-center gap-3">
            <Link
              href="/lab"
              className="rounded-full border border-white/15 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-neutral-200 transition hover:border-white/40"
            >
              Research
            </Link>
            <Link
              href="/chat"
              className="rounded-full bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-neutral-950 transition hover:bg-neutral-200"
            >
              Open the workbench
            </Link>
          </nav>
        </header>

        <section className="mt-16 max-w-3xl">
          <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-neutral-300">
            The lab, live
          </span>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-6xl">
            Current signals from validated strategies.
          </h1>
          <p className="mt-5 text-lg leading-8 text-neutral-400">
            Every strategy below is published with its method and backtests in
            the research library, then run automatically after each US close.
            This page is the read-only view — what fired, and when.
          </p>
        </section>

        <section className="mt-12">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
            Live signal states
          </p>
          {latestSignals.length === 0 ? (
            <p className="mt-4 text-sm text-neutral-400">
              No signals published yet — the next scheduled run lands after the
              US close.
            </p>
          ) : (
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {latestSignals.map((signal) => (
                <div
                  key={signal.id}
                  className="rounded-3xl border border-white/10 bg-white/[0.045] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xl font-semibold tracking-tight">
                      {signal.ticker}
                    </span>
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${STATE_STYLES[signal.state] ?? STATE_STYLES.flat}`}
                    >
                      {signal.state}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-neutral-400">
                    {signal.strategy.replaceAll('-', ' ')}
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">
                    {formatEvent(signal.lastEvent)}
                    {signal.eventDate ? ` · ${signal.eventDate}` : ''}
                  </p>
                  <p className="mt-3 text-xs text-neutral-500">
                    close {Number(signal.close).toFixed(2)} · as of {signal.asOf}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="mt-14 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
              Published research
            </p>
            <div className="mt-4 space-y-4">
              {labEntries.map((entry) => (
                <Link
                  key={entry.slug}
                  href={`/lab/${entry.slug}`}
                  className="block rounded-2xl border border-white/10 p-4 transition hover:border-white/30"
                >
                  <p className="font-semibold">{entry.title}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-neutral-400">
                    {entry.summary}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
              Latest backtests
            </p>
            {latestRuns.length === 0 ? (
              <p className="mt-4 text-sm text-neutral-400">
                Backtest runs publish here as research notebooks execute. The
                method behind each strategy is already in the research library.
              </p>
            ) : (
              <div className="mt-4 space-y-4">
                {latestRuns.map((run) => (
                  <div key={run.id} className="rounded-2xl border border-white/10 p-4">
                    <p className="font-semibold">
                      {run.ticker} · {run.strategy.replaceAll('-', ' ')}
                    </p>
                    <p className="mt-1 text-xs text-neutral-500">
                      {run.startDate} → {run.endDate} · source {run.source}
                    </p>
                  </div>
                ))}
              </div>
            )}
            <p className="mt-6 text-xs leading-5 text-neutral-500">
              Curious how these are built and licensed? The company side lives
              at{' '}
              <a href="https://vesperasystems.com" className="underline">
                vesperasystems.com
              </a>
              .
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
