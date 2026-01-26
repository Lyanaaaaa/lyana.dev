'use client'

import { useState, useMemo, memo, useCallback } from 'react'
import { Github, Atom } from 'lucide-react'
import Image from 'next/image'
import { portfolioProjects, type PortfolioProject } from '@/data/portfolioProjects'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

type FilterType = 'all' | 'website' | 'mobile'

const delays = ['delay-100', 'delay-200', 'delay-300', 'delay-400', 'delay-500'] as const

const ProjectCard = memo(({ project, index }: { project: PortfolioProject; index: number }) => {
  return (
    <div
      style={{
        contain: 'layout style paint',
        contentVisibility: 'auto',
        transform: 'translateZ(0)'
      }}
      className={`glass-card p-6 group hover:scale-[1.02] transition-all duration-300 animate-scale-in ${delays[index % delays.length]}`}
    >
      {/* Project image */}
      <div
        className="bg-dark-800 rounded-lg mb-4 h-48 flex items-center justify-center overflow-hidden relative"
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
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag, tagIndex) => (
          <span key={`${project.id}-${tag}-${tagIndex}`} className="badge-glass text-xs">
            {tag}
          </span>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            className="flex items-center gap-2 px-4 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors text-sm font-medium"
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

  const filteredProjects = useMemo(
    () =>
      activeFilter === 'all'
        ? portfolioProjects
        : portfolioProjects.filter((project) => project.category === activeFilter),
    [activeFilter]
  )

  const handleFilterAll = useCallback(() => setActiveFilter('all'), [])
  const handleFilterWebsite = useCallback(() => setActiveFilter('website'), [])
  const handleFilterMobile = useCallback(() => setActiveFilter('mobile'), [])

  return (
    <section className="py-20 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-sm uppercase tracking-wider text-gray-400 mb-2 animate-fade-in-down">MY WORK</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 animate-fade-in-up delay-100">Projects.</h2>

          {/* Filter tabs */}
          <div className="flex gap-4 flex-wrap animate-fade-in-up delay-200">
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
              onClick={handleFilterWebsite}
              className={`btn-primary ${
                activeFilter === 'website'
                  ? 'text-white'
                  : 'text-gray-300'
              }`}
            >
              Website
            </button>
            <button
              onClick={handleFilterMobile}
              className={`btn-primary ${
                activeFilter === 'mobile'
                  ? 'text-white'
                  : 'text-gray-300'
              }`}
            >
              Mobile
            </button>
          </div>
        </div>

        {/* Projects grid */}
        {filteredProjects.length > 0 ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            style={{ contain: 'layout style' }}
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
