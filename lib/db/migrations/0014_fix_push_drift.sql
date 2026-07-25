-- Parts of the schema only ever reached databases via `drizzle-kit push`, never via a
-- migration, so fresh databases bootstrapped with `pnpm db:migrate` were missing them.
-- Everything here is guarded so it is a no-op on databases that already have the objects.
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "subscriptionType" integer DEFAULT 1 NOT NULL;
--> statement-breakpoint
ALTER TABLE "Chat" ADD COLUMN IF NOT EXISTS "model" varchar DEFAULT 'chat-model' NOT NULL;
--> statement-breakpoint
-- user_message_counts: older deployments have "user_id" as text while "User"."id" is
-- uuid. Create it if missing, convert text -> uuid where needed, and ensure the FK.
CREATE TABLE IF NOT EXISTS "user_message_counts" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"date" timestamp DEFAULT now() NOT NULL,
	"count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 IF EXISTS (
  SELECT 1 FROM information_schema.columns
  WHERE table_schema = 'public'
    AND table_name = 'user_message_counts'
    AND column_name = 'user_id'
    AND data_type = 'text'
 ) THEN
  ALTER TABLE "user_message_counts"
   ALTER COLUMN "user_id" SET DATA TYPE uuid USING "user_id"::uuid;
 END IF;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_message_counts" ADD CONSTRAINT "user_message_counts_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
