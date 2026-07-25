import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

const proofPoints = [
  { value: "Demo", label: "market map and HUD display environment" },
  { value: "Config", label: "operator surface for display presets" },
  { value: "Tenant", label: "future authenticated client workspaces" },
];

const offers = [
  {
    title: "Market map",
    body: "A spatial view of companies, investors, sectors, relationships, and signals for large-format office displays.",
  },
  {
    title: "Config console",
    body: "A controlled surface for selecting client presets, tuning graph density, and preparing the room-ready display mode.",
  },
  {
    title: "Client routes",
    body: "Dedicated paths such as /wealth-desk and /advisory-desk for client-specific display experiences and later authenticated data access.",
  },
  {
    title: "Supabase auth",
    body: "The authentication layer for tenant workspaces will live here, separate from the public company brochure site.",
  },
];

const outcomes = [
  "Keep the company brochure public at vesperasystems.com.",
  "Keep product demonstrations and tenant access at vespera.systems.",
  "Give each client route its own branded intelligence surface.",
];

const process = [
  ["01", "Show the product", "Use the root demo and config route to demonstrate the market map, display presets, and operating model."],
  ["02", "Create client routes", "Publish dedicated paths for named tenants so each office display can open into the right configured experience."],
  ["03", "Add secure data access", "Use Supabase authentication and tenant-aware data policies as the platform moves from demo to client workspace."],
];

export default async function HomePage() {
  const headersList = await headers();
  const host = headersList.get("host") || "vesperasystems.com";
  const isBrochureDomain = host.includes("vesperasystems.com");

  return (
    <div className="min-h-screen text-neutral-50">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link href="/" className="group inline-flex items-center gap-4" aria-label="Vespera Systems home">
          <Image
            src="/brand/vespera-lockup-dark.svg"
            alt="Vespera Systems"
            width={229}
            height={80}
            priority
            className="h-auto w-44 sm:w-52"
          />
          <span className="hidden border-l border-white/15 pl-4 text-xs uppercase tracking-[0.24em] text-neutral-400 transition group-hover:text-white lg:block">
            Demo and tenant platform
          </span>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-3">
          <a
            href="/config"
            className="rounded-full border border-white/15 bg-white/5 px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-100 transition hover:border-white/40 hover:bg-white/10 sm:px-5 sm:tracking-[0.22em]"
          >
            Configure
          </a>
          <a
            href="/login"
            className="rounded-full bg-white px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-neutral-950 transition hover:bg-neutral-200 sm:px-5 sm:tracking-[0.22em]"
          >
            Sign in
          </a>
        </nav>
      </header>

      <section className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 pb-16 pt-8 lg:grid-cols-[1.02fr_0.98fr] lg:px-10 lg:pb-24 lg:pt-16">
        <div>
          <div className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.24em] text-neutral-300">
            {isBrochureDomain ? "Company brochure lives at vesperasystems.com" : "Vespera Systems product demo"}
          </div>
          <h1 className="mt-8 max-w-5xl text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-white sm:text-7xl lg:text-8xl">
            Explore the Vespera product environment.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-300 sm:text-xl">
            This is the Vespera Systems demo and future tenant platform: market maps, authenticated client routes, and configuration surfaces for large-format intelligence displays.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="/config"
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-bold uppercase tracking-[0.22em] text-neutral-950 transition hover:bg-neutral-200"
            >
              Open config
            </a>
            <a
              href="https://vesperasystems.com"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-white transition hover:border-white/40 hover:bg-white/10"
            >
              Company site
            </a>
          </div>
          <div className="mt-12 grid gap-3 sm:grid-cols-3">
            {proofPoints.map((point) => (
              <div key={point.label} className="rounded-3xl border border-white/10 bg-white/[0.045] p-5">
                <p className="text-3xl font-semibold tracking-[-0.04em] text-white">{point.value}</p>
                <p className="mt-2 text-sm leading-6 text-neutral-400">{point.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-8 rounded-[56px] bg-white/8 blur-3xl" />
          <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-neutral-950/90 p-5 shadow-[0_0_130px_rgba(255,255,255,0.08)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_30%)]" />
            <div className="relative rounded-[32px] border border-white/15 bg-black/35 p-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-neutral-300">Product system</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-white">
                    Demo to tenant route
                  </h2>
                </div>
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-neutral-200">
                  Live
                </span>
              </div>
              <div className="mt-5 grid gap-3">
                {[
                  ["vesperasystems.com", "Public brochure", "Trust, clarity, premium positioning"],
                  ["Qualified conversation", "Sales motion", "Brief, demo, pricing, implementation"],
                  ["vespera.systems/config", "Secure workspace", "Display presets, graph controls, tenant setup"],
                ].map(([label, title, body]) => (
                  <article key={label} className="rounded-3xl border border-white/[0.08] bg-white/[0.045] p-5">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-neutral-300">{label}</p>
                    <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-neutral-400">{body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-20 lg:px-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {offers.map((offer) => (
            <article key={offer.title} className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <p className="text-xs uppercase tracking-[0.24em] text-neutral-300">Config module</p>
              <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-white">{offer.title}</h3>
              <p className="mt-4 text-sm leading-7 text-neutral-300">{offer.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-20 lg:px-10">
        <div className="grid gap-6 rounded-[38px] border border-white/10 bg-neutral-950/75 p-6 lg:grid-cols-[0.8fr_1.2fr] lg:p-8">
          <div>
            <p className="text-xs uppercase tracking-[0.26em] text-neutral-300">Built for product access</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
              One brand system across demo, config, and tenant routes.
            </h2>
            <p className="mt-5 text-base leading-7 text-neutral-300">
              The company site explains Vespera Systems Limited. This platform shows the product, powers display demos, and becomes the secure home for tenant data access.
            </p>
          </div>
          <div className="grid gap-3">
            {outcomes.map((outcome) => (
              <div key={outcome} className="rounded-3xl border border-white/10 bg-white/[0.045] p-5 text-lg leading-7 text-neutral-100">
                {outcome}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-24 lg:px-10">
        <div className="overflow-hidden rounded-[38px] border border-white/15 bg-white/[0.055] p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.26em] text-neutral-300">How Vespera becomes tenant-ready</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
                From positioning to a working client intelligence system.
              </h2>
            </div>
            <div className="grid gap-3">
              {process.map(([step, title, body]) => (
                <article key={step} className="grid gap-4 rounded-[28px] border border-white/10 bg-black/20 p-5 sm:grid-cols-[4rem_1fr]">
                  <div className="font-mono text-sm text-neutral-300">{step}</div>
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.03em] text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-neutral-300">{body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-sm leading-6 text-neutral-300">
              Use vesperasystems.com for the public company story. Use vespera.systems for demos, configuration, tenant routes, and authenticated client access.
            </p>
            <a
              href="mailto:hello@vespera.systems?subject=Vespera%20Systems%20new%20client%20pipeline"
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-bold uppercase tracking-[0.22em] text-neutral-950 transition hover:bg-neutral-200"
            >
              Request access
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
