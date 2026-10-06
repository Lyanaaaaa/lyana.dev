'use client'

import { useEffect, useRef, useCallback } from 'react'

/**
 * Observes each child card individually and staggers their entrance animation.
 * On mobile (single column), cards animate one-by-one as they scroll into view.
 * On desktop (multi-column), cards in the same row animate together with a slight offset.
 *
 * @param baseDelay - milliseconds between each card's animation (default: 120ms)
 * @param resetKey - when it changes, re-scan for newly rendered children (e.g. after a filter
 *   change remounts the grid); without it, cards rendered later stay at opacity 0
 */
export function useStaggerAnimation(baseDelay = 120, resetKey?: unknown) {
  const containerRef = useRef<HTMLDivElement>(null)

  const observe = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const children = container.querySelectorAll<HTMLElement>('[data-stagger]:not(.animate-visible)')
    if (!children.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const index = parseInt(el.dataset.stagger || '0', 10)
            el.style.animationDelay = `${index * baseDelay}ms`
            el.classList.add('animate-visible')
            observer.unobserve(el)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px',
      }
    )

    children.forEach((child) => observer.observe(child))

    return () => observer.disconnect()
  }, [baseDelay])

  useEffect(() => {
    return observe()
  }, [observe, resetKey])

  return containerRef
}
