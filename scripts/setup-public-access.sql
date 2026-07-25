-- One-time production setup for public email-capture chat access.
-- Run in the Supabase SQL editor (or psql against POSTGRES_URL) after
-- deploying the public-access release.

-- 1. Per-IP daily counters backing the abuse backstop. Until this table
--    exists the app fails open on IP limits (per-user caps still apply).
CREATE TABLE IF NOT EXISTS "ip_usage" (
  "ip" varchar(64) NOT NULL,
  "day" varchar(10) NOT NULL,
  "signups" integer DEFAULT 0 NOT NULL,
  "messages" integer DEFAULT 0 NOT NULL,
  CONSTRAINT "ip_usage_ip_day_pk" PRIMARY KEY ("ip", "day")
);

-- 2. Free tier: email-capture users land on subscription type 1.
--    10 messages/day, cheap model only. Editable later in /admin/subscriptiontypes.
UPDATE subscription_types
SET name = 'Free',
    price = 0,
    max_messages_per_day = 10,
    available_models = '["deepseek-v4-pro"]',
    description = 'Public email access - 10 messages per day'
WHERE id = 1;

-- 3. Neutralize the old BYPASS_AUTH identity. It lives on a public inbox
--    domain (mailinator), so it must never be claimable as an admin.
UPDATE "User"
SET "isAdmin" = false,
    "subscriptionType" = 1
WHERE email = 'vespera-admin@mailinator.com';

-- 4. AFTER Daniel registers his own account at /register, promote it:
-- UPDATE "User"
-- SET "isAdmin" = true, "subscriptionType" = 3
-- WHERE email = 'daniel@danielmolloy.com';
