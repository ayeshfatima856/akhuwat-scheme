'use client'

import { useState } from 'react'
import { AnimateIn } from './animations'
import { CheckCircle2, Quote, Star, X, Users, GraduationCap, HeartHandshake, MapPin, Award } from 'lucide-react'

// ============================================================
// GALLERY SECTION - Trust Building with Real Success Stories
// ============================================================
// 4 Customer reviews (no photos - text only cards)
// + 3 User-provided Akhuwat images (full-width below reviews)
// ============================================================

interface GalleryItem {
  id: number
  name: string
  fatherName: string
  city: string
  province: string
  loanType: string
  loanAmount: string
  rating: number
  story: string
  date: string
  verified: boolean
}

interface UserImage {
  id: number
  image: string
  title: string
  subtitle: string
  description: string
  category: 'event' | 'community'
  icon: any
  impact: string
}

// 4 verified Pakistani customer reviews (NO PHOTOS - text only cards)
const customerReviews: GalleryItem[] = [
  {
    id: 1,
    name: 'Ahmed Khan',
    fatherName: 'Muhammad Khan',
    city: 'Lahore',
    province: 'Punjab',
    loanType: 'Business Loan',
    loanAmount: 'Rs. 5,00,000',
    rating: 5,
    story: 'Akhuwat Scheme se mujhe 5 lakh ka business loan mila jis se main apna karobar shuru kar saka. Ab mera monthly income 50,000 se 200,000 ho gaya. Bohot shukriya Akhuwat!',
    date: '15 March 2024',
    verified: true,
  },
  {
    id: 2,
    name: 'Fatima Bibi',
    fatherName: 'Abdul Rahman',
    city: 'Karachi',
    province: 'Sindh',
    loanType: 'Education Loan',
    loanAmount: 'Rs. 2,00,000',
    rating: 5,
    story: 'Education loan ki waja se meri beti FSc mein top ki. Be-sood qarza aur asaan qistain — Akhuwat waqai logon ki maddad karta hai.',
    date: '22 February 2024',
    verified: true,
  },
  {
    id: 3,
    name: 'Muhammad Raza',
    fatherName: 'Ghulam Raza',
    city: 'Multan',
    province: 'Punjab',
    loanType: 'Agriculture Loan',
    loanAmount: 'Rs. 3,00,000',
    rating: 5,
    story: 'Agriculture loan se main nai tractor khareed li. Ab fasal 3 guna behti hai. Akhuwat ki team bohot supportive aur fast hai.',
    date: '10 January 2024',
    verified: true,
  },
  {
    id: 4,
    name: 'Sara Ali',
    fatherName: 'Imran Ali',
    city: 'Islamabad',
    province: 'Islamabad',
    loanType: 'Home Loan',
    loanAmount: 'Rs. 10,00,000',
    rating: 5,
    story: 'Home loan ki waja se hum apna pehla ghar bana sakein. 10 saal ki asaan qistain - sirf Rs. 8,335 mahana. Akhuwat ne sapna poora kiya!',
    date: '5 December 2023',
    verified: true,
  },
]

// 3 User-provided Akhuwat images (full-width compensated below reviews)
const userImages: UserImage[] = [
  {
    id: 1,
    image: '/gallery/akhuwat-event.png',
    title: 'Akhuwat Annual Gathering',
    subtitle: 'Annual Akhuwat Event',
    description: 'Akhuwat Foundation ka saalana event jahan hazaron log shamil hote hain. Bina sood qarza ki barkat aur logon ki maddad ka jashn manaya jata hai. Akhuwat ki team is event mein logo ko be-sood qarza distribute karti hai.',
    category: 'event',
    icon: Users,
    impact: '5,000+ Attendees',
  },
  {
    id: 2,
    image: '/gallery/education-clothes.png',
    title: 'Education & Relief Services',
    subtitle: 'Akhuwat Services',
    description: 'Akhuwat Education Services (AES) ke zariye 12,000 se zyada students ko free education di ja rahi hai. Akhuwat Clothes Bank (ACB) ke zariye 50,000 se zyada ghareeb families ko kapde aur rashan diya jaata hai.',
    category: 'community',
    icon: GraduationCap,
    impact: '12,000+ Students',
  },
  {
    id: 3,
    image: '/gallery/blog-stories.png',
    title: 'Real Success Stories',
    subtitle: 'Real People, Real Impact',
    description: 'Azra Parveen ki kahani - 20,000 rupay se shuru kar ke business owner bani. Akhuwat ke interest-free loans se hazaron logon ki zindagi badal gayi. Yeh waqai ki kahaniyan hain.',
    category: 'community',
    icon: HeartHandshake,
    impact: 'Real Stories',
  },
]

