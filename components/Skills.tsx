'use client'

import { memo, useCallback, useMemo, useState } from 'react'
import Image from 'next/image'
import { ArrowRight, Bot, Code2, CreditCard, Database, FlaskConical, Layout, Rocket, Server, Smartphone, Terminal } from 'lucide-react'
import SpaceBackdrop from './space/SpaceBackdrop'
import SectionLabel from './ui/SectionLabel'
import { levelWidth, skillCategories, skills, coreStack, stackInProduction, type SkillCategory, type SkillItem } from '@/data/skills'
import { statusDot, statusLabel } from '@/data/experience'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { useStaggerAnimation } from '@/hooks/useStaggerAnimation'

type Filter = SkillCategory | 'All'

const FILTERS: Filter[] = ['All', ...skillCategories]

const PREVIEW_COUNT = 8

const fallbackIcon: Record<SkillCategory, typeof Code2> = {
  Languages: Code2,
  Frontend: Layout,
  Backend: Server,
  Databases: Database,
  Testing: FlaskConical,
  DevOps: Terminal,
  Payments: CreditCard,
  Mobile: Smartphone,
  'AI & Analytics': Bot,
}

const iconUrl = (slug: string, color?: string) => `https://cdn.simpleicons.org/${slug}${color ? `/${color}` : ''}`

const SkillCard = memo(function SkillCard({ skill, index }: { skill: SkillItem; index: number }) {
  const Fallback = fallbackIcon[skill.category]
  return (
    <div data-stagger={index} className="glass-card glass-card-hover !rounded-card-inner p-4 animate-stagger-in">
      <span className="inline-flex h-[22px] items-center">
        {skill.icon ? (
          <Image src={iconUrl(skill.icon, skill.color)} alt="" width={22} height={22} className="h-[22px] w-[22px]" />
        ) : (
          <Fallback className="h-5 w-5 text-primary-300" />
        )}
      </span>
      <div className="mt-4 flex items-baseline justify-between gap-2">
        <p className="min-w-0 text-[15px] font-semibold leading-tight text-white">{skill.name}</p>
        <p className="shrink-0 font-mono text-[11px] text-gray-400">{skill.level}</p>
      </div>
      <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-300" style={{ width: `${levelWidth[skill.level]}%` }} />
      </div>
      <p className="mt-3 text-xs text-gray-500">{skill.category}</p>
    </div>
  )
})

const skillByName = new Map(skills.map((s) => [s.name, s]))

/**
 * Orbit with a job: the planet names a product, the logos circling it are that product's real stack, and the
 * chips underneath switch product (and filter the grid). Before a pick it shows the daily core stack.
 */
