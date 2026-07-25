-- Add organization fields to User table
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "organizationName" varchar(255);
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "tenantType" varchar(50) DEFAULT 'finance'; -- 'finance' or 'legal'
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "organizationDomain" varchar(255);

-- Add index for tenant type lookups
CREATE INDEX IF NOT EXISTS "idx_user_tenant_type" ON "User" ("tenantType");
CREATE INDEX IF NOT EXISTS "idx_user_organization" ON "User" ("organizationName");