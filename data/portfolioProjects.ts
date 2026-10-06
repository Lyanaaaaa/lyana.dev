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
  {
    id: 'backend-api-systems',
    title: 'Backend API Systems',
    description:
      'RESTful APIs with authentication, role-based permissions, and data workflows. Optimized queries and clean code.',
    category: 'website',
    tech: ['Laravel', 'PHP', 'MySQL', 'Node.js'],
    image: 'https://images.unsplash.com/photo-1760670399462-f5e479452c27?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tags: ['Laravel', 'API', 'Backend'],
  },
  {
    id: 'modern-web-apps',
    title: 'Modern Web Apps',
    description:
      'Production-grade applications with Next.js and Node.js. Server-side rendering, database optimization, comprehensive docs.',
    category: 'website',
    tech: ['Next.js', 'Node.js', 'TypeScript', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL'],
  },
]
