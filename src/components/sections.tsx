'use client'

import { AnimateIn, Counter } from './animations'
import { Check } from 'lucide-react'

// ============================================================
// STATS SECTION (Counter cards)
// ============================================================
export function StatsSection() {
  const stats = [
    { target: 50000, suffix: '+', label: 'HAPPY CUSTOMERS' },
    { target: 500, suffix: 'Cr+', label: 'LOAN DISBURSED' },
    { target: 25, suffix: '+', label: 'CITIES SERVED' },
    { target: 15, suffix: '+', label: 'YEARS EXPERIENCE' },
  ]

  return (
    <section
      className="relative overflow-hidden py-16 text-white"
      style={{
        background: 'linear-gradient(135deg, #0f5228 0%, #1a7a3c 100%)',
      }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <AnimateIn key={i} variant="zoom-in" delay={i * 200}>
              <div className="text-center">
                <div
                  style={{
                    fontSize: 'clamp(2.2rem, 5vw, 3rem)',
                    fontWeight: 700,
                    color: '#f4d03f',
                    fontFamily: 'var(--font-playfair), serif',
                    lineHeight: 1,
                  }}
                >
                  <Counter target={stat.target} suffix={stat.suffix} />
                </div>
                <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.85)', marginTop: 10, letterSpacing: 1 }}>
                  {stat.label}
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================
// SERVICES SECTION (Loan Types)
// ============================================================
const services = [
  { icon: '💼', title: 'Business Loan', desc: 'Naya karobar shuru karein ya purana expand karein. Be-sood qarza asaan qistoon mein.', amount: 'Rs. 10,000 - 10,00,000' },
  { icon: '👤', title: 'Personal Loan', desc: 'Shakhsi zaroorat ke liye — medical, education, ya ghar ke kharoche.', amount: 'Rs. 5,000 - 5,00,000' },
  { icon: '🌾', title: 'Agriculture Loan', desc: 'Kashtkari ke liye be-sood qarza — beej, khaad, ya machinery ke liye.', amount: 'Rs. 10,000 - 7,00,000' },
  { icon: '🎓', title: 'Education Loan', desc: 'Taleem ki fees, books, ya hostel ke liye asaan qarza.', amount: 'Rs. 5,000 - 3,00,000' },
  { icon: '🏠', title: 'Home Loan', desc: 'Makan ki tameer, mukammal karne, ya repair ke liye qarza.', amount: 'Rs. 50,000 - 10,00,000' },
  { icon: '🚨', title: 'Emergency Loan', desc: 'Medical emergency ya koi aur zaroori kaam ke liye fori qarza.', amount: 'Rs. 5,000 - 2,00,000' },
]

interface ServicesProps {
  onApplyClick: (loanType?: string) => void
}

export function ServicesSection({ onApplyClick }: ServicesProps) {
  return (
    <section id="services" className="py-20 md:py-28" style={{ background: '#f8fafb' }}>
      <div className="container mx-auto px-4">
        <AnimateIn>
          <div className="text-center mb-14">
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#1a7a3c' }}>
              OUR SERVICES
            </span>
            <h2
              className="mt-3 mb-4"
              style={{
                fontFamily: 'var(--font-playfair), serif',
                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                color: '#2c3e50',
              }}
            >
              Loan Types We Offer
            </h2>
            <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: '#5a6c7d' }}>
              Aapki zaroorat ke hisaab se mukhtalif loan plans. Sab be-sood, asaan qistoon mein.
            </p>
          </div>
        </AnimateIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <AnimateIn key={i} delay={(i % 3) * 200}>
              <div
                className="rounded-2xl p-7 h-full transition-all hover:-translate-y-2.5"
                style={{
                  background: 'white',
                  boxShadow: '0 2px 8px rgba(15,82,40,0.08)',
                  border: '1px solid transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(15,82,40,0.15)'
                  e.currentTarget.style.borderColor = '#e8f5e9'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(15,82,40,0.08)'
                  e.currentTarget.style.borderColor = 'transparent'
                }}
              >
                <div
                  className="flex items-center justify-center mb-5 transition-transform"
                  style={{
                    width: 70, height: 70,
                    background: 'linear-gradient(135deg, #e8f5e9 0%, #d4edda 100%)',
                    borderRadius: 18,
                    fontSize: '2rem',
                  }}
                >
                  {service.icon}
                </div>
                <h4 className="mb-3" style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.3rem', color: '#2c3e50' }}>
                  {service.title}
                </h4>
                <p className="mb-3" style={{ color: '#5a6c7d', fontSize: '0.95rem' }}>
                  {service.desc}
                </p>
                <div className="font-bold mb-4" style={{ color: '#1a7a3c', fontSize: '1.05rem' }}>
                  {service.amount}
                </div>
                <button
                  onClick={() => onApplyClick(service.title)}
                  className="w-full py-2.5 rounded-full font-semibold text-white text-sm transition-transform hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg, #1a7a3c 0%, #0f5228 100%)' }}
                >
                  Apply Now
                </button>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================
// ABOUT SECTION
// ============================================================
export function AboutSection() {
  const features = [
    { title: 'Be-sood Qarza (0% Interest)', desc: 'Bina kisi sood ke asaan qistoon mein qarza.' },
    { title: 'Asaan Application Process', desc: 'Online form bharein aur 24-48 ghante mein response pa lein.' },
    { title: 'Trusted & Secure', desc: 'Aapki information puri tarah secure aur confidential hai.' },
    { title: 'Pakistan Wide Service', desc: '25+ shehron mein hamari service mawjood hai.' },
  ]

  return (
    <section id="about" className="py-20 md:py-28" style={{ background: '#fdfcf8' }}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          
          {/* Image */}
          <AnimateIn variant="fade-left">
            <div className="rounded-2xl overflow-hidden" style={{ boxShadow: '0 10px 40px rgba(15,82,40,0.15)' }}>
              <img
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop"
                alt="About Akhuwat Scheme"
                style={{ width: '100%', height: 450, objectFit: 'cover' }}
              />
            </div>
          </AnimateIn>

          {/* Content */}
          <AnimateIn variant="fade-right">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#1a7a3c' }}>
                ABOUT US
              </span>
              <h2
                className="my-4"
                style={{
                  fontFamily: 'var(--font-playfair), serif',
                  fontSize: 'clamp(1.8rem, 4vw, 2.3rem)',
                  color: '#2c3e50',
                }}
              >
                Aapki Beteri Ke Liye Hum Aap Ke Sath Hain
              </h2>
              <p className="mb-5" style={{ color: '#5a6c7d' }}>
                Akhuwat Scheme 2002 se Pakistan mein be-sood qarza faraham kar raha hai. 
                Hamari mission hai muft mein financial maddad dana taake log apne pairo par 
                khade ho sakein.
              </p>

              <ul className="space-y-4 mb-6">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div
                      className="flex items-center justify-center flex-shrink-0"
                      style={{
                        width: 28, height: 28,
                        background: 'linear-gradient(135deg, #1a7a3c, #0f5228)',
                        borderRadius: '50%',
                        color: 'white',
                      }}
                    >
                      <Check size={16} strokeWidth={3} />
                    </div>
                    <div>
                      <h5 style={{ fontSize: '1.05rem', color: '#2c3e50', marginBottom: 4, fontWeight: 600 }}>
                        {feature.title}
                      </h5>
                      <p style={{ fontSize: '0.9rem', color: '#5a6c7d', margin: 0 }}>
                        {feature.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}

// ============================================================
// PROCESS SECTION
// ============================================================
export function ProcessSection() {
  const steps = [
    { num: 1, title: 'Form Bharein', desc: 'Online application form bharein aur apni details submit karein.' },
    { num: 2, title: 'Documents Upload', desc: 'Apni photo, CNIC, aur zaroori documents upload karein.' },
    { num: 3, title: 'Verification', desc: 'Hamari team aapki application verify karegi (24-48 hours).' },
    { num: 4, title: 'Loan Approved!', desc: 'Approval ke baad foran qarza aapke account mein transfer ho jayega.' },
  ]

  return (
    <section id="process" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <AnimateIn>
          <div className="text-center mb-14">
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#1a7a3c' }}>
              SIMPLE PROCESS
            </span>
            <h2
              className="mt-3 mb-4"
              style={{
                fontFamily: 'var(--font-playfair), serif',
                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                color: '#2c3e50',
              }}
            >
              Kaise Apply Karein?
            </h2>
            <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: '#5a6c7d' }}>
              4 aasaan steps mein loan pa lein — sirf 5 minute mein!
            </p>
          </div>
        </AnimateIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <AnimateIn key={i} delay={i * 200}>
              <div className="text-center p-5">
                <div
                  className="inline-flex items-center justify-center mb-5"
                  style={{
                    width: 80, height: 80,
                    background: 'linear-gradient(135deg, #1a7a3c, #0f5228)',
                    color: 'white',
                    borderRadius: '50%',
                    fontSize: '1.8rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-playfair), serif',
                    boxShadow: '0 8px 25px rgba(26,122,60,0.3)',
                  }}
                >
                  {step.num}
                </div>
                <h5 className="mb-2" style={{ fontSize: '1.2rem', color: '#2c3e50', fontFamily: 'var(--font-playfair), serif' }}>
                  {step.title}
                </h5>
                <p style={{ color: '#5a6c7d', fontSize: '0.92rem' }}>
                  {step.desc}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================
// TESTIMONIALS SECTION
// ============================================================
export function TestimonialsSection() {
  const testimonials = [
    {
      text: 'Akhuwat Scheme se mujhe business loan mila jis se main apna karobar shuru kar saka. Ab mera monthly income 50,000 se 200,000 ho gaya. Bohot shukriya!',
      name: 'Ahmed Khan',
      role: 'Lahore - Business Owner',
      initials: 'AK',
    },
    {
      text: 'Education loan ki waja se meri beti FSc mein top ki. Be-sood qarza aur asaan qistain — Akhuwat waqai logon ki maddad karta hai.',
      name: 'Fatima Noor',
      role: 'Faisalabad - Housewife',
      initials: 'FN',
    },
    {
      text: 'Agriculture loan se main nai tractor khareed li. Ab fasal 3 guna behti hai. Akhuwat ki team bohot supportive aur fast hai.',
      name: 'Muhammad Raza',
      role: 'Multan - Farmer',
      initials: 'MR',
    },
  ]

  return (
    <section className="py-20 md:py-28" style={{ background: '#f8fafb' }}>
      <div className="container mx-auto px-4">
        <AnimateIn>
          <div className="text-center mb-14">
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#1a7a3c' }}>
              TESTIMONIALS
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
          </div>
        </AnimateIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <AnimateIn key={i} delay={(i % 3) * 200}>
              <div
                className="rounded-2xl p-7 h-full relative transition-all hover:-translate-y-1"
                style={{
                  background: 'white',
                  boxShadow: '0 2px 8px rgba(15,82,40,0.08)',
                }}
              >
                <div
                  style={{
                    position: 'absolute', top: 15, right: 25,
                    fontSize: '4rem', color: '#e8f5e9',
                    fontFamily: 'Georgia, serif', lineHeight: 1,
                  }}
                >
                  &quot;
                </div>
                <div className="mb-3" style={{ color: '#d4af37', fontSize: '1rem' }}>
                  ★★★★★
                </div>
                <p className="mb-5 italic" style={{ color: '#5a6c7d', fontSize: '0.95rem' }}>
                  {t.text}
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center justify-center font-bold"
                    style={{
                      width: 55, height: 55,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #1a7a3c, #0f5228)',
                      color: 'white',
                      fontSize: '1.2rem',
                    }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <h6 style={{ margin: 0, color: '#2c3e50', fontSize: '1rem', fontWeight: 600 }}>
                      {t.name}
                    </h6>
                    <small style={{ color: '#95a5a6', fontSize: '0.85rem' }}>
                      {t.role}
                    </small>
                  </div>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
