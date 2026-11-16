'use client'

import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowRight, Boxes, Code2, FlaskConical, LayoutGrid, Lock, MoveRight, Rocket, Star, Users } from 'lucide-react'
import SpaceBackdrop from './space/SpaceBackdrop'
import SectionLabel from './ui/SectionLabel'
import { GithubIcon } from './ui/BrandIcons'
import { portfolioProjects, projectGroups, type PortfolioProject, type ProjectGroup } from '@/data/portfolioProjects'
import { profile } from '@/data/profile'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { useMediaQuery } from '@/hooks/useMediaQuery'

type FilterType = ProjectGroup | 'all'

/**
 * Pinned horizontal gallery only where it's comfortable: wide + tall enough, and the visitor
 * hasn't asked for reduced motion. Everywhere else the same track is a native swipe strip.
 */
const PIN_QUERY = '(min-width: 1024px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)'

/** Lines the first slide up with the page's .container content edge */
const GUTTER = 'max(1rem, calc((100vw - 1216px) / 2 + 2rem))'

const groupIcons: Record<FilterType, typeof LayoutGrid> = {
  all: LayoutGrid,
  product: Rocket,
  client: Users,
  engineering: Code2,
  prototype: FlaskConical,
}

const pad = (n: number) => String(n).padStart(2, '0')

function ProjectVisual({ project }: { project: PortfolioProject }) {
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={`${project.title} screenshot`}
        fill
        sizes="(max-width: 1024px) 84vw, 460px"
        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.05]"
      />
    )
  }
  return (
    <div className="flex h-full w-full flex-col justify-end bg-[radial-gradient(80%_80%_at_80%_10%,rgba(236,72,153,0.4),transparent_70%),linear-gradient(160deg,#1e0b33,#05010f)] p-6 pl-[10%]">
      <Boxes className="mb-4 h-8 w-8 text-primary-300" />
      <p className="font-display text-3xl font-extrabold leading-none text-white">{project.title.split(':')[0]}</p>
      <p className="mt-2 font-mono text-xs uppercase tracking-[0.3em] text-primary-200/60">{`// ${project.kicker ?? 'Prototype'}`}</p>
    </div>
  )
}

