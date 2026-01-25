'use client'

import { Github, Linkedin, Mail, Instagram } from 'lucide-react'

export default function Footer() {
  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/Lyanaaaaa',
      icon: Github,
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/lyanaaqilah',
      icon: Linkedin,
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/lyanaaqilah',
      icon: Instagram,
    },
    {
      name: 'Email',
      href: 'mailto:nurlyanaaqilah@gmail.com',
      icon: Mail,
    },
  ]

  const footerLinks = [
    {
      title: 'Links',
      links: [
        { name: 'Overview', href: '#overview' },
        { name: 'Experience', href: '#experience' },
        { name: 'Projects', href: '#projects' },
        { name: 'Tech Stack', href: '#tech-stack' },
      ],
    },
    {
      title: 'Projects',
      links: [
        { name: 'MovieBites', href: '#' },
        { name: 'DreamId', href: '#' },
        { name: 'Weavify', href: '#' },
        { name: 'Location App', href: '#' },
      ],
    },
    {
      title: 'Connect',
      links: [
        { name: 'GitHub', href: 'https://github.com/Lyanaaaaa' },
        { name: 'LinkedIn', href: 'https://linkedin.com/in/lyanaaqilah' },
        { name: 'Email', href: 'mailto:nurlyanaaqilah@gmail.com' },
      ],
    },
  ]

  return (
    <footer className="relative border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <div>
                <h3 className="text-white font-bold">Lyana Aqilah</h3>
                <p className="text-xs text-gray-400">nurlyanaaqilah@gmail.com</p>
                <p className="text-xs text-gray-400">+60 77582638</p>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10">
          <div className="flex items-center gap-6 mb-4 md:mb-0">
            {socialLinks.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary transition-all duration-300 hover:scale-110"
                  aria-label={link.name}
                >
                  <Icon className="w-5 h-5" />
                </a>
              )
            })}
          </div>

          {/* Scroll to top button */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-10 h-10 rounded-full bg-dark-800 hover:bg-primary transition-all duration-300 flex items-center justify-center group"
            aria-label="Scroll to top"
          >
            <svg
              className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  )
}