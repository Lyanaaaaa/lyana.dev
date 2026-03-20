'use client'

import { Phone, Mail, Clock, Instagram } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function Contact() {
  const ref = useScrollAnimation()

  return (
    <section id="contact" className="section relative" ref={ref}>
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in-down">
              Let&apos;s Work Together!
            </h2>
            <p className="text-md text-gray-300 animate-fade-in-up delay-100">
              Whether you need a full product built, a specific feature shipped, or technical collaboration, I'm available for project work and contract roles.
            </p>
          </div>

          {/* <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in-up delay-200">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                required
                className="glass-input"
                placeholder="John Smith"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                required
                className="glass-input"
                placeholder="john@company.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                What do you need help with?
              </label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                required
                rows={6}
                className="glass-input resize-none"
                placeholder="Tell me about your project, timeline, and goals..."
              />
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'success' && (
              <div className="p-4 rounded-card-tag text-center animate-fade-in" style={{
                background: 'rgba(6, 182, 212, 0.1)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                color: '#67e8f9',
              }}>
                Thanks! I&apos;ll get back to you within 24 hours.
              </div>
            )}

            {status === 'error' && (
              <div className="p-4 rounded-card-tag text-center animate-fade-in" style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#fca5a5',
              }}>
                Something went wrong. Please try emailing me directly.
              </div>
            )}
          </form> */}

          <div className="mt-12 grid sm:grid-cols-2 gap-6">
            {[
              {
                icon: Phone,
                title: 'iMessage or WhatsApp me!',
                content: 'WhatsApp Link',
                href: 'https://wa.link/uqgo8y',
                delay: 'delay-300'
              },
              {
                icon: Mail,
                title: 'Prefer email?',
                content: 'nurlyanaaqilah@gmail.com',
                href: 'mailto:nurlyanaaqilah@gmail.com',
                delay: 'delay-300'
              },
              {
                icon: Instagram,
                title: 'DM me also works!',
                content: '@lyana_qillah',
                href: 'https://www.instagram.com/lyana_qillah',
                delay: 'delay-400'
              },
              {
                icon: Clock,
                title: 'Response time',
                content: 'Within 24 hours',
                delay: 'delay-400'
              }
            ].map((item, index) => (
              <div key={index} className={`glass-card !py-6 md:!py-8 flex items-start gap-4 animate-scale-in ${item.delay}`}>
                <item.icon className="w-6 h-6 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="hover:text-primary-300 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.content}
                    </a>
                  ) : (
                    <p className="text-gray-300">{item.content}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}