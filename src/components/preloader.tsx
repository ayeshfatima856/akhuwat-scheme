'use client'

import { useEffect, useState } from 'react'

export function Preloader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Hide preloader after 2 seconds
    const timer = setTimeout(() => setVisible(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-700"
      style={{
        background: 'linear-gradient(135deg, #1a7a3c 0%, #0f5228 100%)',
        opacity: visible ? 1 : 0,
      }}
    >
      <style>{`
        @keyframes logoEntry {
          0% { transform: scale(0) rotate(-180deg); opacity: 0; }
          60% { transform: scale(1.1) rotate(10deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes textSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes loaderMove {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(350%); }
        }
      `}</style>
      
      <img
        src="/akhuwat-logo.svg"
        alt="Akhuwat Scheme"
        width={150}
        height={150}
        style={{ animation: 'logoEntry 1.5s cubic-bezier(0.4, 0, 0.2, 1)', marginBottom: 30 }}
      />
      
      <div
        style={{
          fontFamily: 'var(--font-playfair), serif',
          fontSize: '2rem',
          fontWeight: 700,
          color: 'white',
          letterSpacing: '3px',
          animation: 'textSlideUp 1s ease 0.5s both',
        }}
      >
        AKHUWAT
      </div>
      <div
        style={{
          color: '#f4d03f',
          fontSize: '0.9rem',
          letterSpacing: '6px',
          marginTop: 8,
          animation: 'textSlideUp 1s ease 0.8s both',
        }}
      >
        SCHEME
      </div>
      
      <div
        style={{
          width: 200,
          height: 4,
          background: 'rgba(255,255,255,0.2)',
          borderRadius: 2,
          marginTop: 30,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: '40%',
            height: '100%',
            background: '#f4d03f',
            borderRadius: 2,
            animation: 'loaderMove 1.2s infinite ease-in-out',
          }}
        />
      </div>
    </div>
  )
}
