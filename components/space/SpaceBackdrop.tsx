'use client'

import { memo, useEffect, useRef } from 'react'
import Skyline from './Skyline'

export type BackdropVariant = 'hero' | 'about' | 'experience' | 'projects' | 'skills' | 'contact' | 'footer'

interface PlanetSpec {
  size: string
  style: React.CSSProperties
  ring?: boolean
  hue?: 'violet' | 'blue' | 'pink'
  /** Hide below lg where single-column text would run across it */
  desktopOnly?: boolean
}

interface VariantSpec {
  nebula: string
  planet?: PlanetSpec
  skyline?: boolean
  globe?: boolean
  density: number
}

// Cotton-candy galaxy: bubblegum pink + lavender clouds with a wisp of baby blue
const PINK = '244,114,182'
const SOFT_PINK = '249,168,212'
const LILAC = '200,160,255'
const PURPLE = '168,85,247'
const BABY_BLUE = '147,197,253'

// One knob for how loud the clouds are; pastel clouds need more alpha than deep ones
const INTENSITY = 1.6
const cloud = (w: number, h: number, x: number, y: number, rgb: string, a: number) =>
  `radial-gradient(${w}% ${h}% at ${x}% ${y}%, rgba(${rgb},${Math.min(1, a * INTENSITY).toFixed(2)}), transparent 70%)`

const SPECS: Record<BackdropVariant, VariantSpec> = {
  hero: {
    nebula: [
      cloud(30, 25, 45, 10, SOFT_PINK, 0.14),
      cloud(55, 45, 78, 22, PINK, 0.3),
      cloud(50, 45, 62, 40, PURPLE, 0.3),
      cloud(45, 45, 12, 85, LILAC, 0.22),
      cloud(35, 35, 95, 92, BABY_BLUE, 0.18),
    ].join(', '),
    globe: true,
    density: 5200,
  },
  about: {
    nebula: [
      cloud(50, 42, 75, 15, PINK, 0.32),
      cloud(45, 40, 60, 35, PURPLE, 0.3),
      cloud(40, 40, 8, 55, LILAC, 0.2),
      cloud(30, 30, 30, 90, SOFT_PINK, 0.12),
    ].join(', '),
    planet: { size: 'clamp(320px, 42vw, 620px)', style: { top: '-8%', right: '-6%' }, ring: true, hue: 'pink' },
    skyline: true,
    density: 6000,
  },
  experience: {
    nebula: [
      cloud(50, 40, 15, 20, PINK, 0.24),
      cloud(45, 40, 90, 75, LILAC, 0.24),
      cloud(35, 30, 60, 45, BABY_BLUE, 0.1),
    ].join(', '),
    // Right-hand gutter beside the role summaries (which stop at 68ch), clear of every line of text
    planet: { size: 'clamp(160px, 18vw, 260px)', style: { top: '58%', right: '-5%' }, hue: 'blue', desktopOnly: true },
    density: 6500,
  },
  projects: {
    nebula: [
      cloud(30, 25, 70, 30, SOFT_PINK, 0.12),
      cloud(60, 40, 50, 0, PURPLE, 0.3),
      cloud(45, 35, 30, 5, PINK, 0.22),
      cloud(50, 45, 85, 85, BABY_BLUE, 0.16),
      cloud(40, 35, 10, 70, SOFT_PINK, 0.16),
    ].join(', '),
    density: 5000,
  },
  skills: {
    nebula: [
      cloud(30, 30, 10, 15, SOFT_PINK, 0.14),
      cloud(45, 45, 22, 40, PINK, 0.3),
      cloud(40, 40, 35, 55, PURPLE, 0.26),
      cloud(45, 40, 85, 90, BABY_BLUE, 0.18),
    ].join(', '),
    planet: { size: 'clamp(140px, 16vw, 240px)', style: { bottom: '-5%', right: '18%' }, hue: 'blue' },
    density: 5600,
  },
  contact: {
    nebula: [
      cloud(55, 45, 40, 15, PINK, 0.3),
      cloud(45, 40, 55, 30, PURPLE, 0.26),
      cloud(40, 40, 90, 40, LILAC, 0.22),
      cloud(30, 30, 10, 80, BABY_BLUE, 0.12),
    ].join(', '),
    planet: { size: 'clamp(240px, 30vw, 460px)', style: { top: '2%', left: '30%' }, ring: true, hue: 'pink' },
    skyline: true,
    density: 6000,
  },
  footer: {
    nebula: [
      cloud(35, 30, 15, 20, SOFT_PINK, 0.14),
      cloud(55, 50, 50, 40, PURPLE, 0.26),
      cloud(45, 40, 40, 30, PINK, 0.24),
      cloud(35, 35, 92, 25, BABY_BLUE, 0.18),
    ].join(', '),
    planet: { size: 'clamp(140px, 14vw, 220px)', style: { top: '10%', right: '6%' } },
    skyline: true,
    density: 7000,
  },
}

