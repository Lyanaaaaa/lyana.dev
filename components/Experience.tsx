'use client'

import { ArrowUpRight } from 'lucide-react'
import SpaceBackdrop from './space/SpaceBackdrop'
import SectionLabel from './ui/SectionLabel'
import { experienceData, statusDot, statusLabel, type ExperienceHighlight, type ExperienceItem } from '@/data/experience'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { useStaggerAnimation } from '@/hooks/useStaggerAnimation'

const work = experienceData.filter((e) => e.type === 'work')
const education = experienceData.filter((e) => e.type === 'education')

/** Date column on desktop, a single meta line above the title on phones */
function Meta({ item }: { item: ExperienceItem }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 lg:flex-col lg:gap-1.5 lg:pt-1.5">
      <p className="text-[15px] font-medium tabular-nums text-gray-200">{item.period}</p>
      {item.location && <p className="text-sm text-gray-400">{item.location}</p>}
    </div>
  )
}

function Highlight({ h, wide }: { h: ExperienceHighlight; wide?: boolean }) {
  const name = h.href ? (
    <a href={h.href} target="_blank" rel="noopener noreferrer" className="group/link inline-flex items-center gap-1 transition-colors hover:text-primary-200">
      {h.name}
      <ArrowUpRight className="h-4 w-4 text-primary-300 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" aria-hidden />
    </a>
  ) : (
    h.name
  )

  return (
    <li className={`rounded-card-inner-sm bg-white/[0.045] p-5 transition-colors hover:bg-white/[0.07] md:rounded-card-inner ${wide ? 'sm:col-span-2' : ''}`}>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <h4 className="text-[17px] font-semibold text-white">{name}</h4>
        {h.status && (
          <span className="inline-flex items-center gap-2 text-[13px] text-gray-300">
            <span className={`h-1.5 w-1.5 rounded-full ${statusDot[h.status]}`} aria-hidden />
            {statusLabel[h.status]}
          </span>
        )}
      </div>
      <p className="mt-2 text-[15px] leading-relaxed text-gray-300">{h.text}</p>
    </li>
  )
}

function Role({ item, index }: { item: ExperienceItem; index: number }) {
  return (
    <article data-stagger={index} className="grid gap-3 animate-stagger-in lg:grid-cols-[200px_1fr] lg:gap-12">
      <Meta item={item} />
      <div className="min-w-0">
        <h3 className="text-xl font-bold leading-snug text-white md:text-2xl">{item.title}</h3>
        <p className="mt-1 text-[16px] font-medium text-primary-300">{item.organization}</p>
        <p className="mt-4 max-w-[68ch] text-[16px] leading-relaxed text-gray-200">{item.summary}</p>

        {item.highlights && (
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {item.highlights.map((h, i) => (
              <Highlight key={h.name} h={h} wide={i === 0} />
            ))}
          </ul>
        )}

        {item.tags && <p className="mt-5 text-sm leading-relaxed text-gray-400">{item.tags.join('  ·  ')}</p>}
      </div>
    </article>
  )
}

export default function Experience() {
  const ref = useScrollAnimation()
  const listRef = useStaggerAnimation(120)

  return (
    <section id="experience" ref={ref} className="section">
      <SpaceBackdrop variant="experience" />

      <div className="container relative z-10">
        <div className="grid gap-6 text-center md:text-left lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-14">
          <div>
            <SectionLabel index="02" className="animate-fade-in-down">
              Experience
            </SectionLabel>
            <h2 className="heading-xl mt-6 animate-fade-in-up delay-100">
              Where I&apos;ve been <span className="text-gradient">building.</span>
            </h2>
          </div>
          <p className="lead mx-auto max-w-md animate-fade-in-up delay-200 md:mx-0 lg:pb-2">
            Products in production, client platforms delivered on tight timelines, and the engineering degree that taught me to test
            everything.
          </p>
        </div>

        <div ref={listRef} className="mt-14 space-y-16 text-left md:mt-20 md:space-y-20">
          {work.map((item, i) => (
            <Role key={`${item.title}-${item.organization}`} item={item} index={i} />
          ))}
        </div>

        <div className="mt-20 grid gap-6 text-left animate-fade-in-up lg:grid-cols-[200px_1fr] lg:gap-12">
          <h3 className="text-xl font-bold text-white lg:pt-0.5">Education</h3>
          <ul className="grid gap-8 md:grid-cols-3 md:gap-6">
            {education.map((e) => (
              <li key={e.title}>
                <p className="text-sm tabular-nums text-gray-400">{e.period}</p>
                <p className="mt-1.5 text-[16px] font-semibold leading-snug text-white">{e.title}</p>
                <p className="mt-0.5 text-sm font-medium text-primary-300">{e.organization}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-gray-300">{e.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
