import type { MarketGraphFilters } from "@/types/venture";

export type ProductModuleId = "graph" | "chat" | "legal" | "quant" | "files" | "config";
export type TenantType = "quant" | "legal" | "finance" | "enterprise";

export interface ProductModule {
  id: ProductModuleId;
  label: string;
  eyebrow: string;
  summary: string;
  status: "live" | "mvp" | "guarded" | "planned";
}

export interface ClientWorkspaceConfig {
  slug: string;
  label: string;
  desk: string;
  tenantType: TenantType;
  summary: string;
  modules: ProductModuleId[];
  filters: MarketGraphFilters;
}

export const productModules: ProductModule[] = [
  { id: "graph", label: "Graph HUD", eyebrow: "Mathematical display", summary: "A relationship graph for capital, companies, people, sectors, and institutional context.", status: "live" },
  { id: "chat", label: "AI analyst", eyebrow: "Junior analyst layer", summary: "A tenant-aware investment assistant for queries, synthesis, briefing, and document-aware follow-up.", status: "mvp" },
  { id: "legal", label: "Legal checker", eyebrow: "Contract review", summary: "DOCX and TXT review with structured issues, editable recommendations, and tracked-change export.", status: "mvp" },
  { id: "quant", label: "Quant bench", eyebrow: "Python strategy engine", summary: "A safe strategy workspace for model drafts, factor notes, chart scripts, and audit-ready quant artifacts.", status: "guarded" },
  { id: "files", label: "Files", eyebrow: "Document estate", summary: "A controlled surface for research, contracts, charts, uploads, and generated artifacts.", status: "mvp" },
  { id: "config", label: "Config", eyebrow: "Operator controls", summary: "Tenant modules, graph presets, display density, and access controls for client workspaces.", status: "mvp" },
];

export const productModuleMap = new Map(productModules.map((module) => [module.id, module]));

const baseFilters: MarketGraphFilters = {
  valuationBand: "all",
  sector: "all",
  country: "all",
  stage: "all",
  investor: "all",
  year: "all",
  search: "",
};

export const clientWorkspaceConfigs: Record<string, ClientWorkspaceConfig> = {
  demo: { slug: "demo", label: "Demo Workspace", desk: "Vespera Systems demo room", tenantType: "enterprise", summary: "Synthetic market graph and product tour for safe sales demonstrations.", modules: ["graph", "chat", "legal", "quant", "files", "config"], filters: baseFilters },
  "wealth-desk": { slug: "wealth-desk", label: "Global Wealth Desk", desk: "Global wealth and alternatives desk", tenantType: "finance", summary: "A private graph and analyst workspace for cross-border capital, founders, and diligence context.", modules: ["graph", "chat", "legal", "quant", "files", "config"], filters: { ...baseFilters, sector: "Climate", valuationBand: "250m-1b" } },
  "uk-desk": { slug: "uk-desk", label: "UK Markets Desk", desk: "UK bank-side market intelligence desk", tenantType: "finance", summary: "A focused internal graph for UK fintech, infrastructure, and counterparty review.", modules: ["graph", "chat", "legal", "files", "config"], filters: { ...baseFilters, country: "United Kingdom", sector: "Fintech" } },
  "advisory-desk": { slug: "advisory-desk", label: "Advisory Desk", desk: "Wealth and client intelligence desk", tenantType: "finance", summary: "A relationship-aware workspace for wealth, insuretech, and later-stage operating signals.", modules: ["graph", "chat", "quant", "files", "config"], filters: { ...baseFilters, stage: "Series B", country: "United Kingdom" } },
};

function fallbackLabel(slug: string) {
  return slug.split("-").filter(Boolean).map((part) => part.toUpperCase()).join(" ");
}

export function getWorkspaceConfig(slug = "demo"): ClientWorkspaceConfig {
  const key = slug.toLowerCase();
  return clientWorkspaceConfigs[key] ?? {
    slug,
    label: fallbackLabel(slug),
    desk: "Private institutional workspace",
    tenantType: "enterprise",
    summary: "Client-specific graph and product modules awaiting estate configuration.",
    modules: ["graph", "chat", "legal", "quant", "files", "config"],
    filters: baseFilters,
  };
}

export function isProductModuleId(value: string): value is ProductModuleId {
  return productModules.some((module) => module.id === value);
}
