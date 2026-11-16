'use client'

import { soundStore, useSoundState, type SoundState } from '@/lib/sound'
import { profile } from '@/data/profile'

const BARS = [0.55, 1, 0.7, 0.85]

const LABELS: Record<SoundState, string> = {
  off: 'Turn sound on',
  armed: 'Sound plays after your first click. Click to mute',
  on: 'Mute sound',
}

/** Equalizer-bar sound switch. Animated while playing, resting while armed, flat when muted. */
export default function SoundToggle({ className = '' }: { className?: string }) {
  const state = useSoundState()
  if (!profile.heroVideo) return null

  const label = LABELS[state]

  return (
    <button
      type="button"
      data-sound-toggle
      onClick={soundStore.toggle}
      aria-pressed={state !== 'off'}
      aria-label={label}
      title={label}
      className={`group relative inline-flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 ${
        state === 'off'
          ? 'border-white/15 bg-ink/60 hover:border-pink-300/60'
          : 'border-pink-300/50 bg-ink/60 shadow-[0_6px_24px_-8px_rgba(236,72,153,0.7)] hover:border-pink-200'
      } ${className}`}
    >
      <span className="flex h-4 items-end gap-[3px]" aria-hidden>
        {BARS.map((h, i) => (
          <span
            key={i}
            className={`w-[3px] origin-bottom rounded-full transition-all duration-500 ${
              state === 'off' ? 'h-[3px] bg-gray-400' : 'h-4 bg-gradient-to-t from-primary-400 to-pink-200'
            } ${state === 'on' ? 'animate-eq' : ''}`}
            style={{
              transform: state === 'armed' ? `scaleY(${h})` : undefined,
              animationDelay: `${i * -0.27}s`,
              animationDuration: `${0.9 + i * 0.17}s`,
            }}
          />
        ))}
      </span>
      {state === 'off' && <span className="absolute h-px w-6 rotate-[-35deg] bg-gray-300" aria-hidden />}
    </button>
  )
}
