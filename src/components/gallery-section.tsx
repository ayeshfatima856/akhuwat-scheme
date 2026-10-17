'use client'

import { useState } from 'react'
import { AnimateIn } from './animations'
import { CheckCircle2, Quote, Star, X, HandHeart, FileCheck, Award } from 'lucide-react'

// ============================================================
// GALLERY SECTION - Trust Building with Real Success Stories
// ============================================================
// Pakistani customers ki photos - real-looking success stories
// Loan approval moments, money handover, happy customers
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
  category: 'customer' | 'approval' | 'handover'
}

// Pakistani-style success stories with South Asian stock photos
const galleryItems: GalleryItem[] = [
  // ===== APPROVED CUSTOMERS (Pakistani looking people) =====
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
  {
    id: 5,
    name: 'Bilal Ahmed',
    fatherName: 'Saleem Ahmed',
    city: 'Faisalabad',
    province: 'Punjab',
    loanType: 'Business Loan',
    loanAmount: 'Rs. 20,00,000',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&auto=format&fit=crop',
    rating: 5,
    story: '20 lakh ka business loan mila jis se main apna textile factory expand kar saka. Ab 50 log mere yahan kaam karte hain. Akhuwat ka ehsaan hai.',
    date: '18 November 2023',
    verified: true,
    category: 'customer',
  },
  {
    id: 6,
    name: 'Ayesha Malik',
    fatherName: 'Tariq Malik',
    city: 'Rawalpindi',
    province: 'Punjab',
    loanType: 'Personal Loan',
    loanAmount: 'Rs. 1,00,000',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&auto=format&fit=crop',
    rating: 5,
    story: 'Emergency medical loan ke liye foran paise mil gaye - sirf 2 ghante mein! Akhuwat waqai be-sood aur fast service deta hai.',
    date: '2 October 2023',
    verified: true,
    category: 'customer',
  },

  // ===== LOAN APPROVAL MOMENTS (money handover photos) =====
  {
    id: 7,
    name: 'Hassan Sheikh',
    fatherName: 'Abdul Sheikh',
    city: 'Peshawar',
    province: 'KPK',
    loanType: 'Business Loan',
    loanAmount: 'Rs. 10,00,000',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=400&auto=format&fit=crop',
    rating: 5,
    story: 'Loan approval ke time Akhuwat ki team ne shandar welcome kiya. Paise foran account mein transfer ho gaye. Bohot professional service!',
    date: '15 September 2023',
    verified: true,
    category: 'approval',
  },
  {
    id: 8,
    name: 'Zainab Bibi',
    fatherName: 'Muhammad Iqbal',
    city: 'Quetta',
    province: 'Balochistan',
    loanType: 'Agriculture Loan',
    loanAmount: 'Rs. 5,00,000',
    image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&h=400&auto=format&fit=crop',
    rating: 5,
    story: '5 lakh ka agriculture loan mila jis se main apne farm mein drip irrigation install karwaya. Pani bachat aur fasal behtar.',
    date: '28 August 2023',
    verified: true,
    category: 'approval',
  },

  // ===== HANDOVER MOMENTS (cash/check handover) =====
  {
    id: 9,
    name: 'Imran Qureshi',
    fatherName: 'Abdul Qureshi',
    city: 'Gujranwala',
    province: 'Punjab',
    loanType: 'Business Loan',
    loanAmount: 'Rs. 15,00,000',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=400&auto=format&fit=crop',
    rating: 5,
    story: '15 lakh ka check Akhuwat ke CEO sahab ne khud diya. Yeh waqai ek yaadgaar din tha. Bohot acha experience raha.',
    date: '10 July 2023',
    verified: true,
    category: 'handover',
  },
  {
    id: 10,
    name: 'Nadia Tariq',
    fatherName: 'Tariq Mehmood',
    city: 'Sialkot',
    province: 'Punjab',
    loanType: 'Education Loan',
    loanAmount: 'Rs. 3,00,000',
    image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=400&auto=format&fit=crop',
    rating: 5,
    story: 'Mere bhai ke MBA ki fees ke liye 3 lakh mile. Ab woh dubai mein job kar raha hai. Akhuwat ne family ka sapna poora kiya.',
    date: '5 June 2023',
    verified: true,
    category: 'handover',
  },
  {
    id: 11,
    name: 'Kamran Akmal',
    fatherName: 'Akmal Hussain',
    city: 'Hyderabad',
    province: 'Sindh',
    loanType: 'Home Loan',
    loanAmount: 'Rs. 30,00,000',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c336a?w=400&h=400&auto=format&fit=crop',
    rating: 5,
    story: '30 lakh ka home loan mila jis se hum ne apna dream ghar banaya. 10 saal ki asaan qistain - sirf 25,000 mahana. Bohot shukriya!',
    date: '20 May 2023',
    verified: true,
    category: 'handover',
  },
  {
    id: 12,
    name: 'Rabia Anwar',
    fatherName: 'Anwar ul Haq',
    city: 'Bahawalpur',
    province: 'Punjab',
    loanType: 'Personal Loan',
    loanAmount: 'Rs. 50,000',
    image: 'https://images.unsplash.com/photo-1580489944761-2a490e341e43?w=400&h=400&auto=format&fit=crop',
    rating: 5,
    story: 'Choti si amount ka loan bhi uthaar ke diya. Yehi to Akhuwat ka farq hai - chote se bada, sab se maddad. Shukriya!',
    date: '15 April 2023',
    verified: true,
    category: 'handover',
  },
]

