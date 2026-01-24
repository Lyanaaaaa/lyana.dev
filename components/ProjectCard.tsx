import { CheckCircle2, ExternalLink } from 'lucide-react'
import { Project } from '@/types'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="card group">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-sm font-medium text-primary-600 mb-2">
            {project.category}
          </div>
          <h3 className="text-2xl font-bold mb-2 group-hover:text-primary-600 transition-colors">
            {project.title}
          </h3>
        </div>
        {project.link && (
          <a 
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-primary-600 transition-colors"
            aria-label="View project"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Problem</h4>
          <p className="text-gray-600 leading-relaxed">{project.problem}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-2">What I Built</h4>
          <p className="text-gray-600 leading-relaxed">{project.solution}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Impact</h4>
          <ul className="space-y-2">
            {project.impact.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-600">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}