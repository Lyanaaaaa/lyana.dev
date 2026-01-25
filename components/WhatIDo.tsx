import { Code2, Layers, TrendingUp, Briefcase } from 'lucide-react'

export default function WhatIDo() {
  const services = [
    {
      icon: Code2,
      title: 'Full-Stack Development',
      description:
        'Building robust web applications with modern frameworks and best practices. From responsive frontends to scalable backends.',
    },
    {
      icon: Briefcase,
      title: '5+ Project Experiences',
      description:
        'Successfully delivered diverse projects ranging from e-commerce platforms to real-time applications and management systems.',
    },
    {
      icon: TrendingUp,
      title: 'SEO & Performance',
      description:
        'Optimizing websites for search engines and performance. Ensuring fast load times and excellent user experience.',
    },
    {
      icon: Layers,
      title: 'Modern Tech Stack',
      description:
        'Proficient in React, Next.js, Node.js, Laravel, and more. Always learning and adapting to new technologies.',
    },
  ]

  return (
    <section className="section relative">
      <div className="container">
        <div className="content">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-wider text-primary mb-3">INTRODUCTION</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 gradient-text-static">
              What I Do
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              I specialize in crafting digital experiences that blend beautiful design with powerful
              functionality. From concept to deployment, I build solutions that make an impact.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <div
                  key={index}
                  className="glass-card text-center group p-8 hover:scale-105 transition-all duration-300"
                >
                  <div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6 transition-all duration-300 bg-gradient-to-br from-primary/20 to-purple-500/20"
                    style={{
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                    }}
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