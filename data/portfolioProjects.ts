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
    title: 'MovieBites',
    description:
      'A full stack movie application with API database to get all the latest and searched movie and TV series information.',
    category: 'website',
    tech: ['React.js', 'Node.js', 'MongoDB'],
    tags: ['React.js', 'API'],
    githubUrl: 'https://github.com/Lyanaaaaa',
    liveUrl: '#',
  },
  {
    id: '2',
    title: 'DreamId',
    description:
      'Dreamin is a news portal and journal where you can write down and find latest journal and news about technology.',
    category: 'website',
    tech: ['Laravel', 'MySQL', 'Tailwind'],
    tags: ['Laravel', 'MySQL'],
    githubUrl: 'https://github.com/Lyanaaaaa',
    liveUrl: '#',
  },
  {
    id: '3',
    title: 'BIOLINK',
    description:
      'A tool to quickly gather links from various profiles and social networks in one place.',
    category: 'website',
    tech: ['React', 'Firebase'],
    tags: ['React', 'Firebase'],
    githubUrl: 'https://github.com/Lyanaaaaa',
    liveUrl: '#',
  },
  {
    id: '4',
    title: 'Weavify',
    description: 'A task management and scheduling platform for teams and individuals.',
    category: 'website',
    tech: ['Next.js', 'PostgreSQL'],
    tags: ['Next.js', 'PostgreSQL'],
    githubUrl: 'https://github.com/Lyanaaaaa',
    liveUrl: '#',
  },
  {
    id: '5',
    title: 'Location-Based App',
    description:
      'A mobile app that provides location-based services and recommendations using GPS.',
    category: 'mobile',
    tech: ['React Native', 'Firebase'],
    tags: ['React Native', 'API', 'Firebase'],
    githubUrl: 'https://github.com/Lyanaaaaa',
    liveUrl: '#',
  },
]
