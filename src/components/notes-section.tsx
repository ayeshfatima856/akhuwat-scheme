'use client'

import { AnimateIn } from './animations'
import { FileText, AlertCircle, CheckCircle2, Clock, Shield } from 'lucide-react'

// ============================================================
// NOTES SECTION (Registration Fees, Documents, Important Notes)
// ============================================================
export function NotesSection() {
  return (
    <section className="py-20 md:py-28" style={{ background: 'white' }}>
      <div className="container mx-auto px-4">
        
        <AnimateIn>
          <div className="text-center mb-14">
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#1a7a3c' }}>
              IMPORTANT INFORMATION
            </span>
            <h2
              className="mt-3 mb-4"
              style={{
                fontFamily: 'var(--font-playfair), serif',
                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                color: '#2c3e50',
              }}
            >
              Required Info & Notes
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
              درخواست سے پہلے ضروری معلومات
            </p>
          </div>
        </AnimateIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* ===== Registration Fees Card ===== */}
          <AnimateIn variant="fade-up">
            <div
              className="rounded-2xl p-7 h-full relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #f0fdf4 0%, #e8f5e9 100%)',
                border: '1px solid #d4edda',
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: 50, height: 50,
                    background: 'linear-gradient(135deg, #1a7a3c, #0f5228)',
                    borderRadius: 12,
                  }}
                >
                  <FileText size={24} color="white" />
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-playfair), serif',
                    fontSize: '1.3rem',
                    color: '#0f5228',
                    margin: 0,
                  }}
                >
                  رجسٹریشن فیس
                </h3>
              </div>

              <div className="space-y-4">
                <div
                  className="flex items-center justify-between p-3 rounded-xl"
                  style={{ background: 'white' }}
                >
                  <div style={{ direction: 'rtl', fontFamily: 'Jameel Noori Nastaleeq, Noto Nastaliq Urdu, serif' }}>
                    <div style={{ color: '#2c3e50', fontWeight: 600 }}>
                      پانچ لاکھ روپے تک
                    </div>
                    <small style={{ color: '#95a5a6' }}>Up to Rs. 500,000</small>
                  </div>
                  <div
                    className="px-3 py-1.5 rounded-full font-bold text-sm"
                    style={{ background: '#1a7a3c', color: 'white' }}
                  >
                    Rs. 4,400
                  </div>
                </div>

                <div
                  className="flex items-center justify-between p-3 rounded-xl"
                  style={{ background: 'white' }}
                >
                  <div style={{ direction: 'rtl', fontFamily: 'Jameel Noori Nastaleeq, Noto Nastaliq Urdu, serif' }}>
                    <div style={{ color: '#2c3e50', fontWeight: 600 }}>
                      چھ لاکھ سے پچاس لاکھ
                    </div>
                    <small style={{ color: '#95a5a6' }}>Rs. 600,000 - 5,000,000</small>
                  </div>
                  <div
                    className="px-3 py-1.5 rounded-full font-bold text-sm"
                    style={{ background: '#d4af37', color: 'white' }}
                  >
                    Rs. 5,600
                  </div>
                </div>
              </div>

              <div
                className="mt-5 p-3 rounded-lg flex items-center gap-2"
                style={{ background: 'rgba(212,175,55,0.1)' }}
              >
                <CheckCircle2 size={16} style={{ color: '#d4af37', flexShrink: 0 }} />
                <span
                  className="text-sm"
                  style={{
                    fontFamily: 'Jameel Noori Nastaleeq, Noto Nastaliq Urdu, serif',
                    color: '#0f5228',
                    direction: 'rtl',
                  }}
                >
                  رجسٹریشن فیس ریفنڈایبل ہے
                </span>
              </div>
            </div>
          </AnimateIn>

          {/* ===== Required Documents Card ===== */}
          <AnimateIn variant="fade-up" delay={200}>
            <div
              className="rounded-2xl p-7 h-full"
              style={{
                background: 'linear-gradient(135deg, #fefcf5 0%, #fdf6e3 100%)',
                border: '1px solid #f4d03f',
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: 50, height: 50,
                    background: 'linear-gradient(135deg, #d4af37, #b8941f)',
                    borderRadius: 12,
                  }}
                >
                  <Shield size={24} color="white" />
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-playfair), serif',
                    fontSize: '1.3rem',
                    color: '#0f5228',
                    margin: 0,
                  }}
                >
                  ضروری دستاویزات
                </h3>
              </div>

              <div className="space-y-3">
                {[
                  { num: 1, text: 'قومی شناختی کارڈ کی تصویر', sub: 'CNIC Front & Back Side', icon: '🆔' },
                  { num: 2, text: 'بجلی کا بل یا یوٹیلیٹی بل', sub: 'Electricity / Utility Bill', icon: '📄' },
                  { num: 3, text: 'بینک اکاؤنٹ نمبر', sub: 'Bank Account Number', icon: '🏦' },
                ].map((doc) => (
                  <div
                    key={doc.num}
                    className="flex items-start gap-3 p-3 rounded-xl"
                    style={{ background: 'white' }}
                  >
                    <span style={{ fontSize: '1.5rem' }}>{doc.icon}</span>
                    <div className="flex-1">
                      <div
                        style={{
                          fontFamily: 'Jameel Noori Nastaleeq, Noto Nastaliq Urdu, serif',
                          color: '#2c3e50',
                          fontWeight: 600,
                          direction: 'rtl',
                          fontSize: '1.05rem',
                        }}
                      >
                        {doc.num}. {doc.text}
                      </div>
                      <small style={{ color: '#95a5a6', fontSize: '0.8rem' }}>
                        {doc.sub}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>

          {/* ===== Important Notes Card ===== */}
          <AnimateIn variant="fade-up" delay={400}>
            <div
              className="rounded-2xl p-7 h-full"
              style={{
                background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
                border: '1px solid #fed7aa',
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: 50, height: 50,
                    background: 'linear-gradient(135deg, #ea580c, #c2410c)',
                    borderRadius: 12,
                  }}
                >
                  <AlertCircle size={24} color="white" />
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-playfair), serif',
                    fontSize: '1.3rem',
                    color: '#0f5228',
                    margin: 0,
                  }}
                >
                  اہم نوٹس
                </h3>
              </div>

              <div className="space-y-3">
                <div
                  className="flex items-start gap-3 p-3 rounded-xl"
                  style={{ background: 'white' }}
                >
                  <Clock size={20} style={{ color: '#ea580c', flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div
                      style={{
                        fontFamily: 'Jameel Noori Nastaleeq, Noto Nastaliq Urdu, serif',
                        color: '#2c3e50',
                        fontWeight: 600,
                        direction: 'rtl',
                        fontSize: '1rem',
                        lineHeight: 1.6,
                      }}
                    >
                      درخواست کے دو گھنٹے بعد آپ کو لون کی منظوری کا پیغام ملے گا۔
                    </div>
                  </div>
                </div>

                <div
                  className="flex items-start gap-3 p-3 rounded-xl"
                  style={{ background: 'white' }}
                >
                  <CheckCircle2 size={20} style={{ color: '#1a7a3c', flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div
                      style={{
                        fontFamily: 'Jameel Noori Nastaleeq, Noto Nastaliq Urdu, serif',
                        color: '#2c3e50',
                        fontWeight: 600,
                        direction: 'rtl',
                        fontSize: '1rem',
                        lineHeight: 1.6,
                      }}
                    >
                      رجسٹریشن فیس مکمل طور پر ریفنڈایبل ہے۔
                    </div>
                  </div>
                </div>

                <div
                  className="flex items-start gap-3 p-3 rounded-xl"
                  style={{ background: 'white' }}
                >
                  <Shield size={20} style={{ color: '#d4af37', flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div
                      style={{
                        fontFamily: 'Jameel Noori Nastaleeq, Noto Nastaliq Urdu, serif',
                        color: '#2c3e50',
                        fontWeight: 600,
                        direction: 'rtl',
                        fontSize: '1rem',
                        lineHeight: 1.6,
                      }}
                    >
                      تمام شرائط متعلقہ ادارے سے تصدیق شدہ ہیں۔
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>

        {/* Thank you message */}
        <AnimateIn delay={600}>
          <div
            className="mt-14 text-center p-8 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, #1a7a3c 0%, #0f5228 100%)',
              color: 'white',
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🤝</div>
            <p
              style={{
                fontFamily: 'Jameel Noori Nastaleeq, Noto Nastaliq Urdu, serif',
                fontSize: '1.5rem',
                direction: 'rtl',
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              آخوت لون سروس استعمال کرنے کا شکریہ،
              <br />
              <span style={{ color: '#f4d03f' }}>ہمیں خوشی ہوگی کہ ہم آپ کی مدد کر سکیں!</span>
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
