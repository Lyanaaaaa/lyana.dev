import { memo } from 'react'

/** Deterministic PRNG so server and client render the same skyline */
function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const VIEW_W = 1600
const VIEW_H = 420
/** Buildings stand on the bottom edge; the container mask dissolves them, so there is no ground line or water band */
const GROUND = VIEW_H

interface Building {
  x: number
  w: number
  h: number
  spire: boolean
  windows: { x: number; y: number; c: string; o: number }[]
}

/** Warm pink most of the time, otherwise lilac or pale blue. Call order matters: the PRNG stream must stay stable. */
function windowColour(rand: () => number): string {
  if (rand() < 0.55) return '#f9a8d4'
  return rand() < 0.5 ? '#d8b4fe' : '#bfdbfe'
}

function buildCity(seed: number) {
  const rand = mulberry32(seed)
  const back: Building[] = []
  const front: Building[] = []

  const make = (layer: Building[], minH: number, maxH: number, minW: number, maxW: number, windowRate: number) => {
    let x = -20
    while (x < VIEW_W + 20) {
      const w = minW + rand() * (maxW - minW)
      // taller towers cluster toward the middle-right like a skyline
      const centerBoost = 1 - Math.abs(x / VIEW_W - 0.62) * 0.9
      const h = minH + rand() * (maxH - minH) * Math.max(0.35, centerBoost)
      const windows: Building['windows'] = []
      for (let wy = GROUND - h + 10; wy < GROUND - 8; wy += 9) {
        for (let wx = x + 4; wx < x + w - 4; wx += 7) {
          if (rand() < windowRate) {
            windows.push({ x: wx, y: wy, c: windowColour(rand), o: 0.35 + rand() * 0.6 })
          }
        }
      }
      layer.push({ x, w, h, spire: rand() < 0.12, windows })
      x += w + rand() * 6
    }
  }

  make(back, 60, 250, 24, 60, 0.05)
  make(front, 30, 150, 30, 80, 0.09)
  return { back, front }
}

/**
 * Soft in at the top (no hard edge where the city starts) and dissolving out at the bottom, so the city
 * melts into the ink instead of ending on a horizon line.
 */
const SKYLINE_FADE = 'linear-gradient(to bottom, transparent 0%, black 30%, black 58%, transparent 100%)'

function Skyline({ seed = 7 }: { seed?: number }) {
  const { back, front } = buildCity(seed)

  return (
    <div className="absolute inset-x-0 bottom-0 h-[42%] min-h-[220px] opacity-70" style={{ maskImage: SKYLINE_FADE, WebkitMaskImage: SKYLINE_FADE }}>
      <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} preserveAspectRatio="xMidYMax slice" className="h-full w-full">
        <defs>
          <linearGradient id={`sky-haze-${seed}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c026d3" stopOpacity="0" />
            <stop offset="70%" stopColor="#db2777" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#f472b6" stopOpacity="0.24" />
          </linearGradient>
        </defs>

        <rect x="0" y="120" width={VIEW_W} height={GROUND - 120} fill={`url(#sky-haze-${seed})`} />

        <g fill="#24103f" opacity="0.9">
          {back.map((b, i) => (
            <g key={`b${i}`}>
              <rect x={b.x} y={GROUND - b.h} width={b.w} height={b.h} />
              {b.spire && <rect x={b.x + b.w / 2 - 1} y={GROUND - b.h - 26} width={2} height={26} />}
            </g>
          ))}
        </g>
        {back.map((b, i) =>
          b.windows.map((w, j) => (
            <rect key={`bw${i}-${j}`} x={w.x} y={w.y} width={2.4} height={3} fill={w.c} opacity={w.o * 0.6} />
          ))
        )}

        <g fill="#0d0726">
          {front.map((b, i) => (
            <rect key={`f${i}`} x={b.x} y={GROUND - b.h} width={b.w} height={b.h} />
          ))}
        </g>
        {front.map((b, i) =>
          b.windows.map((w, j) => (
            <rect key={`fw${i}-${j}`} x={w.x} y={w.y} width={2.6} height={3.2} fill={w.c} opacity={w.o} />
          ))
        )}
      </svg>
    </div>
  )
}

export default memo(Skyline)
