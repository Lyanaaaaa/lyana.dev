'use client'

import { useState, useMemo, memo, useCallback } from 'react'
import { Github, Atom } from 'lucide-react'
import Image from 'next/image'
import { portfolioProjects, type PortfolioProject } from '@/data/portfolioProjects'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { useStaggerAnimation } from '@/hooks/useStaggerAnimation'

type FilterType = 'all' | 'website' | 'mobile'

const ProjectCard = memo(({ project, index }: { project: PortfolioProject; index: number }) => {
  return (
    <div
      style={{
        contain: 'layout style',
        transform: 'translateZ(0)'
      }}
      data-stagger={index}
      className="glass-card text-center md:text-left group hover:scale-[1.02] transition-all duration-300 animate-stagger-in"
    >
      {/* Project image */}
      <div
        className="bg-dark-800 card-image mb-4 h-40 md:h-48 flex items-center justify-center relative"
        style={{ transform: 'translateZ(0)' }}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            quality={75}
          />
        ) : (
          <div className="text-gray-600 text-6xl font-bold">{project.title[0]}</div>
        )}
      </div>

      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
      <p className="text-gray-300 text-sm mb-4 leading-relaxed">{project.description}</p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
        {project.tags.map((tag, tagIndex) => (
          <span key={`${project.id}-${tag}-${tagIndex}`} className="badge-glass text-xs">
            {tag}
          </span>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 justify-center md:justify-start">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            className="flex items-center gap-2 px-4 py-2 bg-primary/20 text-primary card-button hover:bg-primary/30 text-sm font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="w-4 h-4" />
            Code
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            className="btn-primary gap-2 px-4 py-2 text-sm font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Atom className="w-4 h-4" />
            View
          </a>
        )}
      </div>
    </div>
  )
}, (prevProps, nextProps) => {
  return prevProps.project.id === nextProps.project.id && prevProps.index === nextProps.index
})

ProjectCard.displayName = 'ProjectCard'

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const ref = useScrollAnimation()
  const gridRef = useStaggerAnimation(150)

  const filteredProjects = useMemo(
    () =>
      activeFilter === 'all'
        ? portfolioProjects
        : portfolioProjects.filter((project) => project.category === activeFilter),
    [activeFilter]
  )

  const handleFilter = useCallback((filter: FilterType) => () => setActiveFilter(filter), [])

  return (
    <section className="py-20 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center md:text-left">
          <p className="text-sm uppercase tracking-wider text-gray-400 mb-2 animate-fade-in-down">MY WORK</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 animate-fade-in-up delay-100">Projects.</h2>

          {/* Filter tabs */}
          <div className="filter-tabs grid-cols-3 animate-fade-in-up delay-200">
            {(['all', 'website', 'mobile'] as const).map((filter) => (
              <button
                key={filter}
                onClick={handleFilter(filter)}
                className={`filter-tab ${
                  activeFilter === filter
                    ? filter === 'all' ? 'text-white' : 'btn-primary text-white'
                    : filter === 'all' ? 'text-gray-300 hover:bg-dark-700' : 'btn-primary text-gray-300'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Projects grid */}
        {filteredProjects.length > 0 ? (
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in-up">
            <div className="glass-card p-12 text-center max-w-md">
              <h3 className="text-2xl font-bold mb-3">Coming Soon</h3>
              <p className="text-gray-400">
                Mobile projects are currently in development. Check back soon for exciting new additions!
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
