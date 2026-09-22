import { lazy } from 'react';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  PROTOTYPE REGISTRY
 * ─────────────────────────────────────────────────────────────────────────────
 *  Add a prototype here and it appears on the index page, in the sidebar, and
 *  gets a route — no other file needs touching.
 *
 *  status: 'concept' | 'review' | 'approved' | 'archived'
 *  accent: { ramp, from, to } — a brand ramp by name plus two 1-based step
 *          numbers, as the Color page numbers them. The card thumbnail reads
 *          these live, per mode, so editing a ramp in src/theme/palettes.js
 *          repaints every card. Never put a raw hex here.
 */
export const STATUS = {
  concept: { label: 'Concept', color: 'default' },
  review: { label: 'In review', color: 'gold' },
  approved: { label: 'Approved', color: 'green' },
  archived: { label: 'Archived', color: 'red' },
};

export const prototypes = [
  {
    id: 'revenue-dashboard',
    title: 'Revenue dashboard',
    summary:
      'Overview screen for finance leads: KPI row, trend breakdown, and a ranked account table.',
    status: 'review',
    tags: ['Dashboard', 'Data display', 'Charts'],
    owner: 'Design',
    updated: '2026-09-18',
    accent: { ramp: 'Calamansi', from: 3, to: 5 },
    component: lazy(() => import('../pages/prototypes/RevenueDashboard')),
  },
  {
    id: 'onboarding-flow',
    title: 'Onboarding flow',
    summary:
      'Four-step account setup wizard covering workspace details, team invites, and billing.',
    status: 'concept',
    tags: ['Flow', 'Forms', 'Steps'],
    owner: 'Design',
    updated: '2026-09-15',
    accent: { ramp: 'Lagoon', from: 3, to: 5 },
    component: lazy(() => import('../pages/prototypes/OnboardingFlow')),
  },
  {
    id: 'order-inbox',
    title: 'Order inbox',
    summary:
      'High-density work queue: saved filters, bulk actions, and a detail drawer for triage.',
    status: 'approved',
    tags: ['Table', 'Filters', 'Drawer'],
    owner: 'Design',
    updated: '2026-09-20',
    accent: { ramp: 'Mangrove', from: 3, to: 5 },
    component: lazy(() => import('../pages/prototypes/OrderInbox')),
  },
  {
    id: 'settings-console',
    title: 'Settings console',
    summary:
      'Account, security, and notification preferences using the standard two-column form layout.',
    status: 'concept',
    tags: ['Settings', 'Forms', 'Tabs'],
    owner: 'Design',
    updated: '2026-09-12',
    accent: { ramp: 'Calamansi', from: 2, to: 4 },
    component: lazy(() => import('../pages/prototypes/SettingsConsole')),
  },
];

export const prototypeById = Object.fromEntries(prototypes.map((p) => [p.id, p]));

export const allTags = [...new Set(prototypes.flatMap((p) => p.tags))].sort();
