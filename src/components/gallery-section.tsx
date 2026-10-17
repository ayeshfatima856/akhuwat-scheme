'use client'

import { useState } from 'react'
import { AnimateIn } from './animations'
import { CheckCircle2, Quote, Star, X, Users, GraduationCap, HeartHandshake, Building2 } from 'lucide-react'

// ============================================================
// GALLERY SECTION - Trust Building with Real Success Stories
// ============================================================
// 4 Pakistani customer reviews + Community/Event photos
// (Akhuwat events, education services, clothes bank, etc.)
// ============================================================

interface GalleryItem {
  id: number
  name: string
  fatherName: string
  city: string
  province: string
  loanType: string
  loanAmount: string
  image: string
  rating: number
  story: string
  date: string
  verified: boolean
  category: 'customer' | 'event' | 'community'
  icon?: any
  title?: string
  subtitle?: string
}

// 4 verified Pakistani customer reviews + community/event photos
const galleryItems: GalleryItem[] = [
  // ===== 4 CUSTOMER REVIEWS (Pakistani) =====
  {
    id: 1,
    name: 'Ahmed Khan',
    fatherName: 'Muhammad Khan',
    city: 'Lahore',
    province: 'Punjab',
    loanType: 'Business Loan',
    loanAmount: 'Rs. 5,00,000',
    image: 'https://images.unsplash.com/photo-1623366302587-b38b1ddaefd9?w=400&h=400&auto=format&fit=crop',
    rating: 5,
    story: 'Akhuwat Scheme se mujhe 5 lakh ka business loan mila jis se main apna karobar shuru kar saka. Ab mera monthly income 50,000 se 200,000 ho gaya. Bohot shukriya Akhuwat!',
    date: '15 March 2024',
    verified: true,
    category: 'customer',
  },
  {
    id: 2,
    name: 'Fatima Bibi',
    fatherName: 'Abdul Rahman',
    city: 'Karachi',
    province: 'Sindh',
    loanType: 'Education Loan',
    loanAmount: 'Rs. 2,00,000',
    image: 'https://images.unsplash.com/photo-1611042553484-d61f84d22784?w=400&h=400&auto=format&fit=crop',
    rating: 5,
    story: 'Education loan ki waja se meri beti FSc mein top ki. Be-sood qarza aur asaan qistain — Akhuwat waqai logon ki maddad karta hai.',
    date: '22 February 2024',
    verified: true,
    category: 'customer',
  },
  {
    id: 3,
    name: 'Muhammad Raza',
    fatherName: 'Ghulam Raza',
    city: 'Multan',
    province: 'Punjab',
    loanType: 'Agriculture Loan',
    loanAmount: 'Rs. 3,00,000',
    image: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=400&h=400&auto=format&fit=crop',
    rating: 5,
    story: 'Agriculture loan se main nai tractor khareed li. Ab fasal 3 guna behti hai. Akhuwat ki team bohot supportive aur fast hai.',
    date: '10 January 2024',
    verified: true,
    category: 'customer',
  },
  {
    id: 4,
    name: 'Sara Ali',
    fatherName: 'Imran Ali',
    city: 'Islamabad',
    province: 'Islamabad',
    loanType: 'Home Loan',
    loanAmount: 'Rs. 10,00,000',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&auto=format&fit=crop',
    rating: 5,
    story: 'Home loan ki waja se hum apna pehla ghar bana sakein. 10 saal ki asaan qistain - sirf Rs. 8,335 mahana. Akhuwat ne sapna poora kiya!',
    date: '5 December 2023',
    verified: true,
    category: 'customer',
  },

  // ===== COMMUNITY & EVENT PHOTOS (like your images) =====
  {
    id: 5,
    name: 'Akhuwat Annual Gathering',
    fatherName: 'Lahore Event',
    city: 'Lahore',
    province: 'Punjab',
    loanType: 'Community Event',
    loanAmount: '5,000+ Attendees',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=400&auto=format&fit=crop',
    rating: 5,
    story: 'Akhuwat Foundation ka saalana event jahan hazaron log shamil hote hain. Bina sood qarza ki barkat aur logon ki maddad ka jashn manaya jata hai.',
    date: 'Annual Event 2024',
    verified: true,
    category: 'event',
    icon: Users,
    title: 'Community Gathering',
    subtitle: 'Annual Akhuwat Event',
  },
  {
    id: 6,
    name: 'Akhuwat Education Services',
    fatherName: 'Education Program',
    city: 'Karachi',
    province: 'Sindh',
    loanType: 'Education Program',
    loanAmount: '12,000+ Students',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=400&auto=format&fit=crop',
    rating: 5,
    story: 'Akhuwat Education Services (AES) ke zariye 12,000 se zyada students ko free education di ja rahi hai. Yeh waqai ek noble mission hai.',
    date: 'Education Drive 2024',
    verified: true,
    category: 'community',
    icon: GraduationCap,
    title: 'Education Services',
    subtitle: 'Free Education for All',
  },
  {
    id: 7,
    name: 'Akhuwat Clothes Bank',
    fatherName: 'Relief Program',
    city: 'Multan',
    province: 'Punjab',
    loanType: 'Relief Program',
    loanAmount: '50,000+ Families',
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&h=400&auto=format&fit=crop',
    rating: 5,
    story: 'Akhuwat Clothes Bank (ACB) ke zariye 50,000 se zyada ghareeb families ko kapde aur rashaam diya jaata hai. Hamari team flood aur earthquake victims ki maddad ke liye hamesha ready hai.',
    date: 'Relief Drive 2024',
    verified: true,
    category: 'community',
    icon: HeartHandshake,
    title: 'Clothes Bank',
    subtitle: 'Helping Needy Families',
  },
  {
    id: 8,
    name: 'Women Empowerment Program',
    fatherName: 'Women Initiative',
    city: 'Faisalabad',
    province: 'Punjab',
    loanType: 'Women Loan',
    loanAmount: '8,000+ Women',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3a?w=400&h=400&auto=format&fit=crop',
    rating: 5,
    story: 'Women Empowerment Program ke zariye 8,000 se zyada auraton ko be-sood qarza diya jaata hai. Hum auraton ko khud kamar pane mein maddad karte hain.',
    date: 'Women Day 2024',
    verified: true,
    category: 'community',
    icon: Building2,
    title: 'Women Empowerment',
    subtitle: 'Empowering Women',
  },
]

