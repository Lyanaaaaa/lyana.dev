import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="section min-h-[90vh] flex items-center justify-center relative overflow-hidden">
      {/* Animated background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="badge-glass inline-flex mb-8">
            <Sparkles className="w-4 h-4" />
            Available for new projects
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
            I Build Software That Solves{' '}
            <span className="gradient-text">Real Business Problems</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto text-balance">
            Full-stack engineer specializing in customer-facing web apps, workflow automation, and systems that scale without drama.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="#contact" className="btn-primary w-full sm:w-auto">
              Start a Project
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="#work" className="btn-secondary w-full sm:w-auto">
              View My Work
              <ChevronDown className="w-5 h-5" />
            </Link>
          </div>

          <div className="mt-16 text-sm text-gray-400">
            <p>Trusted by startups and established businesses</p>
          </div>
        </div>
      </div>
    </section>
  )
}