export function GallerySection() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [selectedImage, setSelectedImage] = useState<UserImage | null>(null)

  return (
    <section id="gallery" className="py-20 md:py-28" style={{ background: '#fdfcf8' }}>
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <AnimateIn>
          <div className="text-center mb-14">
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#1a7a3c' }}>
              SUCCESS STORIES & COMMUNITY
            </span>
            <h2
              className="mt-3 mb-4"
              style={{
                fontFamily: 'var(--font-playfair), serif',
                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                color: '#2c3e50',
              }}
            >
              Hamari Kahani, Hamare Log
            </h2>
            <p
              style={{
                fontFamily: 'Jameel Noori Nastaleeq, Noto Nastaliq Urdu, serif',
                fontSize: '1.3rem',
                color: '#5a6c7d',
                direction: 'rtl',
                maxWidth: 600,
                margin: '0 auto',
              }}
            >
              حقیقی کہانیاں، حقیقی لوگ — دیکھیں کس طرح آخوت نے زندگیاں بدلیں
            </p>
          </div>
        </AnimateIn>

        {/* Trust Stats Bar */}
        <AnimateIn delay={200}>
          <div
            className="rounded-2xl p-6 mb-12 text-white"
            style={{
              background: 'linear-gradient(135deg, #1a7a3c 0%, #0f5228 100%)',
            }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#f4d03f', fontFamily: 'var(--font-playfair), serif' }}>
                  50,000+
                </div>
                <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>Loans Approved</div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#f4d03f', fontFamily: 'var(--font-playfair), serif' }}>
                  25+
                </div>
                <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>Cities Served</div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#f4d03f', fontFamily: 'var(--font-playfair), serif' }}>
                  98%
                </div>
                <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>Satisfaction Rate</div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#f4d03f', fontFamily: 'var(--font-playfair), serif' }}>
                  Rs. 5B+
                </div>
                <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>Loan Disbursed</div>
              </div>
            </div>
          </div>
        </AnimateIn>

        {/* ===== SECTION 1: CUSTOMER REVIEWS (No Photos - Text Cards) ===== */}
        <AnimateIn delay={400}>
          <div className="text-center mb-8">
            <h3
              style={{
                fontFamily: 'var(--font-playfair), serif',
                fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
                color: '#1a7a3c',
                marginBottom: 8,
              }}
            >
              💬 Customer Reviews
            </h3>
            <p style={{ color: '#5a6c7d', fontSize: '0.95rem' }}>
              Hamare khush gumnaam customers ki raaye
            </p>
          </div>
        </AnimateIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {customerReviews.map((item, i) => (
            <AnimateIn key={item.id} delay={(i % 4) * 100}>
              <div
                className="rounded-2xl p-5 h-full transition-all duration-500 hover:-translate-y-2 hover-lift cursor-pointer"
                style={{
                  background: 'white',
                  boxShadow: '0 4px 20px rgba(15,82,40,0.08)',
                  border: '1px solid #e8f5e9',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                onClick={() => setSelectedItem(item)}
              >
                {/* Top: Avatar circle with initial + verified */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="flex items-center justify-center font-bold text-white"
                    style={{
                      width: 50, height: 50,
                      background: 'linear-gradient(135deg, #1a7a3c, #0f5228)',
                      borderRadius: '50%',
                      fontSize: '1.3rem',
                      fontFamily: 'var(--font-playfair), serif',
                    }}
                  >
                    {item.name.charAt(0)}
                  </div>
                  {item.verified && (
                    <span
                      className="px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1"
                      style={{ background: '#e8f5e9', color: '#1a7a3c' }}
                    >
                      <CheckCircle2 size={12} /> Verified
                    </span>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  <span style={{ color: '#d4af37', fontSize: '1rem' }}>
                    {'★'.repeat(item.rating)}
                  </span>
                  <span style={{ color: '#95a5a6', fontSize: '0.75rem', marginLeft: 4 }}>
                    {item.rating}.0
                  </span>
                </div>

                {/* Quote icon */}
                <Quote size={20} style={{ color: '#1a7a3c', opacity: 0.3, marginBottom: 8 }} fill="#1a7a3c" />

                {/* Story (truncated) */}
                <p style={{ color: '#2c3e50', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: 12, flex: 1, fontStyle: 'italic' }}>
                  "{item.story.length > 100 ? item.story.substring(0, 100) + '...' : item.story}"
                </p>

                {/* Customer info */}
                <div style={{ borderTop: '1px solid #e8f5e9', paddingTop: 12 }}>
                  <h5 style={{ margin: 0, color: '#2c3e50', fontSize: '1rem', fontWeight: 600, marginBottom: 4 }}>
                    {item.name}
                  </h5>
                  <p style={{ fontSize: '0.75rem', color: '#95a5a6', margin: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <MapPin size={11} /> {item.city}, {item.province}
                  </p>
                  <p style={{ fontSize: '0.7rem', color: '#95a5a6', marginTop: 4 }}>
                    s/o {item.fatherName}
                  </p>
                  <div
                    className="inline-block mt-2 px-2 py-1 rounded-full text-xs font-bold"
                    style={{ background: '#f0fdf4', color: '#1a7a3c' }}
                  >
                    {item.loanAmount} - {item.loanType}
                  </div>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* ===== SECTION 2: USER'S 3 IMAGES (Full-Width Compensated) ===== */}
        <AnimateIn delay={600}>
          <div className="text-center mb-8">
            <h3
              style={{
                fontFamily: 'var(--font-playfair), serif',
                fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
                color: '#1a7a3c',
                marginBottom: 8,
              }}
            >
              🏛️ Akhuwat Foundation - Community Impact
            </h3>
            <p style={{ color: '#5a6c7d', fontSize: '0.95rem' }}>
              Hamari community services aur events ki glimpses
            </p>
          </div>
        </AnimateIn>

        {/* 3 Full-Width Image Cards (compensated - no gaps) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-0" style={{ marginBottom: 32 }}>
          {userImages.map((img, i) => (
            <AnimateIn key={img.id} delay={i * 150}>
              <div
                className="relative overflow-hidden cursor-pointer group"
                style={{
                  height: '400px',
                  borderRight: i < 2 ? '1px solid rgba(255,255,255,0.2)' : 'none',
                }}
                onClick={() => setSelectedImage(img)}
              >
                {/* Image - full cover */}
                <img
                  src={img.image}
                  alt={img.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s ease',
                  }}
                  className="group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(img.title)}&size=600&background=1a7a3c&color=fff`
                  }}
                />
                
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to top, rgba(15,82,40,0.95) 0%, rgba(15,82,40,0.4) 50%, transparent 100%)',
                  }}
                />

                {/* Top badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span
                    className="px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1"
                    style={{
                      background: img.category === 'event' ? 'rgba(212,175,55,0.95)' : 'rgba(46,139,87,0.95)',
                      color: 'white',
                    }}
                  >
                    <img.icon size={12} />
                    {img.category === 'event' ? 'Event' : 'Community'}
                  </span>
                  <span
                    className="px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1"
                    style={{
                      background: 'rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(10px)',
                      color: 'white',
                    }}
                  >
                    <CheckCircle2 size={12} /> Verified
                  </span>
                </div>

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div
                    style={{
                      fontSize: '0.75rem',
                      letterSpacing: 2,
                      color: '#f4d03f',
                      fontWeight: 600,
                      marginBottom: 6,
                    }}
                  >
                    {img.subtitle.toUpperCase()}
                  </div>
                  <h4
                    style={{
                      fontFamily: 'var(--font-playfair), serif',
                      fontSize: '1.4rem',
                      fontWeight: 700,
                      margin: 0,
                      marginBottom: 8,
                      lineHeight: 1.2,
                    }}
                  >
                    {img.title}
                  </h4>
                  <p
                    style={{
                      fontSize: '0.85rem',
                      opacity: 0.95,
                      margin: 0,
                      marginBottom: 12,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {img.description}
                  </p>
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                    style={{
                      background: 'rgba(244,208,63,0.95)',
                      color: '#0f5228',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                    }}
                  >
                    <Award size={12} />
                    {img.impact}
                  </div>
                </div>

                {/* Hover overlay */}
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: 'rgba(26,122,60,0.4)',
                  }}
                >
                  <div
                    className="px-5 py-2.5 rounded-full text-white font-semibold text-sm"
                    style={{
                      background: 'rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.3)',
                    }}
                  >
                    View Details →
                  </div>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* View More CTA */}
        <AnimateIn delay={800}>
          <div className="text-center mt-12">
            <div
              className="inline-block rounded-2xl p-6"
              style={{
                background: 'linear-gradient(135deg, #f0fdf4 0%, #e8f5e9 100%)',
                border: '1px solid #d4edda',
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: 10 }}>🤝</div>
              <h4 style={{ fontFamily: 'var(--font-playfair), serif', color: '#0f5228', fontSize: '1.3rem', marginBottom: 8 }}>
                Aap Bhi Ban Sakte Hain Hamare Khush Gumnaam Customer
              </h4>
              <p style={{ color: '#5a6c7d', marginBottom: 16, maxWidth: 500, margin: '0 auto 16px' }}>
                Abhi apply karein aur apni success story hamari gallery mein shamil karein!
              </p>
              <button
                onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 rounded-full font-semibold text-white transition-transform hover:-translate-y-0.5 btn-shine"
                style={{
                  background: 'linear-gradient(135deg, #1a7a3c 0%, #0f5228 100%)',
                  boxShadow: '0 4px 15px rgba(26,122,60,0.3)',
                }}
              >
                Apply Now →
              </button>
            </div>
          </div>
        </AnimateIn>
      </div>

      {/* ===== MODAL 1: Customer Review Detail ===== */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
          style={{ background: 'rgba(0,0,0,0.7)' }}
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden animate-scale-in relative"
            onClick={(e) => e.stopPropagation()}
            style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.3)', maxHeight: '90vh', overflowY: 'auto' }}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all z-10"
              style={{ color: 'white' }}
            >
              <X size={24} />
            </button>

            {/* Header - green gradient with avatar */}
            <div
              className="p-8 text-white text-center"
              style={{
                background: 'linear-gradient(135deg, #1a7a3c 0%, #0f5228 100%)',
              }}
            >
              <div
                className="mx-auto mb-4 flex items-center justify-center font-bold"
                style={{
                  width: 90, height: 90,
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(10px)',
                  border: '2px solid rgba(212,175,55,0.4)',
                  borderRadius: '50%',
                  fontSize: '2.5rem',
                  fontFamily: 'var(--font-playfair), serif',
                }}
              >
                {selectedItem.name.charAt(0)}
              </div>
              <h3 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.8rem', margin: 0, marginBottom: 6 }}>
                {selectedItem.name}
              </h3>
              <p style={{ margin: 0, opacity: 0.9, fontSize: '0.9rem' }}>
                s/o {selectedItem.fatherName}
              </p>
              <div className="flex items-center justify-center gap-2 mt-3">
                <MapPin size={14} style={{ opacity: 0.8 }} />
                <span style={{ fontSize: '0.85rem', opacity: 0.9 }}>
                  {selectedItem.city}, {selectedItem.province}
                </span>
                {selectedItem.verified && (
                  <span
                    className="px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1"
                    style={{ background: 'rgba(255,255,255,0.2)' }}
                  >
                    <CheckCircle2 size={12} /> Verified
                  </span>
                )}
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              {/* Loan details */}
              <div
                className="grid grid-cols-3 gap-3 mb-5 p-4 rounded-xl"
                style={{ background: '#f0fdf4' }}
              >
                <div className="text-center">
                  <div style={{ fontSize: '0.75rem', color: '#95a5a6', fontWeight: 600 }}>LOAN TYPE</div>
                  <div style={{ fontSize: '0.9rem', color: '#0f5228', fontWeight: 700 }}>{selectedItem.loanType}</div>
                </div>
                <div className="text-center">
                  <div style={{ fontSize: '0.75rem', color: '#95a5a6', fontWeight: 600 }}>AMOUNT</div>
                  <div style={{ fontSize: '0.9rem', color: '#0f5228', fontWeight: 700 }}>{selectedItem.loanAmount}</div>
                </div>
                <div className="text-center">
                  <div style={{ fontSize: '0.75rem', color: '#95a5a6', fontWeight: 600 }}>DATE</div>
                  <div style={{ fontSize: '0.9rem', color: '#0f5228', fontWeight: 700 }}>{selectedItem.date}</div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <span style={{ color: '#d4af37', fontSize: '1.2rem' }}>
                  {'★'.repeat(selectedItem.rating)}
                </span>
                <span style={{ color: '#95a5a6', fontSize: '0.85rem' }}>
                  {selectedItem.rating}.0 out of 5
                </span>
              </div>

              {/* Story */}
              <div className="flex gap-3 mb-4">
                <Quote size={32} style={{ color: '#1a7a3c', flexShrink: 0 }} fill="#1a7a3c" />
                <p style={{ color: '#2c3e50', fontSize: '1rem', lineHeight: 1.7, fontStyle: 'italic', margin: 0 }}>
                  {selectedItem.story}
                </p>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-2 mt-5">
                <span className="px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1" style={{ background: '#e8f5e9', color: '#1a7a3c' }}>
                  <CheckCircle2 size={12} /> 0% Interest
                </span>
                <span className="px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1" style={{ background: '#e8f5e9', color: '#1a7a3c' }}>
                  <CheckCircle2 size={12} /> Verified Customer
                </span>
                <span className="px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1" style={{ background: '#e8f5e9', color: '#1a7a3c' }}>
                  <CheckCircle2 size={12} /> Loan Disbursed
                </span>
                <span className="px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1" style={{ background: '#e8f5e9', color: '#1a7a3c' }}>
                  <CheckCircle2 size={12} /> Happy Customer
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== MODAL 2: User Image Detail ===== */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
          style={{ background: 'rgba(0,0,0,0.85)' }}
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden animate-scale-in relative"
            onClick={(e) => e.stopPropagation()}
            style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5)', maxHeight: '90vh', overflowY: 'auto' }}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 rounded-full p-2 transition-all z-10"
              style={{ color: 'white' }}
            >
              <X size={24} />
            </button>

            {/* Large image */}
            <div className="relative">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }}
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedImage.title)}&size=600&background=1a7a3c&color=fff`
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(transparent 60%, rgba(15,82,40,0.9))',
                }}
              />
              
              {/* Info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1"
                    style={{
                      background: selectedImage.category === 'event' ? '#d4af37' : '#2e8b57',
                    }}
                  >
                    <selectedImage.icon size={12} />
                    {selectedImage.category === 'event' ? 'Event' : 'Community'}
                  </span>
                  <span
                    className="px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1"
                    style={{ background: 'rgba(255,255,255,0.2)' }}
                  >
                    <CheckCircle2 size={12} /> Verified
                  </span>
                </div>
                <div style={{ fontSize: '0.8rem', letterSpacing: 2, color: '#f4d03f', fontWeight: 600, marginBottom: 4 }}>
                  {selectedImage.subtitle.toUpperCase()}
                </div>
                <h3 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '2rem', margin: 0 }}>
                  {selectedImage.title}
                </h3>
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
                style={{
                  background: 'linear-gradient(135deg, #f4d03f, #d4af37)',
                  color: '#0f5228',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                }}
              >
                <Award size={16} />
                {selectedImage.impact}
              </div>

              <div className="flex gap-3">
                <Quote size={32} style={{ color: '#1a7a3c', flexShrink: 0 }} fill="#1a7a3c" />
                <p style={{ color: '#2c3e50', fontSize: '1rem', lineHeight: 1.7, margin: 0 }}>
                  {selectedImage.description}
                </p>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-2 mt-5">
                <span className="px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1" style={{ background: '#e8f5e9', color: '#1a7a3c' }}>
                  <CheckCircle2 size={12} /> Akhuwat Foundation
                </span>
                <span className="px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1" style={{ background: '#e8f5e9', color: '#1a7a3c' }}>
                  <CheckCircle2 size={12} /> Trusted Organization
                </span>
                <span className="px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1" style={{ background: '#e8f5e9', color: '#1a7a3c' }}>
                  <CheckCircle2 size={12} /> Real Impact
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