// Fade every backdrop in/out at the section edges so stacked sections blend without seams
const EDGE_FADE = 'linear-gradient(to bottom, transparent 0%, black 9%, black 94%, transparent 100%)'

// Back half of the ring sits behind the planet, so dim it
const RING_MASK = 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 50%, black 50%)'

const PLANET_HUES = {
  // core highlight, mid tone, outer glow
  violet: ['#e9a8ff', '#7e22ce', 'rgba(192,132,252,0.55)'],
  pink: ['#fbcfe8', '#db2777', 'rgba(244,114,182,0.55)'],
  blue: ['#c7d2fe', '#6d5bd0', 'rgba(125,170,255,0.5)'],
} as const

function Planet({ size, style, ring, hue = 'violet', desktopOnly }: PlanetSpec) {
  const [core, mid, glow] = PLANET_HUES[hue]
  return (
    <div className={`pointer-events-none absolute animate-float ${desktopOnly ? 'hidden lg:block' : ''}`} style={{ width: size, height: size, ...style, animationDuration: '14s' }}>
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at 32% 28%, ${core} 0%, ${mid} 30%, #2a0b3d 62%, #05010f 100%)`,
          boxShadow: `inset -40px -30px 90px rgba(5,1,15,0.85), inset 12px 10px 40px rgba(251,207,232,0.25), 0 0 100px -10px ${glow}`,
          opacity: 0.85,
        }}
      />
      {ring && (
        <div
          className="absolute left-1/2 top-1/2 rounded-[50%]"
          style={{
            width: '165%',
            height: '34%',
            transform: 'translate(-50%, -50%) rotate(-18deg)',
            border: '1px solid rgba(249,168,212,0.45)',
            boxShadow: '0 0 30px rgba(236,72,153,0.3)',
            maskImage: RING_MASK,
            WebkitMaskImage: RING_MASK,
          }}
        />
      )}
    </div>
  )
}

interface Star {
  x: number
  y: number
  r: number
  a: number
  phase: number
  speed: number
  vx: number
  vy: number
  tint: string
}

interface GlobeNode {
  lat: number
  lon: number
}

/** Mostly white stars with a sprinkle of pink, lilac and blue */
function starTint(roll: number): string {
  if (roll < 0.2) return '249,168,212'
  if (roll < 0.35) return '216,180,254'
  if (roll < 0.42) return '191,219,254'
  return '255,255,255'
}

function buildGlobe(): { nodes: GlobeNode[]; edges: [number, number][] } {
  const nodes: GlobeNode[] = []
  // Fibonacci sphere → even spread
  const n = 90
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2
    const lat = Math.asin(y)
    const lon = i * 2.399963
    nodes.push({ lat, lon })
  }
  const pos = nodes.map(({ lat, lon }) => [Math.cos(lat) * Math.cos(lon), Math.sin(lat), Math.cos(lat) * Math.sin(lon)])
  const edges: [number, number][] = []
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const d = Math.hypot(pos[i][0] - pos[j][0], pos[i][1] - pos[j][1], pos[i][2] - pos[j][2])
      if (d < 0.42) edges.push([i, j])
    }
  }
  return { nodes, edges }
}

