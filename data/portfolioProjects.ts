export type ProjectGroup = 'product' | 'client' | 'engineering' | 'prototype'

export const projectGroups: { id: ProjectGroup | 'all'; label: string }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'product', label: 'Live Products' },
  { id: 'client', label: 'Client Work' },
  { id: 'engineering', label: 'AI & Engineering' },
  { id: 'prototype', label: 'In Progress' },
]

export interface PortfolioProject {
  id: string
  title: string
  description: string
  /** Filter tab in the Projects section */
  group: ProjectGroup
  featured?: boolean
  tech: string[]
  image?: string
  /** Small label on the gradient placeholder when there is no image (defaults to "Prototype") */
  kicker?: string
  githubUrl?: string
  liveUrl?: string
  tags: string[]
}

/**
 * Ownership words are exact on purpose ("co-built", "built the UI"): a CTO can check them against git.
 */
export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'dourr',
    group: 'product',
    featured: true,
    title: 'Dourr: Rental Marketplace',
    description:
      'Live rental marketplace for Malaysia, co-built from day one. I own listings, accounts, inquiries with WhatsApp handoff and the Trust Score. Covered by 161 PHPUnit and 50 Playwright test files.',
    tech: ['Next.js', 'React', 'TypeScript', 'Laravel', 'MySQL', 'Playwright', 'PostHog'],
    image: '/resources/Dourr-rental-marketplace-dashboard.jpg',
    tags: ['Next.js', 'Laravel', 'Live'],
    liveUrl: 'https://dourr.com',
  },
  {
    id: 'autorentic-tenant-app',
    group: 'product',
    featured: true,
    title: 'Autorentic Tenant App: Flutter, iOS & Android',
    description:
      'Tenants pay bills, sign their tenancy and raise requests from their phone. I built the tenant UI in two weeks: 28 screens, English and Bahasa Melayu, and a motion system. In store review.',
    kicker: 'iOS · Android',
    tech: ['Flutter', 'Dart', 'Riverpod', 'go_router', 'Firebase', 'PostHog'],
    tags: ['Flutter', 'Mobile', 'Bilingual'],
  },
  {
    id: 'autorentic',
    group: 'product',
    title: 'Autorentic: Rental Automation',
    description:
      'Live SaaS running rent collection for Malaysian agencies. I shipped consolidated monthly invoicing, invoice validation, tax ID fields with an audit trail and a design-system rebuild.',
    tech: ['Laravel', 'React', 'Refine', 'TypeScript', 'MariaDB'],
    image: '/resources/Autorentic-rental-software-dashboard.png.jpg',
    tags: ['Laravel', 'React', 'SaaS'],
    liveUrl: 'https://autorentic.com',
  },
  {
    id: 'ux-audit-agents',
    group: 'engineering',
    featured: true,
    title: 'AI UX Audit: Multi-Agent Pipeline',
    description:
      'Claude Code workflow: analyst agents review screenshots, accessibility checks and PostHog funnels in parallel, then a second model tries to disprove each finding. Pilot: 11 of 14 verified, 0 disproved.',
    kicker: 'Agents · Verification',
    tech: ['Claude Code', 'Playwright', 'axe-core', 'PostHog MCP', 'Node.js'],
    tags: ['AI Agents', 'UX', 'Analytics'],
  },
  {
    id: 'loupe',
    group: 'engineering',
    title: 'Loupe: Findings Ledger',
    description:
      'Where audit findings go to be proven. Imports are schema-checked and rejected if they carry personal data. No fix starts without a metric, a baseline and a date to measure again.',
    kicker: 'Laravel · Filament',
    tech: ['Laravel 12', 'Filament 4', 'SQLite', 'JSON Schema', 'PHPUnit'],
    tags: ['Laravel', 'Data Integrity', 'Internal Tool'],
  },
  {
    id: 'workshop-manager',
    group: 'client',
    title: 'Workshop Manager',
    description:
      'Operations system for a workshop business. First production release in 6 days (schema, APIs, admin, payments), then maintained part-time with reports and role-based permissions.',
    tech: ['Laravel', 'PHP', 'MySQL', 'Blade'],
    image: '/resources/Mrcount-workshop-software-dashboard.png',
    tags: ['Laravel', 'PHP', 'Client'],
  },
  {
    id: 'membership-platform',
    group: 'prototype',
    title: 'Membership Platform',
    description:
      'Independent product I scoped end to end: onboarding, renewals and member lifecycle. Type-safe tRPC APIs, Prisma and PostgreSQL, role-based access, sandbox-tested payments. Pre-launch.',
    tech: ['Next.js', 'TypeScript', 'tRPC', 'Prisma', 'PostgreSQL'],
    image: '/resources/Atlas-membership-software-dashboard.png',
    tags: ['Next.js', 'tRPC', 'Pre-launch'],
  },
  {
    id: 'ngamstay',
    group: 'prototype',
    title: 'NgamStay',
    description:
      'Prototype of a standalone rental marketplace that can optionally plug into a property management system. Dual sign-in paths with verified-versus-reviewed listing flow.',
    tech: ['TypeScript', 'React'],
    tags: ['TypeScript', 'React', 'Prototype'],
    githubUrl: 'https://github.com/Lyanaaaaa/NgamStay',
  },
]
