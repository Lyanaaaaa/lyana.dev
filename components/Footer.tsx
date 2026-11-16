'use client'

import Image from 'next/image'
import { Activity, ArrowRight, ArrowUp, ArrowUpRight, Heart, Mail, Sparkle } from 'lucide-react'
import SpaceBackdrop from './space/SpaceBackdrop'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { navLinks, profile } from '@/data/profile'

const otherPlaces = [
  { name: 'GitHub', href: profile.socials.github },
  { name: 'LinkedIn', href: profile.socials.linkedin },
  { name: 'Instagram', href: profile.socials.instagram },
]

const LINK_CLASS =
  'group flex items-center justify-center gap-3 text-[15px] text-gray-300 transition-colors hover:text-white sm:justify-between'

function LinkArrow() {
  return <ArrowUpRight className="h-3.5 w-3.5 text-primary-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
}

export default function Footer() {
  const ref = useScrollAnimation()
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const goTop = (e: React.MouseEvent) => {
    e.preventDefault()
    toTop()
  }

  return (
    <footer ref={ref} className="relative overflow-hidden pb-6 pt-28">
      <SpaceBackdrop variant="footer" />

      <div className="container relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full border border-white/20 bg-ink/60 px-5 py-2 font-mono text-[11px] uppercase tracking-[0.35em] text-gray-300 animate-fade-in-down">
            {'// End of the journey'}
          </span>
          <h2 className="mt-7 font-extrabold animate-fade-in-up delay-100" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', letterSpacing: '-0.035em' }}>
            Thanks for <span className="text-gradient">Visiting!</span>
          </h2>
          <p className="lead mt-4 animate-fade-in-up delay-200">
            Let&apos;s build something useful together. Stay curious, keep shipping, and I&apos;ll see you around the internet!
          </p>
        </div>

        <div className="relative mx-auto my-14 flex max-w-xl items-center gap-4">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/20" />
          <Sparkle className="h-4 w-4 fill-primary-300 text-primary-300" />
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/20" />
        </div>

        <div className="grid gap-10 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-[1.3fr_1fr_1fr_1.2fr] lg:gap-0">
          <div className="lg:pr-10">
            <div className="flex items-center justify-center gap-3 sm:justify-start">
              <span className="h-11 w-11 overflow-hidden rounded-full ring-2 ring-primary-400/50">
                <Image src={profile.avatar} alt="" width={44} height={44} className="h-full w-full object-cover" />
              </span>
              <span className="font-display text-2xl font-bold text-white">{profile.firstName}</span>
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-gray-400">Building software that runs real businesses, with clean code and calm releases.</p>
          </div>

          <div className="lg:border-l lg:border-white/10 lg:px-10">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a href={l.href} onClick={l.id === 'top' ? goTop : undefined} className={LINK_CLASS}>
                    {l.name}
                    <LinkArrow />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:border-l lg:border-white/10 lg:px-10">
            <h3 className="text-lg font-semibold">Other Places</h3>
            <ul className="mt-5 space-y-3">
              {otherPlaces.map((l) => (
                <li key={l.name}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
                    {l.name}
                    <LinkArrow />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:border-l lg:border-white/10 lg:pl-10">
            <h3 className="text-lg font-semibold">Let&apos;s Connect</h3>
            <p className="mt-4 text-[15px] leading-relaxed text-gray-400">Open to project work, contract roles and interesting problems.</p>
            <a href="#contact" className="btn-blue mt-6 !py-3">
              <Mail className="h-4 w-4" /> Send a Message <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 rounded-card-inner border border-white/10 bg-ink/60 px-5 py-4 text-[13px] text-gray-400 backdrop-blur md:flex-row">
          <p>
            © {new Date().getFullYear()} {profile.fullName}. All rights reserved.
          </p>
          <p className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.35em] text-gray-300">
            <Activity className="h-3.5 w-3.5 text-primary-300" /> Build <span className="text-primary-300/60">×</span> Test <span className="text-primary-300/60">×</span> Ship
          </p>
          <p className="inline-flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5">
              Made with <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" /> in {profile.location}
            </span>
            <span className="h-3 w-px bg-white/20" />
            <button onClick={toTop} className="inline-flex items-center gap-1 transition-colors hover:text-white">
              Back to top <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </p>
        </div>
      </div>
    </footer>
  )
}
