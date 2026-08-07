// Product module descriptions surfaced on the corporate site (vesperasystems.com).
// Ported from the retired market-graph repo's lib/modules.ts during consolidation.

export type ProductModuleId =
  | 'graph'
  | 'chat'
  | 'legal'
  | 'dd'
  | 'quant'
  | 'signals'
  | 'files'
  | 'config';

export interface ProductModule {
  id: ProductModuleId;
  label: string;
  eyebrow: string;
  summary: string;
  status: 'live' | 'mvp' | 'guarded' | 'planned';
}

export const productModules: ProductModule[] = [
  // Graph HUD stays off the corporate capability list until it graduates from skunkworks.
  {
    id: 'graph',
    label: 'Graph HUD',
    eyebrow: 'Mathematical display',
    summary:
      'A relationship graph for capital, companies, people, sectors, and institutional context.',
    status: 'planned',
  },
  {
    id: 'dd',
    label: 'vespera CLI',
    eyebrow: 'Due diligence',
    summary:
      'Reads a dataroom on your own machine: findings, key metrics, contradictions between documents, thesis fit, and an indicative valuation range. Free and open source.',
    status: 'live',
  },
  {
    id: 'quant',
    label: 'Strategy Lab',
    eyebrow: 'Side lab',
    summary:
      'Open experiments from the studio — algorithmic strategies published with their method, runnable notebooks, backtests, and honest limitations.',
    status: 'live',
  },
  {
    id: 'signals',
    label: 'Signal board',
    eyebrow: 'Side lab, live',
    summary:
      'Lab strategies run automatically after each US close; a read-only board shows what fired and when. An open experiment, not a product.',
    status: 'live',
  },
  {
    id: 'chat',
    label: 'Research chat',
    eyebrow: 'AI analyst',
    summary:
      'An assistant over the studio research: ask about datarooms, diligence checklists, and lab findings in plain English.',
    status: 'mvp',
  },
  {
    id: 'legal',
    label: 'Legal checker',
    eyebrow: 'Contract review',
    summary:
      'DOCX and TXT review with structured issues, editable recommendations, and tracked-change export.',
    status: 'mvp',
  },
  {
    id: 'files',
    label: 'Files',
    eyebrow: 'Document estate',
    summary:
      'A controlled surface for research, charts, uploads, and generated artifacts.',
    status: 'mvp',
  },
  {
    id: 'config',
    label: 'Config',
    eyebrow: 'Operator controls',
    summary:
      'Tenant modules, graph presets, display density, and access controls for client workspaces.',
    status: 'mvp',
  },
];

// Modules surfaced on the public site. Only the DD tool — the lab, signal
// board, and chat are internal/side projects and stay off the homepage.
// 'legal' is deliberately excluded — contract review ships under APOSTL, not Vespera.
export const companyFacingModuleIds: ProductModuleId[] = ['dd'];

export const productModuleMap = new Map(productModules.map((module) => [module.id, module]));
