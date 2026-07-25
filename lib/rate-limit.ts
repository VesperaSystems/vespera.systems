import { allowIpMessage, allowIpSignup } from '@/lib/db/queries';

// Backstop limits against one person farming many email-capture accounts.
// The per-user daily cap lives in subscription_types (admin-editable); these
// only need to be generous enough to never bother a household on one IP.
export const SIGNUPS_PER_IP_PER_DAY = 3;
export const MESSAGES_PER_IP_PER_DAY = 40;

export function getClientIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0].trim() || headers.get('x-real-ip');
  return ip || 'unknown';
}

// Fail open: a limiter outage (e.g. missing table before setup SQL has run)
// should degrade to "no IP backstop", not brick the product — the per-user
// entitlement cap still applies either way.
export async function ipMaySignUp(headers: Headers): Promise<boolean> {
  try {
    return await allowIpSignup(getClientIp(headers), SIGNUPS_PER_IP_PER_DAY);
  } catch (error) {
    console.error('IP signup limiter unavailable, allowing request:', error);
    return true;
  }
}

export async function ipMaySendMessage(headers: Headers): Promise<boolean> {
  try {
    return await allowIpMessage(getClientIp(headers), MESSAGES_PER_IP_PER_DAY);
  } catch (error) {
    console.error('IP message limiter unavailable, allowing request:', error);
    return true;
  }
}
