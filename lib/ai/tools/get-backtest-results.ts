import { tool } from 'ai';
import { desc, eq, and } from 'drizzle-orm';
import { z } from 'zod';

import { db } from '@/lib/db';
import { backtestRuns, signals } from '@/lib/db/schema';

export const getBacktestResults = tool({
  description:
    'Get stored Strategy Lab backtest results and latest trade signals. Use when the user asks how a trading strategy performed (e.g. the moving-average crossover), for backtest metrics like Sharpe or drawdown on a ticker, or what the current signal/position is.',
  parameters: z.object({
    strategy: z
      .string()
      .optional()
      .describe(
        'Strategy slug, e.g. "moving-average-crossover". Omit for all strategies.',
      ),
    ticker: z
      .string()
      .optional()
      .describe('Ticker symbol, e.g. AAPL. Omit for all tickers.'),
    limit: z.number().min(1).max(20).default(5),
  }),
  execute: async ({ strategy, ticker, limit }) => {
    const runConditions = [];
    if (strategy) runConditions.push(eq(backtestRuns.strategy, strategy));
    if (ticker)
      runConditions.push(eq(backtestRuns.ticker, ticker.toUpperCase()));

    const runs = await db
      .select({
        strategy: backtestRuns.strategy,
        ticker: backtestRuns.ticker,
        params: backtestRuns.params,
        startDate: backtestRuns.startDate,
        endDate: backtestRuns.endDate,
        metrics: backtestRuns.metrics,
        latestSignal: backtestRuns.latestSignal,
        source: backtestRuns.source,
        createdAt: backtestRuns.createdAt,
      })
      .from(backtestRuns)
      .where(runConditions.length ? and(...runConditions) : undefined)
      .orderBy(desc(backtestRuns.createdAt))
      .limit(limit);

    const signalConditions = [];
    if (strategy) signalConditions.push(eq(signals.strategy, strategy));
    if (ticker) signalConditions.push(eq(signals.ticker, ticker.toUpperCase()));

    const latestSignals = await db
      .select({
        strategy: signals.strategy,
        ticker: signals.ticker,
        state: signals.state,
        lastEvent: signals.lastEvent,
        eventDate: signals.eventDate,
        close: signals.close,
        asOf: signals.asOf,
      })
      .from(signals)
      .where(signalConditions.length ? and(...signalConditions) : undefined)
      .orderBy(desc(signals.createdAt))
      .limit(limit);

    if (runs.length === 0 && latestSignals.length === 0) {
      return {
        message:
          'No backtest runs or signals stored yet. Runs are pushed from the strategy notebooks (see /lab) or the scheduled runner.',
      };
    }

    return { runs, latestSignals };
  },
});
