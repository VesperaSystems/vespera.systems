CREATE TABLE IF NOT EXISTS "BacktestRuns" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"strategy" varchar(100) NOT NULL,
	"ticker" varchar(20) NOT NULL,
	"params" json NOT NULL,
	"startDate" varchar(10) NOT NULL,
	"endDate" varchar(10) NOT NULL,
	"metrics" json NOT NULL,
	"latestSignal" json,
	"equityCurve" json,
	"source" varchar(20) DEFAULT 'colab' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Signals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"strategy" varchar(100) NOT NULL,
	"ticker" varchar(20) NOT NULL,
	"params" json,
	"state" varchar(10) NOT NULL,
	"lastEvent" varchar(30),
	"eventDate" varchar(10),
	"close" varchar(30),
	"asOf" varchar(10) NOT NULL,
	"isNewEvent" boolean DEFAULT false NOT NULL,
	"notifiedAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Watchlist" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"ticker" varchar(20) NOT NULL,
	"strategy" varchar(100) NOT NULL,
	"params" json,
	"active" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
