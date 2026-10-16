'use client'

import { AnimateIn } from './animations'

// ============================================================
// URDU WELCOME SECTION
// آخوت لون: سود سے پاک
// ============================================================
export function UrduWelcomeSection() {
  return (
    <section
      className="relative overflow-hidden py-20 md:py-28"
      style={{
        background: 'linear-gradient(135deg, #fdfcf8 0%, #f5f0e8 100%)',
      }}
    >
      {/* Decorative Islamic pattern background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #1a7a3c 1px, transparent 1px),
                            radial-gradient(circle at 80% 50%, #d4af37 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Top decorative element */}
          <AnimateIn>
            <div
              className="inline-flex items-center justify-center mb-6"
              style={{
                width: 80, height: 80,
                background: 'linear-gradient(135deg, #1a7a3c 0%, #0f5228 100%)',
                borderRadius: '50%',
                boxShadow: '0 10px 30px rgba(15,82,40,0.3)',
              }}
            >
              <span style={{ fontSize: '2.5rem' }}>🕌</span>
            </div>
          </AnimateIn>

          {/* Main heading - Urdu */}
          <AnimateIn delay={200}>
            <h2
              style={{
                fontFamily: 'Jameel Noori Nastaleeq, Noto Nastaliq Urdu, serif',
                fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                color: '#0f5228',
                direction: 'rtl',
                marginBottom: 16,
                lineHeight: 1.6,
              }}
            >
              <span style={{ color: '#d4af37' }}>آخوت لون:</span> سود سے پاک
            </h2>
          </AnimateIn>

          {/* Decorative divider */}
          <AnimateIn delay={400}>
            <div
              className="flex items-center justify-center gap-2 my-6"
            >
              <div style={{ width: 60, height: 2, background: 'linear-gradient(90deg, transparent, #d4af37)' }} />
              <span style={{ color: '#d4af37', fontSize: '1.2rem' }}>✦</span>
              <div style={{ width: 60, height: 2, background: 'linear-gradient(90deg, #d4af37, transparent)' }} />
            </div>
          </AnimateIn>

          {/* Welcome message - Urdu */}
          <AnimateIn delay={500}>
            <p
              style={{
                fontFamily: 'Jameel Noori Nastaleeq, Noto Nastaliq Urdu, serif',
                fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
                color: '#2c3e50',
                direction: 'rtl',
                lineHeight: 1.8,
                maxWidth: 700,
                margin: '0 auto 30px',
              }}
            >
              السلام علیکم! آپ کو آخوت لون سروس میں خوش آمدید کہنا چاہتے ہیں۔
              <br />
              <span style={{ color: '#5a6c7d', fontSize: '0.95em' }}>
                آخوت لون کے متعلق نیچے لسٹ دی گئی ہے، براہ کرم پلان منتخب کریں۔
              </span>
            </p>
          </AnimateIn>

          {/* Feature badges */}
          <AnimateIn delay={700}>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {[
                { icon: '✓', text: '0% سود', urdu: true },
                { icon: '⚡', text: '2 گھنٹے میں منظوری', urdu: true },
                { icon: '💰', text: 'رجسٹریشن فیس ریفنڈایبل', urdu: true },
                { icon: '🤝', text: 'آسان قسطیں', urdu: true },
              ].map((badge, i) => (
                <div
                  key={i}
                  className="px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2"
                  style={{
                    background: 'white',
                    border: '1px solid #e8f5e9',
                    color: '#0f5228',
                    boxShadow: '0 2px 8px rgba(15,82,40,0.08)',
                    direction: 'rtl',
                    fontFamily: 'Jameel Noori Nastaleeq, Noto Nastaliq Urdu, serif',
                    fontSize: '0.95rem',
                  }}
                >
                  <span style={{ color: '#d4af37' }}>{badge.icon}</span>
                  {badge.text}
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}

// ============================================================
// LOAN PLANS SECTION (8 Plans from Urdu content)
// ============================================================
interface LoanPlan {
  id: number
  amount: string
  amountUrdu: string
  period: string
  periodUrdu: string
  installment: string
  category: string
  categoryUrdu: string
  categoryIcon: string
  popular?: boolean
}

const loanPlans: LoanPlan[] = [
  {
    id: 1,
    amount: 'Rs. 50,000',
    amountUrdu: 'پچاس ہزار',
    period: '1 Year',
    periodUrdu: 'ایک سال',
    installment: 'Rs. 4,167',
    category: 'Personal',
    categoryUrdu: 'ذاتی',
    categoryIcon: '👤',
  },
  {
    id: 2,
    amount: 'Rs. 100,000',
    amountUrdu: 'ایک لاکھ',
    period: '1 Year',
    periodUrdu: 'ایک سال',
    installment: 'Rs. 8,335',
    category: 'Personal',
    categoryUrdu: 'ذاتی',
    categoryIcon: '👤',
  },
  {
    id: 3,
    amount: 'Rs. 200,000',
    amountUrdu: 'دو لاکھ',
    period: '2 Years',
    periodUrdu: 'دو سال',
    installment: 'Rs. 8,335',
    category: 'Personal',
    categoryUrdu: 'ذاتی',
    categoryIcon: '👤',
    popular: true,
  },
  {
    id: 4,
    amount: 'Rs. 500,000',
    amountUrdu: 'پانچ لاکھ',
    period: '5 Years',
    periodUrdu: 'پانچ سال',
    installment: 'Rs. 8,335',
    category: 'Personal',
    categoryUrdu: 'ذاتی',
    categoryIcon: '👤',
  },
  {
    id: 5,
    amount: 'Rs. 1,000,000',
    amountUrdu: 'دس لاکھ',
    period: '10 Years',
    periodUrdu: 'دس سال',
    installment: 'Rs. 8,335',
    category: 'Business',
    categoryUrdu: 'بزنس',
    categoryIcon: '💼',
    popular: true,
  },
  {
    id: 6,
    amount: 'Rs. 2,000,000',
    amountUrdu: 'بیس لاکھ',
    period: '10 Years',
    periodUrdu: 'دس سال',
    installment: 'Rs. 16,670',
    category: 'Business',
    categoryUrdu: 'بزنس',
    categoryIcon: '💼',
  },
  {
    id: 7,
    amount: 'Rs. 3,000,000',
    amountUrdu: 'تیس لاکھ',
    period: '10 Years',
    periodUrdu: 'دس سال',
    installment: 'Rs. 25,000',
    category: 'Home Construction',
    categoryUrdu: 'نیا گھر تعمیر',
    categoryIcon: '🏠',
  },
  {
    id: 8,
    amount: 'Rs. 5,000,000',
    amountUrdu: 'پچاس لاکھ',
    period: '15 Years',
    periodUrdu: 'پندرہ سال',
    installment: 'Rs. 27,780',
    category: 'Home Construction',
    categoryUrdu: 'نیا گھر تعمیر',
    categoryIcon: '🏠',
  },
]

interface PlansProps {
  onApplyClick: (plan: LoanPlan) => void
}

export function LoanPlansSection({ onApplyClick }: PlansProps) {
  return (
    <section id="plans" className="py-20 md:py-28" style={{ background: '#f8fafb' }}>
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <AnimateIn>
          <div className="text-center mb-14">
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#1a7a3c' }}>
              LOAN PLANS
            </span>
            <h2
              className="mt-3 mb-4"
              style={{
                fontFamily: 'var(--font-playfair), serif',
                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                color: '#2c3e50',
              }}
            >
              8 Plans Available
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
              اپنی ضرورت کے مطابق پلان منتخب کریں
            </p>
          </div>
        </AnimateIn>

        {/* Plans Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {loanPlans.map((plan, i) => (
            <AnimateIn key={plan.id} delay={(i % 4) * 150}>
              <div
                className="rounded-2xl p-6 h-full relative overflow-hidden transition-all duration-500 hover:-translate-y-2"
                style={{
                  background: plan.popular ? 'linear-gradient(135deg, #1a7a3c 0%, #0f5228 100%)' : 'white',
                  color: plan.popular ? 'white' : '#2c3e50',
                  boxShadow: plan.popular 
                    ? '0 10px 40px rgba(26,122,60,0.3)' 
                    : '0 2px 12px rgba(15,82,40,0.08)',
                  border: plan.popular ? 'none' : '1px solid #e8f5e9',
                }}
                onMouseEnter={(e) => {
                  if (!plan.popular) {
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(15,82,40,0.15)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!plan.popular) {
                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(15,82,40,0.08)'
                  }
                }}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div
                    className="absolute top-0 right-0 px-3 py-1 text-xs font-bold text-[#0f5228] rounded-bl-lg"
                    style={{ background: '#f4d03f' }}
                  >
                    ⭐ POPULAR
                  </div>
                )}

                {/* Plan number */}
                <div
                  className="flex items-center justify-between mb-4"
                >
                  <span
                    className="text-sm font-bold px-3 py-1 rounded-full"
                    style={{
                      background: plan.popular ? 'rgba(255,255,255,0.2)' : '#e8f5e9',
                      color: plan.popular ? 'white' : '#1a7a3c',
                    }}
                  >
                    پلان {plan.id}
                  </span>
                  <span style={{ fontSize: '1.8rem' }}>{plan.categoryIcon}</span>
                </div>

                {/* Amount */}
                <div className="mb-4">
                  <div
                    style={{
                      fontSize: '1.8rem',
                      fontWeight: 700,
                      fontFamily: 'var(--font-playfair), serif',
                      color: plan.popular ? '#f4d03f' : '#0f5228',
                      lineHeight: 1,
                    }}
                  >
                    {plan.amount}
                  </div>
                  <div
                    style={{
                      fontFamily: 'Jameel Noori Nastaleeq, Noto Nastaliq Urdu, serif',
                      fontSize: '1rem',
                      direction: 'rtl',
                      color: plan.popular ? 'rgba(255,255,255,0.8)' : '#5a6c7d',
                      marginTop: 4,
                    }}
                  >
                    {plan.amountUrdu} روپے
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2.5 mb-5 text-sm">
                  <div className="flex justify-between items-center pb-2 border-b" style={{ borderColor: plan.popular ? 'rgba(255,255,255,0.15)' : '#e8f5e9' }}>
                    <span style={{ color: plan.popular ? 'rgba(255,255,255,0.7)' : '#95a5a6' }}>
                      واپسی مدت
                    </span>
                    <span style={{ fontWeight: 600, fontFamily: 'Jameel Noori Nastaleeq, Noto Nastaliq Urdu, serif' }}>
                      {plan.periodUrdu}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span style={{ color: plan.popular ? 'rgba(255,255,255,0.7)' : '#95a5a6' }}>
                      ماہانہ قسط
                    </span>
                    <span style={{ fontWeight: 700, color: plan.popular ? '#f4d03f' : '#1a7a3c' }}>
                      {plan.installment}
                    </span>
                  </div>
                </div>

                {/* Category tag */}
                <div
                  className="text-xs mb-4 text-center py-1.5 rounded-full"
                  style={{
                    background: plan.popular ? 'rgba(255,255,255,0.15)' : '#f8fafb',
                    color: plan.popular ? 'rgba(255,255,255,0.9)' : '#5a6c7d',
                    fontFamily: 'Jameel Noori Nastaleeq, Noto Nastaliq Urdu, serif',
                  }}
                >
                  {plan.categoryUrdu} قرضہ
                </div>

                {/* Apply button */}
                <button
                  onClick={() => onApplyClick(plan)}
                  className="w-full py-2.5 rounded-full font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5"
                  style={
                    plan.popular
                      ? { background: '#f4d03f', color: '#0f5228' }
                      : { background: 'linear-gradient(135deg, #1a7a3c 0%, #0f5228 100%)', color: 'white' }
                  }
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
