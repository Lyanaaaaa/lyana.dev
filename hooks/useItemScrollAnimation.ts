'use client'

import { useEffect, useRef } from 'react'

export function useItemScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible')
            // Optionally unobserve after animation to prevent re-triggering
            // observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.2, // Trigger when 20% of element is visible
        rootMargin: '0px 0px -100px 0px', // Trigger earlier (100px before bottom of viewport)
      }
    )

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  return ref
}
