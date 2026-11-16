'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowRight, Menu, X } from 'lucide-react'
import { navLinks, profile } from '@/data/profile'
import { useActiveSection } from '@/hooks/useActiveSection'

const MENU_CLOSE_DURATION = 450
const SECTION_IDS = navLinks.map((l) => l.id)

type MenuState = 'closed' | 'open' | 'closing'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuState, setMenuState] = useState<MenuState>('closed')
  const active = useActiveSection(SECTION_IDS)

  // Held so a quick reopen cancels the pending close (otherwise the stale timer shuts the menu again)
  const closeTimer = useRef<number>()
  const openMenu = useCallback(() => {
    window.clearTimeout(closeTimer.current)
    setMenuState('open')
  }, [])
  const closeMenu = useCallback(() => {
    setMenuState('closing')
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setMenuState('closed'), MENU_CLOSE_DURATION)
  }, [])
  useEffect(() => () => window.clearTimeout(closeTimer.current), [])

  useEffect(() => {
    if (menuState !== 'open') return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeMenu()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuState, closeMenu])

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuState !== 'closed' ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuState])

  const goTop = (e: React.MouseEvent) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50">
        {/* Blur lives on its own layer so the mobile overlay (a sibling) isn't trapped by it */}
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            isScrolled ? 'border-b border-primary-400/15 bg-ink/70 backdrop-blur-xl' : 'border-b border-transparent'
          }`}
        />
        <div className="container relative flex h-[72px] items-center justify-between animate-on-load">
          <a href="#top" onClick={goTop} className="group flex items-center gap-3 animate-fade-in-left">
            <span className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-primary-400/50 transition-transform group-hover:scale-105">
              <Image src={profile.avatar} alt={profile.fullName} width={36} height={36} className="h-full w-full object-cover" priority />
            </span>
            <span className="font-display text-xl font-bold text-white">{profile.firstName}</span>
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link, i) => {
              const isActive = active === link.id
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={link.id === 'top' ? goTop : undefined}
                  className={`relative py-2 text-[15px] transition-colors animate-fade-in-down ${
                    isActive ? 'text-primary-200' : 'text-gray-300 hover:text-white'
                  }`}
                  style={{ animationDelay: `${100 + i * 60}ms` }}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-gradient-to-r from-primary-400 to-primary-300 transition-all duration-300 ${
                      isActive ? 'w-full opacity-100' : 'w-0 opacity-0'
                    }`}
                  />
                </a>
              )
            })}
          </div>

          <div className="flex items-center gap-3">
            <a href="#contact" className="btn-pill hidden animate-scale-in delay-500 lg:inline-flex">
              Let&apos;s Connect <ArrowRight className="h-4 w-4" />
            </a>

            <button
              onClick={() => (menuState === 'open' ? closeMenu() : openMenu())}
              className="icon-btn !h-11 !w-11 lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={menuState === 'open'}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      {menuState !== 'closed' && (
        <div
          className="fixed inset-0 z-[60] bg-ink lg:hidden"
          style={{
            backgroundImage:
              'radial-gradient(60% 40% at 80% 10%, rgba(109,40,217,0.35), transparent 70%), radial-gradient(50% 40% at 10% 90%, rgba(67,56,202,0.25), transparent 70%)',
            animation: menuState === 'closing' ? 'fade-out-down 0.45s ease-in forwards' : 'fade-in 0.3s ease-out both',
          }}
        >
          <button
            onClick={closeMenu}
            className="icon-btn absolute right-4 top-3.5 !h-11 !w-11"
            aria-label="Close menu"
            style={{ animation: menuState === 'closing' ? 'scale-out 0.25s ease-in forwards' : 'scale-in 0.3s ease-out 0.2s both' }}
          >
            <X className="h-5 w-5 text-primary-300" />
          </button>

          <div className="flex h-full flex-col items-center justify-center px-4">
            <div className="flex w-full max-w-sm flex-col gap-2">
              {navLinks.map((link, index) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={closeMenu}
                  className={`flex items-center justify-between rounded-button px-5 py-4 font-display text-2xl font-semibold transition-colors ${
                    active === link.id ? 'bg-primary-500/15 text-white' : 'text-gray-300 hover:text-white'
                  }`}
                  style={{
                    animation:
                      menuState === 'closing'
                        ? `fade-out-down 0.3s ease-in ${(navLinks.length - 1 - index) * 0.05}s forwards`
                        : `fade-in-up 0.4s ease-out ${index * 0.07 + 0.2}s both`,
                  }}
                >
                  <span>
                    <span className="mr-3 font-mono text-xs text-primary-300/70">0{index}</span>
                    {link.name}
                  </span>
                  <ArrowRight className="h-5 w-5 opacity-50" />
                </a>
              ))}
              <a
                href="#contact"
                onClick={closeMenu}
                className="btn-primary mt-6 w-full"
                style={{
                  animation:
                    menuState === 'closing'
                      ? 'fade-out-down 0.3s ease-in forwards'
                      : `fade-in-up 0.4s ease-out ${navLinks.length * 0.07 + 0.2}s both`,
                }}
              >
                Let&apos;s Connect <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
