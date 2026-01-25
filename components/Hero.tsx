'use client'

import { ArrowRight, ChevronDown, Atom } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import PolyhedraBackground from './PolyhedraBackground'

export default function Hero() {
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(150)

  const phrases = ['Lyana A', 'a Software Engineer']

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % phrases.length
      const fullText = phrases[i]

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      )

      setTypingSpeed(isDeleting ? 50 : 150)

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && text === '') {
        setIsDeleting(false)
        setLoopNum(loopNum + 1)
      }
    }

    const timer = setTimeout(handleType, typingSpeed)
    return () => clearTimeout(timer)
  }, [text, isDeleting, loopNum, typingSpeed, phrases])

  return (
    <section className="section min-h-[90vh] flex items-center justify-center relative overflow-hidden">
      {/* Animated background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* 3D Polyhedra Animation - Added as background layer */}
      <PolyhedraBackground />

      <div className="container text-left relative z-10">
        <div className="mx-auto">
          <div className="text-white badge-glass inline-flex mb-8">
            <Atom className="w-4 h-4" />
            Available for new projects
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance min-h-[1.2em]">
            Ola! I'm{' '}
            <span className="gradient-text">{text}</span>
            <span className="text-white font-bold text-6xl md:text-7xl lg:text-6xl animate-blink">|</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 my-12 max-w-3xl text-balance">
            Full-stack developer delivering polished interfaces and resilient backend systems.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-left gap-4">
            <Link href="#contact" className="btn-primary cursor-pointer bg-gradient-to-tl from-primary-500/30 via-primary-700/90 to-teal-500/10">
              Start a Project
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="#work" className="btn-secondary w-full sm:w-auto">
              View My Work
              <ChevronDown className="w-5 h-5" />
            </Link>
          </div>

          <div className="mt-16 text-sm text-gray-400">
            <p>Trusted by startups and established businesses.</p>
          </div>
        </div>
      </div>
    </section>
  )
}