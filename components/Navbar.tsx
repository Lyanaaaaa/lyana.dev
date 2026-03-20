'use client'

import { useState, useEffect, useCallback } from 'react'

import { Menu, X } from 'lucide-react'
import Image from 'next/image'

const MENU_CLOSE_DURATION = 450

type MenuState = 'closed' | 'open' | 'closing'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuState, setMenuState] = useState<MenuState>('closed')

  const openMenu = useCallback(() => setMenuState('open'), [])

  const closeMenu = useCallback(() => {
    setMenuState('closing')
    setTimeout(() => setMenuState('closed'), MENU_CLOSE_DURATION)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuState !== 'closed' ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [menuState])

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
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="flex items-center gap-3 group animate-fade-in-left delay-100 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary/40 group-hover:scale-110 transition-all">
              <Image
                src="/resources/avatar.jpg"
                alt="Lyana A"
                width={40}
                height={40}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            <span className="text-white font-bold md:text-sm text-lg hidden sm:block">Lyana A</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => {
              const delays = ['delay-200', 'delay-300', 'delay-400', 'delay-500']
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-gray-300 md:text-sm hover:text-primary transition-colors font-medium animate-fade-in-down ${delays[index]}`}
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
            onClick={() => menuState === 'open' ? closeMenu() : openMenu()}
            className="md:hidden text-white p-2 hover:bg-white/10 card-button transition-all duration-300 hover:scale-110"
            aria-label="Toggle menu"
          >
            {menuState !== 'closed' ? (
              <X className="w-6 h-6 text-primary" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Full Screen Overlay */}
      {menuState !== 'closed' && (
        <div
          className="md:hidden fixed inset-0 z-[60]"
          style={{
            background: 'linear-gradient(135deg, black 0%, #0f1724 50%, black 100%)',
            animation: menuState === 'closing'
              ? 'fade-out-down 0.45s ease-in forwards'
              : 'fade-in 0.3s ease-out both',
          }}
        >
          {/* Close Button */}
          <button
            onClick={closeMenu}
            className="absolute top-6 right-6 text-white p-2 hover:bg-white/10 card-button transition-all duration-300 hover:scale-110 z-[70]"
            aria-label="Close menu"
            style={{
              animation: menuState === 'closing'
                ? 'scale-out 0.25s ease-in forwards'
                : 'scale-in 0.3s ease-out 0.2s both',
            }}
          >
            <X className="w-6 h-6 text-primary" />
          </button>

          <div className="flex flex-col items-center justify-center h-full px-6">
            <div className="flex flex-col items-center gap-6 w-full max-w-sm">
              {navLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={closeMenu}
                  className="text-gray-300 hover:text-primary hover:bg-white/5 transition-all duration-300 font-medium px-6 py-4 card-button group w-full text-center text-lg"
                  style={{
                    animation: menuState === 'closing'
                      ? `fade-out-down 0.3s ease-in ${(navLinks.length - 1 - index) * 0.06}s forwards`
                      : `fade-in-up 0.4s ease-out ${index * 0.1 + 0.3}s both`,
                  }}
                >
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300"></span>
                    {link.name}
                  </span>
                </a>
              ))}
              <a
                href="#contact"
                onClick={closeMenu}
                className="btn-primary px-8 py-4 text-base text-center mt-4 w-full"
                style={{
                  animation: menuState === 'closing'
                    ? 'fade-out-down 0.3s ease-in forwards'
                    : `fade-in-up 0.4s ease-out ${navLinks.length * 0.1 + 0.3}s both`,
                }}
              >
                Contact
              </a>

              {/* Avatar at Bottom */}
              <div
                className="mt-8"
                style={{
                  animation: menuState === 'closing'
                    ? 'scale-out 0.3s ease-in forwards'
                    : `fade-in-up 0.4s ease-out ${navLinks.length * 0.1 + 0.4}s both`,
                }}
              >
                <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-primary/30 hover:ring-primary/50 transition-all hover:scale-110">
                  <Image
                    src="/resources/avatar.jpg"
                    alt="Lyana A"
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
