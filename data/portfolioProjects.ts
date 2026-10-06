export interface PortfolioProject {
  id: string
  title: string
  description: string
  category: 'website' | 'mobile' | 'all'
  tech: string[]
  image?: string
  githubUrl?: string
  liveUrl?: string
  tags: string[]
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'dourr',
    title: 'Dourr: Rental Marketplace',
    description:
      'Rental-only marketplace for Malaysia, built from scratch around how fast a unit fills rather than listing volume. Search, inquiries, e-tenancy agreements with e-signature, gateway-held deposits, trust badges and identity verification.',
    category: 'website',
    tech: ['Next.js', 'React', 'TypeScript', 'Laravel', 'MySQL', 'Curlec', 'Playwright'],
    image: '/resources/Dourr-rental-marketplace-dashboard.jpg',
    tags: ['Next.js', 'Laravel', 'Marketplace'],
    liveUrl: 'https://dourr.com',
  },
  {
    id: 'autorentic',
    title: 'Autorentic: Rental Automation',
    description:
      'Rental automation for Malaysian property agencies, built end to end. Recurring invoicing, LHDN MyInvois e-invoicing, 2C2P payment collection, ledger and statements, plus agent and landlord portals.',
    category: 'website',
    tech: ['Laravel', 'React', 'Refine', 'TypeScript', 'MariaDB', '2C2P', 'MyInvois'],
    image: '/resources/Autorentic-rental-software-dashboard.png.jpg',
    tags: ['Laravel', 'React', 'Fintech'],
    liveUrl: 'https://autorentic.com',
  },
  {
    id: 'membership-platform',
    title: 'Membership Platform',
    description:
      'Scalable SaaS platform for member onboarding and lifecycle management. Type-safe APIs, online payments, optimized for high traffic.',
    category: 'website',
    tech: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'tRPC'],
    image: '/resources/Atlas-membership-software-dashboard.png',
    tags: ['Next.js', 'TypeScript', 'tRPC'],
  },
  {
    id: 'workshop-manager',
    title: 'Workshop Manager',
    description:
      'Complete workshop management system built in 6 days. Database design, REST APIs, payment integration, 99% uptime.',
    category: 'website',
    tech: ['Laravel', 'PHP', 'MySQL'],
    image: '/resources/Mrcount-workshop-software-dashboard.png',
    tags: ['Laravel', 'PHP'],
  },
  {
    id: 'ngamstay',
    title: 'NgamStay',
    description:
      'Prototype of a standalone rental marketplace that can optionally plug into a property management system. Dual sign-in paths with verified-versus-reviewed listing flow.',
    category: 'website',
    tech: ['TypeScript', 'React'],
    tags: ['TypeScript', 'React', 'Prototype'],
    githubUrl: 'https://github.com/Lyanaaaaa/NgamStay',
  },
]
