import 'server-only';

/**
 * Shared-key auth for Strategy Lab ingest endpoints (/api/backtests, /api/signals).
 * Callers (Colab notebooks, the scheduled runner) send `x-vespera-api-key`.
 * Set VESPERA_LAB_API_KEY in the environment; if unset, ingest is disabled.
 */
export function isValidLabApiKey(request: Request): boolean {
  const expected = process.env.VESPERA_LAB_API_KEY;
  if (!expected) return false;
  const provided = request.headers.get('x-vespera-api-key');
  return provided === expected;
}