const ProjectCard = memo(function ProjectCard({ project }: { project: PortfolioProject }) {
  const href = project.liveUrl ?? project.githubUrl
  const [title, subtitle] = project.title.split(': ')

  return (
    <article className="glass-card glass-card-hover group flex w-[min(84vw,400px)] flex-col overflow-hidden lg:w-[440px]" style={{ contain: 'layout style' }}>
      <div className="relative h-48 overflow-hidden border-b border-white/5 md:h-56 lg:h-[clamp(160px,26vh,260px)]">
        {/* oversized so the parallax drift never reveals an edge */}
        <div data-parallax className="absolute inset-y-0 -left-[7%] -right-[7%]">
          <ProjectVisual project={project} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
        {project.featured && (
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-ink/70 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            <Star className="h-3.5 w-3.5 fill-amber-300 text-amber-300" /> Featured
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="card-tag">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="mt-5 text-2xl font-bold">{title}</h3>
        {subtitle && <p className="mt-1 text-sm font-medium text-primary-300">{subtitle}</p>}
        <p className="mt-3 line-clamp-6 flex-1 lg:line-clamp-5 text-[15px] leading-relaxed text-gray-400">{project.description}</p>

        <div className="mt-6 flex items-center justify-between">
          {href ? (
            <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-primary-300 transition-colors hover:text-primary-200">
              {project.liveUrl ? 'View Project' : 'View Code'} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 text-sm text-gray-400">
              <Lock className="h-4 w-4" /> Private codebase · walkthrough on request
            </span>
          )}
        </div>
      </div>
    </article>
  )
})

function Heading({ centered }: { centered?: boolean }) {
  return (
    <>
      <SectionLabel index="03" className="animate-fade-in-down">
        Projects
      </SectionLabel>
      <h2 className={`heading-xl mt-6 animate-fade-in-up delay-100 ${centered ? 'mx-auto max-w-3xl' : ''}`}>
        Products that run <span className="text-gradient">real businesses.</span>
      </h2>
      <p className={`lead mt-6 animate-fade-in-up delay-200 ${centered ? 'mx-auto max-w-xl' : 'max-w-md'}`}>
        Live products, a mobile app, and the AI tooling we use to make them better.
      </p>
    </>
  )
}

function FilterTabs({ active, onPick, compact }: { active: FilterType; onPick: (f: FilterType) => () => void; compact?: boolean }) {
  return (
    <div className={`flex gap-2 ${compact ? '' : 'no-scrollbar -mx-4 overflow-x-auto px-4 sm:flex-wrap sm:justify-center'}`} role="group" aria-label="Filter projects">
      {projectGroups.map(({ id, label }) => {
        const Icon = groupIcons[id]
        return (
          <button
            key={id}
            onClick={onPick(id)}
            aria-pressed={active === id}
            className={`filter-tab shrink-0 ${compact ? '!px-4 !py-2 !text-sm' : ''} ${active === id ? 'filter-tab-active' : ''}`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        )
      })}
    </div>
  )
}

function Progress({ active, total, barRef }: { active: number; total: number; barRef: React.RefObject<HTMLSpanElement> }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-xs tabular-nums text-gray-300" aria-live="polite">
        <span className="text-white">{pad(active + 1)}</span> / {pad(total)}
      </span>
      <span className="relative h-px w-32 overflow-hidden bg-white/15 md:w-48">
        <span ref={barRef} className="absolute inset-0 origin-left bg-gradient-to-r from-primary-400 to-pink-300" style={{ transform: 'scaleX(0)' }} />
      </span>
    </div>
  )
}

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const [active, setActive] = useState(0)
  const [height, setHeight] = useState<number | null>(null)
  const pinned = useMediaQuery(PIN_QUERY)

  const animRef = useScrollAnimation()
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLSpanElement>(null)

  const filtered = useMemo(
    () => (activeFilter === 'all' ? portfolioProjects : portfolioProjects.filter((p) => p.group === activeFilter)),
    [activeFilter]
  )

  const handleFilter = useCallback(
    (filter: FilterType) => () => {
      setActiveFilter(filter)
      setActive(0)
      const section = sectionRef.current
      if (!section) return
      if (window.matchMedia(PIN_QUERY).matches) {
        // A shorter track ends sooner: rewind to the first slide instead of jumping past the end
        const top = section.getBoundingClientRect().top
        if (top < 0) window.scrollTo({ top: window.scrollY + top, behavior: 'smooth' })
      } else {
        scrollerRef.current?.scrollTo({ left: 0, behavior: 'smooth' })
      }
    },
    []
  )

  /* ---------- Pinned engine: vertical scroll drives the track 1:1 ---------- */
  useEffect(() => {
    const section = sectionRef.current
    const stage = stageRef.current
    const track = trackRef.current
    if (!pinned || !section || !stage || !track) return

    let distance = 0
    let vw = 0
    let raf = 0
    let slides: { el: HTMLElement; img: HTMLElement | null; left: number; width: number; card: boolean }[] = []

    const render = () => {
      raf = 0
      const top = section.getBoundingClientRect().top
      const p = distance ? Math.min(1, Math.max(0, -top / distance)) : 0
      const x = -p * distance
      track.style.transform = `translate3d(${x}px,0,0)`
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`

      let passed = 0
      for (const s of slides) {
        const left = s.left + x
        const center = left + s.width / 2
        // Slides settle in as they cross the right edge: one scroll-linked entrance, no timers
        const enter = Math.min(1, Math.max(0, (vw - left) / (vw * 0.32)))
        s.el.style.opacity = String(0.2 + 0.8 * enter)
        s.el.style.transform = `translate3d(${(1 - enter) * 70}px,0,0) scale(${0.93 + 0.07 * enter})`
        if (s.img) s.img.style.transform = `translate3d(${((center - vw / 2) / vw) * -40}px,0,0)`
        if (s.card && center < vw * 0.62) passed++
      }
      setActive(Math.max(0, passed - 1))
    }

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(render)
    }

    const measure = () => {
      vw = window.innerWidth
      distance = Math.max(0, track.scrollWidth - vw)
      setHeight(distance + window.innerHeight)
      slides = Array.from(track.querySelectorAll<HTMLElement>('[data-slide]')).map((el) => ({
        el,
        img: el.querySelector<HTMLElement>('[data-parallax]'),
        left: el.offsetLeft,
        width: el.offsetWidth,
        card: el.dataset.slide === 'card',
      }))
      render()
    }

    // Trackpad sideways swipes move the gallery too (and don't trigger browser back-navigation)
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return
      e.preventDefault()
      window.scrollBy({ top: e.deltaX })
    }

    // Keyboard: tabbing to a card off-screen scrolls the page to the point where that card is centred
    const onFocus = (e: FocusEvent) => {
      const slide = (e.target as HTMLElement).closest<HTMLElement>('[data-slide]')
      if (!slide) return
      const target = Math.min(distance, Math.max(0, slide.offsetLeft - (vw - slide.offsetWidth) / 2))
      const sectionTop = section.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top: sectionTop + target, behavior: 'smooth' })
    }

    const ro = new ResizeObserver(measure)
    ro.observe(track)
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', schedule, { passive: true })
    stage.addEventListener('wheel', onWheel, { passive: false })
    track.addEventListener('focusin', onFocus)
    document.fonts?.ready.then(measure)
    measure()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', schedule)
      stage.removeEventListener('wheel', onWheel)
      track.removeEventListener('focusin', onFocus)
      track.style.transform = ''
      track.querySelectorAll<HTMLElement>('[data-slide]').forEach((el) => {
        el.style.opacity = ''
        el.style.transform = ''
        const img = el.querySelector<HTMLElement>('[data-parallax]')
        if (img) img.style.transform = ''
      })
      setHeight(null)
    }
  }, [pinned])

  /* ---------- Native strip (touch / small / reduced motion) ---------- */
  const onNativeScroll = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    const p = max > 0 ? el.scrollLeft / max : 0
    if (barRef.current) barRef.current.style.transform = `scaleX(${p})`
    const cards = Array.from(el.querySelectorAll<HTMLElement>('[data-slide="card"]'))
    const edge = el.scrollLeft + el.clientWidth * 0.5
    setActive(Math.max(0, cards.filter((c) => c.offsetLeft < edge).length - 1))
  }, [])

  useEffect(() => {
    if (!pinned) onNativeScroll()
  }, [pinned, filtered, onNativeScroll])

  return (
    <section
      id="projects"
      // The entrance observer needs a node whose className React never rewrites; the inner div swaps
      // classes when `pinned` flips, which would drop `animate-visible` and hide the heading.
      ref={(el) => {
        ;(sectionRef as React.MutableRefObject<HTMLElement | null>).current = el
        ;(animRef as React.MutableRefObject<HTMLElement | null>).current = el
      }}
      className="relative" style={pinned && height ? { height } : undefined}>
      <div
        className={pinned ? 'sticky top-0 flex h-[100svh] flex-col overflow-clip' : 'relative overflow-hidden py-24 md:py-32'}
      >
        <SpaceBackdrop variant="projects" />

        {!pinned && (
          <div className="container relative z-10 text-center">
            <Heading centered />
            <div className="mt-10 animate-fade-in-up delay-300">
              <FilterTabs active={activeFilter} onPick={handleFilter} />
            </div>
          </div>
        )}

        <div ref={stageRef} className={`relative z-10 ${pinned ? 'flex min-h-0 flex-1 items-center pb-20 pt-[88px]' : 'mt-10'}`}>
          <div
            ref={scrollerRef}
            onScroll={pinned ? undefined : onNativeScroll}
            className={pinned ? 'w-full' : 'no-scrollbar w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain'}
            style={pinned ? undefined : { scrollPaddingInline: GUTTER }}
            tabIndex={pinned ? undefined : 0}
            role={pinned ? undefined : 'region'}
            aria-label={pinned ? undefined : 'Projects, swipe sideways'}
          >
            <div
              ref={trackRef}
              className="flex w-max items-stretch gap-5 lg:gap-7"
              style={{ paddingInline: GUTTER, willChange: pinned ? 'transform' : undefined }}
            >
              {pinned && (
                <div data-slide="intro" className="flex w-[min(40vw,520px)] shrink-0 flex-col justify-center pr-6">
                  <Heading />
                  <p className="mt-10 inline-flex items-center gap-3 text-sm text-gray-400 animate-fade-in delay-400">
                    Keep scrolling <MoveRight className="h-4 w-4 animate-nudge text-primary-300" />
                  </p>
                  <p className="mt-16 rotate-[-6deg] font-hand text-[28px] leading-[1.05] text-primary-100/70" aria-hidden>
                    Ideas
                    <br />
                    &nbsp;&nbsp;Code
                    <br />
                    Impact
                  </p>
                </div>
              )}

              {filtered.map((project) => (
                <div key={project.id} data-slide="card" className="flex shrink-0 snap-start">
                  <ProjectCard project={project} />
                </div>
              ))}

              <div data-slide="outro" className="flex w-[min(84vw,400px)] shrink-0 snap-start flex-col justify-center rounded-card-sm border border-dashed border-pink-300/30 p-8 md:rounded-card lg:w-[380px]">
                <p className="font-hand text-[34px] leading-[1.05] text-pink-100/90">
                  Your project
                  <br />
                  could be next…
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-gray-400">
                  Have a product that needs building, or a codebase that needs a steady pair of hands?
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#contact" className="btn-primary">
                    Let&apos;s talk <ArrowRight className="h-4 w-4" />
                  </a>
                  <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                    <GithubIcon className="h-4 w-4" /> GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {pinned ? (
          <div className="absolute inset-x-0 bottom-0 z-10 pb-7">
            <div className="container flex items-center justify-between gap-6">
              <FilterTabs active={activeFilter} onPick={handleFilter} compact />
              <Progress active={active} total={filtered.length} barRef={barRef} />
            </div>
          </div>
        ) : (
          <div className="container relative z-10 mt-8 flex justify-center">
            <Progress active={active} total={filtered.length} barRef={barRef} />
          </div>
        )}
      </div>
    </section>
  )
}
