'use client'

import { useEffect, useRef, useCallback } from 'react'

/**
 * Observes each child card individually and staggers their entrance animation.
 * On mobile (single column), cards animate one-by-one as they scroll into view.
 * On desktop (multi-column), cards in the same row animate together with a slight offset.
 *
 * @param baseDelay - milliseconds between each card's animation (default: 120ms)
 */
export function useStaggerAnimation(baseDelay = 120) {
  const containerRef = useRef<HTMLDivElement>(null)

  const observe = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const children = container.querySelectorAll<HTMLElement>('[data-stagger]')
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

    return () => {
      children.forEach((child) => observer.unobserve(child))
    }
  }, [baseDelay])

  useEffect(() => {
    return observe()
  }, [observe])

  return containerRef
}
