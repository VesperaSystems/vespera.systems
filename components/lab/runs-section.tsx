'use client';

import useSWR from 'swr';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface CurvePoint {
  date: string;
  strategy: number;
  buyHold: number;
}

interface MetricSet {
  total_return: number;
  cagr: number;
  sharpe: number;
  max_drawdown: number;
}

interface BacktestRun {
  id: string;
  strategy: string;
  ticker: string;
  params: Record<string, number>;
  startDate: string;
  endDate: string;
  metrics: { strategy: MetricSet; buy_hold: MetricSet };
  latestSignal?: {
    state: string;
    last_event: string | null;
    event_date: string | null;
  } | null;
  equityCurve?: CurvePoint[] | null;
  source: string;
  createdAt: string;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const pct = (v: number) => `${(v * 100).toFixed(1)}%`;

function EquityCurveChart({ curve }: { curve: CurvePoint[] }) {
  const width = 720;
  const height = 260;
  const pad = { top: 12, right: 12, bottom: 24, left: 44 };

  const values = curve.flatMap((p) => [p.strategy, p.buyHold]);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const x = (i: number) =>
    pad.left + (i / Math.max(1, curve.length - 1)) * (width - pad.left - pad.right);
  const y = (v: number) =>
    pad.top + (1 - (v - min) / Math.max(1e-9, max - min)) * (height - pad.top - pad.bottom);

  const path = (key: 'strategy' | 'buyHold') =>
    curve.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p[key]).toFixed(1)}`).join(' ');

  const ticks = [min, (min + max) / 2, max];

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full min-w-[480px]"
        role="img"
        aria-label="Equity curve: strategy vs buy and hold"
      >
        {ticks.map((t) => (
          <g key={t}>
            <line
              x1={pad.left}
              x2={width - pad.right}
              y1={y(t)}
              y2={y(t)}
              className="stroke-border"
              strokeDasharray="3 3"
            />
            <text
              x={pad.left - 6}
              y={y(t) + 4}
              textAnchor="end"
              className="fill-muted-foreground text-[10px]"
            >
              {t.toFixed(1)}x
            </text>
          </g>
        ))}
        <path d={path('buyHold')} fill="none" className="stroke-muted-foreground" strokeWidth="1.5" />
        <path d={path('strategy')} fill="none" className="stroke-primary" strokeWidth="2" />
        <text x={pad.left} y={height - 6} className="fill-muted-foreground text-[10px]">
          {curve[0].date}
        </text>
        <text
          x={width - pad.right}
          y={height - 6}
          textAnchor="end"
          className="fill-muted-foreground text-[10px]"
        >
          {curve[curve.length - 1].date}
        </text>
      </svg>
      <div className="flex gap-4 text-xs text-muted-foreground mt-1">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-4 h-0.5 bg-primary" /> Strategy
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-4 h-0.5 bg-muted-foreground" /> Buy &amp; Hold
        </span>
      </div>
    </div>
  );
}

function MetricsGrid({ metrics }: { metrics: BacktestRun['metrics'] }) {
  const rows: Array<[string, (m: MetricSet) => string]> = [
    ['Total return', (m) => pct(m.total_return)],
    ['CAGR', (m) => pct(m.cagr)],
    ['Sharpe', (m) => m.sharpe.toFixed(2)],
    ['Max drawdown', (m) => pct(m.max_drawdown)],
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {rows.map(([label, fmt]) => (
        <div key={label} className="rounded-lg border p-3">
          <div className="text-xs text-muted-foreground">{label}</div>
          <div className="text-lg font-semibold">{fmt(metrics.strategy)}</div>
          <div className="text-xs text-muted-foreground">
            vs {fmt(metrics.buy_hold)} buy &amp; hold
          </div>
        </div>
      ))}
    </div>
  );
}

export function RunsSection({ strategy }: { strategy: string }) {
  const { data, isLoading } = useSWR<{ runs: BacktestRun[] }>(
    `/api/backtests?strategy=${encodeURIComponent(strategy)}&limit=10`,
    fetcher,
  );

  const runs = data?.runs ?? [];
  if (isLoading || runs.length === 0) {
    return (
      <Card className="mt-12">
        <CardHeader>
          <CardTitle>Backtest runs</CardTitle>
          <CardDescription>
            {isLoading
              ? 'Loading runs…'
              : 'No runs stored yet. Run the notebook (button above) and push your results to see them here.'}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const latest = runs[0];

  return (
    <Card className="mt-12">
      <CardHeader>
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <CardTitle>Backtest runs</CardTitle>
          {latest.latestSignal && (
            <Badge
              variant={
                latest.latestSignal.state === 'long' ? 'default' : 'secondary'
              }
            >
              {latest.latestSignal.state.toUpperCase()}
              {latest.latestSignal.event_date
                ? ` since ${latest.latestSignal.event_date}`
                : ''}
            </Badge>
          )}
        </div>
        <CardDescription>
          Latest: {latest.ticker} · {latest.startDate} → {latest.endDate} ·
          SMA {String((latest.params as any)?.short_window ?? '?')}/
          {String((latest.params as any)?.long_window ?? '?')} · via{' '}
          {latest.source}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <MetricsGrid metrics={latest.metrics} />
        {latest.equityCurve && latest.equityCurve.length > 1 && (
          <EquityCurveChart curve={latest.equityCurve} />
        )}
        {runs.length > 1 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground border-b">
                  <th className="py-2 pr-4 font-medium">Ticker</th>
                  <th className="py-2 pr-4 font-medium">Period</th>
                  <th className="py-2 pr-4 font-medium">Return</th>
                  <th className="py-2 pr-4 font-medium">Sharpe</th>
                  <th className="py-2 pr-4 font-medium">Max DD</th>
                  <th className="py-2 font-medium">Source</th>
                </tr>
              </thead>
              <tbody>
                {runs.map((run) => (
                  <tr key={run.id} className="border-b last:border-0">
                    <td className="py-2 pr-4 font-medium">{run.ticker}</td>
                    <td className="py-2 pr-4">
                      {run.startDate} → {run.endDate}
                    </td>
                    <td className="py-2 pr-4">
                      {pct(run.metrics.strategy.total_return)}
                    </td>
                    <td className="py-2 pr-4">
                      {run.metrics.strategy.sharpe.toFixed(2)}
                    </td>
                    <td className="py-2 pr-4">
                      {pct(run.metrics.strategy.max_drawdown)}
                    </td>
                    <td className="py-2">{run.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
