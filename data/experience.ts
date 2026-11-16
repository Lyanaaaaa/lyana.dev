export type HighlightStatus = 'live' | 'review' | 'internal' | 'prelaunch'

export interface ExperienceHighlight {
  name: string
  status?: HighlightStatus
  /** One sentence. The name carries the "what", this carries the proof. */
  text: string
  href?: string
}

export interface ExperienceItem {
  type: 'education' | 'work'
  title: string
  organization: string
  period: string
  location?: string
  /** One or two sentences a stakeholder can read in five seconds */
  summary: string
  /** Named pieces of work, rendered as scannable tiles (work entries only) */
  highlights?: ExperienceHighlight[]
  tags?: string[]
}

export const statusLabel: Record<HighlightStatus, string> = {
  live: 'Live',
  review: 'In store review',
  internal: 'Internal tool',
  prelaunch: 'Pre-launch',
}

/** Status dot colour, shared by Experience tiles and the Skills product list */
export const statusDot: Record<HighlightStatus, string> = {
  live: 'bg-emerald-400',
  review: 'bg-amber-300',
  internal: 'bg-primary-300',
  prelaunch: 'bg-gray-400',
}

/**
 * Every line here must survive a reviewer reading the git history.
 * "Co-built" / "built the UI for" are deliberate: precise ownership reads as more senior than big claims.
 */
export const experienceData: ExperienceItem[] = [
  {
    type: 'work',
    title: 'Software Engineer',
    organization: 'Tech Strongbox',
    period: 'Apr 2025 – Present',
    location: 'Remote',
    summary:
      'Product engineer on a small team building rental and property software for Malaysia, across web, mobile and our own AI tooling.',
    highlights: [
      {
        name: 'Dourr',
        status: 'live',
        text: 'Co-built the rental marketplace from day one. Main frontend author; I own listings, accounts, inquiries with WhatsApp handoff and the Trust Score.',
        href: 'https://dourr.com',
      },
      {
        name: 'Autorentic tenant app',
        status: 'review',
        text: 'Built the tenant UI in Flutter in two weeks: 28 screens, bills and multi-bill payment, in-app tenancy signing, English and Bahasa Melayu.',
      },
      {
        name: 'AI UX-audit pipeline',
        status: 'internal',
        text: 'Claude Code workflow where analyst agents review screens and PostHog data in parallel, then a second model tries to disprove each finding. Pilot: 11 of 14 verified.',
      },
      {
        name: 'Loupe',
        status: 'internal',
        text: 'Findings ledger: schema-checked imports, personal-data scans, and no fix starts without a metric, a baseline and a date to measure again.',
      },
      {
        name: 'Autorentic web',
        status: 'live',
        text: 'Consolidated monthly invoices, invoice validation, agency tax IDs with an audit trail, landlord ticket access and a design-system rebuild.',
        href: 'https://autorentic.com',
      },
    ],
    tags: ['Laravel', 'Next.js', 'React', 'Flutter', 'Claude Code', 'PostHog', 'Playwright'],
  },
  {
    type: 'work',
    title: 'Backend Developer, Part-Time',
    organization: 'Workshop Management System',
    period: '2025 – Jan 2026',
    location: 'Remote',
    summary:
      'Took the first production release from empty repo to live in 6 days (schema, CRUD APIs, admin dashboard, payments), then maintained it with reporting dashboards and role-based permissions that keep each user inside their own data.',
    tags: ['Laravel', 'PHP', 'MySQL', 'Blade'],
  },
  {
    type: 'work',
    title: 'Product & Backend Engineer, Independent',
    organization: 'Membership Management System',
    period: '2025 – Present',
    location: 'Remote',
    summary:
      'Scoped the product end to end (onboarding, renewals, member lifecycle) before writing code. Type-safe tRPC APIs, a Prisma and PostgreSQL schema, role-based access, and payments tested against the gateway sandbox. Pre-launch.',
    tags: ['Next.js', 'TypeScript', 'tRPC', 'Prisma', 'PostgreSQL'],
  },
  {
    type: 'education',
    title: 'B.Eng. Chemical Engineering',
    organization: 'Universiti Putra Malaysia',
    period: '2018 – 2022',
    summary: 'Trained to model systems, isolate variables and trust measurements over intuition. College Representative Council.',
  },
  {
    type: 'education',
    title: 'Foundation in Science, First Class',
    organization: 'Universiti Putra Malaysia',
    period: '2017 – 2018',
    summary: 'First Class honours in Chemistry, Physics, Biology and Mathematics.',
  },
  {
    type: 'education',
    title: 'Software Engineering, Self-Directed',
    organization: 'Production work, not tutorials',
    period: '2024 – Present',
    summary: 'Learned on real codebases with real users: code review, CI, end-to-end tests and production deploys from the first month.',
  },
]
