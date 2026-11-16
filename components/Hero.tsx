'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowRight, Download, MapPin } from 'lucide-react'
import SpaceBackdrop from './space/SpaceBackdrop'
import { GithubIcon, LinkedinIcon } from './ui/BrandIcons'
import { profile } from '@/data/profile'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const GREETING = "HELLO, I'M"

const socialLinks = [
  { name: 'GitHub', href: profile.socials.github, Icon: GithubIcon },
  { name: 'LinkedIn', href: profile.socials.linkedin, Icon: LinkedinIcon },
]

const clockFormat = new Intl.DateTimeFormat('en-GB', {
  timeZone: profile.timeZone,
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: true,
})

function useTyped(text: string, speed = 90, startDelay = 300) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (count >= text.length) return
    const id = setTimeout(() => setCount((c) => c + 1), count === 0 ? startDelay : speed)
    return () => clearTimeout(id)
  }, [count, text, speed, startDelay])
  return text.slice(0, count)
}

function LocalClock() {
  const [now, setNow] = useState<string | null>(null)
  useEffect(() => {
    const tick = () => setNow(clockFormat.format(new Date()).toLowerCase())
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return (
    <span className="rounded-full border border-white/15 bg-ink-900/60 px-3 py-1 font-mono text-xs text-gray-300 tabular-nums">
      {profile.timeZoneLabel} {now ?? '--:--:-- --'}
    </span>
  )
}

/**
 * Portrait / looping video of Lyana, tinted into the night-violet scene. Silent, no on-screen controls:
 * visitors who ask for reduced motion get the still poster instead of the loop.
 */
function HeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const playing = !useMediaQuery('(prefers-reduced-motion: reduce)')

  // No autoPlay attribute: playback starts here, after the real reduced-motion preference is known,
  // so reduced-motion visitors never get a burst of video before the hook resolves.
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => (mq.matches ? v.pause() : void v.play().catch(() => {}))
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  return (
    <div className="hero-media-mask absolute inset-0">
      <div className={`absolute inset-0 ${profile.heroVideo ? '' : 'animate-ken-burns'}`} style={{ animationPlayState: playing ? 'running' : 'paused' }}>
        {profile.heroVideo ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover object-[30%_center]"
            aria-hidden
            src={profile.heroVideo}
            poster={profile.heroPoster}
            muted
            loop
            playsInline
            preload="auto"
          />
        ) : (
          <Image
            src={profile.heroPoster}
            alt={`${profile.fullName}, portrait`}
            fill
            priority
            sizes="(min-width: 1024px) 62vw, 100vw"
            className="object-cover object-[center_28%]"
            style={{ filter: 'brightness(0.62) contrast(1.08) saturate(0.75)' }}
          />
        )}
      </div>
      {/* night-violet grade: heavy for a daylight photo, light touch for the already-graded video */}
      {profile.heroVideo ? (
        <>
          <div className="absolute inset-0 bg-ink/15" />
          {/* cotton-candy hue shift: nudges the video's teal/blue toward pink + lilac */}
          <div
            className="absolute inset-0 mix-blend-color opacity-40"
            style={{ background: 'linear-gradient(150deg, #f472b6 0%, #c084fc 50%, #93c5fd 100%)' }}
          />
          <div
            className="absolute inset-0 mix-blend-screen opacity-30"
            style={{ background: 'radial-gradient(45% 40% at 25% 15%, rgba(249,168,212,0.5), transparent 70%)' }}
          />
        </>
      ) : (
        <>
          <div className="absolute inset-0 mix-blend-multiply" style={{ background: 'linear-gradient(160deg, #6d4bd8 0%, #3b1c8c 45%, #120a2e 100%)' }} />
          <div className="absolute inset-0 mix-blend-screen opacity-40" style={{ background: 'radial-gradient(50% 45% at 70% 25%, rgba(167,139,250,0.35), transparent 70%)' }} />
        </>
      )}
    </div>
  )
}

