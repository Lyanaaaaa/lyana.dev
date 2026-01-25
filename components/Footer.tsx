import { Github, Linkedin, Mail, FileDown } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

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
      name: 'Email',
      href: 'mailto:nurlyanaaqilah@gmail.com',
      icon: Mail,
    },
  ]

  return (
    <footer className="relative">
      <div className="container section">
        <div className="glass-card">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-white/10">
            <div>
              <h3 className="text-white text-xl font-bold mb-2">Lyana Aqilah</h3>
              <p className="text-gray-400">Software Engineer</p>
            </div>

            <div className="flex items-center gap-6">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary-400 transition-all duration-300 hover:scale-110"
                    aria-label={link.name}
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                )
              })}
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <p className="text-gray-400">
              &copy; {currentYear} Lyana Aqilah. All rights reserved.
            </p>

            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
              style={{
                background: 'rgba(6, 182, 212, 0.1)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                color: '#67e8f9',
              }}
            >
              <FileDown className="w-4 h-4" />
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}