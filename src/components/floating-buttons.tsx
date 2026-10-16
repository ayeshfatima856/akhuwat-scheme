'use client'

import { useEffect, useState } from 'react'
import { MessageCircle, ArrowUp } from 'lucide-react'
import { getWhatsAppLink } from '@/lib/site-config'

export function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // WhatsApp link config se aa raha hai (site-config.ts mein change karein)
  const whatsappLink = getWhatsAppLink()

  return (
    <>
      {/* WhatsApp Floating Button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center text-white transition-transform hover:scale-110"
        style={{
          width: 60,
          height: 60,
          background: '#25d366',
          borderRadius: '50%',
          boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
          animation: 'whatsappPulse 2s infinite',
        }}
        title="Chat on WhatsApp"
      >
        <style>{`
          @keyframes whatsappPulse {
            0% { box-shadow: 0 0 0 0 rgba(37,211,102,0.7); }
            70% { box-shadow: 0 0 0 15px rgba(37,211,102,0); }
            100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); }
          }
        `}</style>
        <MessageCircle size={30} fill="white" />
      </a>

      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 right-6 z-40 flex items-center justify-center text-white transition-transform hover:-translate-y-1"
          style={{
            width: 45,
            height: 45,
            background: '#1a7a3c',
            borderRadius: '50%',
            boxShadow: '0 4px 20px rgba(15,82,40,0.2)',
          }}
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </>
  )
}
