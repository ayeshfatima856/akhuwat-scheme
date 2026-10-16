'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

interface NavbarProps {
  onApplyClick: () => void
  onAdminClick: () => void
}

export function Navbar({ onApplyClick, onAdminClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Home', target: 'home' },
    { label: 'About', target: 'about' },
    { label: 'Loan Types', target: 'services' },
    { label: 'Process', target: 'process' },
    { label: 'Contact', target: 'contact' },
  ]

  const handleNavClick = (target: string) => {
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(10px)',
        boxShadow: scrolled ? '0 4px 20px rgba(15,82,40,0.12)' : '0 2px 8px rgba(15,82,40,0.08)',
        padding: scrolled ? '8px 0' : '15px 0',
      }}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('home')}>
          <img
            src="/akhuwat-logo.svg"
            alt="Akhuwat Scheme"
            width={scrolled ? 42 : 50}
            height={scrolled ? 42 : 50}
            className="transition-all duration-300"
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
        <div className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => (
            <button
              key={link.target}
              onClick={() => handleNavClick(link.target)}
              className="px-4 py-2 rounded-full font-medium text-sm hover:bg-[#e8f5e9] hover:text-[#1a7a3c] transition-all"
              style={{ color: '#2c3e50' }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={onApplyClick}
            className="ml-3 px-6 py-2.5 rounded-full font-semibold text-white text-sm transition-all hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, #1a7a3c 0%, #0f5228 100%)',
              boxShadow: '0 4px 15px rgba(26,122,60,0.3)',
            }}
          >
            Apply Now
          </button>
          <button
            onClick={onAdminClick}
            className="px-4 py-2 rounded-full font-medium text-sm text-[#5a6c7d] hover:text-[#1a7a3c] transition-all"
            title="Admin Login"
          >
            Admin
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white">
          <div className="container mx-auto px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => handleNavClick(link.target)}
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
            <button
              onClick={() => { onAdminClick(); setMobileOpen(false) }}
              className="px-4 py-3 rounded-lg font-medium text-sm text-[#5a6c7d] text-left"
            >
              Admin Login
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
