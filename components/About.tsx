'use client'

import { BarChart3, Bot, Briefcase, CreditCard, FlaskConical, GraduationCap, Languages, Layers, MapPin, Rocket, Smartphone, Zap } from 'lucide-react'
import SpaceBackdrop from './space/SpaceBackdrop'
import SectionLabel from './ui/SectionLabel'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { useStaggerAnimation } from '@/hooks/useStaggerAnimation'
import { stackInProduction } from '@/data/skills'
import { profile } from '@/data/profile'

const facts = [
  { icon: GraduationCap, title: 'B.Eng Chemical Engineering', sub: 'Universiti Putra Malaysia' },
  { icon: MapPin, title: profile.location, sub: 'Based in · works remote' },
  { icon: Briefcase, title: 'Software Engineer', sub: 'Tech Strongbox · Apr 2025 – now' },
]

const enjoys = [
  { icon: Layers, label: 'Full-stack product work' },
  { icon: Smartphone, label: 'Mobile apps in Flutter' },
  { icon: Bot, label: 'AI agent workflows that verify themselves' },
  { icon: BarChart3, label: 'Product analytics & UX audits' },
  { icon: CreditCard, label: 'Billing & invoicing flows' },
  { icon: FlaskConical, label: 'Testing & calm releases' },
]

/** Same source as the Skills stat, so both sections always agree (Dourr, Autorentic, Workshop Manager). */
const inProduction = stackInProduction.filter((p) => p.status === 'live').length

const stats = [
  { icon: Rocket, value: `${inProduction}`, label: 'Products in production' },
  { icon: Zap, value: '6 days', label: 'Fastest client release' },
  { icon: Smartphone, value: 'Web + Mobile', label: 'Laravel · Next.js · Flutter' },
  { icon: Languages, value: 'EN · BM', label: 'Bilingual apps' },
]

export default function About() {
  const ref = useScrollAnimation()
  const listRef = useStaggerAnimation(90)

  return (
    <section id="about" ref={ref} className="section min-h-[100svh]">
      <SpaceBackdrop variant="about" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/40 to-transparent" />

      <div className="container relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div className="text-center md:text-left">
            <SectionLabel index="01" className="animate-fade-in-down">
              About me
            </SectionLabel>
            <h2 className="heading-xl mt-6 animate-fade-in-up delay-100">
              Measure first.
              <br />
              Then <span className="text-gradient">ship.</span>
            </h2>
            {/* Lead with the job; the degree is the reason for the rigour, not the headline */}
            <p className="lead mx-auto mt-7 max-w-[600px] animate-fade-in-up delay-200 md:mx-0">
              I&apos;m Lyana, a full-stack engineer at Tech Strongbox. I build rental and property software on web and mobile, from the
              database schema to the screen a tenant pays from.
            </p>
            <p className="lead mx-auto mt-4 max-w-[600px] animate-fade-in-up delay-300 md:mx-0">
              I trained as a chemical engineer, and two habits stayed. Mass balance: every ringgit entering a ledger must come out
              somewhere, which is how I approach invoices and payments. Control loops: change one thing, measure, adjust, which is why
              no UX fix of ours starts without a baseline.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {facts.map((f, i) => (
                <div
                  key={f.title}
                  className="glass-card glass-card-hover !rounded-card-inner p-4 text-left animate-fade-in-up"
                  style={{ animationDelay: `${300 + i * 100}ms` }}
                >
                  <p className="flex items-start gap-2 text-[15px] font-semibold text-white">
                    <f.icon className="mt-[3px] h-4 w-4 shrink-0 text-primary-300" aria-hidden />
                    {f.title}
                  </p>
                  <p className="mt-1.5 pl-6 text-xs leading-relaxed text-gray-400">{f.sub}</p>
                </div>
              ))}
            </div>

            <p className="mt-10 font-hand text-3xl text-gray-200 animate-fade-in delay-600 md:text-[34px]">
              &ldquo;Change one thing. Measure. Adjust.&rdquo;
            </p>
          </div>

          <div className="glass-card p-5 animate-fade-in-right delay-300 md:p-7">
            <h3 className="mb-3 text-xl font-bold">What you can hand me</h3>
            <div ref={listRef} className="flex flex-col">
              {enjoys.map((e, i) => (
                <div key={e.label} data-stagger={i} className="glass-row flex items-center gap-4 py-3 animate-stagger-in">
                  <e.icon className="h-5 w-5 shrink-0 text-primary-300" aria-hidden />
                  <span className="text-[15px] text-gray-100">{e.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-card mt-16 grid grid-cols-2 gap-y-6 px-5 py-6 animate-fade-in-up delay-500 md:grid-cols-4 md:px-8">
          {stats.map((s, i) => (
            <div key={s.label} className={`flex items-center gap-4 ${i > 0 ? 'md:border-l md:border-white/10 md:pl-8' : ''}`}>
              <s.icon className="h-5 w-5 shrink-0 text-primary-300" aria-hidden />
              <div>
                <p className="font-display text-xl font-bold text-white">{s.value}</p>
                <p className="text-xs text-gray-400">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
