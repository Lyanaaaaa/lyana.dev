'use client'

import { useEffect, type RefObject } from 'react'
import { initSound, soundStore } from '@/lib/sound'

/** Loudness at the hero, and the ambient floor once the visitor scrolls on */
const HERO_VOLUME = 0.95
const AMBIENT_VOLUME = 0.22

type WebkitWindow = Window & { webkitAudioContext?: typeof AudioContext }

/**
 * Plays the hero video's own audio (typing + room ambience) through a Web Audio gain node so it
 * can fade smoothly everywhere, iOS included (iOS ignores media.volume). Loud in the hero, easing
 * down to a soft bed as the hero scrolls away, silent while the tab is hidden.
 */
export function useHeroSound(videoRef: RefObject<HTMLVideoElement>) {
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let ctx: AudioContext | null = null
    let gain: GainNode | null = null
    let heroRatio = 1
    let muteTimer = 0
    const AudioCtor = window.AudioContext ?? (window as WebkitWindow).webkitAudioContext

    const target = () =>
      soundStore.get() === 'on' && !document.hidden ? AMBIENT_VOLUME + (HERO_VOLUME - AMBIENT_VOLUME) * heroRatio : 0

    const apply = (timeConstant = 0.35) => {
      const value = target()
      if (ctx && gain) {
        const now = ctx.currentTime
        gain.gain.cancelScheduledValues(now)
        gain.gain.setValueAtTime(gain.gain.value, now)
        gain.gain.setTargetAtTime(value, now, timeConstant)
      } else if (!AudioCtor) {
        // Old browsers without Web Audio: fall back to the element's own volume
        video.volume = value
      }
    }

    const ensureGraph = () => {
      if (ctx || !AudioCtor) return
      try {
        ctx = new AudioCtor()
        const source = ctx.createMediaElementSource(video)
        gain = ctx.createGain()
        gain.gain.value = 0
        source.connect(gain).connect(ctx.destination)
        // The gain node does the fading; the element itself must stay at full volume
        video.volume = 1
      } catch {
        ctx = null
        gain = null
      }
    }

    // Runs synchronously inside the click/tap/key event that changed the state
    const onState = () => {
      window.clearTimeout(muteTimer)
      if (soundStore.get() === 'on') {
        ensureGraph()
        void ctx?.resume()
        video.muted = false
        apply(0.6) // ~2s swell in
      } else {
        apply(0.2)
        // Re-mute the element after the fade so autoplay rules stay satisfied
        muteTimer = window.setTimeout(() => {
          if (soundStore.get() !== 'on') video.muted = true
        }, 900)
      }
    }

    const onVisibility = () => {
      if (!ctx) return
      if (document.hidden) {
        apply(0.15)
        window.setTimeout(() => document.hidden && void ctx?.suspend(), 600)
      } else {
        void ctx.resume().then(() => apply(0.5))
      }
    }

    const hero = document.getElementById('top')
    const io = hero
      ? new IntersectionObserver(
          ([entry]) => {
            heroRatio = entry.intersectionRatio
            if (soundStore.get() === 'on') apply(0.5)
          },
          { threshold: Array.from({ length: 21 }, (_, i) => i / 20) }
        )
      : null
    if (hero) io?.observe(hero)

    const unsubscribe = soundStore.subscribe(onState)
    document.addEventListener('visibilitychange', onVisibility)
    initSound()
    if (soundStore.get() === 'on') onState()

    return () => {
      unsubscribe()
      io?.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      window.clearTimeout(muteTimer)
      void ctx?.close()
    }
  }, [videoRef])
}
