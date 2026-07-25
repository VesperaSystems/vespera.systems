import { cookies } from "next/headers";
import type { VesperaSession, VesperaUser } from "@/lib/auth/types";
import { getWorkspaceConfig } from "@/lib/modules";

export const VESPERA_SESSION_COOKIE = "vespera_session";

const fallbackUser: VesperaUser = {
  id: "local-operator",
  email: "operator@vespera.systems",
  name: "Vespera Operator",
  isAdmin: true,
  tenantSlug: "demo",
  tenantType: "enterprise",
  subscriptionType: 3,
};

function decodeSession(raw: string | undefined): VesperaSession | null {
  if (!raw) return null;
  try {
    const json = Buffer.from(raw, "base64url").toString("utf8");
    return JSON.parse(json) as VesperaSession;
  } catch {
    return null;
  }
}

export async function getVesperaSession(): Promise<VesperaSession | null> {
  // Auth is intentionally disabled for now — vespera.systems is an open capability
  // demo, not a paywalled product. Every visitor gets a fallback operator session.
  // Re-enable the AUTH_SECRET/POSTGRES_URL gate below once real accounts are needed.
  const cookieStore = await cookies();
  const existing = decodeSession(cookieStore.get(VESPERA_SESSION_COOKIE)?.value);

  if (existing) return existing;

  return { user: fallbackUser, expires: new Date(Date.now() + 1000 * 60 * 60 * 8).toISOString() };
}

export async function requireWorkspaceSession(slug: string) {
  const session = await getVesperaSession();
  if (!session) return null;
  const workspace = getWorkspaceConfig(slug);
  return { ...session, user: { ...session.user, tenantSlug: workspace.slug, tenantType: workspace.tenantType } };
}

export function encodeSession(user: VesperaUser) {
  const session: VesperaSession = { user, expires: new Date(Date.now() + 1000 * 60 * 60 * 8).toISOString() };
  return Buffer.from(JSON.stringify(session), "utf8").toString("base64url");
}
