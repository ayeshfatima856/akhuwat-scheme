'use client'

import { useEffect, useState } from 'react'
import { MessageCircle, ArrowUp, X } from 'lucide-react'
import { getWhatsAppLink, SITE_CONFIG } from '@/lib/site-config'

export function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [showTooltip, setShowTooltip] = useState(true)

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll)
    
    // Auto-hide tooltip after 5 seconds
    const timer = setTimeout(() => setShowTooltip(false), 5000)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timer)
    }
  }, [])

  // WhatsApp link config se aa raha hai (site-config.ts mein change karein)
  const whatsappLink = getWhatsAppLink()

  return (
    <>
      <style>{`
        @keyframes whatsappPulse {
          0% { box-shadow: 0 0 0 0 rgba(37,211,102,0.7); }
          70% { box-shadow: 0 0 0 20px rgba(37,211,102,0); }
          100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>

      {/* WhatsApp Floating Button - LEFT SIDE (Prominent) */}
      <div
        className="fixed left-4 md:left-6 bottom-6 z-40 flex items-center gap-2"
        style={{ animation: 'slideInLeft 0.5s ease-out' }}
      >
        {/* WhatsApp Chat Tooltip (auto-hides after 5 sec) */}
        {showTooltip && (
          <div
            className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-full text-white text-sm font-medium shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #25d366, #128c4b)',
              boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
              cursor: 'pointer',
            }}
            onClick={() => window.open(whatsappLink, '_blank')}
          >
            <span>💬 Chat with us!</span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowTooltip(false)
              }}
              className="ml-1 hover:bg-white/20 rounded-full p-0.5 transition-colors"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* Main WhatsApp Button - Bada aur Prominent */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center text-white transition-transform hover:scale-110"
          style={{
            width: 70,
            height: 70,
            background: 'linear-gradient(135deg, #25d366 0%, #128c4b 100%)',
            borderRadius: '50%',
            boxShadow: '0 6px 25px rgba(37,211,102,0.5)',
            animation: 'whatsappPulse 2s infinite',
          }}
          title="Chat with us on WhatsApp"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={36} fill="white" />
        </a>
      </div>

      {/* Scroll to Top - Right Side (chhota) */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 flex items-center justify-center text-white transition-transform hover:-translate-y-1"
          style={{
            width: 50,
            height: 50,
            background: 'linear-gradient(135deg, #1a7a3c, #0f5228)',
            borderRadius: '50%',
            boxShadow: '0 4px 20px rgba(15,82,40,0.3)',
          }}
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </button>
      )}

      {/* Mobile WhatsApp Tooltip (text only, shows briefly) */}
      {showTooltip && (
        <div
          className="md:hidden fixed left-4 bottom-24 z-40 px-3 py-1.5 rounded-full text-white text-xs font-medium"
          style={{
            background: 'rgba(15,82,40,0.9)',
            backdropFilter: 'blur(10px)',
          }}
        >
          💬 WhatsApp us!
        </div>
      )}
    </>
  )
}