function StackOrbit({ focus, onPick }: { focus: string | null; onPick: (project: string | null) => void }) {
  const product = stackInProduction.find((p) => p.project === focus)
  const names = product ? product.skills : coreStack
  const items = names.map((n) => skillByName.get(n)).filter((s): s is SkillItem => !!s)
  const radius = items.length > 7 ? 45 : 44

  return (
    <div>
      <div className="relative mx-auto my-6 aspect-square w-[78%] max-w-[440px] sm:w-full lg:my-4" aria-hidden>
        <div className="absolute inset-[6%] rounded-full border border-primary-300/15" />
        <div className="absolute inset-[16%] rounded-full border border-primary-300/[0.07]" />

        {/* planet: names what the orbit is showing */}
        <div
          className="absolute inset-[25%] flex items-center justify-center rounded-full"
          style={{
            background: 'radial-gradient(circle at 32% 28%, #f0abfc 0%, #c026d3 22%, #6b21a8 48%, #1e0b33 80%)',
            boxShadow: 'inset -30px -24px 70px rgba(5,1,15,0.8), inset 10px 10px 40px rgba(251,207,232,0.3)',
          }}
        >
          <div key={focus ?? 'core'} className="animate-fade-in-up px-6 text-center">
            <p className="font-display text-[22px] font-bold leading-tight text-white md:text-[26px]">{product ? product.short : 'Core stack'}</p>
            <p className="mt-2 inline-flex items-center gap-2 text-[13px] text-primary-100/90">
              {product && <span className={`h-1.5 w-1.5 rounded-full ${statusDot[product.status]}`} />}
              {product ? statusLabel[product.status] : 'Used daily'}
            </p>
            <p className="mt-0.5 text-[13px] text-primary-100/70">{items.length} tools</p>
          </div>
        </div>

        {/* orbiting logos: re-keyed so a new product's stack pops in */}
        <div key={focus ?? 'core'} className="absolute inset-0 animate-orbit">
          {items.map((s, i) => {
            const angle = (i / items.length) * Math.PI * 2 - Math.PI / 2
            const left = 50 + Math.cos(angle) * radius
            const top = 50 + Math.sin(angle) * radius
            const Fallback = fallbackIcon[s.category]
            return (
              <div key={`${focus}-${s.name}`} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${left}%`, top: `${top}%` }}>
                <div className="flex flex-col items-center gap-1.5 animate-orbit-counter">
                  <span className="flex animate-scale-in flex-col items-center gap-1.5" style={{ animationDelay: `${i * 50}ms` }}>
                    {s.icon ? (
                      <Image src={iconUrl(s.icon, s.color)} alt="" width={36} height={36} className="h-7 w-7 md:h-9 md:w-9" />
                    ) : (
                      <Fallback className="h-7 w-7 text-primary-300 md:h-9 md:w-9" />
                    )}
                    <span className="whitespace-nowrap text-[11px] text-gray-300 md:text-xs">{s.name}</span>
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {product ? `${product.project}, ${statusLabel[product.status]}: ${product.skills.join(', ')}` : `Core stack: ${coreStack.join(', ')}`}
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-2" role="group" aria-label="Show the stack of a product">
        <button type="button" onClick={() => onPick(null)} aria-pressed={!product} className={`chip ${!product ? 'chip-active' : ''}`}>
          Core
        </button>
        {stackInProduction.map((p) => (
          <button
            key={p.project}
            type="button"
            onClick={() => onPick(p.project)}
            aria-pressed={focus === p.project}
            title={`${p.project} · ${statusLabel[p.status]}`}
            className={`chip inline-flex items-center gap-2 ${focus === p.project ? 'chip-active' : ''}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${statusDot[p.status]}`} aria-hidden />
            {p.short}
          </button>
        ))}
      </div>
      <p className="mt-3 text-center text-[13px] text-gray-400">Tap a product to see what it&apos;s built with.</p>
    </div>
  )
}

const live = stackInProduction.filter((p) => p.status === 'live').length

const stats = [
  { icon: Code2, value: `${skills.length}`, label: 'Technologies' },
  { icon: Rocket, value: `${live}`, label: 'Live products' },
  { icon: Smartphone, value: 'Web + Mobile', label: 'Platforms' },
  { icon: Bot, value: 'AI agents', label: 'In my daily workflow' },
]

export default function Skills() {
  const [filter, setFilter] = useState<Filter>('All')
  const [showAll, setShowAll] = useState(false)
  const [focus, setFocus] = useState<string | null>(null)
  const ref = useScrollAnimation()
  const gridKey = `${filter}-${showAll}-${focus}`
  const gridRef = useStaggerAnimation(70, gridKey)

  const focused = stackInProduction.find((p) => p.project === focus)
  const matching = useMemo(() => {
    if (focused) return skills.filter((s) => focused.skills.includes(s.name))
    return filter === 'All' ? skills : skills.filter((s) => s.category === filter)
  }, [filter, focused])
  const visible = !focused && filter === 'All' && !showAll ? matching.slice(0, PREVIEW_COUNT) : matching

  const handleFilter = useCallback(
    (f: Filter) => () => {
      setFilter(f)
      setShowAll(false)
      setFocus(null)
    },
    []
  )

  // The orbit itself is the feedback, so no scroll jump on phones
  const handlePick = useCallback((project: string | null) => {
    setFocus(project)
    setFilter('All')
  }, [])

  return (
    <section id="skills" ref={ref} className="section">
      <SpaceBackdrop variant="skills" />

      <div className="container relative z-10">
        {/* Phones: heading → product list → grid. Desktop: list on the left spanning both rows. */}
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.4fr] lg:gap-x-14 lg:gap-y-8">
          <header className="lg:col-start-2 lg:row-start-1">
            <SectionLabel index="04" className="text-center animate-fade-in-down md:text-left">
              Skills
            </SectionLabel>
            <h2 className="heading-xl mt-6 text-center animate-fade-in-up delay-100 md:text-left">
              Skills that ship <span className="text-gradient">real products.</span>
            </h2>
            <p className="lead mt-5 text-center animate-fade-in-up delay-200 md:text-left">
              The stack I reach for to turn a business problem into working software.
            </p>
          </header>

          <aside className="animate-fade-in-up delay-200 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:self-start">
            <StackOrbit focus={focus} onPick={handlePick} />
          </aside>

          <div className="lg:col-start-2 lg:row-start-2">
            <div className="flex flex-wrap justify-center gap-2 animate-fade-in-up delay-300 md:justify-start">
              {FILTERS.map((c) => (
                <button key={c} onClick={handleFilter(c)} className={`chip ${!focused && filter === c ? 'chip-active' : ''}`}>
                  {c}
                </button>
              ))}
            </div>

            <p className="mt-5 text-center text-[13px] text-gray-400 md:text-left" aria-live="polite">
              {focused ? (
                <>
                  Used in <span className="font-medium text-gray-200">{focused.project}</span> ({visible.length}) —{' '}
                  <button onClick={() => setFocus(null)} className="text-primary-300 underline-offset-4 hover:underline">
                    show all skills
                  </button>
                </>
              ) : (
                <>
                  Showing {visible.length} of {matching.length}
                  {filter === 'All' && !showAll && (
                    <>
                      {' '}
                      —{' '}
                      <button onClick={() => setShowAll(true)} className="text-primary-300 underline-offset-4 hover:underline">
                        show everything
                      </button>
                    </>
                  )}
                </>
              )}
            </p>

            <div ref={gridRef} key={gridKey} className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
              {visible.map((s, i) => (
                <SkillCard key={s.name} skill={s} index={i} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-[1fr_280px]">
          <div className="glass-card grid grid-cols-2 gap-y-6 px-5 py-6 animate-fade-in-up delay-200 md:grid-cols-4 md:px-8">
            {stats.map((s, i) => (
              <div key={s.label} className={`flex items-center gap-4 ${i > 0 ? 'md:border-l md:border-white/10 md:pl-6' : ''}`}>
                <s.icon className="h-5 w-5 shrink-0 text-primary-300" aria-hidden />
                <div>
                  <p className="font-display text-xl font-bold text-white">{s.value}</p>
                  <p className="text-xs text-gray-400">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
          <a
            href="#contact"
            className="group flex items-center justify-between rounded-card-sm border border-primary-400/40 px-6 py-5 transition-all duration-300 animate-fade-in-up delay-300 hover:border-primary-300 md:rounded-card"
            style={{ background: 'linear-gradient(135deg, rgba(91,33,182,0.55), rgba(30,16,80,0.6))', boxShadow: '0 0 40px -12px rgba(139,92,246,0.8)' }}
          >
            <span className="font-hand text-[28px] leading-[1.05] text-primary-100">
              Better
              <br />
              Projects
              <br />
              Ahead…
            </span>
            <span className="circle-btn group-hover:bg-primary-500/30">
              <ArrowRight className="h-4 w-4" />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
