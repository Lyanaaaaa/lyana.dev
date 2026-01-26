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
    id: '1',
    title: 'Membership Platform',
    description:
      'Scalable SaaS platform for member onboarding and lifecycle management. Type-safe APIs, 2C2P payments, optimized for high traffic.',
    category: 'website',
    tech: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'tRPC', '2C2P'],
    image: '/resources/Atlas-membership-software-dashboard.png',
    tags: ['Next.js', 'TypeScript', 'tRPC'],
    githubUrl: 'https://github.com/Lyanaaaaa',
    liveUrl: '#',
  },
  {
    id: '2',
    title: 'Workshop Manager',
    description:
      'Complete workshop management system built in 6 days. Database design, REST APIs, payment integration, 99% uptime.',
    category: 'website',
    tech: ['Laravel', 'PHP', 'MySQL'],
    image: '/resources/Mrcount-workshop-software-dashboard.png',
    tags: ['Laravel', 'PHP'],
    githubUrl: 'https://github.com/Lyanaaaaa',
    liveUrl: '#',
  },
  {
    id: '3',
    title: 'Business Dashboard',
    description:
      'Full-stack management platform with CRUD operations, role-based access, and reporting. Clean architecture, production-ready.',
    category: 'website',
    tech: ['Laravel', 'JavaScript', 'MySQL', 'Bootstrap'],
    image: '/resources/Autorentic-rental-software-dashboard.png.jpg',
    tags: ['Laravel', 'JavaScript', 'MySQL'],
    githubUrl: 'https://github.com/Lyanaaaaa',
    liveUrl: '#',
  },
  {
    id: '4',
    title: 'Backend API Systems',
    description:
      'RESTful APIs with authentication, role-based permissions, and data workflows. Optimized queries and clean code.',
    category: 'website',
    tech: ['Laravel', 'PHP', 'MySQL', 'Node.js'],
    image: 'https://images.unsplash.com/photo-1760670399462-f5e479452c27?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tags: ['Laravel', 'API', 'Backend'],
    githubUrl: 'https://github.com/Lyanaaaaa',
    liveUrl: '#',
  },
  {
    id: '5',
    title: 'Modern Web Apps',
    description:
      'Production-grade applications with Next.js and Node.js. Server-side rendering, database optimization, comprehensive docs.',
    category: 'website',
    tech: ['Next.js', 'Node.js', 'TypeScript', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL'],
    githubUrl: 'https://github.com/Lyanaaaaa',
    liveUrl: '#',
  },
]