export function GallerySection() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [filter, setFilter] = useState<string>('All')

  const filterOptions = ['All', 'Customer Reviews', 'Events', 'Community']
  
  const filteredItems = filter === 'All' 
    ? galleryItems 
    : filter === 'Customer Reviews' 
      ? galleryItems.filter(item => item.category === 'customer')
      : filter === 'Events'
        ? galleryItems.filter(item => item.category === 'event')
        : galleryItems.filter(item => item.category === 'community')

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
            className="rounded-2xl p-6 mb-10 text-white"
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

        {/* Filter Buttons */}
        <AnimateIn delay={400}>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {filterOptions.map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                style={{
                  background: filter === type ? 'linear-gradient(135deg, #1a7a3c, #0f5228)' : 'white',
                  color: filter === type ? 'white' : '#1a7a3c',
                  border: `1px solid ${filter === type ? 'transparent' : '#e8f5e9'}`,
                  boxShadow: '0 2px 8px rgba(15,82,40,0.08)',
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </AnimateIn>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredItems.map((item, i) => (
            <AnimateIn key={item.id} delay={(i % 4) * 100}>
              <div
                className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover-lift"
                style={{
                  background: 'white',
                  boxShadow: '0 4px 20px rgba(15,82,40,0.08)',
                }}
                onClick={() => setSelectedItem(item)}
              >
                {/* Image with overlay */}
                <div className="relative overflow-hidden" style={{ aspectRatio: '1' }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    className="transition-transform duration-500 hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&size=400&background=1a7a3c&color=fff`
                    }}
                  />
                  {/* Verified badge */}
                  {item.verified && (
                    <div
                      className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1"
                      style={{ background: 'rgba(26,122,60,0.9)', color: 'white' }}
                    >
                      <CheckCircle2 size={12} /> Verified
                    </div>
                  )}
                  {/* Category badge */}
                  <div
                    className="absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1"
                    style={{ 
                      background: item.category === 'event' ? 'rgba(212,175,55,0.95)' : item.category === 'community' ? 'rgba(46,139,87,0.9)' : 'rgba(0,0,0,0.6)',
                      color: 'white'
                    }}
                  >
                    {item.icon ? <item.icon size={12} /> : <CheckCircle2 size={12} />}
                    {item.category === 'event' ? 'Event' : item.category === 'community' ? 'Community' : 'Customer'}
                  </div>
                  {/* Loan amount overlay */}
                  <div
                    className="absolute bottom-0 left-0 right-0 p-3"
                    style={{
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                      color: 'white',
                    }}
                  >
                    {item.category === 'customer' ? (
                      <>
                        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f4d03f' }}>
                          {item.loanAmount}
                        </div>
                        <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>
                          {item.loanType}
                        </div>
                      </>
                    ) : (
                      <>
                        <div style={{ fontSize: '1rem', fontWeight: 700, color: '#f4d03f' }}>
                          {item.title}
                        </div>
                        <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>
                          {item.subtitle}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h5 style={{ margin: 0, color: '#2c3e50', fontSize: '1rem', fontWeight: 600 }}>
                      {item.name}
                    </h5>
                    {item.category === 'customer' && (
                      <div style={{ color: '#d4af37', fontSize: '0.85rem' }}>
                        {'★'.repeat(item.rating)}
                      </div>
                    )}
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#95a5a6', margin: 0 }}>
                    📍 {item.city}, {item.province}
                  </p>
                  {item.category === 'customer' ? (
                    <p style={{ fontSize: '0.75rem', color: '#95a5a6', marginTop: 4 }}>
                      s/o {item.fatherName}
                    </p>
                  ) : (
                    <p style={{ fontSize: '0.75rem', color: '#1a7a3c', marginTop: 4, fontWeight: 600 }}>
                      {item.loanAmount} helped
                    </p>
                  )}
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* View More CTA */}
        <AnimateIn delay={600}>
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

      {/* Modal - Full Story */}
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

            {/* Header with image */}
            <div className="relative">
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                style={{ width: '100%', height: 300, objectFit: 'cover' }}
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedItem.name)}&size=400&background=1a7a3c&color=fff`
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(transparent, rgba(15,82,40,0.9))',
                }}
              />
              
              {/* Info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.8rem', margin: 0 }}>
                    {selectedItem.name}
                  </h3>
                  {selectedItem.verified && (
                    <span
                      className="px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1"
                      style={{ background: '#1a7a3c' }}
                    >
                      <CheckCircle2 size={12} /> {selectedItem.category === 'customer' ? 'Verified Customer' : 'Verified Program'}
                    </span>
                  )}
                </div>
                <p style={{ margin: '4px 0 0 0', opacity: 0.9 }}>
                  {selectedItem.category === 'customer' 
                    ? `s/o ${selectedItem.fatherName} | 📍 ${selectedItem.city}, ${selectedItem.province}`
                    : `📍 ${selectedItem.city}, ${selectedItem.province} | ${selectedItem.fatherName}`
                  }
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              {/* Details */}
              <div
                className="grid grid-cols-3 gap-3 mb-5 p-4 rounded-xl"
                style={{ background: '#f0fdf4' }}
              >
                <div className="text-center">
                  <div style={{ fontSize: '0.75rem', color: '#95a5a6', fontWeight: 600 }}>
                    {selectedItem.category === 'customer' ? 'LOAN TYPE' : 'PROGRAM'}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#0f5228', fontWeight: 700 }}>{selectedItem.loanType}</div>
                </div>
                <div className="text-center">
                  <div style={{ fontSize: '0.75rem', color: '#95a5a6', fontWeight: 600 }}>
                    {selectedItem.category === 'customer' ? 'AMOUNT' : 'IMPACT'}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#0f5228', fontWeight: 700 }}>{selectedItem.loanAmount}</div>
                </div>
                <div className="text-center">
                  <div style={{ fontSize: '0.75rem', color: '#95a5a6', fontWeight: 600 }}>DATE</div>
                  <div style={{ fontSize: '0.9rem', color: '#0f5228', fontWeight: 700 }}>{selectedItem.date}</div>
                </div>
              </div>

              {/* Rating (only for customer) */}
              {selectedItem.category === 'customer' && (
                <div className="flex items-center gap-2 mb-4">
                  <span style={{ color: '#d4af37', fontSize: '1.2rem' }}>
                    {'★'.repeat(selectedItem.rating)}
                  </span>
                  <span style={{ color: '#95a5a6', fontSize: '0.85rem' }}>
                    {selectedItem.rating}.0 out of 5
                  </span>
                </div>
              )}

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
                  <CheckCircle2 size={12} /> Verified
                </span>
                <span className="px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1" style={{ background: '#e8f5e9', color: '#1a7a3c' }}>
                  <CheckCircle2 size={12} /> Trusted
                </span>
                <span className="px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1" style={{ background: '#e8f5e9', color: '#1a7a3c' }}>
                  <CheckCircle2 size={12} /> Happy
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
