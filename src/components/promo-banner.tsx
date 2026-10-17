'use client'

import { AnimateIn } from './animations'
import { GraduationCap, FileText, Heart, ShieldCheck } from 'lucide-react'

// ============================================================
// PROMOTIONAL BANNER SECTION
// ============================================================
// Image jaisa banner - Akhuwat Foundation Student Loan style
// Old man (founder) + students (graduate, with book, with backpack)
// Promotional post showing loan services
// ============================================================

interface PromoBannerProps {
  onApplyClick: () => void
}

export function PromoBannerSection({ onApplyClick }: PromoBannerProps) {
  return (
    <section className="py-12 md:py-16" style={{ background: 'white' }}>
      <div className="container mx-auto px-4">
        
        {/* ===== BANNER 1: Student Loan (like the image) ===== */}
        <AnimateIn>
          <div
            className="rounded-3xl overflow-hidden relative"
            style={{
              background: 'linear-gradient(135deg, #0f5228 0%, #1a7a3c 50%, #2e8b57 100%)',
              boxShadow: '0 20px 60px rgba(15,82,40,0.3)',
            }}
          >
            <div className="grid md:grid-cols-2 items-center min-h-[400px]">
              
              {/* Left: Content */}
              <div className="p-8 md:p-12 text-white relative z-10">
                {/* Logo + tagline */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: 50, height: 50,
                      background: 'rgba(255,255,255,0.15)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 12,
                      border: '1px solid rgba(212,175,55,0.4)',
                    }}
                  >
                    <GraduationCap size={26} color="#f4d03f" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', letterSpacing: 3, color: '#f4d03f', fontWeight: 600 }}>
                      EDUCATE • EMPOWER • ELEVATE
                    </div>
                    <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>
                      Akhuwat Foundation
                    </div>
                  </div>
                </div>

                {/* Main heading */}
                <h2
                  style={{
                    fontFamily: 'var(--font-playfair), serif',
                    fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                    fontWeight: 700,
                    lineHeight: 1.15,
                    margin: 0,
                    marginBottom: 8,
                  }}
                >
                  AKHUWAT STUDENT LOAN
                </h2>

                <p style={{ fontSize: '1.1rem', opacity: 0.95, marginBottom: 16 }}>
                  Empowering students for a brighter future
                </p>

                {/* Urdu amount */}
                <div
                  style={{
                    fontFamily: 'Jameel Noori Nastaleeq, Noto Nastaliq Urdu, serif',
                    fontSize: '1.8rem',
                    color: '#f4d03f',
                    direction: 'rtl',
                    marginBottom: 20,
                    fontWeight: 600,
                  }}
                >
                  50 ہزار سے 5 لاکھ تک
                </div>

                {/* 4 services */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    { icon: Heart, title: 'Interest-Free Support', desc: '100% Be-sood' },
                    { icon: FileText, title: 'Simple Process', desc: 'Asaan tareeqa' },
                    { icon: GraduationCap, title: 'Educational Aid', desc: 'Taleem maddad' },
                    { icon: ShieldCheck, title: 'Trusted Guidance', desc: 'Amanat daari' },
                  ].map((service, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-2.5 rounded-lg"
                      style={{
                        background: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.15)',
                      }}
                    >
                      <service.icon size={18} color="#f4d03f" />
                      <div>
                        <div style={{ fontSize: '0.78rem', fontWeight: 600, lineHeight: 1.2 }}>
                          {service.title}
                        </div>
                        <div style={{ fontSize: '0.7rem', opacity: 0.8, lineHeight: 1.2 }}>
                          {service.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Apply button */}
                <button
                  onClick={onApplyClick}
                  className="px-7 py-3.5 rounded-full font-bold text-[#0f5228] transition-all hover:-translate-y-1 btn-shine"
                  style={{
                    background: 'linear-gradient(135deg, #f4d03f 0%, #d4af37 100%)',
                    boxShadow: '0 6px 20px rgba(212,175,55,0.4)',
                    fontSize: '1rem',
                  }}
                >
                  APPLY NOW →
                </button>
              </div>

              {/* Right: People images (old man + students) */}
              <div className="relative h-full min-h-[300px]">
                {/* Background pattern */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(135deg, rgba(15,82,40,0.3), rgba(46,139,87,0.1))',
                  }}
                />
                
                {/* Founder (old man with beard) - left side */}
                <div
                  className="absolute rounded-2xl overflow-hidden shadow-2xl"
                  style={{
                    top: '15%',
                    left: '8%',
                    width: '42%',
                    aspectRatio: '3/4',
                    border: '3px solid rgba(212,175,55,0.4)',
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=500&auto=format&fit=crop"
                    alt="Founder"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.currentTarget.src = 'https://ui-avatars.com/api/?name=Founder&size=400&background=0f5228&color=fff'
                    }}
                  />
                </div>

                {/* Student 1 - Graduate (top right) */}
                <div
                  className="absolute rounded-xl overflow-hidden shadow-xl"
                  style={{
                    top: '8%',
                    right: '8%',
                    width: '38%',
                    aspectRatio: '1',
                    border: '2px solid rgba(212,175,55,0.5)',
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=300&h=300&auto=format&fit=crop"
                    alt="Graduate Student"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.currentTarget.src = 'https://ui-avatars.com/api/?name=Graduate&size=300&background=1a7a3c&color=fff'
                    }}
                  />
                </div>

                {/* Student 2 - With book (bottom right) */}
                <div
                  className="absolute rounded-xl overflow-hidden shadow-xl"
                  style={{
                    bottom: '15%',
                    right: '12%',
                    width: '35%',
                    aspectRatio: '1',
                    border: '2px solid rgba(255,255,255,0.3)',
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&auto=format&fit=crop"
                    alt="Student with book"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.currentTarget.src = 'https://ui-avatars.com/api/?name=Student&size=300&background=2e8b57&color=fff'
                    }}
                  />
                </div>

                {/* Decorative elements */}
                <div
                  className="absolute rounded-full"
                  style={{
                    top: '40%',
                    left: '50%',
                    width: 80, height: 80,
                    background: 'rgba(244,208,63,0.15)',
                    border: '2px solid rgba(244,208,63,0.3)',
                  }}
                />
                
                {/* Verified badge */}
                <div
                  className="absolute px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1"
                  style={{
                    top: '5%', right: '5%',
                    background: 'rgba(26,122,60,0.95)',
                    color: 'white',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                  }}
                >
                  ✓ Verified Foundation
                </div>
              </div>
            </div>

            {/* Decorative bottom pattern */}
            <div
              style={{
                height: 4,
                background: 'linear-gradient(90deg, #f4d03f, #1a7a3c, #f4d03f)',
              }}
            />
          </div>
        </AnimateIn>

        {/* ===== BANNER 2: Business Loan (additional promo) ===== */}
        <AnimateIn delay={200}>
          <div
            className="rounded-3xl overflow-hidden relative mt-6"
            style={{
              background: 'linear-gradient(135deg, #d4af37 0%, #b8941f 50%, #0f5228 100%)',
              boxShadow: '0 20px 60px rgba(212,175,55,0.3)',
            }}
          >
            <div className="grid md:grid-cols-2 items-center min-h-[350px]">
              
              {/* Left: Image */}
              <div className="relative h-full min-h-[280px] order-2 md:order-1">
                <img
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&auto=format&fit=crop"
                  alt="Business Loan"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.currentTarget.src = 'https://ui-avatars.com/api/?name=Business&size=600&background=0f5228&color=fff'
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(135deg, rgba(15,82,40,0.4), transparent)',
                  }}
                />
                {/* Amount badge */}
                <div
                  className="absolute bottom-4 left-4 px-4 py-2 rounded-full font-bold text-white"
                  style={{
                    background: 'rgba(15,82,40,0.9)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  💼 Rs. 10 Lakh - 20 Lakh
                </div>
              </div>

              {/* Right: Content */}
              <div className="p-8 md:p-12 text-white order-1 md:order-2">
                <div style={{ fontSize: '0.7rem', letterSpacing: 3, color: '#fff', fontWeight: 600, marginBottom: 8 }}>
                  BUSINESS LOAN
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-playfair), serif',
                    fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                    fontWeight: 700,
                    marginBottom: 12,
                  }}
                >
                  Apna Karobar Shuru Karein
                </h3>
                <p style={{ fontSize: '1rem', opacity: 0.95, marginBottom: 12 }}>
                  Be-sood qarza - 10 saal tak asaan qistain - sirf Rs. 8,335 mahana
                </p>
                <div
                  style={{
                    fontFamily: 'Jameel Noori Nastaleeq, Noto Nastaliq Urdu, serif',
                    fontSize: '1.3rem',
                    direction: 'rtl',
                    marginBottom: 16,
                  }}
                >
                  اپنا کاروبار شروع کریں - سود سے پاک
                </div>
                <button
                  onClick={onApplyClick}
                  className="px-6 py-3 rounded-full font-bold text-[#0f5228] transition-all hover:-translate-y-1"
                  style={{
                    background: 'white',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                  }}
                >
                  Apply for Business Loan →
                </button>
              </div>
            </div>
          </div>
        </AnimateIn>

        {/* ===== BANNER 3: Home Loan ===== */}
        <AnimateIn delay={400}>
          <div
            className="rounded-3xl overflow-hidden relative mt-6"
            style={{
              background: 'linear-gradient(135deg, #1a7a3c 0%, #2e8b57 100%)',
              boxShadow: '0 20px 60px rgba(26,122,60,0.3)',
            }}
          >
            <div className="grid md:grid-cols-2 items-center min-h-[350px]">
              
              {/* Left: Content */}
              <div className="p-8 md:p-12 text-white">
                <div style={{ fontSize: '0.7rem', letterSpacing: 3, color: '#f4d03f', fontWeight: 600, marginBottom: 8 }}>
                  HOME LOAN
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-playfair), serif',
                    fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                    fontWeight: 700,
                    marginBottom: 12,
                  }}
                >
                  Apna Ghar Banayein
                </h3>
                <p style={{ fontSize: '1rem', opacity: 0.95, marginBottom: 12 }}>
                  30 lakh tak qarza - 15 saal ki asaan qistain - sirf Rs. 27,780 mahana
                </p>
                <div
                  style={{
                    fontFamily: 'Jameel Noori Nastaleeq, Noto Nastaliq Urdu, serif',
                    fontSize: '1.3rem',
                    direction: 'rtl',
                    marginBottom: 16,
                    color: '#f4d03f',
                  }}
                >
                  اپنا گھر بنائیں - خواب پورے کریں
                </div>
                <button
                  onClick={onApplyClick}
                  className="px-6 py-3 rounded-full font-bold text-[#0f5228] transition-all hover:-translate-y-1 btn-shine"
                  style={{
                    background: 'linear-gradient(135deg, #f4d03f, #d4af37)',
                    boxShadow: '0 4px 15px rgba(212,175,55,0.4)',
                  }}
                >
                  Apply for Home Loan →
                </button>
              </div>

              {/* Right: Image */}
              <div className="relative h-full min-h-[280px]">
                <img
                  src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&auto=format&fit=crop"
                  alt="Home Loan"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.currentTarget.src = 'https://ui-avatars.com/api/?name=Home&size=600&background=1a7a3c&color=fff'
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(135deg, transparent, rgba(15,82,40,0.4))',
                  }}
                />
                {/* Amount badge */}
                <div
                  className="absolute top-4 right-4 px-4 py-2 rounded-full font-bold text-white"
                  style={{
                    background: 'rgba(244,208,63,0.95)',
                    color: '#0f5228',
                  }}
                >
                  🏠 Rs. 30 - 50 Lakh
                </div>
              </div>
            </div>
          </div>
        </AnimateIn>

        {/* ===== BANNER 4: Akhuwat Loan Scheme (founder + Pakistan flag) ===== */}
        <AnimateIn delay={200}>
          <div
            className="rounded-3xl overflow-hidden relative mt-6 group cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #0f5228 0%, #1a7a3c 50%, #2e8b57 100%)',
              boxShadow: '0 20px 60px rgba(15,82,40,0.3)',
            }}
            onClick={onApplyClick}
          >
            <div className="relative" style={{ minHeight: '350px' }}>
              <img
                src="/gallery/akhuwat-loan-scheme.png"
                alt="Akhuwat Loan Scheme"
                style={{
                  width: '100%',
                  height: '100%',
                  minHeight: '350px',
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                className="group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.currentTarget.src = 'https://ui-avatars.com/api/?name=Akhuwat+Loan&size=600&background=0f5228&color=fff'
                }}
              />
              {/* Gradient overlay for text readability */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(15,82,40,0.3) 0%, transparent 50%, rgba(15,82,40,0.4) 100%)',
                }}
              />
              {/* Verified badge */}
              <div
                className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1"
                style={{
                  background: 'rgba(255,255,255,0.95)',
                  color: '#0f5228',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                }}
              >
                ✓ Official Foundation
              </div>
              {/* Apply Now overlay */}
              <div
                className="absolute bottom-6 right-6 px-5 py-2.5 rounded-full font-bold transition-all group-hover:scale-110"
                style={{
                  background: 'linear-gradient(135deg, #f4d03f, #d4af37)',
                  color: '#0f5228',
                  fontSize: '0.95rem',
                  boxShadow: '0 4px 15px rgba(212,175,55,0.5)',
                }}
              >
                Apply Now →
              </div>
            </div>
          </div>
        </AnimateIn>

        {/* ===== BANNER 5: Founder Dr. Muhammad Amjad Saqib ===== */}
        <AnimateIn delay={300}>
          <div
            className="rounded-3xl overflow-hidden relative mt-6 group cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #1a7a3c 0%, #0f5228 100%)',
              boxShadow: '0 20px 60px rgba(15,82,40,0.3)',
            }}
            onClick={onApplyClick}
          >
            <div className="grid md:grid-cols-2 items-center">
              {/* Image - Founder */}
              <div className="relative" style={{ minHeight: '300px' }}>
                <img
                  src="/gallery/founder-video.png"
                  alt="Dr. Muhammad Amjad Saqib - Founder"
                  style={{
                    width: '100%',
                    height: '100%',
                    minHeight: '300px',
                    objectFit: 'cover',
                  }}
                  className="group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.src = 'https://ui-avatars.com/api/?name=Founder&size=600&background=0f5228&color=fff'
                  }}
                />
                {/* Play button overlay */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ background: 'rgba(0,0,0,0.2)' }}
                >
                  <div
                    className="flex items-center justify-center rounded-full"
                    style={{
                      width: 70, height: 70,
                      background: 'rgba(255,255,255,0.95)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                    }}
                  >
                    <div
                      style={{
                        width: 0, height: 0,
                        borderTop: '12px solid transparent',
                        borderBottom: '12px solid transparent',
                        borderLeft: '20px solid #1a7a3c',
                        marginLeft: 4,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-10 text-white">
                <div style={{ fontSize: '0.75rem', letterSpacing: 3, color: '#f4d03f', fontWeight: 600, marginBottom: 8 }}>
                  FOUNDER MESSAGE
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-playfair), serif',
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    fontWeight: 700,
                    marginBottom: 8,
                  }}
                >
                  Dr. Muhammad Amjad Saqib
                </h3>
                <p style={{ fontSize: '0.95rem', opacity: 0.9, marginBottom: 12 }}>
                  Founder, Akhuwat Foundation
                </p>
                <div
                  style={{
                    fontFamily: 'Jameel Noori Nastaleeq, Noto Nastaliq Urdu, serif',
                    fontSize: '1.3rem',
                    direction: 'rtl',
                    marginBottom: 16,
                    color: '#f4d03f',
                    lineHeight: 1.6,
                  }}
                >
                  ایمان، احسان، اخلاص
                </div>
                <p style={{ fontSize: '0.9rem', opacity: 0.85, lineHeight: 1.6, marginBottom: 20 }}>
                  "Humara mission hai be-sood qarza de kar logon ki maddad karna. Hum ek aisa muashra banana chahte hain jahan koi bhi paiso ki kami se apne khaab poore na kar sake."
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onApplyClick()
                  }}
                  className="px-6 py-3 rounded-full font-semibold transition-all hover:-translate-y-1 btn-shine"
                  style={{
                    background: 'linear-gradient(135deg, #f4d03f, #d4af37)',
                    color: '#0f5228',
                  }}
                >
                  Watch Full Message →
                </button>
              </div>
            </div>
          </div>
        </AnimateIn>

        {/* ===== BANNER 6: Boost Your Business ===== */}
        <AnimateIn delay={400}>
          <div
            className="rounded-3xl overflow-hidden relative mt-6 group cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #2e8b57 0%, #1a7a3c 100%)',
              boxShadow: '0 20px 60px rgba(15,82,40,0.3)',
            }}
            onClick={onApplyClick}
          >
            <div className="relative" style={{ minHeight: '400px' }}>
              <img
                src="/gallery/boost-business.png"
                alt="Boost Your Business with Akhuwat Loans"
                style={{
                  width: '100%',
                  height: '100%',
                  minHeight: '400px',
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                className="group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.currentTarget.src = 'https://ui-avatars.com/api/?name=Business+Loan&size=600&background=1a7a3c&color=fff'
                }}
              />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.6) 100%)',
                }}
              />
              {/* Loan Approved badge */}
              <div
                className="absolute top-6 right-6 px-4 py-2 rounded-full font-bold transform rotate-12"
                style={{
                  background: '#dc3545',
                  color: 'white',
                  fontSize: '0.9rem',
                  boxShadow: '0 4px 15px rgba(220,53,69,0.5)',
                  border: '2px solid white',
                }}
              >
                ✓ LOAN APPROVED
              </div>
              {/* Apply Now button */}
              <div
                className="absolute bottom-6 left-1/2 transform -translate-x-1/2 px-7 py-3 rounded-full font-bold transition-all group-hover:scale-110"
                style={{
                  background: 'linear-gradient(135deg, #f4d03f, #d4af37)',
                  color: '#0f5228',
                  fontSize: '1rem',
                  boxShadow: '0 6px 20px rgba(212,175,55,0.6)',
                }}
              >
                Apply Now - 10% Discount on Fee →
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
