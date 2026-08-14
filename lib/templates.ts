// File: lib/templates.ts
import type { PortfolioTemplate } from './types';

export const TEMPLATES: PortfolioTemplate[] = [
  {
    id: 'balanced',
    label: '50% Upshift / 50% Firelight',
    legs: [
      { vaultKey: 'A', weightBps: 5000 },
      { vaultKey: 'B', weightBps: 5000 },
    ],
  },
  {
    id: 'upshift-tilt',
    label: '70% Upshift / 30% Firelight',
    legs: [
      { vaultKey: 'A', weightBps: 7000 },
      { vaultKey: 'B', weightBps: 3000 },
    ],
  },
];

export function getTemplate(id: string): PortfolioTemplate {
  const t = TEMPLATES.find((x) => x.id === id);
  if (!t) throw new Error(`Unknown template ${id}`);
  return t;
}