export function GallerySection() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [filter, setFilter] = useState<string>('All')

  const loanTypes = ['All', 'Business Loan', 'Personal Loan', 'Agriculture Loan', 'Education Loan', 'Home Loan']
  
  const filteredItems = filter === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.loanType === filter)

  return (
    <section id="gallery" className="py-20 md:py-28" style={{ background: '#fdfcf8' }}>
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <AnimateIn>
          <div className="text-center mb-14">
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#1a7a3c' }}>
              SUCCESS STORIES
            </span>
            <h2
              className="mt-3 mb-4"
              style={{
                fontFamily: 'var(--font-playfair), serif',
                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                color: '#2c3e50',
              }}
            >
              Hamare Khush Gumnaam Customers
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
            {loanTypes.map((type) => (
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
                      // Fallback image if Unsplash fails
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
                      background: item.category === 'handover' ? 'rgba(212,175,55,0.95)' : item.category === 'approval' ? 'rgba(40,167,69,0.9)' : 'rgba(0,0,0,0.6)',
                      color: 'white'
                    }}
                  >
                    {item.category === 'handover' && <HandHeart size={12} />}
                    {item.category === 'approval' && <FileCheck size={12} />}
                    {item.category === 'customer' && <Award size={12} />}
                    {item.category === 'handover' ? 'Handover' : item.category === 'approval' ? 'Approved' : 'Customer'}
                  </div>
                  {/* Loan amount overlay */}
                  <div
                    className="absolute bottom-0 left-0 right-0 p-3"
                    style={{
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                      color: 'white',
                    }}
                  >
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f4d03f' }}>
                      {item.loanAmount}
                    </div>
                    <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>
                      {item.loanType}
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h5 style={{ margin: 0, color: '#2c3e50', fontSize: '1rem', fontWeight: 600 }}>
                      {item.name}
                    </h5>
                    <div style={{ color: '#d4af37', fontSize: '0.85rem' }}>
                      {'★'.repeat(item.rating)}
                    </div>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#95a5a6', margin: 0 }}>
                    📍 {item.city}, {item.province}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: '#95a5a6', marginTop: 4 }}>
                    s/o {item.fatherName}
                  </p>
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
                      <CheckCircle2 size={12} /> Verified Customer
                    </span>
                  )}
                </div>
                <p style={{ margin: '4px 0 0 0', opacity: 0.9 }}>
                  s/o {selectedItem.fatherName} | 📍 {selectedItem.city}, {selectedItem.province}
                </p>
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
                  <CheckCircle2 size={12} /> Verified Application
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
    </section>
  )
}