function SpaceBackdrop({ variant, className = '' }: { variant: BackdropVariant; className?: string }) {
  const spec = SPECS[variant]
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let stars: Star[] = []
    let raf = 0
    let visible = false
    let t = 0
    const globe = spec.globe ? buildGlobe() : null

    const seed = () => {
      const count = Math.min(260, Math.floor((w * h) / spec.density))
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() ** 2.2 * 1.5 + 0.25,
        a: 0.25 + Math.random() * 0.75,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 1.6,
        vx: -Math.random() * 0.05,
        vy: -Math.random() * 0.035,
        tint: starTint(Math.random()),
      }))
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width
      h = rect.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
      if (reduce || !visible) draw()
    }

    const drawGlobe = () => {
      if (!globe) return
      const R = Math.max(w * 0.42, 340)
      const cx = w > 768 ? w * 0.86 : w * 0.7
      const cy = h + R * 0.42
      const rot = t * 0.00006

      // atmosphere glow
      const g = ctx.createRadialGradient(cx, cy, R * 0.85, cx, cy, R * 1.12)
      g.addColorStop(0, 'rgba(236,72,153,0.0)')
      g.addColorStop(0.55, 'rgba(236,72,153,0.16)')
      g.addColorStop(1, 'rgba(192,132,252,0)')
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(cx, cy, R * 1.12, 0, Math.PI * 2)
      ctx.fill()

      const proj = globe.nodes.map(({ lat, lon }) => {
        const l = lon + rot
        const x3 = Math.cos(lat) * Math.cos(l)
        const y3 = Math.sin(lat)
        const z3 = Math.cos(lat) * Math.sin(l)
        // tilt toward viewer
        const tilt = 0.45
        const y = y3 * Math.cos(tilt) - z3 * Math.sin(tilt)
        const z = y3 * Math.sin(tilt) + z3 * Math.cos(tilt)
        return { x: cx + x3 * R, y: cy - y * R, z }
      })

      ctx.lineWidth = 1.1
      for (const [i, j] of globe.edges) {
        const a = proj[i]
        const b = proj[j]
        if (a.z < 0 || b.z < 0) continue
        const alpha = 0.12 + Math.min(a.z, b.z) * 0.7
        ctx.strokeStyle = `rgba(244,164,224,${alpha})`
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
      }
      for (let i = 0; i < proj.length; i++) {
        const p = proj[i]
        if (p.z < 0) continue
        const pulse = 0.6 + 0.4 * Math.sin(t * 0.002 + i)
        ctx.fillStyle = `rgba(252,231,243,${p.z * pulse})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.6 + p.z * 1.2, 0, Math.PI * 2)
        ctx.fill()
        if (i % 9 === 0) {
          ctx.fillStyle = `rgba(236,72,153,${p.z * 0.3 * pulse})`
          ctx.beginPath()
          ctx.arc(p.x, p.y, 7, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const s of stars) {
        const tw = 0.55 + 0.45 * Math.sin(t * 0.001 * s.speed + s.phase)
        ctx.fillStyle = `rgba(${s.tint},${s.a * tw})`
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
        if (s.r > 1.35) {
          ctx.strokeStyle = `rgba(${s.tint},${0.25 * tw})`
          ctx.lineWidth = 0.6
          ctx.beginPath()
          ctx.moveTo(s.x - s.r * 4, s.y)
          ctx.lineTo(s.x + s.r * 4, s.y)
          ctx.moveTo(s.x, s.y - s.r * 4)
          ctx.lineTo(s.x, s.y + s.r * 4)
          ctx.stroke()
        }
      }
      drawGlobe()
    }

    const step = (now: number) => {
      t = now
      for (const s of stars) {
        s.x += s.vx
        s.y += s.vy
        if (s.x < -2) s.x = w + 2
        if (s.y < -2) s.y = h + 2
      }
      draw()
      raf = requestAnimationFrame(step)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        cancelAnimationFrame(raf)
        if (visible && !reduce) raf = requestAnimationFrame(step)
      },
      { rootMargin: '100px' }
    )

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    io.observe(canvas)
    resize()

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
    }
  }, [spec])

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} style={{ maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE }}>
      <div className="absolute -inset-[10%] animate-bg-drift" style={{ background: spec.nebula }} />
      {spec.planet && <Planet {...spec.planet} />}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {spec.skyline && <Skyline seed={variant.length * 97} />}
    </div>
  )
}

export default memo(SpaceBackdrop)
