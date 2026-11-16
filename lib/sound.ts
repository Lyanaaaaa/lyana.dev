'use client'

import { useSyncExternalStore } from 'react'

/**
 * Site sound state.
 *  - 'armed': default. The toggle reads ON, but browsers forbid audible autoplay, so audio starts
 *             on the visitor's first click / tap / key press anywhere on the page.
 *  - 'on':    playing.
 *  - 'off':   muted by the visitor; remembered across visits.
 * Listeners run synchronously inside the triggering event, which keeps the browser's
 * user-activation window open for AudioContext.resume().
 */
export type SoundState = 'armed' | 'on' | 'off'

const STORAGE_KEY = 'lyana-sound'
const listeners = new Set<() => void>()
let state: SoundState = 'armed'
let initialised = false

function readSaved() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'off' ? 'off' : 'armed'
  } catch {
    return 'armed'
  }
}

export const soundStore = {
  get: (): SoundState => state,
  set(next: SoundState) {
    if (next === state) return
    state = next
    try {
      if (next === 'off') window.localStorage.setItem(STORAGE_KEY, 'off')
      else window.localStorage.removeItem(STORAGE_KEY)
    } catch {}
    listeners.forEach((l) => l())
  },
  subscribe(listener: () => void) {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  },
  /** Toggle button semantics: armed or on → off, off → on */
  toggle() {
    soundStore.set(state === 'off' ? 'on' : 'off')
  },
}

/** Call once on the client: restores the saved choice and arms the first-gesture start. */
export function initSound() {
  if (initialised || typeof window === 'undefined') return
  initialised = true
  state = readSaved()
  listeners.forEach((l) => l())

  // Events that count as user activation in Chrome, Safari and Firefox (pointerdown on touch does not)
  const events = ['click', 'keydown', 'touchend', 'mousedown'] as const
  const onGesture = (e: Event) => {
    if (state !== 'armed') return cleanup()
    // The sound button handles its own click (it means "mute" while armed)
    if ((e.target as Element | null)?.closest?.('[data-sound-toggle]')) return
    if (e instanceof KeyboardEvent && (e.key === 'Escape' || e.metaKey || e.ctrlKey)) return
    soundStore.set('on')
    cleanup()
  }
  const cleanup = () => events.forEach((ev) => window.removeEventListener(ev, onGesture, true))
  events.forEach((ev) => window.addEventListener(ev, onGesture, true))
}

export function useSoundState() {
  return useSyncExternalStore(soundStore.subscribe, soundStore.get, () => 'armed' as SoundState)
}
