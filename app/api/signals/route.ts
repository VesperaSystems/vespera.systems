import { and, desc, eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { db } from '@/lib/db';
import { signals } from '@/lib/db/schema';
import { isValidLabApiKey } from '@/lib/lab-auth';
import { notifySignal } from '@/lib/lab-notify';

const signalSchema = z.object({
  strategy: z.string().min(1).max(100),
  ticker: z.string().min(1).max(20),
  params: z.record(z.any()).optional(),
  state: z.enum(['long', 'short', 'flat']),
  last_event: z.enum(['golden_cross', 'death_cross']).nullable(),
  event_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .nullable(),
  close: z.number(),
  as_of: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export async function POST(request: Request) {
  if (!isValidLabApiKey(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const parsed = signalSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid payload', details: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const body = parsed.data;
  const ticker = body.ticker.toUpperCase();

  // A signal is "new" if its crossover date differs from the last snapshot
  // we stored for this strategy+ticker — that's what triggers a notification.
  const [previous] = await db
    .select({ eventDate: signals.eventDate })
    .from(signals)
    .where(and(eq(signals.strategy, body.strategy), eq(signals.ticker, ticker)))
    .orderBy(desc(signals.createdAt))
    .limit(1);

  const isNewEvent =
    body.event_date !== null &&
    (previous === undefined || previous.eventDate !== body.event_date);

  const [row] = await db
    .insert(signals)
    .values({
      strategy: body.strategy,
      ticker,
      params: body.params,
      state: body.state,
      lastEvent: body.last_event,
      eventDate: body.event_date,
      close: String(body.close),
      asOf: body.as_of,
      isNewEvent,
    })
    .returning();

  let notified = false;
  if (isNewEvent) {
    notified = await notifySignal(row);
    if (notified) {
      await db
        .update(signals)
        .set({ notifiedAt: new Date() })
        .where(eq(signals.id, row.id));
    }
  }

  return NextResponse.json(
    { ok: true, id: row.id, isNewEvent, notified },
    { status: 201 },
  );
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const strategy = searchParams.get('strategy');
  const ticker = searchParams.get('ticker');
  const limit = Math.min(Number(searchParams.get('limit') ?? 50), 200);

  const conditions = [];
  if (strategy) conditions.push(eq(signals.strategy, strategy));
  if (ticker) conditions.push(eq(signals.ticker, ticker.toUpperCase()));

  const rows = await db
    .select()
    .from(signals)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(desc(signals.createdAt))
    .limit(limit);

  return NextResponse.json({ signals: rows });
}
