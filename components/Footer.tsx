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
    <footer className="bg-gray-900 text-gray-300">
      <div className="container section">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-gray-800">
          <div>
            <h3 className="text-white text-xl font-bold mb-2">Your Name</h3>
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
                  className="text-gray-400 hover:text-white transition-colors"
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
            &copy; {currentYear} Your Name. All rights reserved.
          </p>

          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            <FileDown className="w-4 h-4" />
            Download Resume
          </a>
        </div>
      </div>
    </footer>
  )
}