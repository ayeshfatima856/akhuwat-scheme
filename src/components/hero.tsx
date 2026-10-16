'use client'

import { AnimateIn } from './animations'
import { getWhatsAppLink } from '@/lib/site-config'

interface HeroProps {
  onApplyClick: () => void
}

export function Hero({ onApplyClick }: HeroProps) {
  // WhatsApp link config se aa raha hai (site-config.ts mein change karein)
  const whatsappLink = getWhatsAppLink()

  return (
    <section
      id="home"
      className="relative overflow-hidden flex items-center"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a7a3c 0%, #0f5228 100%)',
        paddingTop: 120,
        paddingBottom: 80,
        color: 'white',
      }}
    >
      {/* Decorative elements */}
      <div
        className="absolute rounded-full"
        style={{
          width: 200, height: 200, top: '10%', right: '5%',
          background: 'rgba(212,175,55,0.1)',
          animation: 'float 6s ease-in-out infinite',
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: 150, height: 150, bottom: '15%', left: '10%',
          background: 'rgba(212,175,55,0.1)',
          animation: 'float 6s ease-in-out 2s infinite',
        }}
      />
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(180deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          
          {/* Left: Text Content */}
          <div>
            <span
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium mb-5"
              style={{
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(212,175,55,0.4)',
                color: '#f4d03f',
                animation: 'fadeInUp 1s ease',
              }}
            >
              ✨ Pakistan&apos;s Trusted Loan Scheme
            </span>

            <h1
              style={{
                fontFamily: 'var(--font-playfair), serif',
                fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                lineHeight: 1.15,
                marginBottom: 12,
                color: 'white',
                animation: 'fadeInUp 1s ease 0.2s both',
              }}
            >
              Be-sood Qarza,<br />
              <span style={{ color: '#f4d03f', fontStyle: 'italic' }}>Aapke Karam</span> ka Sathi
            </h1>

            {/* Urdu tagline */}
            <div
              style={{
                fontFamily: 'Jameel Noori Nastaleeq, Noto Nastaliq Urdu, serif',
                fontSize: '1.6rem',
                color: '#f4d03f',
                direction: 'rtl',
                marginBottom: 18,
                animation: 'fadeInUp 1s ease 0.3s both',
              }}
            >
              آخوت لون: سود سے پاک
            </div>

            <p
              className="mb-7"
              style={{
                fontSize: '1.1rem',
                color: 'rgba(255,255,255,0.9)',
                maxWidth: 550,
                animation: 'fadeInUp 1s ease 0.4s both',
              }}
            >
              Akhuwat Scheme aapko deta hai asaan, be-sood qarza — karobar shuru karne, 
              taleem hasil karne, ya emergency waqt mein maddad ke liye. Abhi apply karein 
              aur apne khaab poore karein!
            </p>

            <div
              className="flex flex-wrap gap-3"
              style={{ animation: 'fadeInUp 1s ease 0.6s both' }}
            >
              <button
                onClick={onApplyClick}
                className="px-8 py-3.5 rounded-full font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{
                  background: 'linear-gradient(135deg, #d4af37 0%, #b8941f 100%)',
                  boxShadow: '0 6px 20px rgba(212,175,55,0.4)',
                  border: 'none',
                }}
              >
                📝 Apply for Loan
              </button>
              <button
                onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3.5 rounded-full font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/25"
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(10px)',
                  border: '2px solid rgba(255,255,255,0.3)',
                }}
              >
                💰 View Plans
              </button>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full font-semibold text-white transition-all duration-300 hover:-translate-y-1 inline-flex items-center gap-2 hover:bg-white/25"
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(10px)',
                  border: '2px solid rgba(255,255,255,0.3)',
                }}
              >
                💬 WhatsApp Us
              </a>
            </div>
          </div>

          {/* Right: Stats Card */}
          <div style={{ animation: 'fadeInUp 1s ease 0.4s both' }}>
            <div
              className="rounded-3xl p-8 md:p-10"
              style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              <div className="grid grid-cols-2 gap-6">
                <StatBox number="50K+" label="Loans Approved" />
                <StatBox number="Rs. 5B+" label="Total Disbursed" />
              </div>
              <hr style={{ borderColor: 'rgba(255,255,255,0.2)', margin: '25px 0' }} />
              <div className="grid grid-cols-2 gap-6">
                <StatBox number="25+" label="Cities Served" />
                <StatBox number="98%" label="Satisfaction" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StatBox({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <div
        style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          color: '#f4d03f',
          fontFamily: 'var(--font-playfair), serif',
          lineHeight: 1,
        }}
      >
        {number}
      </div>
      <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', marginTop: 5 }}>
        {label}
      </div>
    </div>
  )
}
