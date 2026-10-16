'use client'

import { useEffect, useState } from 'react'

export function Preloader() {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Progress bar animation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 80)

    // Hide preloader after 2.2 seconds
    const timer = setTimeout(() => setVisible(false), 2200)
    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-700"
      style={{
        background: 'linear-gradient(135deg, #0f5228 0%, #1a7a3c 50%, #2e8b57 100%)',
        opacity: visible ? 1 : 0,
      }}
    >
      <style>{`
        @keyframes logoEntry {
          0% { transform: scale(0) rotate(-180deg); opacity: 0; }
          50% { transform: scale(1.15) rotate(10deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes textSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shine {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 30px rgba(212,175,55,0.4); }
          50% { box-shadow: 0 0 60px rgba(212,175,55,0.8); }
        }
        @keyframes ringExpand {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>

      {/* Decorative rings */}
      <div
        className="absolute rounded-full border-2"
        style={{
          width: 200, height: 200,
          borderColor: 'rgba(212,175,55,0.4)',
          animation: 'ringExpand 2s ease-out infinite',
        }}
      />
      <div
        className="absolute rounded-full border-2"
        style={{
          width: 200, height: 200,
          borderColor: 'rgba(212,175,55,0.3)',
          animation: 'ringExpand 2s ease-out 0.5s infinite',
        }}
      />

      {/* Logo container with glow */}
      <div
        className="relative rounded-full p-4"
        style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px)',
          border: '2px solid rgba(212,175,55,0.4)',
          animation: 'glowPulse 2s ease-in-out infinite',
          marginBottom: 30,
        }}
      >
        <img
          src="/akhuwat-logo.svg"
          alt="Akhuwat Scheme"
          width={120}
          height={120}
          style={{ animation: 'logoEntry 1.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
        />
      </div>

      {/* Brand name with shine effect */}
      <div
        style={{
          fontFamily: 'var(--font-playfair), serif',
          fontSize: '2.5rem',
          fontWeight: 700,
          letterSpacing: '4px',
          background: 'linear-gradient(90deg, #ffffff 0%, #f4d03f 50%, #ffffff 100%)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'shine 2s linear infinite, textSlideUp 1s ease 0.5s both',
          marginBottom: 8,
        }}
      >
        AKHUWAT
      </div>
      <div
        style={{
          color: '#f4d03f',
          fontSize: '0.9rem',
          letterSpacing: '8px',
          animation: 'textSlideUp 1s ease 0.8s both',
          marginBottom: 30,
        }}
      >
        SCHEME
      </div>

      {/* Progress bar */}
      <div
        style={{
          width: 220,
          height: 4,
          background: 'rgba(255,255,255,0.2)',
          borderRadius: 2,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #f4d03f, #d4af37)',
            borderRadius: 2,
            transition: 'width 0.3s ease',
            boxShadow: '0 0 10px rgba(244,208,63,0.6)',
          }}
        />
      </div>
      <div
        style={{
          color: 'rgba(255,255,255,0.7)',
          fontSize: '0.75rem',
          marginTop: 10,
          letterSpacing: 2,
          animation: 'textSlideUp 1s ease 1s both',
        }}
      >
        Loading... {progress}%
      </div>
    </div>
  )
}
