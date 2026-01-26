'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Overview', href: '#overview' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Tech Stack', href: '#tech-stack' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark-100/40 backdrop-blur-lg border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 animate-on-load">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group animate-fade-in-left delay-100">
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary/40 group-hover:scale-110 transition-all">
              <Image
                src="resources/avatar.png"
                alt="Lyana A"
                width={40}
                height={40}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            <span className="text-white font-bold text-lg hidden sm:block">Lyana A</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => {
              const delays = ['delay-200', 'delay-300', 'delay-400', 'delay-500']
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-gray-300 hover:text-primary transition-colors font-medium animate-fade-in-down ${delays[index]}`}
                >
                  {link.name}
                </a>
              )
            })}
            <a
              href="#contact"
              className="btn-primary text-sm animate-scale-in delay-600"
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-dark-900/95 backdrop-blur-lg border-b border-white/10">
            <div className="flex flex-col gap-4 px-6 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-300 hover:text-primary transition-colors font-medium"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-primary px-6 py-2 text-sm text-center"
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
