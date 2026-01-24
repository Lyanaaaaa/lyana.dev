import { MessageSquare, Code2, Rocket, RefreshCw } from 'lucide-react'

export default function HowIWork() {
  const process = [
    {
      icon: MessageSquare,
      title: 'Discovery',
      description: 'I listen first. Understanding your business goals matters more than jumping into code.',
    },
    {
      icon: Code2,
      title: 'Build',
      description: 'Clean, maintainable code. Regular updates. No surprises.',
    },
    {
      icon: Rocket,
      title: 'Launch',
      description: 'Deployment, documentation, and handoff. Your product goes live with confidence.',
    },
    {
      icon: RefreshCw,
      title: 'Support',
      description: 'Post-launch support included. I stick around to ensure smooth operation.',
    },
  ]

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="content">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How I Work
            </h2>
            <p className="text-xl text-gray-600">
              Reliable process. Clear communication. No drama.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className="relative">
                  {index < process.length - 1 && (
                    <div className="hidden lg:block absolute top-7 left-full w-full h-0.5 bg-gray-200 -z-10"></div>
                  )}
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary-600 text-white mb-4">
                      <Icon className="w-7 h-7" strokeWidth={2} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-16 p-6 border-l-4 border-primary-600 bg-primary-50 rounded-r-lg">
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">Clear expectations:</span> I respond within 24 hours, provide weekly progress updates, and deliver on time. If something changes, you&apos;ll know immediately.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}