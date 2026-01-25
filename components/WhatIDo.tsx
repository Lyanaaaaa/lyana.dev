import { Target, Zap, Wrench, Hexagon } from 'lucide-react'

export default function WhatIDo() {
  const services = [
    {
      icon: Target,
      title: 'Full-stack Development',
      description: '',
    },
    {
      icon: Zap,
      title: 'Myriad Frontend & Backend Projects',
      description: '',
    },
    {
      icon: Wrench,
      title: 'SEO Knowledge',
      description: '',
    },
    {
      icon: Hexagon,
      title: 'View mein Tech Stack',
      description: '',
    },
  ]

  return (
    <section className="section relative">
      <div className="container">
        <div className="content">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Overview
            </h2>
            <p className="text-xl text-gray-300">
            Touched both frontend & backend, contributed to five projects & excited to <br></br>explore new tech and build better solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <div key={index} className="glass-card text-center group p-16">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6 transition-all duration-300" style={{
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                  }}>
                    <Icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" strokeWidth={2} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}