export default function Hero() {
  const typed = useTyped(GREETING)

  return (
    <section id="top" className="relative flex min-h-[100svh] items-end overflow-hidden pb-16 pt-[46svh] lg:items-center lg:pb-24 lg:pt-28">
      <SpaceBackdrop variant="hero" />

      {/* Media: top band on mobile, right 62% on desktop */}
      <div className="absolute inset-x-0 top-0 h-[64svh] lg:inset-y-0 lg:left-auto lg:h-auto lg:w-[62%]">
        <HeroMedia />
      </div>

      {/* Floating notes (desktop) */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
        <div className="glass-card absolute left-[45%] top-[13%] -rotate-6 px-6 py-5 animate-hand" style={{ ['--r' as string]: '-6deg' }}>
          <p className="font-hand text-[28px] leading-tight text-primary-100/90">
            &ldquo;If it isn&apos;t measured,
            <br />
            it isn&apos;t fixed.&rdquo;
          </p>
          <p className="mt-1 text-right font-hand text-lg uppercase tracking-widest text-primary-200/60">— Lyana</p>
        </div>

        <p
          className="absolute right-[6%] top-[11%] font-hand text-[30px] leading-[1.05] text-primary-100/70 animate-hand"
          style={{ ['--r' as string]: '-12deg', animationDelay: '-2s' }}
        >
          Clean code
          <br />
          Calm releases
          <br />
          Happy users
          <span className="mt-1 block h-px w-24 bg-primary-200/50" />
        </p>

        <div className="glass-card absolute right-[8%] top-[46%] w-[250px] !rounded-card-inner px-5 py-4 animate-float" style={{ animationDelay: '-3s' }}>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary-300/80">{'// Mindset'}</p>
          <p className="mt-2 text-[15px] text-gray-200">Build · Test · Ship · Measure</p>
        </div>

        <p
          className="absolute bottom-[22%] left-[52%] font-hand text-[26px] leading-[1.05] text-primary-100/60 animate-hand"
          style={{ ['--r' as string]: '-10deg', animationDelay: '-4s' }}
        >
          Fueled by
          <br />
          mochi &amp; curiosity
        </p>
      </div>

      <div className="container relative z-10 animate-on-load">
        <div className="max-w-[640px] text-center md:text-left">
          <p className="eyebrow mb-5 h-5 animate-fade-in delay-100">
            {'// '}
            {typed}
            <span className="ml-1 inline-block h-4 w-[2px] translate-y-0.5 bg-primary-200 animate-blink" />
          </p>

          <h1
            className="text-gradient-name animate-fade-in-up delay-200 font-extrabold"
            style={{ fontSize: 'clamp(4.25rem, 11vw, 7.25rem)', lineHeight: 0.95, letterSpacing: '-0.05em', paddingBottom: '0.08em' }}
          >
            {profile.firstName}
          </h1>

          <h2
            className="mt-4 font-bold text-white animate-fade-in-up delay-300"
            style={{ fontSize: 'clamp(1.85rem, 4vw, 2.85rem)', lineHeight: 1.1, letterSpacing: '-0.03em' }}
          >
            I ship products,
            <br />
            and prove they <span className="text-gradient">work.</span>
          </h2>

          <p className="lead mx-auto mt-7 max-w-[560px] animate-fade-in-up delay-400 md:mx-0">
            Full-stack engineer on web and mobile. I co-built Dourr, a live rental marketplace, built the Autorentic tenant app in
            Flutter, and run AI agents that audit our own product and check every finding before we act on it.
          </p>

          <div className="mt-9 flex flex-col items-center gap-4 animate-fade-in-up delay-500 sm:flex-row md:items-start">
            <a href="#projects" className="btn-primary group w-full sm:w-auto">
              View My Work <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="btn-ghost w-full sm:w-auto">
              <Download className="h-4 w-4" /> Download Resume
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 animate-fade-in-up delay-600 md:justify-start">
            {/* Named links, not icon tiles: a label reads as a decision, a boxed glyph reads as a template */}
            {socialLinks.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 text-[15px] font-medium text-gray-200 transition-colors hover:text-white"
              >
                <Icon className="h-[18px] w-[18px]" /> {name}
              </a>
            ))}
            <span className="inline-flex items-center gap-2 text-[13px] text-gray-300">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 animate-ping-soft" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              Open to opportunities
            </span>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-[13px] text-gray-400 animate-fade-in delay-700 md:justify-start">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary-300" /> Currently in {profile.location}
            </span>
            <LocalClock />
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a href="#about" className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-gray-400 md:flex" aria-label="Scroll to about">
        <span className="flex h-10 w-6 justify-center rounded-full border border-white/30 pt-2">
          <span className="h-2 w-1 rounded-full bg-white/70 animate-scroll-dot" />
        </span>
        Scroll to explore
        <span className="h-6 w-px bg-gradient-to-b from-white/40 to-transparent" />
      </a>
    </section>
  )
}
