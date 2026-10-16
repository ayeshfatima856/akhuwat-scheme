'use client'

import { useState } from 'react'
import { AnimateIn } from './animations'
import { useToast } from '@/hooks/use-toast'

export function ContactSection() {
  const [submitting, setSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await res.json()
      if (res.ok) {
        toast({ title: '✅ Message Sent!', description: result.message })
        e.currentTarget.reset()
      } else {
        toast({ title: '❌ Error', description: result.error, variant: 'destructive' })
      }
    } catch {
      toast({ title: '❌ Error', description: 'Network error', variant: 'destructive' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 md:py-28" style={{ background: '#f8fafb' }}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10">
          
          {/* Form */}
          <AnimateIn variant="fade-right">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#1a7a3c' }}>
                SEND MESSAGE
              </span>
              <h2
                className="my-4"
                style={{
                  fontFamily: 'var(--font-playfair), serif',
                  fontSize: 'clamp(1.8rem, 4vw, 2.3rem)',
                  color: '#2c3e50',
                }}
              >
                Hum Se Raabta Karein
              </h2>
              <p className="mb-5" style={{ color: '#5a6c7d' }}>
                Neeche form bharein, hamari team jald jawab degi.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold mb-1" style={{ color: '#2c3e50' }}>
                      Name <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      type="text" name="name" required
                      className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-[#1a7a3c] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1" style={{ color: '#2c3e50' }}>
                      Phone <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      type="tel" name="phone" required placeholder="+92 308 2171396"
                      className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-[#1a7a3c] focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold mb-1" style={{ color: '#2c3e50' }}>Email</label>
                    <input
                      type="email" name="email"
                      className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-[#1a7a3c] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1" style={{ color: '#2c3e50' }}>Subject</label>
                    <input
                      type="text" name="subject"
                      className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-[#1a7a3c] focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1" style={{ color: '#2c3e50' }}>
                    Message <span style={{ color: 'red' }}>*</span>
                  </label>
                  <textarea
                    name="message" rows={5} required
                    className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-[#1a7a3c] focus:outline-none transition-colors"
                  />
                </div>
                <button
                  type="submit" disabled={submitting}
                  className="px-7 py-3 rounded-full font-semibold text-white transition-transform hover:-translate-y-1 disabled:opacity-60"
                  style={{
                    background: 'linear-gradient(135deg, #d4af37 0%, #b8941f 100%)',
                    boxShadow: '0 6px 20px rgba(212,175,55,0.4)',
                  }}
                >
                  {submitting ? 'Bhej rahe hain...' : '📨 Send Message'}
                </button>
              </form>
            </div>
          </AnimateIn>

          {/* Contact Info */}
          <AnimateIn variant="fade-left">
            <div
              className="rounded-3xl p-8 h-full"
              style={{
                background: 'white',
                border: '1px solid #e8f5e9',
                boxShadow: '0 4px 20px rgba(15,82,40,0.08)',
              }}
            >
              <h4 className="mb-5" style={{ color: '#1a7a3c', fontFamily: 'var(--font-playfair), serif', fontSize: '1.4rem' }}>
                📞 Quick Contact
              </h4>
              
              <ContactItem icon="📱" label="Phone" value="+92 308 2171396" href="tel:+923082171396" />
              <ContactItem icon="💬" label="WhatsApp" value="Chat Now →" href="https://wa.me/923082171396" />
              <ContactItem icon="📧" label="Email" value="info@akhuwatscheme.com" href="mailto:info@akhuwatscheme.com" />
              <ContactItem icon="🕒" label="Working Hours" value="Mon - Sat: 9:00 AM - 6:00 PM" />
              <ContactItem icon="📍" label="Address" value="Lahore, Punjab, Pakistan" />

              <a
                href={`https://wa.me/923082171396?text=${encodeURIComponent('Assalam-o-Alaikum! Mujhe Akhuwat Scheme ke baare mein maloomat chahiye.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full mt-5 py-3 rounded-full font-semibold text-white text-center transition-transform hover:-translate-y-0.5"
                style={{ background: '#25d366' }}
              >
                💬 WhatsApp Now
              </a>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}

function ContactItem({ icon, label, value, href }: { icon: string; label: string; value: string; href?: string }) {
  return (
    <div className="flex items-center gap-3 mb-3.5" style={{ color: '#5a6c7d' }}>
      <div
        className="flex items-center justify-center flex-shrink-0"
        style={{ width: 35, height: 35, background: '#e8f5e9', borderRadius: '50%' }}
      >
        {icon}
      </div>
      <div>
        <strong style={{ color: '#2c3e50' }}>{label}:</strong>
        <br />
        {href ? (
          <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" style={{ color: '#1a7a3c' }}>
            {value}
          </a>
        ) : (
          value
        )}
      </div>
    </div>
  )
}

// ============================================================
// FOOTER
// ============================================================
export function Footer() {
  return (
    <footer style={{ background: '#0f5228', color: 'rgba(255,255,255,0.8)', paddingTop: 70 }}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/akhuwat-logo.svg" alt="Akhuwat" width={50} height={50} />
              <div>
                <h4 style={{ color: 'white', margin: 0, fontSize: '1.5rem', fontFamily: 'var(--font-playfair), serif' }}>
                  Akhuwat
                </h4>
                <small style={{ color: '#d4af37', letterSpacing: 3 }}>SCHEME</small>
              </div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', marginBottom: 12 }}>
              Akhuwat Scheme Pakistan ka trusted loan service hai jo aapko be-sood qarza faraham karta hai. 
              Hamari mission hai aapki maashi maddad karna.
            </p>
            <div className="flex gap-2.5 mt-4">
              {['📘', '🐦', '💬', '📷', '📺'].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex items-center justify-center transition-transform hover:-translate-y-1"
                  style={{
                    width: 40, height: 40,
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '50%',
                    fontSize: '1rem',
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 style={{ color: 'white', fontSize: '1.1rem', marginBottom: 20, fontWeight: 600 }}>Quick Links</h5>
            <ul className="space-y-2.5 list-none p-0">
              {['Home', 'About Us', 'Loan Types', 'Apply Now', 'Contact'].map((link, i) => (
                <li key={i}>
                  <a href="#" className="text-sm transition-colors hover:pl-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Loan Types */}
          <div>
            <h5 style={{ color: 'white', fontSize: '1.1rem', marginBottom: 20, fontWeight: 600 }}>Loan Types</h5>
            <ul className="space-y-2.5 list-none p-0">
              {['Business Loan', 'Personal Loan', 'Agriculture Loan', 'Education Loan', 'Home Loan', 'Emergency Loan'].map((link, i) => (
                <li key={i}>
                  <a href="#services" className="text-sm transition-colors hover:pl-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 style={{ color: 'white', fontSize: '1.1rem', marginBottom: 20, fontWeight: 600 }}>Contact Us</h5>
            <div className="space-y-3 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
              <div className="flex items-center gap-3">
                <span style={{ fontSize: '1.1rem' }}>📍</span> Lahore, Punjab, Pakistan
              </div>
              <div className="flex items-center gap-3">
                <span style={{ fontSize: '1.1rem' }}>📱</span>
                <a href="tel:+923082171396" style={{ color: 'inherit' }}>+92 308 2171396</a>
              </div>
              <div className="flex items-center gap-3">
                <span style={{ fontSize: '1.1rem' }}>📧</span> info@akhuwatscheme.com
              </div>
              <div className="flex items-center gap-3">
                <span style={{ fontSize: '1.1rem' }}>🕒</span> Mon - Sat: 9:00 AM - 6:00 PM
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div
        className="text-center py-5 mt-12"
        style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          color: 'rgba(255,255,255,0.6)',
          fontSize: '0.85rem',
        }}
      >
        &copy; {new Date().getFullYear()} Akhuwat Scheme. All Rights Reserved. | Made with ❤️ in Pakistan
      </div>
    </footer>
  )
}
