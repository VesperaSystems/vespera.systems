// Product module descriptions surfaced on the corporate site (vesperasystems.com).
// Ported from the retired market-graph repo's lib/modules.ts during consolidation.

export type ProductModuleId = 'graph' | 'chat' | 'legal' | 'quant' | 'files' | 'config';

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
    id: 'chat',
    label: 'AI analyst',
    eyebrow: 'AI trade-timing signal',
    summary:
      'A sector-specialised signal layer that tells you when to trade, built on quant technique and curated market intelligence — not a general-purpose chatbot.',
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
    id: 'quant',
    label: 'Quant bench',
    eyebrow: 'Python strategy engine',
    summary:
      'A Python and Jupyter workspace that pulls live strategies from vespera-strategies for backtest review, factor notes, and audit-ready artifacts.',
    status: 'guarded',
  },
  {
    id: 'files',
    label: 'Files',
    eyebrow: 'Document estate',
    summary:
      'A controlled surface for research, contracts, charts, uploads, and generated artifacts.',
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

// Modules safe to surface on the public corporate site.
// 'legal' is deliberately excluded — contract review ships under APOSTL, not Vespera.
export const companyFacingModuleIds: ProductModuleId[] = ['chat', 'quant', 'files'];

export const productModuleMap = new Map(productModules.map((module) => [module.id, module]));
