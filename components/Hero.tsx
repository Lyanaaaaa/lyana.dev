'use client'

import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import PolyhedraBackground from './PolyhedraBackground'

export default function Hero() {
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(150)

  const phrases = ['Lyana Aqilah', 'a Software Engineer', 'a Full-Stack Developer']

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
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        ></div>
      </div>

      {/* 3D Polyhedra Animation Background */}
      <PolyhedraBackground />

      <div className="container mx-auto px-6 text-left relative z-10">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="badge-glass inline-flex mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            Available for new projects
          </div>

          {/* Main Heading with Typing Effect */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            Hi, I'm{' '}
            <br className="hidden sm:block" />
            <span className="gradient-text inline-block">{text}</span>
            <span className="animate-blink text-primary">|</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl leading-relaxed">
            Full-stack developer crafting exceptional digital experiences with
            <span className="text-primary font-semibold"> clean code</span> and
            <span className="text-primary font-semibold"> innovative solutions</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Link
              href="#projects"
              className="btn-primary group"
            >
              View My Work
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#contact"
              className="btn-secondary group"
            >
              Get In Touch
              <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </Link>
          </div>

          {/* Trust Badge */}
          <div className="mt-16 flex items-center gap-3">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-cyan-600 border-2 border-dark-900"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-dark-900"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 border-2 border-dark-900"></div>
            </div>
            <p className="text-sm text-gray-400">
              Trusted by startups and established businesses
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}