import { headers } from "next/headers";
import Link from "next/link";
import { BrandMark } from "@/components/site/brand-mark";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { isCompanyHost } from "@/lib/domain";
import { companyFacingModuleIds, productModuleMap, productModules } from "@/lib/modules";

const companyProof = [
  "Sector-specialised signals, built to sit alongside an LLM, not replace one.",
  "Quant strategies backed by real, testable backtests — not a black box.",
  "Built for VC, private equity, and family office desks.",
];

const companyModules = companyFacingModuleIds
  .map((id) => productModuleMap.get(id))
  .filter((module): module is NonNullable<typeof module> => Boolean(module));

function CompanySite() {
  return (
    <div className="min-h-screen text-white">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <BrandMark />
        <nav className="flex items-center gap-2"><Button asChild variant="outline"><a href="https://vespera.systems/demo">See what we do</a></Button><Button asChild><Link href="/contact">Contact</Link></Button></nav>
      </header>
      <section className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 pb-16 pt-10 lg:grid-cols-[1.02fr_0.98fr] lg:px-10 lg:pb-24 lg:pt-20">
        <div>
          <Badge>A Daniel Molloy Limited product</Badge>
          <h1 className="mt-8 max-w-6xl text-5xl font-semibold leading-[0.9] tracking-[-0.065em] sm:text-7xl lg:text-8xl">AI that tells you when to trade, not another chatbot.</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-neutral-300 sm:text-xl">Vespera Systems is a product of Daniel Molloy Limited, an investment-technology consultancy serving venture capital, private equity, and family office teams. We build narrow, sector-specialised models that combine quant technique with gathered market intelligence to signal investment timing — deliberately not competing with general-purpose LLMs.</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row"><Button asChild><a href="https://vespera.systems/demo">See what we do</a></Button><Button asChild variant="outline"><Link href="/contact">Request private briefing</Link></Button></div>
          <div className="mt-10 grid gap-3">{companyProof.map((point) => <div key={point} className="hud-panel rounded-3xl px-5 py-4 text-sm leading-6 text-neutral-200">{point}</div>)}</div>
        </div>
        <div className="relative">
          <div className="absolute -inset-8 rounded-[56px] bg-white/10 blur-3xl" />
          <div className="hud-panel relative overflow-hidden rounded-[42px] p-5">
            <div className="rounded-[32px] border border-white/10 bg-black/40 p-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-5"><div><p className="hud-label">Capability stack</p><h2 className="mt-2 text-3xl font-semibold tracking-[-0.05em]">Niche by design.</h2></div><Badge>Live MVP</Badge></div>
              <div className="mt-5 grid gap-3">{companyModules.map((module) => <article key={module.id} className="rounded-3xl border border-white/[0.08] bg-white/[0.045] p-5"><p className="hud-label">{module.eyebrow}</p><h3 className="mt-3 text-xl font-semibold tracking-[-0.03em]">{module.label}</h3><p className="mt-2 text-sm leading-6 text-neutral-400">{module.summary}</p></article>)}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProductSite() {
  return (
    <div className="min-h-screen text-white">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-10"><BrandMark product /><nav className="flex items-center gap-2"><Button asChild variant="outline"><Link href="/demo">Demo</Link></Button><Button asChild><Link href="/demo">Open workspace</Link></Button></nav></header>
      <section className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 pb-16 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:pb-24 lg:pt-20">
        <div><Badge>Product endpoint</Badge><h1 className="mt-8 max-w-6xl text-5xl font-semibold leading-[0.9] tracking-[-0.065em] sm:text-7xl lg:text-8xl">An internal desk tool for the City, Wall Street, and everywhere capital hides.</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-neutral-300 sm:text-xl">Client workspaces combine the AI trade-timing signal, legal checker, quant bench, files, and operator configuration in one restrained monochrome control room.</p><div className="mt-10 flex flex-col gap-4 sm:flex-row"><Button asChild><Link href="/demo">Open demo workspace</Link></Button><Button asChild variant="outline"><Link href="/demo">Open demo graph</Link></Button></div></div>
        <div className="hud-panel rounded-[42px] p-6"><p className="hud-label">Workspace modules</p><div className="mt-6 grid gap-3">{productModules.map((module) => <Link key={module.id} href={`/demo/${module.id}`} className="block rounded-3xl border border-white/10 bg-white/[0.045] p-5 transition hover:border-white/28 hover:bg-white/[0.075]"><div className="flex items-center justify-between gap-4"><h2 className="text-2xl font-semibold tracking-[-0.04em]">{module.label}</h2><Badge>{module.status}</Badge></div><p className="mt-2 text-sm leading-6 text-neutral-400">{module.summary}</p></Link>)}</div></div>
      </section>
    </div>
  );
}

export default async function HomePage() {
  const headersList = await headers();
  const host = headersList.get("host");
  return isCompanyHost(host) ? <CompanySite /> : <ProductSite />;
}
