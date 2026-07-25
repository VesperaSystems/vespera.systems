-- Create Tenant table
CREATE TABLE IF NOT EXISTS "Tenant" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
  "name" varchar(255) NOT NULL,
  "domain" varchar(255),
  "tenantType" varchar(50) NOT NULL DEFAULT 'quant',
  "createdAt" timestamp NOT NULL DEFAULT now(),
  "updatedAt" timestamp NOT NULL DEFAULT now()
);

-- Add tenantId column to User table
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "tenantId" uuid REFERENCES "Tenant"("id");

-- Create index for tenant lookups
CREATE INDEX IF NOT EXISTS "idx_user_tenant_id" ON "User" ("tenantId");
CREATE INDEX IF NOT EXISTS "idx_tenant_name" ON "Tenant" ("name");
CREATE INDEX IF NOT EXISTS "idx_tenant_type" ON "Tenant" ("tenantType");

-- Migrate existing organization data to tenant table
-- This will create tenants based on existing organization data
INSERT INTO "Tenant" ("name", "domain", "tenantType")
SELECT DISTINCT
  COALESCE("organizationName", 'Unnamed Organization') as name,
  "organizationDomain" as domain,
  "tenantType"
FROM "User" u
WHERE ("organizationName" IS NOT NULL OR "organizationDomain" IS NOT NULL OR "tenantType" != 'quant')
  AND NOT EXISTS (
    SELECT 1 FROM "Tenant" t
    WHERE t."name" = COALESCE(u."organizationName", 'Unnamed Organization')
      AND t."domain" IS NOT DISTINCT FROM u."organizationDomain"
      AND t."tenantType" = u."tenantType"
  );

-- Update User table to link to tenants
UPDATE "User" 
SET "tenantId" = (
  SELECT "id" 
  FROM "Tenant" 
  WHERE "Tenant"."name" = COALESCE("User"."organizationName", 'Unnamed Organization')
    AND "Tenant"."domain" = "User"."organizationDomain"
    AND "Tenant"."tenantType" = "User"."tenantType"
  LIMIT 1
)
WHERE "organizationName" IS NOT NULL OR "organizationDomain" IS NOT NULL OR "tenantType" != 'quant';

-- Drop old organization columns (after migration is complete)
-- ALTER TABLE "User" DROP COLUMN "organizationName";
-- ALTER TABLE "User" DROP COLUMN "organizationDomain";
-- ALTER TABLE "User" DROP COLUMN "tenantType"; 