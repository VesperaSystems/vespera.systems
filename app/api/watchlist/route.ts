import { desc, eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { db } from '@/lib/db';
import { watchlist } from '@/lib/db/schema';
import { isValidLabApiKey } from '@/lib/lab-auth';

const entrySchema = z.object({
  ticker: z.string().min(1).max(20),
  strategy: z.string().min(1).max(100),
  params: z.record(z.any()).optional(),
  active: z.boolean().default(true),
});

// The scheduled runner pulls its work items from here.
export async function GET(request: Request) {
  if (!isValidLabApiKey(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const entries = await db
    .select()
    .from(watchlist)
    .where(eq(watchlist.active, true))
    .orderBy(desc(watchlist.createdAt));
  return NextResponse.json({ entries });
}

export async function POST(request: Request) {
  if (!isValidLabApiKey(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const parsed = entrySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid payload', details: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const [row] = await db
    .insert(watchlist)
    .values({ ...parsed.data, ticker: parsed.data.ticker.toUpperCase() })
    .returning();
  return NextResponse.json({ ok: true, entry: row }, { status: 201 });
}
