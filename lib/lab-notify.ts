import 'server-only';

import type { Signal } from '@/lib/db/schema';

/**
 * Notify the user that a strategy fired a new trade signal.
 * Email via Resend's REST API — no SDK needed. Configure with:
 *   RESEND_API_KEY      — https://resend.com API key
 *   SIGNAL_NOTIFY_EMAIL — recipient address
 *   SIGNAL_FROM_EMAIL   — verified sender (defaults to onboarding@resend.dev)
 * Returns true if a notification was actually sent.
 */
export async function notifySignal(signal: Signal): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.SIGNAL_NOTIFY_EMAIL;
  if (!apiKey || !to) {
    console.log(
      `[lab] signal notification skipped (RESEND_API_KEY/SIGNAL_NOTIFY_EMAIL not set): ${signal.ticker} ${signal.lastEvent}`,
    );
    return false;
  }

  const event =
    signal.lastEvent === 'golden_cross' ? '🟢 Golden Cross' : '🔴 Death Cross';
  const action = signal.lastEvent === 'golden_cross' ? 'BUY' : 'SELL';

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.SIGNAL_FROM_EMAIL ?? 'onboarding@resend.dev',
      to: [to],
      subject: `${event}: ${signal.ticker} — ${action} signal (${signal.strategy})`,
      html: [
        `<h2>${event} on ${signal.ticker}</h2>`,
        `<p>The <strong>${signal.strategy}</strong> strategy flipped to <strong>${signal.state}</strong> on ${signal.eventDate}.</p>`,
        `<p>Close: ${signal.close} (as of ${signal.asOf})</p>`,
        `<p>This is a learning project signal, not financial advice. Review it in <a href="https://vespera.systems/lab">Mission Control</a> before acting.</p>`,
      ].join('\n'),
    }),
  });

  if (!response.ok) {
    console.error(
      `[lab] signal notification failed (${response.status}): ${await response.text()}`,
    );
    return false;
  }
  return true;
}
