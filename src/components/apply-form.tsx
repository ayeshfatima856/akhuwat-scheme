'use client'

import { useState, useEffect } from 'react'
import { X, Upload } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface ApplyFormProps {
  open: boolean
  onClose: () => void
  presetLoanType?: string
}

export function ApplyForm({ open, onClose, presetLoanType }: ApplyFormProps) {
  const [submitting, setSubmitting] = useState(false)
  const { toast } = useToast()
  
  const [formData, setFormData] = useState({
    fullName: '', fatherName: '', cnicNumber: '', phoneNumber: '',
    email: '', ageAbove18: '', gender: '', maritalStatus: '',
    address: '', city: '', province: '',
    loanType: '', loanAmount: '', loanPurpose: '', monthlyIncome: '',
    confirmInfo: false,
  })

  // Preset loan type when provided
  useEffect(() => {
    if (presetLoanType) {
      setFormData(prev => ({ ...prev, loanType: presetLoanType }))
    }
  }, [presetLoanType])

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
          address: '', city: '', province: '',
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
            </div>
          </div>

          {/* Address */}
          <div>
            <h3 className="mb-4 pb-2 border-b-2" style={{ color: '#1a7a3c', fontFamily: 'var(--font-playfair), serif', fontSize: '1.2rem', borderColor: '#e8f5e9' }}>
              📍 Address Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Complete Address <span style={{ color: 'red' }}>*</span></label>
                <textarea name="address" value={formData.address} onChange={handleChange} required rows={2}
                  placeholder="House #, Street, Area, etc." className={inputClass} />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
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

          {/* Document Uploads (simulated for demo) */}
          <div>
            <h3 className="mb-4 pb-2 border-b-2" style={{ color: '#1a7a3c', fontFamily: 'var(--font-playfair), serif', fontSize: '1.2rem', borderColor: '#e8f5e9' }}>
              📎 Document Uploads
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {['Personal Photo', 'CNIC Front', 'CNIC Back'].map((doc, i) => (
                <div key={i}>
                  <label className={labelClass}>{doc} <span style={{ color: 'red' }}>*</span></label>
                  <div
                    className="border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-colors hover:bg-[#e8f5e9]"
                    style={{ borderColor: '#1a7a3c', background: '#f8fafb' }}
                  >
                    <Upload size={28} style={{ color: '#1a7a3c', margin: '0 auto 8px' }} />
                    <div className="text-sm font-semibold" style={{ color: '#2c3e50' }}>Click to upload</div>
                    <div className="text-xs" style={{ color: '#95a5a6' }}>JPG, PNG (Max 5MB)</div>
                    <input type="file" className="hidden" accept="image/*" />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs italic mt-3" style={{ color: '#95a5a6' }}>
              ℹ️ Demo mode: File uploads are simulated. In production, files would be saved to server.
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
