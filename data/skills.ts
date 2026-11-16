import type { HighlightStatus } from './experience'

/** Filter chip order in the Skills section */
export const skillCategories = [
  'Languages',
  'Frontend',
  'Backend',
  'Databases',
  'Testing',
  'DevOps',
  'Payments',
  'Mobile',
  'AI & Analytics',
] as const

export type SkillCategory = (typeof skillCategories)[number]

export type SkillLevel = 'Daily' | 'Often' | 'Familiar'

export interface SkillItem {
  name: string
  category: SkillCategory
  level: SkillLevel
  /** simpleicons.org slug; omitted → lucide fallback icon */
  icon?: string
  /** hex without # for the icon colour (defaults to brand colour) */
  color?: string
}

export const levelWidth: Record<SkillLevel, number> = {
  Daily: 92,
  Often: 74,
  Familiar: 55,
}

/**
 * Levels reflect how often each tool shows up in Lyana's current work (data/experience.ts),
 * not a self-graded percentage. Adjust freely.
 */
export const skills: SkillItem[] = [
  { name: 'Laravel', category: 'Backend', level: 'Daily', icon: 'laravel' },
  { name: 'Next.js', category: 'Frontend', level: 'Daily', icon: 'nextdotjs', color: 'ffffff' },
  { name: 'React', category: 'Frontend', level: 'Daily', icon: 'react' },
  { name: 'TypeScript', category: 'Languages', level: 'Daily', icon: 'typescript' },
  { name: 'PHP', category: 'Languages', level: 'Daily', icon: 'php', color: 'a5b4fc' },
  { name: 'MySQL', category: 'Databases', level: 'Daily', icon: 'mysql', color: '5ea1d6' },
  { name: 'Claude Code', category: 'AI & Analytics', level: 'Daily', icon: 'anthropic', color: 'ffffff' },
  { name: 'Playwright', category: 'Testing', level: 'Often' },
  { name: 'Tailwind', category: 'Frontend', level: 'Daily', icon: 'tailwindcss' },
  { name: 'JavaScript', category: 'Languages', level: 'Daily', icon: 'javascript' },
  { name: 'PHPUnit', category: 'Testing', level: 'Often' },
  { name: 'PostgreSQL', category: 'Databases', level: 'Often', icon: 'postgresql', color: '6aa4e0' },
  { name: 'MariaDB', category: 'Databases', level: 'Often', icon: 'mariadb', color: 'c49a6c' },
  { name: 'Prisma ORM', category: 'Databases', level: 'Often', icon: 'prisma', color: 'ffffff' },
  { name: 'tRPC', category: 'Backend', level: 'Often', icon: 'trpc' },
  { name: 'Node.js', category: 'Backend', level: 'Often', icon: 'nodedotjs' },
  { name: 'Refine', category: 'Frontend', level: 'Often' },
  { name: 'GitHub Actions', category: 'DevOps', level: 'Often', icon: 'githubactions' },
  { name: 'PostHog', category: 'AI & Analytics', level: 'Often', icon: 'posthog', color: 'f9bd2b' },
  { name: 'Billing & invoicing', category: 'Payments', level: 'Often' },
  { name: 'Flutter', category: 'Mobile', level: 'Familiar', icon: 'flutter' },
  { name: 'Dart', category: 'Languages', level: 'Familiar', icon: 'dart', color: '40b4f0' },
  { name: 'Riverpod', category: 'Mobile', level: 'Familiar' },
  { name: 'MCP servers', category: 'AI & Analytics', level: 'Familiar' },
  { name: 'Filament', category: 'Backend', level: 'Familiar' },
  { name: 'Docker', category: 'DevOps', level: 'Familiar', icon: 'docker' },
  { name: 'Vercel', category: 'DevOps', level: 'Familiar', icon: 'vercel', color: 'ffffff' },
  { name: 'Bootstrap', category: 'Frontend', level: 'Familiar', icon: 'bootstrap' },
]

/**
 * Where the stack actually runs. Each row is a real product from data/portfolioProjects.ts; picking one
 * filters the skill grid to exactly these names, so every logo on the page is backed by shipped work.
 * Names must match `skills[].name`. Only list what Lyana herself touched in that codebase.
 */
export interface StackProduct {
  project: string
  /** Chip and planet label; keep it under ~12 characters */
  short: string
  status: HighlightStatus
  skills: string[]
}

export const stackInProduction: StackProduct[] = [
  { project: 'Dourr', short: 'Dourr', status: 'live', skills: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Laravel', 'PHP', 'MySQL', 'Playwright', 'PostHog'] },
  { project: 'Autorentic', short: 'Autorentic', status: 'live', skills: ['Laravel', 'PHP', 'React', 'Refine', 'TypeScript', 'MariaDB', 'Billing & invoicing'] },
  { project: 'Autorentic tenant app', short: 'Tenant app', status: 'review', skills: ['Flutter', 'Dart', 'Riverpod'] },
  { project: 'AI UX-audit pipeline', short: 'AI UX audit', status: 'internal', skills: ['Claude Code', 'MCP servers', 'Playwright', 'PostHog', 'Node.js'] },
  { project: 'Loupe', short: 'Loupe', status: 'internal', skills: ['Laravel', 'Filament', 'PHP', 'PHPUnit'] },
  { project: 'Workshop Manager', short: 'Workshop', status: 'live', skills: ['Laravel', 'PHP', 'MySQL', 'Billing & invoicing'] },
  { project: 'Membership platform', short: 'Membership', status: 'prelaunch', skills: ['Next.js', 'TypeScript', 'tRPC', 'Prisma ORM', 'PostgreSQL'] },
]

/** What orbits the planet before a product is picked: the tools in daily production use */
export const coreStack = ['Laravel', 'Next.js', 'React', 'TypeScript', 'MySQL', 'Flutter']
