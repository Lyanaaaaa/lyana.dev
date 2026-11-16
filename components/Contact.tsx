'use client'

import { useState } from 'react'
import { ArrowRight, ArrowUpRight, ChevronDown, FileText, Mail, Send } from 'lucide-react'
import SpaceBackdrop from './space/SpaceBackdrop'
import SectionLabel from './ui/SectionLabel'
import { GithubIcon, InstagramIcon, LinkedinIcon, WhatsappIcon } from './ui/BrandIcons'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { profile } from '@/data/profile'

const channels = [
  { icon: Mail, title: 'Email', value: profile.email, href: `mailto:${profile.email}`, tone: 'text-primary-300' },
  { icon: WhatsappIcon, title: 'WhatsApp', value: 'Message me directly', href: profile.socials.whatsapp, tone: 'text-emerald-400' },
  { icon: LinkedinIcon, title: 'LinkedIn', value: 'linkedin.com/in/lyanaaqilah', href: profile.socials.linkedin, tone: 'text-sky-400' },
  { icon: GithubIcon, title: 'GitHub', value: 'github.com/Lyanaaaaa', href: profile.socials.github, tone: 'text-gray-200' },
  { icon: InstagramIcon, title: 'Instagram', value: '@lyana_qillah', href: profile.socials.instagram, tone: 'text-pink-400' },
]

const subjects = ['Project Collaboration', 'Contract Role', 'Full-time Opportunity', 'Just Saying Hi']

export default function Contact() {
  const ref = useScrollAnimation()
  const [form, setForm] = useState({ name: '', email: '', subject: subjects[0], message: '' })

  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  // Static export has no server, so the form hands off to the visitor's mail client
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const body = `${form.message}\n\n— ${form.name} (${form.email})`
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(`${form.subject} — ${form.name}`)}&body=${encodeURIComponent(body)}`
  }

  return (
    <section id="contact" ref={ref} className="section">
      <SpaceBackdrop variant="contact" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/40 to-ink/60" />

      <div className="container relative z-10">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div className="text-center md:text-left">
            <SectionLabel index="05" className="animate-fade-in-down">
              Contact
            </SectionLabel>
            <h2 className="heading-xl mt-6 animate-fade-in-up delay-100">
              Got something to ship? <span className="text-gradient">Let&apos;s talk.</span>
            </h2>
            <p className="lead mx-auto mt-6 max-w-[540px] animate-fade-in-up delay-200 md:mx-0">
              Need a product built, a mobile app finished, or an engineer who can join a Laravel, Next.js or Flutter codebase and ship in
              week one? I take on project work and contract or full-time roles, and I reply within 24 hours.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {channels.map((c, i) => (
                <a
                  key={c.title}
                  href={c.href}
                  target={c.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className={`glass-card glass-card-hover group relative flex items-center gap-4 !rounded-card-inner p-4 text-left animate-fade-in-up ${i === 0 ? 'sm:col-span-2' : ''}`}
                  style={{ animationDelay: `${300 + i * 80}ms` }}
                >
                  <c.icon className={`h-6 w-6 shrink-0 ${c.tone}`} />
                  <span className="min-w-0">
                    <span className="block text-[15px] font-semibold text-white">{c.title}</span>
                    <span className="block break-words text-[13px] text-gray-400">{c.value}</span>
                  </span>
                  <ArrowUpRight className="absolute right-3 top-3 h-4 w-4 text-gray-500 transition-colors group-hover:text-primary-300" />
                </a>
              ))}
            </div>

            <p className="mt-10 font-hand text-3xl text-gray-200 animate-fade-in delay-600 md:text-[34px]">&ldquo;Tell me the problem. I&apos;ll bring the code, and the tests.&rdquo;</p>
            <p className="eyebrow mt-2 !text-[11px] text-gray-500">— Lyana</p>
          </div>

          <div>
            <form onSubmit={onSubmit} className="glass-card p-6 animate-fade-in-right delay-300 md:p-8" style={{ boxShadow: '0 30px 80px -30px rgba(139,92,246,0.55)' }}>
              <p className="eyebrow !text-[11px]">{'// Send a message'}</p>
              <h3 className="mt-3 text-3xl font-extrabold md:text-4xl" style={{ letterSpacing: '-0.03em' }}>
                I&apos;m all <span className="text-gradient">ears!</span>
              </h3>
              <p className="mt-3 text-sm text-gray-400">Fill out the form and it opens in your email app, ready to send.</p>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-gray-200">Your Name</span>
                  <input required value={form.name} onChange={update('name')} className="glass-input" placeholder="Aisyah Rahman" autoComplete="name" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-gray-200">Your Email</span>
                  <input required type="email" value={form.email} onChange={update('email')} className="glass-input" placeholder="aisyah@company.com" autoComplete="email" />
                </label>
              </div>
              <label className="mt-5 block">
                <span className="mb-2 block text-sm font-medium text-gray-200">Subject</span>
                <span className="relative block">
                  <select value={form.subject} onChange={update('subject')} className="glass-input appearance-none pr-10">
                    {subjects.map((s) => (
                      <option key={s} className="bg-ink-800">
                        {s}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                </span>
              </label>
              <label className="mt-5 block">
                <span className="mb-2 block text-sm font-medium text-gray-200">Message</span>
                <textarea required rows={4} value={form.message} onChange={update('message')} className="glass-input resize-none" placeholder="Tell me about your idea, project, or just say hi!" />
              </label>
              <button type="submit" className="btn-blue mt-7 w-full">
                <Send className="h-4 w-4" /> Send Message <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-8 text-center animate-fade-in delay-500">
              <p className="eyebrow !text-[11px] text-gray-500">Other ways to connect</p>
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                <a href={`mailto:${profile.email}`} className="btn-ghost !rounded-full !px-5 !py-2.5 text-sm">
                  <Mail className="h-4 w-4" /> Email <ArrowRight className="h-3.5 w-3.5 opacity-60" />
                </a>
                <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="btn-ghost !rounded-full !px-5 !py-2.5 text-sm">
                  <FileText className="h-4 w-4" /> Resume <ArrowRight className="h-3.5 w-3.5 opacity-60" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
