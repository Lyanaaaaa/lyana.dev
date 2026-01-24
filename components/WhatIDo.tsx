import { Target, Zap, Wrench } from 'lucide-react'

export default function WhatIDo() {
  const services = [
    {
      icon: Target,
      title: 'Product Development',
      description: 'Turn ideas into launched applications. I handle front-end, back-end, deployment, and the messy middle.',
    },
    {
      icon: Zap,
      title: 'Workflow Automation',
      description: 'Build tools that eliminate repetitive tasks. Your team spends time on strategy, not spreadsheets.',
    },
    {
      icon: Wrench,
      title: 'Technical Problem-Solving',
      description: 'Debug complex issues, optimize slow systems, and make existing codebases maintainable.',
    },
  ]

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="content">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What I Actually Do
            </h2>
            <p className="text-xl text-gray-600">
              I don&apos;t just write code—I ship products that make money, save time, or improve user experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary-100 text-primary-600 mb-6">
                    <Icon className="w-7 h-7" strokeWidth={2} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
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