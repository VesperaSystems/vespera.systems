import { desc, eq, and } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { db } from '@/lib/db';
import { backtestRuns } from '@/lib/db/schema';
import { isValidLabApiKey } from '@/lib/lab-auth';

const runSchema = z.object({
  strategy: z.string().min(1).max(100),
  ticker: z.string().min(1).max(20),
  params: z.record(z.any()),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  metrics: z.record(z.any()),
  latestSignal: z.record(z.any()).optional(),
  equityCurve: z
    .array(
      z.object({
        date: z.string(),
        strategy: z.number(),
        buyHold: z.number(),
      }),
    )
    .max(500)
    .optional(),
  source: z.enum(['colab', 'scheduled', 'manual']).default('colab'),
});

export async function POST(request: Request) {
  if (!isValidLabApiKey(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const parsed = runSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid payload', details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const [row] = await db
    .insert(backtestRuns)
    .values({
      ...parsed.data,
      ticker: parsed.data.ticker.toUpperCase(),
    })
    .returning({ id: backtestRuns.id, createdAt: backtestRuns.createdAt });

  return NextResponse.json({ ok: true, ...row }, { status: 201 });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const strategy = searchParams.get('strategy');
  const ticker = searchParams.get('ticker');
  const limit = Math.min(Number(searchParams.get('limit') ?? 20), 100);

  const conditions = [];
  if (strategy) conditions.push(eq(backtestRuns.strategy, strategy));
  if (ticker) conditions.push(eq(backtestRuns.ticker, ticker.toUpperCase()));

  const runs = await db
    .select()
    .from(backtestRuns)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(desc(backtestRuns.createdAt))
    .limit(limit);

  return NextResponse.json({ runs });
}
