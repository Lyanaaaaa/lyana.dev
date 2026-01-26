'use client'

import { useState, useMemo, useCallback, memo } from 'react'
import Image from 'next/image'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

interface TechItem {
  name: string
  logo: string
  iconColor?: string
}

interface TechCategory {
  title: string
  items: TechItem[]
}

interface TechSection {
  title: string
  items: TechItem[]
  titleDelay: string
  itemDelays: string[]
  category: 'frontend' | 'backend' | 'database'
}

type FilterType = 'all' | 'frontend' | 'backend' | 'database'

const techStackData = {
  frameworks: [
    { name: 'Laravel', logo: 'https://cdn.simpleicons.org/laravel/white', iconColor: '#ffffff' },
    { name: 'Next.js', logo: 'https://cdn.simpleicons.org/nextdotjs/white', iconColor: '#ffffff' },
    { name: 'Node.js', logo: 'https://cdn.simpleicons.org/nodedotjs/white', iconColor: '#ffffff' },
    { name: 'React', logo: 'https://cdn.simpleicons.org/react/white', iconColor: '#ffffff' },
  ],
  languages: [
    { name: 'PHP', logo: 'https://cdn.simpleicons.org/php/white', iconColor: '#ffffff' },
    { name: 'TypeScript', logo: 'https://cdn.simpleicons.org/typescript/white', iconColor: '#ffffff' },
    { name: 'JavaScript', logo: 'https://cdn.simpleicons.org/javascript/white', iconColor: '#ffffff' },
    { name: 'HTML/CSS', logo: 'https://cdn.simpleicons.org/html5/white', iconColor: '#ffffff' },
  ],
  databases: [
    { name: 'PostgreSQL', logo: 'https://cdn.simpleicons.org/postgresql/white', iconColor: '#ffffff' },
    { name: 'MySQL', logo: 'https://cdn.simpleicons.org/mysql/white', iconColor: '#ffffff' },
    { name: 'Prisma ORM', logo: 'https://cdn.simpleicons.org/prisma/white', iconColor: '#ffffff' },
  ],
  tools: [
    { name: 'tRPC', logo: 'https://cdn.simpleicons.org/trpc/white', iconColor: '#ffffff' },
    { name: 'Tailwind CSS', logo: 'https://cdn.simpleicons.org/tailwindcss/white', iconColor: '#ffffff' },
    { name: 'Bootstrap', logo: 'https://cdn.simpleicons.org/bootstrap/white', iconColor: '#ffffff' },
    { name: 'Billplz', logo: 'https://cdn.simpleicons.org/stripe/white', iconColor: '#ffffff' },
  ],
}

const techSections: TechSection[] = [
  {
    title: 'Frameworks & Libraries',
    items: techStackData.frameworks,
    titleDelay: 'delay-300',
    itemDelays: ['delay-300', 'delay-400', 'delay-500', 'delay-600'],
    category: 'frontend',
  },
  {
    title: 'Languages',
    items: techStackData.languages,
    titleDelay: 'delay-700',
    itemDelays: ['delay-700', 'delay-800', 'delay-100', 'delay-200'],
    category: 'frontend',
  },
  {
    title: 'Databases',
    items: techStackData.databases,
    titleDelay: 'delay-300',
    itemDelays: ['delay-300', 'delay-400', 'delay-500'],
    category: 'database',
  },
  {
    title: 'Tools & Technologies',
    items: techStackData.tools,
    titleDelay: 'delay-600',
    itemDelays: ['delay-600', 'delay-700', 'delay-800', 'delay-100'],
    category: 'backend',
  },
]

const TechCard = memo(({ tech, delay }: { tech: TechItem; delay: string }) => {
  return (
    <div
      className={`glass-card p-8 flex flex-col items-center justify-center min-h-[160px] group hover:scale-105 transition-all duration-300 animate-scale-in ${delay}`}
    >
      <div className="w-20 h-20 flex items-center justify-center mb-4 transition-all p-3">
        <Image
          src={tech.logo}
          alt={tech.name}
          width={64}
          height={64}
          loading="lazy"
          className="w-full h-full object-contain"
          unoptimized
        />
      </div>
      <p className="text-center font-medium">{tech.name}</p>
    </div>
  )
})

TechCard.displayName = 'TechCard'

const TechSection = memo(({ section, isLast }: { section: TechSection; isLast: boolean }) => {
  return (
    <div className={isLast ? '' : 'mb-12'}>
      <h3 className={`text-xl font-semibold mb-6 uppercase tracking-wider text-gray-400 animate-fade-in-left ${section.titleDelay}`}>
        {section.title}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {section.items.map((tech, index) => (
          <TechCard key={tech.name} tech={tech} delay={section.itemDelays[index]} />
        ))}
      </div>
    </div>
  )
})

TechSection.displayName = 'TechSection'

export default function TechStack() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const ref = useScrollAnimation()

  const filteredSections = useMemo(
    () =>
      activeFilter === 'all'
        ? techSections
        : techSections.filter((section) => section.category === activeFilter),
    [activeFilter]
  )

  const handleFilterAll = useCallback(() => setActiveFilter('all'), [])
  const handleFilterFrontend = useCallback(() => setActiveFilter('frontend'), [])
  const handleFilterBackend = useCallback(() => setActiveFilter('backend'), [])
  const handleFilterDatabase = useCallback(() => setActiveFilter('database'), [])

  return (
    <section className="py-20 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-sm uppercase tracking-wider text-gray-400 mb-2 animate-fade-in-down">
            PROGRAMMING LANGUAGES
          </p>
          <h2 className="text-4xl md:text-5xl font-bold animate-fade-in-up delay-100">My Tech Stack.</h2>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-4 mb-12 flex-wrap animate-fade-in-up delay-200">
          <button
            onClick={handleFilterAll}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              activeFilter === 'all'
                ? 'text-white'
                : 'text-gray-300 hover:bg-dark-700'
            }`}
          >
            All
          </button>
          <button
            onClick={handleFilterFrontend}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              activeFilter === 'frontend'
                ? 'btn-primary text-white'
                : 'text-gray-300 hover:bg-dark-700'
            }`}
          >
            Frontend
          </button>
          <button
            onClick={handleFilterBackend}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              activeFilter === 'backend'
                ? 'btn-primary text-white'
                : 'text-gray-300 hover:bg-dark-700'
            }`}
          >
            Backend
          </button>
          <button
            onClick={handleFilterDatabase}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              activeFilter === 'database'
                ? 'btn-primary text-white'
                : 'text-gray-300 hover:bg-dark-700'
            }`}
          >
            Database
          </button>
        </div>

        {/* Tech Sections */}
        {filteredSections.map((section, index) => (
          <TechSection
            key={section.title}
            section={section}
            isLast={index === filteredSections.length - 1}
          />
        ))}
      </div>
    </section>
  )
}