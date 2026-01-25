'use client'

import { useState } from 'react'
import { Github, ExternalLink } from 'lucide-react'
import { portfolioProjects } from '@/data/portfolioProjects'

type FilterType = 'all' | 'website' | 'mobile'

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')

  const filteredProjects =
    activeFilter === 'all'
      ? portfolioProjects
      : portfolioProjects.filter((project) => project.category === activeFilter)

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-sm uppercase tracking-wider text-gray-400 mb-2">MY WORK</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Projects.</h2>

          {/* Filter tabs */}
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeFilter === 'all'
                  ? 'bg-primary text-dark-900'
                  : 'bg-dark-800 text-gray-300 hover:bg-dark-700'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter('website')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeFilter === 'website'
                  ? 'bg-primary text-dark-900'
                  : 'bg-dark-800 text-gray-300 hover:bg-dark-700'
              }`}
            >
              Website
            </button>
            <button
              onClick={() => setActiveFilter('mobile')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeFilter === 'mobile'
                  ? 'bg-primary text-dark-900'
                  : 'bg-dark-800 text-gray-300 hover:bg-dark-700'
              }`}
            >
              Mobile
            </button>
          </div>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card p-6 group hover:scale-[1.02] transition-all duration-300"
            >
              {/* Project image placeholder */}
              <div className="bg-dark-800 rounded-lg mb-4 h-48 flex items-center justify-center overflow-hidden">
                <div className="text-gray-600 text-6xl font-bold">{project.title[0]}</div>
              </div>

              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">{project.description}</p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, index) => (
                  <span key={index} className="badge-glass text-xs">
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
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    className="flex items-center gap-2 px-4 py-2 bg-dark-800 text-gray-300 rounded-lg hover:bg-dark-700 transition-colors text-sm font-medium"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
