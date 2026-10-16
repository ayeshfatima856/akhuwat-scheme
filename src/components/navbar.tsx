'use client'

import { useEffect, useState, useRef } from 'react'
import { Menu, X } from 'lucide-react'

interface NavbarProps {
  onApplyClick: () => void
  onSecretAdminClick: () => void
  onAboutClick: () => void
}

export function Navbar({ onApplyClick, onSecretAdminClick, onAboutClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const logoClickCount = useRef(0)
  const logoClickTimer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ===== SECRET ADMIN ACCESS =====
  // Logo par 5 baar click karo (2 second mein) ya Ctrl+Shift+A dabaen
  useEffect(() => {
    const handleKeyCombo = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault()
        onSecretAdminClick()
      }
    }
    window.addEventListener('keydown', handleKeyCombo)
    return () => window.removeEventListener('keydown', handleKeyCombo)
  }, [onSecretAdminClick])

  const handleLogoClick = () => {
    logoClickCount.current += 1
    
    // Pehle click se timer start karo (2 seconds)
    if (logoClickCount.current === 1) {
      logoClickTimer.current = setTimeout(() => {
        logoClickCount.current = 0
      }, 2000)
    }
    
    // 5 baar click hone par admin panel kholo
    if (logoClickCount.current >= 5) {
      logoClickCount.current = 0
      if (logoClickTimer.current) {
        clearTimeout(logoClickTimer.current)
      }
      onSecretAdminClick()
      return
    }
    
    // Pehle click par home par scroll karo
    if (logoClickCount.current === 1) {
      document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navLinks = [
    { label: 'Home', target: 'home', type: 'scroll' },
    { label: 'About', target: 'about', type: 'modal' },
    { label: 'Plans', target: 'plans', type: 'scroll' },
    { label: 'Process', target: 'process', type: 'scroll' },
    { label: 'Contact', target: 'contact', type: 'scroll' },
  ]

  const handleNavClick = (link: { target: string; type: string }) => {
    if (link.type === 'modal' && link.target === 'about') {
      onAboutClick()
    } else {
      document.getElementById(link.target)?.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileOpen(false)
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: scrolled ? '0 4px 20px rgba(15,82,40,0.12)' : '0 2px 8px rgba(15,82,40,0.08)',
        padding: scrolled ? '8px 0' : '15px 0',
      }}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo (secret admin access - 5x click) */}
        <div
          className="flex items-center gap-3 cursor-pointer select-none"
          onClick={handleLogoClick}
          title="Akhuwat Scheme"
        >
          <img
            src="/akhuwat-logo.svg"
            alt="Akhuwat Scheme"
            width={scrolled ? 42 : 50}
            height={scrolled ? 42 : 50}
            className="transition-all duration-300"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(15,82,40,0.2))' }}
          />
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-playfair), serif',
                color: '#0f5228',
                fontSize: scrolled ? '1.2rem' : '1.4rem',
                fontWeight: 700,
                margin: 0,
                lineHeight: 1,
                transition: 'all 0.3s',
              }}
            >
              Akhuwat
            </h4>
            <small style={{ color: '#d4af37', letterSpacing: '3px', fontSize: '0.7rem', fontWeight: 600 }}>
              SCHEME
            </small>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.target}
              onClick={() => handleNavClick(link)}
              className="px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 hover:bg-[#e8f5e9] hover:text-[#1a7a3c] relative group"
              style={{ color: '#2c3e50' }}
            >
              {link.label}
              <span
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#1a7a3c] transition-all duration-300 group-hover:w-1/2"
              />
            </button>
          ))}
          <button
            onClick={onApplyClick}
            className="ml-3 px-6 py-2.5 rounded-full font-semibold text-white text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #1a7a3c 0%, #0f5228 100%)',
              boxShadow: '0 4px 15px rgba(26,122,60,0.3)',
            }}
          >
            Apply Now
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 text-[#0f5228]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white animate-in slide-in-from-top duration-300">
          <div className="container mx-auto px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => handleNavClick(link)}
                className="text-left px-4 py-3 rounded-lg font-medium text-sm hover:bg-[#e8f5e9] hover:text-[#1a7a3c] transition-all"
                style={{ color: '#2c3e50' }}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => { onApplyClick(); setMobileOpen(false) }}
              className="mt-2 px-6 py-3 rounded-full font-semibold text-white text-sm"
              style={{ background: 'linear-gradient(135deg, #1a7a3c 0%, #0f5228 100%)' }}
            >
              Apply Now
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
