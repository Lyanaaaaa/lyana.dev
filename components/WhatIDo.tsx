'use client'

import { Code2, Layers, TrendingUp, Briefcase } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function WhatIDo() {
  const ref = useScrollAnimation()
  const services = [
    {
      icon: Code2,
      title: 'Backend Development',
      description:
        'Build scalable APIs and databases with Laravel and Node.js. Role-based access, payment systems, optimized queries.',
    },
    {
      icon: Briefcase,
      title: 'Fast Delivery',
      description:
        'Shipped production systems in days, not months. From MVP to full-scale platforms with clean, maintainable code.',
    },
    {
      icon: TrendingUp,
      title: 'System Design',
      description:
        'Design databases, APIs, and workflows that scale. Focus on performance, security, and user experience.',
    },
    {
      icon: Layers,
      title: 'Modern Stack',
      description:
        'Next.js, TypeScript, Laravel, PostgreSQL, tRPC, Billplz. Always learning, always shipping.',
    },
  ]

  return (
    <section className="section relative" ref={ref}>
      <div className="container">
        <div className="content">
          <div className="text-center mb-16">
            {/* <p className="text-sm uppercase tracking-wider text-primary mb-3 animate-fade-in-down">
              WHAT I OFFER
            </p> */}
            <h2 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in-up delay-100">
              What I Do
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-200">
              I build web applications that work. From backend APIs to full-stack platforms,
              I deliver clean code and solid solutions.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon
              const delays = ['delay-100', 'delay-200', 'delay-300', 'delay-400']
              return (
                <div
                  key={index}
                  className={`glass-card text-center group p-8 hover:scale-105 transition-all duration-300 animate-scale-in ${delays[index]}`}
                >
                  <div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6 transition-all duration-300 bg-gradient-to-br from-primary/20 to-purple-500/20"
                  >
                    <Icon
                      className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300"
                      strokeWidth={2}
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{service.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}