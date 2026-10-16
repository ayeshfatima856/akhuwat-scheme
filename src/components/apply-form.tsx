'use client'

import { useState, useEffect } from 'react'
import { X, Upload } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

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

interface ApplyFormProps {
  open: boolean
  onClose: () => void
  presetLoanType?: string
  presetPlan?: LoanPlan | null
}

export function ApplyForm({ open, onClose, presetLoanType, presetPlan }: ApplyFormProps) {
  const [submitting, setSubmitting] = useState(false)
  const { toast } = useToast()
  const [selectedPlanLabel, setSelectedPlanLabel] = useState<string>('')
  
  const [formData, setFormData] = useState({
    fullName: '', fatherName: '', cnicNumber: '', phoneNumber: '',
    email: '', ageAbove18: '', gender: '', maritalStatus: '',
    city: '', province: '',
    loanType: '', loanAmount: '', loanPurpose: '', monthlyIncome: '',
    confirmInfo: false,
  })

  // Preset loan type or plan when provided
  useEffect(() => {
    if (presetPlan) {
      // Plan se amount aur type preset karo
      const loanType = presetPlan.category === 'Business' ? 'Business Loan'
        : presetPlan.category === 'Home Construction' ? 'Home Loan'
        : 'Personal Loan'
      const numericAmount = presetPlan.amount.replace(/[^0-9]/g, '')
      
      setFormData(prev => ({
        ...prev,
        loanType,
        loanAmount: numericAmount,
      }))
      setSelectedPlanLabel(`پلان ${presetPlan.id}: ${presetPlan.amountUrdu} روپے (${presetPlan.period})`)
    } else if (presetLoanType) {
      setFormData(prev => ({ ...prev, loanType: presetLoanType }))
      setSelectedPlanLabel('')
    } else {
      setSelectedPlanLabel('')
    }
  }, [presetLoanType, presetPlan, open])

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => { document.body.style.overflow = 'auto' }
  }, [open])

  if (!open) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  // CNIC auto-format: 35202-1234567-8
  const formatCNIC = (value: string) => {
    let v = value.replace(/\D/g, '').substring(0, 13)
    if (v.length > 5) v = v.substring(0, 5) + '-' + v.substring(5)
    if (v.length > 13) v = v.substring(0, 13) + '-' + v.substring(13)
    return v
  }

  // Phone auto-format: +923001234567
  const formatPhone = (value: string) => {
    let v = value.replace(/\D/g, '').substring(0, 12)
    return v ? '+' + v : ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.fullName || !formData.fatherName || !formData.cnicNumber || !formData.phoneNumber) {
      toast({ title: '❌ Error', description: 'Saari required fields bharein', variant: 'destructive' })
      return
    }
    
    const cnicRegex = /^\d{5}-\d{7}-\d{1}$/
    if (!cnicRegex.test(formData.cnicNumber)) {
      toast({ title: '❌ CNIC Error', description: 'CNIC format: 35202-1234567-8', variant: 'destructive' })
      return
    }
    
    const phoneRegex = /^\+92\d{10}$/
    if (!phoneRegex.test(formData.phoneNumber)) {
      toast({ title: '❌ Phone Error', description: 'Phone format: +923001234567', variant: 'destructive' })
      return
    }
    
    if (!formData.confirmInfo) {
      toast({ title: '❌ Confirmation', description: 'Pehle confirm karein ke information sahi hai', variant: 'destructive' })
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          ageAbove18: formData.ageAbove18,
          monthlyIncome: formData.monthlyIncome || null,
        }),
      })
      const result = await res.json()
      if (res.ok) {
        toast({ title: '✅ Success!', description: result.message })
        onClose()
        setFormData({
          fullName: '', fatherName: '', cnicNumber: '', phoneNumber: '',
          email: '', ageAbove18: '', gender: '', maritalStatus: '',
          city: '', province: '',
          loanType: '', loanAmount: '', loanPurpose: '', monthlyIncome: '',
          confirmInfo: false,
        })
      } else {
        toast({ title: '❌ Error', description: result.error, variant: 'destructive' })
      }
    } catch {
      toast({ title: '❌ Network Error', description: 'Dobara try karein', variant: 'destructive' })
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass = "w-full px-3.5 py-2.5 rounded-lg border-2 border-gray-200 focus:border-[#1a7a3c] focus:outline-none transition-colors text-sm"
  const labelClass = "block text-sm font-semibold mb-1.5 text-[#2c3e50]"

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center p-4 overflow-y-auto"
      style={{ background: 'rgba(0,0,0,0.6)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-3xl w-full my-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
      >
        {/* Header */}
        <div
          className="p-6 text-white flex items-center justify-between"
          style={{ background: 'linear-gradient(135deg, #1a7a3c 0%, #0f5228 100%)' }}
        >
          <div>
            <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.6rem', margin: 0 }}>
              🏦 Loan Application Form
            </h2>
            <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem', opacity: 0.95 }}>
              Bharo aur submit karein — Hamari team aap se raabta karegi
            </p>
          </div>
          <button onClick={onClose} className="text-white hover:bg-white/20 rounded-full p-2 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          
          {/* Selected Plan Banner (agar plan select hua) */}
          {selectedPlanLabel && (
            <div
              className="rounded-xl p-4 flex items-center gap-3"
              style={{
                background: 'linear-gradient(135deg, #f0fdf4 0%, #e8f5e9 100%)',
                border: '1px solid #1a7a3c',
              }}
            >
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{
                  width: 40, height: 40,
                  background: 'linear-gradient(135deg, #1a7a3c, #0f5228)',
                  borderRadius: '50%',
                  color: 'white',
                  fontSize: '1.2rem',
                }}
              >
                ✓
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#5a6c7d', fontWeight: 600 }}>
                  SELECTED PLAN
                </div>
                <div
                  style={{
                    fontFamily: 'Jameel Noori Nastaleeq, Noto Nastaliq Urdu, serif',
                    color: '#0f5228',
                    fontWeight: 600,
                    direction: 'rtl',
                    fontSize: '1.05rem',
                  }}
                >
                  {selectedPlanLabel}
                </div>
              </div>
            </div>
          )}

          {/* Personal Information */}
          <div>
            <h3 className="mb-4 pb-2 border-b-2" style={{ color: '#1a7a3c', fontFamily: 'var(--font-playfair), serif', fontSize: '1.2rem', borderColor: '#e8f5e9' }}>
              👤 Personal Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Full Name <span style={{ color: 'red' }}>*</span></label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required
                  placeholder="e.g., Ahmed Khan" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Father Name <span style={{ color: 'red' }}>*</span></label>
                <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} required
                  placeholder="e.g., Muhammad Khan" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>CNIC Number <span style={{ color: 'red' }}>*</span></label>
                <input type="text" name="cnicNumber" value={formData.cnicNumber} 
                  onChange={(e) => setFormData(prev => ({ ...prev, cnicNumber: formatCNIC(e.target.value) }))}
                  placeholder="35202-1234567-8" maxLength={15} className={inputClass} />
                <p className="text-xs italic mt-1" style={{ color: '#95a5a6' }}>Format: 35202-1234567-8 (13 digits)</p>
              </div>
              <div>
                <label className={labelClass}>Mobile Number <span style={{ color: 'red' }}>*</span></label>
                <input type="tel" name="phoneNumber" value={formData.phoneNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: formatPhone(e.target.value) }))}
                  placeholder="+923001234567" className={inputClass} />
                <p className="text-xs italic mt-1" style={{ color: '#95a5a6' }}>Format: +923001234567</p>
              </div>
              <div>
                <label className={labelClass}>Email <span style={{ color: '#95a5a6' }}>(Optional)</span></label>
                <input type="email" name="email" value={formData.email} onChange={handleChange}
                  placeholder="example@email.com" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Kya umar 18+ hai? <span style={{ color: 'red' }}>*</span></label>
                <select name="ageAbove18" value={formData.ageAbove18} onChange={handleChange} required className={inputClass}>
                  <option value="">Select karein</option>
                  <option value="Yes">Yes (Haan)</option>
                  <option value="No">No (Nahi)</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Gender <span style={{ color: 'red' }}>*</span></label>
                <select name="gender" value={formData.gender} onChange={handleChange} required className={inputClass}>
                  <option value="">Select karein</option>
                  <option value="Male">Male (Mard)</option>
                  <option value="Female">Female (Aurat)</option>
                  <option value="Other">Other (Doosra)</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Marital Status <span style={{ color: 'red' }}>*</span></label>
                <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} required className={inputClass}>
                  <option value="">Select karein</option>
                  <option value="Married">Married (Shadi shuda)</option>
                  <option value="Unmarried">Unmarried (Single)</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>City <span style={{ color: 'red' }}>*</span></label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} required
                  placeholder="e.g., Lahore" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Province <span style={{ color: 'red' }}>*</span></label>
                <select name="province" value={formData.province} onChange={handleChange} required className={inputClass}>
                  <option value="">Select karein</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Sindh">Sindh</option>
                  <option value="KPK">Khyber Pakhtunkhwa (KPK)</option>
                  <option value="Balochistan">Balochistan</option>
                  <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
                  <option value="AJK">Azad Jammu & Kashmir</option>
                  <option value="Islamabad">Islamabad Capital Territory</option>
                </select>
              </div>
            </div>
          </div>

          {/* Loan Information */}
          <div>
            <h3 className="mb-4 pb-2 border-b-2" style={{ color: '#1a7a3c', fontFamily: 'var(--font-playfair), serif', fontSize: '1.2rem', borderColor: '#e8f5e9' }}>
              💰 Loan Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Loan Type <span style={{ color: 'red' }}>*</span></label>
                <select name="loanType" value={formData.loanType} onChange={handleChange} required className={inputClass}>
                  <option value="">Select karein</option>
                  <option value="Business Loan">Business Loan (Karobar)</option>
                  <option value="Personal Loan">Personal Loan (Shakhsi)</option>
                  <option value="Agriculture Loan">Agriculture Loan (Zarat)</option>
                  <option value="Education Loan">Education Loan (Taleem)</option>
                  <option value="Home Loan">Home Loan (Makan)</option>
                  <option value="Emergency Loan">Emergency Loan (Emergency)</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Loan Amount (PKR) <span style={{ color: 'red' }}>*</span></label>
                <input type="number" name="loanAmount" value={formData.loanAmount} onChange={handleChange} required
                  placeholder="e.g., 50000" min="1000" max="1000000" className={inputClass} />
                <p className="text-xs italic mt-1" style={{ color: '#95a5a6' }}>Range: 1,000 — 10,00,000 PKR</p>
              </div>
              <div>
                <label className={labelClass}>Loan Purpose <span style={{ color: 'red' }}>*</span></label>
                <select name="loanPurpose" value={formData.loanPurpose} onChange={handleChange} required className={inputClass}>
                  <option value="">Select karein</option>
                  <option value="New Business">New Business Start Karna</option>
                  <option value="Business Expansion">Business Expand Karna</option>
                  <option value="Medical">Medical Treatment</option>
                  <option value="Education">Education Fees</option>
                  <option value="Marriage">Marriage Expenses</option>
                  <option value="Home Construction">Home Construction/Repair</option>
                  <option value="Agriculture">Agriculture Inputs</option>
                  <option value="Other">Other (Doosra)</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Monthly Income (PKR) <span style={{ color: '#95a5a6' }}>(Optional)</span></label>
                <input type="number" name="monthlyIncome" value={formData.monthlyIncome} onChange={handleChange}
                  placeholder="e.g., 25000" min="0" className={inputClass} />
              </div>
            </div>
          </div>

          {/* Document Uploads (with image preview) */}
          <div>
            <h3 className="mb-4 pb-2 border-b-2" style={{ color: '#1a7a3c', fontFamily: 'var(--font-playfair), serif', fontSize: '1.2rem', borderColor: '#e8f5e9' }}>
              📎 Document Uploads
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { name: 'cnicFront', label: 'CNIC Front', icon: '🆔', required: true },
                { name: 'cnicBack', label: 'CNIC Back', icon: '🆔', required: true },
                { name: 'utilityBill', label: 'Utility Bill', icon: '📄', required: false },
              ].map((doc, i) => (
                <FileUploadArea key={i} doc={doc} />
              ))}
            </div>
            <p className="text-xs italic mt-3" style={{ color: '#95a5a6' }}>
              ℹ️ Apni tasveer select karne ke baad preview dikh jayegi. Files securely upload hoti hain.
            </p>
          </div>

          {/* Confirmation */}
          <div>
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox" name="confirmInfo"
                checked={formData.confirmInfo} onChange={handleChange}
                className="mt-1 w-4 h-4"
                style={{ accentColor: '#1a7a3c' }}
              />
              <span className="text-sm" style={{ color: '#2c3e50' }}>
                Main tasalli karta/karti hoon ke meri saari information sahi hai. 
                Agar koi information galat paayi gayi to meri application reject ho sakti hai.
              </span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit" disabled={submitting}
            className="w-full py-3.5 rounded-full font-semibold text-white text-base transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            style={{
              background: 'linear-gradient(135deg, #1a7a3c 0%, #0f5228 100%)',
              boxShadow: '0 4px 15px rgba(26,122,60,0.3)',
            }}
          >
            {submitting ? '⏳ Submitting...' : 'Submit Form'}
          </button>
        </form>

        {/* Footer */}
        <div
          className="text-center py-4 text-white"
          style={{ background: 'linear-gradient(135deg, #1a7a3c 0%, #0f5228 100%)' }}
        >
          <div style={{ fontFamily: 'serif', direction: 'rtl', fontSize: '1.3rem' }}>آخوت انٹر لوگن</div>
          <small>Asaan Karobar Qarza | Akhuwat Loan Services</small>
        </div>
      </div>
    </div>
  )
}

