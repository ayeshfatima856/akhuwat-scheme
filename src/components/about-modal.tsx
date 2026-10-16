'use client'

import { useState, useEffect } from 'react'
import { X, Target, Eye, Heart, Scale, Gem, HandHeart } from 'lucide-react'

interface AboutModalProps {
  open: boolean
  onClose: () => void
}

export function AboutModal({ open, onClose }: AboutModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => { document.body.style.overflow = 'auto' }
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] overflow-y-auto animate-fade-in"
      style={{ background: 'rgba(0,0,0,0.7)' }}
      onClick={onClose}
    >
      <div
        className="min-h-screen flex items-start justify-center p-0 md:p-4 md:py-8"
      >
        <div
          className="bg-white w-full max-w-5xl min-h-screen md:min-h-0 md:rounded-3xl overflow-hidden animate-slide-up"
          onClick={(e) => e.stopPropagation()}
          style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
        >
          {/* Hero Header */}
          <div
            className="relative overflow-hidden p-8 md:p-16 text-white"
            style={{
              background: 'linear-gradient(135deg, #0f5228 0%, #1a7a3c 50%, #2e8b57 100%)',
            }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 bg-white/20 hover:bg-white/30 rounded-full p-2.5 transition-all"
              style={{ zIndex: 10 }}
            >
              <X size={24} />
            </button>

            {/* Decorative circles */}
            <div
              className="absolute rounded-full"
              style={{
                width: 200, height: 200, top: -50, right: -50,
                background: 'rgba(212,175,55,0.15)',
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                width: 150, height: 150, bottom: -50, left: -30,
                background: 'rgba(255,255,255,0.1)',
              }}
            />

            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <div
                className="inline-flex items-center justify-center mb-5"
                style={{
                  width: 90, height: 90,
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '50%',
                  border: '2px solid rgba(212,175,55,0.4)',
                }}
              >
                <img src="/akhuwat-logo.svg" alt="Akhuwat" width={60} height={60} />
              </div>
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-3"
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(212,175,55,0.4)',
                  color: '#f4d03f',
                }}
              >
                About Us
              </span>
              <h1
                style={{
                  fontFamily: 'var(--font-playfair), serif',
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  fontWeight: 700,
                  marginBottom: 12,
                  lineHeight: 1.2,
                }}
              >
                Hamari Kahani
              </h1>
              <div
                style={{
                  fontFamily: 'Jameel Noori Nastaleeq, Noto Nastaliq Urdu, serif',
                  fontSize: '1.6rem',
                  color: '#f4d03f',
                  direction: 'rtl',
                  marginBottom: 16,
                }}
              >
                2002 سے آپ کی خدمت میں
              </div>
              <p style={{ fontSize: '1.05rem', opacity: 0.95, maxWidth: 600, margin: '0 auto' }}>
                Akhuwat Scheme Pakistan ka trusted be-sood qarza faraham karne wala institution hai.
                Hamari shuruwat 2002 mein hui thi aur aaj hum 25+ shehron mein apni services faraham kar rahe hain.
              </p>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 md:p-12 space-y-12">
            
            {/* Story Section */}
            <div>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="hover-zoom rounded-2xl overflow-hidden" style={{ boxShadow: '0 10px 30px rgba(15,82,40,0.15)' }}>
                  <img
                    src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&auto=format&fit=crop"
                    alt="Akhuwat Story"
                    style={{ width: '100%', height: 350, objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#1a7a3c' }}>
                    OUR STORY
                  </span>
                  <h2
                    className="mt-3 mb-4"
                    style={{
                      fontFamily: 'var(--font-playfair), serif',
                      fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                      color: '#2c3e50',
                    }}
                  >
                    Be-sood Qarza Ki Ek Nayi Shuruwat
                  </h2>
                  <p style={{ color: '#5a6c7d', marginBottom: 12, lineHeight: 1.7 }}>
                    Akhuwat Scheme 2002 mein Lahore mein shuru hua tha. Hamari shuruwaat sirf ek choti si koshish se hui thi —
                    muft qarza de kar logon ki maddad karna. Aaj hum Pakistan ke 25+ shehron mein apni services faraham kar rahe hain.
                  </p>
                  <p style={{ color: '#5a6c7d', marginBottom: 12, lineHeight: 1.7 }}>
                    Hamari mission hai ek aisa muashra banana jahan koi bhi paiso ki kami ki waja se apne khaab poore na kar sake.
                    Hum be-sood qarza de kar logon ko khud kamar pane mein maddad karte hain.
                  </p>
                  <div
                    style={{
                      fontFamily: 'Jameel Noori Nastaleeq, Noto Nastaliq Urdu, serif',
                      fontSize: '1.3rem',
                      direction: 'rtl',
                      color: '#0f5228',
                      background: '#f0fdf4',
                      padding: '15px 20px',
                      borderRadius: 12,
                      borderLeft: '4px solid #1a7a3c',
                    }}
                  >
                    ہماری mistrust ہے: سود سے پاک معاشرہ
                  </div>
                </div>
              </div>
            </div>

            {/* Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-6">
              <div
                className="hover-lift rounded-2xl p-7"
                style={{
                  background: 'linear-gradient(135deg, #f0fdf4 0%, #e8f5e9 100%)',
                  border: '1px solid #d4edda',
                }}
              >
                <div
                  className="inline-flex items-center justify-center mb-4"
                  style={{
                    width: 60, height: 60,
                    background: 'linear-gradient(135deg, #1a7a3c, #0f5228)',
                    borderRadius: 15,
                  }}
                >
                  <Target size={28} color="white" />
                </div>
                <h3 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.5rem', color: '#0f5228', marginBottom: 10 }}>
                  Hamari Mission
                </h3>
                <div
                  style={{
                    fontFamily: 'Jameel Noori Nastaleeq, Noto Nastaliq Urdu, serif',
                    fontSize: '1.15rem',
                    color: '#2c3e50',
                    direction: 'rtl',
                    lineHeight: 1.8,
                    marginBottom: 10,
                  }}
                >
                  پاکستان کے تمام شہروں میں بے سود قرضہ فراہم کر کے لوگوں کی معاشی مدد کرنا
                </div>
                <p style={{ color: '#5a6c7d', fontSize: '0.95rem' }}>
                  Pakistan ke tamam shehron mein be-sood qarza faraham kar k logon ki maashi maddad karna aur unhe apne pairo par khade hone mein maddad dena.
                </p>
              </div>

              <div
                className="hover-lift rounded-2xl p-7"
                style={{
                  background: 'linear-gradient(135deg, #fefcf5 0%, #fdf6e3 100%)',
                  border: '1px solid #f4d03f',
                }}
              >
                <div
                  className="inline-flex items-center justify-center mb-4"
                  style={{
                    width: 60, height: 60,
                    background: 'linear-gradient(135deg, #d4af37, #b8941f)',
                    borderRadius: 15,
                  }}
                >
                  <Eye size={28} color="white" />
                </div>
                <h3 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.5rem', color: '#0f5228', marginBottom: 10 }}>
                  Hamari Vision
                </h3>
                <div
                  style={{
                    fontFamily: 'Jameel Noori Nastaleeq, Noto Nastaliq Urdu, serif',
                    fontSize: '1.15rem',
                    color: '#2c3e50',
                    direction: 'rtl',
                    lineHeight: 1.8,
                    marginBottom: 10,
                  }}
                >
                  ایک ایسا پاکستان جہاں کوئی بھی پیسے کی وجہ سے اپنے خواب پورے نہ کر سکے
                </div>
                <p style={{ color: '#5a6c7d', fontSize: '0.95rem' }}>
                  Ek aisa Pakistan jahan koi bhi paiso ki waja se apne khaab poore na kar sake. Sab ke liye barabar mauke.
                </p>
              </div>
            </div>

            {/* Values Grid */}
            <div>
              <div className="text-center mb-8">
                <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#1a7a3c' }}>
                  OUR VALUES
                </span>
                <h2
                  className="mt-3"
                  style={{
                    fontFamily: 'var(--font-playfair), serif',
                    fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                    color: '#2c3e50',
                  }}
                >
                  Jo Humen Aap Ka Sathi Banata Hai
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { icon: HandHeart, title: 'Amanat Daari', urdu: 'امانت داری', desc: 'Aapke paiso aur information ki mukammal amanat daari.', color: '#1a7a3c' },
                  { icon: Scale, title: 'Insaaf', urdu: 'انصاف', desc: 'Sab ke liye barabar mauke, koi tafreeq nahi.', color: '#d4af37' },
                  { icon: Gem, title: 'Khulasa', urdu: 'خلوص', desc: 'Saaf saaf process, koi hidden charges nahi.', color: '#ea580c' },
                  { icon: Heart, title: 'Hamdardi', urdu: 'ہمدردی', desc: 'Aapki har zaroorat ko hamdardi se sunna.', color: '#0f5228' },
                ].map((value, i) => (
                  <div
                    key={i}
                    className="hover-lift text-center rounded-2xl p-6"
                    style={{
                      background: 'white',
                      border: '1px solid #e8f5e9',
                      boxShadow: '0 2px 12px rgba(15,82,40,0.06)',
                    }}
                  >
                    <div
                      className="inline-flex items-center justify-center mb-4"
                      style={{
                        width: 55, height: 55,
                        background: `linear-gradient(135deg, ${value.color}, ${value.color}dd)`,
                        borderRadius: '50%',
                      }}
                    >
                      <value.icon size={26} color="white" />
                    </div>
                    <h5 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.15rem', color: '#2c3e50', marginBottom: 4 }}>
                      {value.title}
                    </h5>
                    <div
                      style={{
                        fontFamily: 'Jameel Noori Nastaleeq, Noto Nastaliq Urdu, serif',
                        fontSize: '1.2rem',
                        color: value.color,
                        direction: 'rtl',
                        marginBottom: 8,
                      }}
                    >
                      {value.urdu}
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#5a6c7d' }}>
                      {value.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Bar */}
            <div
              className="rounded-2xl p-8 text-white text-center"
              style={{ background: 'linear-gradient(135deg, #1a7a3c 0%, #0f5228 100%)' }}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { num: '15+', label: 'Years of Service' },
                  { num: '50K+', label: 'Happy Customers' },
                  { num: '25+', label: 'Cities Served' },
                  { num: '500Cr+', label: 'Loan Disbursed' },
                ].map((stat, i) => (
                  <div key={i}>
                    <div style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: '#f4d03f', fontFamily: 'var(--font-playfair), serif' }}>
                      {stat.num}
                    </div>
                    <div style={{ fontSize: '0.85rem', opacity: 0.9, marginTop: 4 }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center pb-4">
              <button
                onClick={onClose}
                className="px-8 py-3.5 rounded-full font-semibold text-white transition-all hover:-translate-y-1 btn-shine"
                style={{
                  background: 'linear-gradient(135deg, #1a7a3c 0%, #0f5228 100%)',
                  boxShadow: '0 6px 20px rgba(26,122,60,0.3)',
                }}
              >
                ← Wapas Website Par
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
