'use client'

import { useState } from 'react'
import { Send, Mail, Clock } from 'lucide-react'

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')

    // Replace this with your actual form submission logic
    // Example: Formspree, Resend, or your own API endpoint
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // For production, use something like:
      // const response = await fetch('YOUR_FORM_ENDPOINT', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formState),
      // })
      
      setStatus('success')
      setFormState({ name: '', email: '', message: '' })
    } catch (error) {
      setStatus('error')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" className="section relative">
      <div className="container">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Let&apos;s Work Together
            </h2>
            <p className="text-xl text-gray-300">
              Whether you need a full product built, a specific feature shipped, or technical guidance—I&apos;m available for project work and contract roles.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
              <Send className="w-5 h-5" />
            </button>

            {status === 'success' && (
              <div className="p-4 rounded-lg text-center" style={{
                background: 'rgba(6, 182, 212, 0.1)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                color: '#67e8f9',
              }}>
                Thanks! I&apos;ll get back to you within 24 hours.
              </div>
            )}

            {status === 'error' && (
              <div className="p-4 rounded-lg text-center" style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#fca5a5',
              }}>
                Something went wrong. Please try emailing me directly.
              </div>
            )}
          </form>

          <div className="mt-12 grid sm:grid-cols-2 gap-6">
            <div className="glass-card flex items-start gap-3">
              <Mail className="w-6 h-6 text-primary-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-white mb-1">Prefer email?</h3>
                <a href="mailto:your.email@example.com" className="text-primary-400 hover:text-primary-300 transition-colors">
                  your.email@example.com
                </a>
              </div>
            </div>

            <div className="glass-card flex items-start gap-3">
              <Clock className="w-6 h-6 text-primary-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-white mb-1">Response time</h3>
                <p className="text-gray-300">Within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}