'use client'

import { GraduationCap, Briefcase } from 'lucide-react'
import { experienceData } from '@/data/experience'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { useItemScrollAnimation } from '@/hooks/useItemScrollAnimation'

function ExperienceItem({ item, index }: { item: typeof experienceData[0]; index: number }) {
  const itemRef = useItemScrollAnimation()
  const animations = index % 2 === 0 ? 'animate-fade-in-right' : 'animate-fade-in-left'

  return (
    <div ref={itemRef} className="relative">
      {/* Timeline dot */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-dark-300/30 border-4 border-primary rounded-full flex items-center justify-center z-10 hidden md:flex">
        {item.type === 'education' ? (
          <GraduationCap className="w-6 h-6 text-primary" />
        ) : (
          <Briefcase className="w-6 h-6 text-primary" />
        )}
      </div>

      {/* Content card - alternate sides on desktop */}
      <div
        className={`md:w-[calc(50%-3rem)] ${
          index % 2 === 0 ? 'md:ml-auto md:pl-12' : 'md:pr-12'
        } ${animations}`}
      >
        <div className="glass-card text-center md:text-left">
          <div className="flex flex-col items-center md:flex-row md:items-start md:justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1">{item.title}</h3>
              <p className="text-primary font-medium">{item.organization}</p>
              {item.location && <p className="text-sm text-gray-400">{item.location}</p>}
            </div>
          </div>

          <p className="text-sm text-gray-400 mb-4">{item.period}</p>

          <ul className="space-y-2 mb-4 text-left">
            {item.description.map((desc, i) => (
              <li key={i} className="text-sm text-gray-300 leading-relaxed">
                • {desc}
              </li>
            ))}
          </ul>

          {item.tags && (
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {item.tags.map((tag, i) => (
                <span key={i} className="badge-glass text-xs">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Experience() {
  const headerRef = useScrollAnimation()
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16 text-center md:text-left" ref={headerRef}>
          <p className="text-sm uppercase tracking-wider text-gray-400 mb-2 animate-fade-in-down">
            WHAT I HAVE DONE SO FAR
          </p>
          <h2 className="text-4xl md:text-5xl font-bold animate-fade-in-up delay-100">
            Experience.
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary via-primary to-transparent hidden md:block"></div>

          <div className="space-y-12">
            {experienceData.map((item, index) => (
              <ExperienceItem key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