// ============================================================
// FILE UPLOAD AREA COMPONENT (with image preview)
// ============================================================
function FileUploadArea({ doc }: { doc: { name: string; label: string; icon: string; required: boolean } }) {
  const [preview, setPreview] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string>('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (ev) => setPreview(ev.target?.result as string)
        reader.readAsDataURL(file)
      } else {
        setPreview(null)
      }
    }
  }

  return (
    <div>
      <label className="block text-sm font-semibold mb-1.5 text-[#2c3e50]">
        {doc.label} {doc.required && <span style={{ color: 'red' }}>*</span>}
      </label>
      <label
        className="block relative cursor-pointer group"
        style={{
          border: `2px dashed ${preview ? '#1a7a3c' : '#d1d5db'}`,
          borderRadius: 12,
          padding: preview ? 0 : '20px 12px',
          background: preview ? 'transparent' : '#f8fafb',
          transition: 'all 0.3s ease',
          overflow: 'hidden',
          minHeight: preview ? 'auto' : 120,
        }}
      >
        {preview ? (
          // Image preview
          <div className="relative">
            <img
              src={preview}
              alt={doc.label}
              style={{
                width: '100%',
                height: 120,
                objectFit: 'cover',
                borderRadius: 10,
              }}
            />
            {/* Change overlay on hover */}
            <div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                background: 'rgba(26, 122, 60, 0.7)',
                borderRadius: 10,
                color: 'white',
                fontSize: '0.85rem',
                fontWeight: 600,
              }}
            >
              🔄 Change Image
            </div>
            {/* Success badge */}
            <div
              className="absolute top-1 right-1 px-2 py-0.5 rounded-full text-xs font-bold"
              style={{ background: '#1a7a3c', color: 'white' }}
            >
              ✓
            </div>
          </div>
        ) : (
          // Upload prompt
          <div className="text-center">
            <div style={{ fontSize: '1.8rem', marginBottom: 6 }}>{doc.icon}</div>
            <div className="text-xs font-semibold mb-1" style={{ color: '#2c3e50' }}>
              Click to upload
            </div>
            <div className="text-xs" style={{ color: '#95a5a6' }}>
              JPG, PNG, PDF
            </div>
          </div>
        )}
        <input
          type="file"
          className="hidden"
          accept="image/*,application/pdf"
          onChange={handleFileChange}
        />
      </label>
      {fileName && (
        <p className="text-xs mt-1.5 truncate" style={{ color: '#1a7a3c' }}>
          📎 {fileName}
        </p>
      )}
    </div>
  )
}
