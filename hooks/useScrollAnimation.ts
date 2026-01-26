'use client'

import { useEffect, useRef } from 'react'

export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible')

            // Remove will-change after animations complete to free up memory
            const animatedElements = entry.target.querySelectorAll('[class*="animate-"]')
            animatedElements.forEach((el) => {
              const element = el as HTMLElement
              const handleAnimationEnd = () => {
                element.style.willChange = 'auto'
                element.removeEventListener('animationend', handleAnimationEnd)
              }
              element.addEventListener('animationend', handleAnimationEnd, { once: true })
            })
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
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
