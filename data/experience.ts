export interface ExperienceItem {
  type: 'education' | 'work'
  title: string
  organization: string
  period: string
  location?: string
  description: string[]
  tags?: string[]
}

export const experienceData: ExperienceItem[] = [
  {
    type: 'work',
    title: 'Full-Stack Developer',
    organization: 'Membership Management System (Freelance)',
    period: 'Mar 2025 - Present',
    location: 'Remote',
    description: [
      'Built scalable membership platform handling onboarding, renewals, and lifecycle management',
      'Designed type-safe backend APIs with tRPC and database layer with Prisma ORM',
      'Implemented payment processing with Billplz integration',
      'Deployed production system optimized for high traffic and reliability',
    ],
    tags: ['Next.js', 'TypeScript', 'tRPC', 'PostgreSQL', 'Billplz'],
  },
  {
    type: 'work',
    title: 'Backend Developer',
    organization: 'Workshop Management System',
    period: 'Mar 2025 (6 days)',
    description: [
      'Delivered production-ready system from scratch in 6 days',
      'Built complete database schema, CRUD APIs, and admin dashboard',
      'Integrated payment gateway with secure validation',
      'Achieved fast response times with 99% uptime',
    ],
    tags: ['Laravel', 'PHP', 'MySQL'],
  },
  {
    type: 'work',
    title: 'Full-Stack Developer',
    organization: 'Management Platform',
    period: '1.5 Years',
    description: [
      'Developed multiple web applications with focus on clean, maintainable code',
      'Built robust CRUD operations and user-friendly interfaces',
      'Refactored legacy code improving performance and maintainability',
      'Led database design and optimization strategies',
    ],
    tags: ['Laravel', 'PHP', 'JavaScript', 'MySQL'],
  },
  {
    type: 'education',
    title: "Bachelor's Degree, Chemical Engineering",
    organization: 'Universiti Putra Malaysia',
    period: '2018 - 2022',
    description: [
      'Developed strong analytical and problem-solving skills',
      'Trained in breaking down complex systems into testable components',
      'Applied data-driven reasoning to engineering challenges',
      'Leadership: College Representative Council, NACES Symposium participant',
    ],
  },
  {
    type: 'education',
    title: 'Self-Taught Software Engineer',
    organization: 'Project-Based Learning',
    period: 'Ongoing',
    description: [
      'Built real-world systems with Laravel, Next.js, and Node.js',
      'Specialized in backend architecture, database design, and API development',
      'Hands-on experience with role-based access, payment systems, and workflows',
      'Continuous learning through production-quality projects',
    ],
    tags: ['Laravel', 'Next.js', 'TypeScript', 'PostgreSQL'],
  },
  {
    type: 'education',
    title: 'Foundation in Science, First Class',
    organization: 'Universiti Putra Malaysia',
    period: '2017 - 2018',
    description: [
      'First Class honors in foundation studies',
      'Strong foundation in Chemistry, Physics, Biology, and Mathematics',
      'Active in university activities and sports competitions',
    ],
  },
  {
    type: 'education',
    title: 'Pure Science Stream',
    organization: 'SM Sains Selangor',
    period: '2012 - 2016',
    description: [
      'Grade: SPM or Malaysian Certificate of Education or GSCE equivalent : 8A1B | 2A+ 4A 2A- 1B+',
      'Activities and societies: Student Leadership Board (2014-2016) | School Prefect (2015-2016) | Guru Muda (2016)',
    ],
  },
]
