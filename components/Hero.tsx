import { ArrowRight, ChevronDown } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="section min-h-[90vh] flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
      <div className="container text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-200 text-primary-700 text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
            Available for new projects
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
            I Build Software That Solves Real Business Problems
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto text-balance">
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

          <div className="mt-16 text-sm text-gray-500">
            <p>Trusted by startups and established businesses</p>
          </div>
        </div>
      </div>
    </section>
  )
}