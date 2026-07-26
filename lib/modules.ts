// Product module descriptions surfaced on the corporate site (vesperasystems.com).
// Ported from the retired market-graph repo's lib/modules.ts during consolidation.

export type ProductModuleId =
  | 'graph'
  | 'chat'
  | 'legal'
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
    id: 'quant',
    label: 'Strategy Lab',
    eyebrow: 'Open research',
    summary:
      'Backtested strategies published with their method, data, and results — the working evidence behind every function we license.',
    status: 'live',
  },
  {
    id: 'signals',
    label: 'Signal engine',
    eyebrow: 'Trade timing',
    summary:
      'Validated strategies run daily; when a strike point fires, subscribers are alerted. The function, delivered live.',
    status: 'live',
  },
  {
    id: 'chat',
    label: 'Research chat',
    eyebrow: 'AI analyst',
    summary:
      'An assistant over our research: interrogate backtests and findings in plain English.',
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

// Modules safe to surface on the public corporate site, in narrative order:
// the lab validates, the signal engine delivers, the chat explains.
// 'legal' is deliberately excluded — contract review ships under APOSTL, not Vespera.
export const companyFacingModuleIds: ProductModuleId[] = ['quant', 'signals', 'chat', 'files'];

export const productModuleMap = new Map(productModules.map((module) => [module.id, module]));
