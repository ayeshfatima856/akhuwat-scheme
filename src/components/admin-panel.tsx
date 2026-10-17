'use client'

import { useState, useEffect } from 'react'
import { X, LogOut, Eye, Check, XCircle, Clock, Download, FileText } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

interface AdminPanelProps {
  open: boolean
  onClose: () => void
}

interface Application {
  id: string
  fullName: string
  fatherName: string
  cnicNumber: string
  phoneNumber: string
  email: string | null
  ageAbove18: string
  gender: string
  maritalStatus: string
  address: string
  city: string | null
  province: string
  bankAccount?: string | null
  trackingId?: string
  loanType: string
  loanAmount: number
  loanPurpose: string
  monthlyIncome: number | null
  // File URLs (base64 data URLs ya Cloudinary URLs)
  cnicFrontUrl?: string | null
  cnicBackUrl?: string | null
  utilityBillUrl?: string | null
  photoUrl?: string | null
  status: string
  createdAt: string
}

export function AdminPanel({ open, onClose }: AdminPanelProps) {
  const [loggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)
  const [applications, setApplications] = useState<Application[]>([])
  const [loadingApps, setLoadingApps] = useState(false)
  const [selectedApp, setSelectedApp] = useState<Application | null>(null)
  const [filterStatus, setFilterStatus] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => { document.body.style.overflow = 'auto' }
  }, [open])

  // Auto-fetch applications when logged in
  useEffect(() => {
    if (loggedIn && open) {
      fetchApplications()
    }
  }, [loggedIn, open])

  if (!open) return null

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginLoading(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const result = await res.json()
      if (res.ok) {
        toast({ title: '✅ Login Successful', description: `Welcome, ${result.admin.username}!` })
        setLoggedIn(true)
        setPassword('')
      } else {
        toast({ title: '❌ Login Failed', description: result.error, variant: 'destructive' })
      }
    } catch {
      toast({ title: '❌ Network Error', description: 'Dobara try karein', variant: 'destructive' })
    } finally {
      setLoginLoading(false)
    }
  }

  const fetchApplications = async () => {
    setLoadingApps(true)
    try {
      const res = await fetch('/api/apply')
      const result = await res.json()
      if (res.ok) {
        setApplications(result.applications)
      }
    } catch {
      toast({ title: '❌ Error', description: 'Applications load nahi hui', variant: 'destructive' })
    } finally {
      setLoadingApps(false)
    }
  }

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/applications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      })
      const result = await res.json()
      if (res.ok) {
        toast({ title: '✅ Updated', description: result.message })
        // Update local state
        setApplications(prev => prev.map(app => 
          app.id === id ? { ...app, status: newStatus } : app
        ))
        if (selectedApp?.id === id) {
          setSelectedApp({ ...selectedApp, status: newStatus })
        }
      } else {
        toast({ title: '❌ Error', description: result.error, variant: 'destructive' })
      }
    } catch {
      toast({ title: '❌ Network Error', description: 'Dobara try karein', variant: 'destructive' })
    }
  }

  const handleLogout = () => {
    setLoggedIn(false)
    setUsername('')
    setPassword('')
    setSelectedApp(null)
    setApplications([])
    toast({ title: 'Logged Out', description: 'Aap safely logout ho gaye' })
  }

  // ===== PDF DOWNLOAD: Single Application =====
  const downloadSinglePDF = (app: Application) => {
    const doc = new jsPDF()
    
    // Header with green background
    doc.setFillColor(26, 122, 60)
    doc.rect(0, 0, 210, 35, 'F')
    
    // Logo text
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(22)
    doc.setFont('helvetica', 'bold')
    doc.text('AKHUWAT SCHEME', 105, 15, { align: 'center' })
    
    doc.setFontSize(11)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(244, 208, 63)
    doc.text('Loan Application Details', 105, 25, { align: 'center' })
    
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(9)
    doc.text(`Application ID: #${app.id.substring(0, 8)}`, 105, 32, { align: 'center' })
    
    // Reset colors
    doc.setTextColor(0, 0, 0)
    
    // Status badge
    let y = 45
    doc.setFillColor(
      app.status === 'Approved' ? 40 : app.status === 'Rejected' ? 220 : 255,
      app.status === 'Approved' ? 167 : app.status === 'Rejected' ? 53 : 193,
      app.status === 'Approved' ? 69 : app.status === 'Rejected' ? 69 : 7
    )
    doc.roundedRect(75, y, 60, 10, 3, 3, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text(`Status: ${app.status}`, 105, y + 7, { align: 'center' })
    
    y += 15
    
    // Personal Information Table
    autoTable(doc, {
      startY: y,
      head: [['Personal Information', '']],
      body: [
        ['Full Name', app.fullName],
        ['Father Name', app.fatherName],
        ['CNIC Number', app.cnicNumber],
        ['Phone Number', app.phoneNumber],
        ['Email', app.email || 'N/A'],
        ['Age Above 18', app.ageAbove18],
        ['Gender', app.gender],
        ['Marital Status', app.maritalStatus],
      ],
      theme: 'striped',
      headStyles: { fillColor: [26, 122, 60], fontSize: 11 },
      bodyStyles: { fontSize: 10 },
      columnStyles: { 0: { fontStyle: 'bold', cellWidth: 60 } },
    })
    
    // Address & Loan Table
    const addressLoanBody: any[] = [
      ['City', app.city || 'N/A'],
      ['Province', app.province],
      ['Loan Type', app.loanType],
      ['Loan Amount', `Rs. ${app.loanAmount.toLocaleString()}`],
      ['Loan Purpose', app.loanPurpose],
      ['Monthly Income', app.monthlyIncome ? `Rs. ${app.monthlyIncome.toLocaleString()}` : 'N/A'],
    ]
    if (app.bankAccount) {
      addressLoanBody.push(['Bank Account', app.bankAccount])
    }
    if (app.trackingId) {
      addressLoanBody.push(['Tracking ID', app.trackingId])
    }
    addressLoanBody.push(['Application Date', new Date(app.createdAt).toLocaleString()])

    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 5,
      head: [['Address & Loan Details', '']],
      body: addressLoanBody,
      theme: 'striped',
      headStyles: { fillColor: [212, 175, 55], fontSize: 11 },
      bodyStyles: { fontSize: 10 },
      columnStyles: { 0: { fontStyle: 'bold', cellWidth: 60 } },
    })

    // ===== DOCUMENTS SECTION IN PDF (CNIC + Bill Images) =====
    let currentY = (doc as any).lastAutoTable.finalY + 10
    
    // Section header for documents
    doc.setFillColor(26, 122, 60)
    doc.rect(14, currentY, 182, 8, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text('📎 UPLOADED DOCUMENTS', 105, currentY + 6, { align: 'center' })
    currentY += 15
    
    // Helper function to add image to PDF (with error handling)
    const addImageToPdf = (imageUrl: string | null | undefined, label: string, x: number, y: number, w: number, h: number) => {
      // Label
      doc.setTextColor(0, 0, 0)
      doc.setFontSize(9)
      doc.setFont('helvetica', 'bold')
      doc.text(label, x + w/2, y - 2, { align: 'center' })
      
      // Border
      doc.setDrawColor(200, 200, 200)
      doc.setFillColor(248, 250, 251)
      doc.roundedRect(x, y, w, h, 2, 2, 'FD')
      
      if (imageUrl && imageUrl.startsWith('data:image/')) {
        // It's a base64 image - add to PDF
        try {
          // Get image format from data URL
          const format = imageUrl.includes('image/png') ? 'PNG' : 'JPEG'
          doc.addImage(imageUrl, format, x + 2, y + 2, w - 4, h - 4, undefined, 'FAST')
          // Verified badge
          doc.setTextColor(26, 122, 60)
          doc.setFontSize(8)
          doc.text('✓ Verified', x + w - 18, y + h - 2)
        } catch (error) {
          // Image add nahi hua
          doc.setTextColor(150, 150, 150)
          doc.setFontSize(9)
          doc.setFont('helvetica', 'normal')
          doc.text('Image load nahi hui', x + w/2, y + h/2, { align: 'center' })
        }
      } else if (imageUrl && imageUrl.startsWith('FILE:')) {
        // File uploaded but not image
        doc.setTextColor(150, 150, 150)
        doc.setFontSize(9)
        doc.setFont('helvetica', 'normal')
        doc.text('📄 File: ' + imageUrl.substring(5, 25) + '...', x + w/2, y + h/2, { align: 'center' })
      } else if (imageUrl && (imageUrl.startsWith('http://') || imageUrl.startsWith('https://'))) {
        // Cloudinary URL - can't load in jsPDF directly, show URL
        doc.setTextColor(150, 150, 150)
        doc.setFontSize(8)
        doc.setFont('helvetica', 'normal')
        doc.text('Cloud Image URL', x + w/2, y + h/2 - 3, { align: 'center' })
        doc.text('(View in admin panel)', x + w/2, y + h/2 + 3, { align: 'center' })
      } else {
        // Not uploaded
        doc.setTextColor(200, 200, 200)
        doc.setFontSize(9)
        doc.setFont('helvetica', 'normal')
        doc.text('Not uploaded', x + w/2, y + h/2, { align: 'center' })
      }
    }
    
    // Add 3 document images (CNIC Front, CNIC Back, Utility Bill)
    const imgWidth = 55
    const imgHeight = 40
    const imgY = currentY
    const spacing = 10
    
    addImageToPdf(app.cnicFrontUrl, 'CNIC Front', 14, imgY, imgWidth, imgHeight)
    addImageToPdf(app.cnicBackUrl, 'CNIC Back', 14 + imgWidth + spacing, imgY, imgWidth, imgHeight)
    addImageToPdf(app.utilityBillUrl, 'Utility Bill', 14 + 2 * (imgWidth + spacing), imgY, imgWidth, imgHeight)
    
    currentY = imgY + imgHeight + 15
    
    // If content goes beyond page, add new page
    if (currentY > 270) {
      doc.addPage()
      currentY = 20
    }
    
    // Footer
    doc.setFillColor(15, 82, 40)
    doc.rect(0, 280, 210, 17, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(9)
    doc.text('Akhuwat Scheme - Be-sood Qarza Pakistan', 105, 287, { align: 'center' })
    doc.setFontSize(8)
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, 293, { align: 'center' })
    
    // Save the PDF
    const fileName = `Akhuwat_Application_${app.fullName.replace(/\s/g, '_')}_${app.id.substring(0, 6)}.pdf`
    doc.save(fileName)
    toast({ title: '✅ PDF Downloaded', description: `${fileName} saved!` })
  }

  // ===== PDF DOWNLOAD: All Applications =====
  const downloadAllPDF = () => {
    if (filteredApps.length === 0) {
      toast({ title: '❌ No Data', description: 'PDF banane ke liye koi application nahi hai', variant: 'destructive' })
      return
    }
    
    const doc = new jsPDF()
    
    // Header
    doc.setFillColor(26, 122, 60)
    doc.rect(0, 0, 210, 35, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(22)
    doc.setFont('helvetica', 'bold')
    doc.text('AKHUWAT SCHEME', 105, 15, { align: 'center' })
    doc.setFontSize(11)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(244, 208, 63)
    doc.text('All Loan Applications Report', 105, 25, { align: 'center' })
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(9)
    doc.text(`Total: ${filteredApps.length} applications | Generated: ${new Date().toLocaleDateString()}`, 105, 32, { align: 'center' })
    
    // Table
    autoTable(doc, {
      startY: 45,
      head: [['#', 'Name', 'CNIC', 'Phone', 'Loan Type', 'Amount', 'Status', 'Date']],
      body: filteredApps.map((app, i) => [
        i + 1,
        app.fullName,
        app.cnicNumber,
        app.phoneNumber,
        app.loanType,
        `Rs. ${app.loanAmount.toLocaleString()}`,
        app.status,
        new Date(app.createdAt).toLocaleDateString(),
      ]),
      theme: 'grid',
      headStyles: { fillColor: [26, 122, 60], fontSize: 9 },
      bodyStyles: { fontSize: 8 },
      alternateRowStyles: { fillColor: [240, 253, 244] },
    })
    
    // Footer
    doc.setFillColor(15, 82, 40)
    doc.rect(0, 280, 210, 17, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(9)
    doc.text('Akhuwat Scheme - Be-sood Qarza Pakistan', 105, 287, { align: 'center' })
    doc.setFontSize(8)
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, 293, { align: 'center' })
    
    doc.save(`Akhuwat_All_Applications_${new Date().toISOString().split('T')[0]}.pdf`)
    toast({ title: '✅ PDF Downloaded', description: `${filteredApps.length} applications ki report download ho gayi!` })
  }

  // Filter applications
  const filteredApps = applications.filter(app => {
    if (filterStatus && app.status !== filterStatus) return false
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      return (
        app.fullName.toLowerCase().includes(q) ||
        app.cnicNumber.toLowerCase().includes(q) ||
        app.phoneNumber.toLowerCase().includes(q)
      )
    }
    return true
  })

  // Stats
  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'Pending').length,
    approved: applications.filter(a => a.status === 'Approved').length,
    rejected: applications.filter(a => a.status === 'Rejected').length,
  }

  const inputClass = "w-full px-3.5 py-2.5 rounded-lg border-2 border-gray-200 focus:border-[#1a7a3c] focus:outline-none transition-colors text-sm"

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center p-4 overflow-y-auto"
      style={{ background: 'rgba(0,0,0,0.7)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-6xl w-full my-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
      >
        {/* Header */}
        <div
          className="p-4 text-white flex items-center justify-between"
          style={{ background: 'linear-gradient(135deg, #1a7a3c 0%, #0f5228 100%)' }}
        >
          <div className="flex items-center gap-3">
            <img src="/akhuwat-logo.svg" alt="Logo" width={40} height={40} />
            <div>
              <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.3rem', margin: 0 }}>
                🏦 Admin Panel
              </h2>
              <small style={{ opacity: 0.9 }}>
                {loggedIn ? `Welcome, ${username}` : 'Akhuwat Loan Management'}
              </small>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {loggedIn && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-full text-sm bg-red-500 hover:bg-red-600 transition-colors flex items-center gap-1"
              >
                <LogOut size={14} /> Logout
              </button>
            )}
            <button onClick={onClose} className="text-white hover:bg-white/20 rounded-full p-2 transition-colors">
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Body */}
        {!loggedIn ? (
          /* Login Form */
          <div className="p-8 md:p-12">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-6">
                <div style={{ fontSize: '3rem', color: '#1a7a3c', marginBottom: 12 }}>🔐</div>
                <h3 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.6rem', color: '#1a7a3c', marginBottom: 4 }}>
                  Admin Login
                </h3>
                <p style={{ color: '#5a6c7d' }}>Loan applications manage karne ke liye login karein</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: '#2c3e50' }}>Username</label>
                  <input
                    type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                    required placeholder="admin"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: '#2c3e50' }}>Password</label>
                  <input
                    type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                    required placeholder="••••••••"
                    className={inputClass}
                  />
                </div>
                <button
                  type="submit" disabled={loginLoading}
                  className="w-full py-3 rounded-full font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60"
                  style={{ background: 'linear-gradient(135deg, #1a7a3c 0%, #0f5228 100%)' }}
                >
                  {loginLoading ? '⏳ Logging in...' : 'Login'}
                </button>
              </form>

              <div
                className="mt-5 p-3 rounded-lg text-center text-sm"
                style={{ background: '#e8f5e9', border: '1px dashed #1a7a3c', color: '#0f5228' }}
              >
                <strong>Default Login (Testing):</strong><br />
                Username: <code>admin</code> | Password: <code>admin123</code>
              </div>
            </div>
          </div>
        ) : selectedApp ? (
          /* Application Detail View */
          <div className="p-6">
            <button
              onClick={() => setSelectedApp(null)}
              className="mb-4 text-sm font-medium hover:underline"
              style={{ color: '#1a7a3c' }}
            >
              ← Back to Dashboard
            </button>

            <div className="grid lg:grid-cols-3 gap-5">
              {/* Main details */}
              <div className="lg:col-span-2 space-y-5">
                <div className="rounded-xl p-6" style={{ background: '#f8fafb', border: '1px solid #e8f5e9' }}>
                  <h3 className="mb-4 pb-2 border-b-2" style={{ color: '#1a7a3c', fontFamily: 'var(--font-playfair), serif', fontSize: '1.2rem', borderColor: '#e8f5e9' }}>
                    👤 Personal Information
                  </h3>
                  <div className="text-center mb-4">
                    <div
                      className="inline-flex items-center justify-center mb-2"
                      style={{
                        width: 100, height: 100,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #1a7a3c, #0f5228)',
                        color: 'white',
                        fontSize: '2rem',
                        fontWeight: 700,
                      }}
                    >
                      {selectedApp.fullName.charAt(0).toUpperCase()}
                    </div>
                    <h5 style={{ margin: 0, color: '#2c3e50', fontSize: '1.2rem', fontWeight: 600 }}>
                      {selectedApp.fullName}
                    </h5>
                    <small style={{ color: '#95a5a6' }}>Application ID: #{selectedApp.id.substring(0, 8)}</small>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <DetailRow label="Father Name" value={selectedApp.fatherName} />
                    <DetailRow label="CNIC" value={selectedApp.cnicNumber} />
                    <DetailRow label="Phone" value={selectedApp.phoneNumber} />
                    <DetailRow label="Email" value={selectedApp.email || 'Not provided'} />
                    <DetailRow label="Age 18+" value={selectedApp.ageAbove18} />
                    <DetailRow label="Gender" value={selectedApp.gender} />
                    <DetailRow label="Marital Status" value={selectedApp.maritalStatus} />
                    <DetailRow label="Submitted" value={new Date(selectedApp.createdAt).toLocaleString()} />
                  </div>
                </div>

                <div className="rounded-xl p-6" style={{ background: '#f8fafb', border: '1px solid #e8f5e9' }}>
                  <h3 className="mb-4 pb-2 border-b-2" style={{ color: '#1a7a3c', fontFamily: 'var(--font-playfair), serif', fontSize: '1.2rem', borderColor: '#e8f5e9' }}>
                    📍 Address & Loan Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <DetailRow label="City" value={selectedApp.city || 'N/A'} />
                    <DetailRow label="Province" value={selectedApp.province} />
                    <DetailRow label="Loan Type" value={selectedApp.loanType} />
                    <DetailRow label="Loan Amount" value={`Rs. ${selectedApp.loanAmount.toLocaleString()}`} />
                    <DetailRow label="Loan Purpose" value={selectedApp.loanPurpose} />
                    <DetailRow label="Monthly Income" value={selectedApp.monthlyIncome ? `Rs. ${selectedApp.monthlyIncome.toLocaleString()}` : 'Not provided'} />
                    {/* Bank Account sirf dikhayo agar actual value hai */}
                    {selectedApp.bankAccount && (
                      <DetailRow label="Bank Account" value={selectedApp.bankAccount} />
                    )}
                    <DetailRow label="Tracking ID" value={selectedApp.trackingId} />
                  </div>
                </div>

                {/* ===== DOCUMENTS SECTION (CNIC + Bill Images) ===== */}
                <div className="rounded-xl p-6" style={{ background: '#f8fafb', border: '1px solid #e8f5e9' }}>
                  <h3 className="mb-4 pb-2 border-b-2" style={{ color: '#1a7a3c', fontFamily: 'var(--font-playfair), serif', fontSize: '1.2rem', borderColor: '#e8f5e9' }}>
                    📎 Uploaded Documents
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* CNIC Front */}
                    <DocumentImage 
                      label="CNIC Front" 
                      url={selectedApp.cnicFrontUrl} 
                      required={true}
                    />
                    {/* CNIC Back */}
                    <DocumentImage 
                      label="CNIC Back" 
                      url={selectedApp.cnicBackUrl} 
                      required={true}
                    />
                    {/* Utility Bill */}
                    <DocumentImage 
                      label="Utility Bill" 
                      url={selectedApp.utilityBillUrl} 
                      required={false}
                    />
                  </div>
                </div>
              </div>

              {/* Status sidebar */}
              <div className="space-y-5">
                <div className="rounded-xl p-6" style={{ background: '#f8fafb', border: '1px solid #e8f5e9' }}>
                  <h3 className="mb-4 pb-2 border-b-2" style={{ color: '#1a7a3c', fontFamily: 'var(--font-playfair), serif', fontSize: '1.2rem', borderColor: '#e8f5e9' }}>
                    📊 Status
                  </h3>
                  <div className="text-center mb-4">
                    <span
                      className="inline-block px-5 py-2 rounded-full text-sm font-semibold"
                      style={{
                        background: selectedApp.status === 'Approved' ? '#d4edda' : selectedApp.status === 'Rejected' ? '#f8d7da' : '#fff3cd',
                        color: selectedApp.status === 'Approved' ? '#155724' : selectedApp.status === 'Rejected' ? '#721c24' : '#856404',
                      }}
                    >
                      {selectedApp.status}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <button
                      onClick={() => updateStatus(selectedApp.id, 'Approved')}
                      disabled={selectedApp.status === 'Approved'}
                      className="w-full py-2.5 rounded-lg font-semibold text-white text-sm disabled:opacity-50 flex items-center justify-center gap-1.5"
                      style={{ background: '#28a745' }}
                    >
                      <Check size={16} /> Approve
                    </button>
                    <button
                      onClick={() => updateStatus(selectedApp.id, 'Rejected')}
                      disabled={selectedApp.status === 'Rejected'}
                      className="w-full py-2.5 rounded-lg font-semibold text-white text-sm disabled:opacity-50 flex items-center justify-center gap-1.5"
                      style={{ background: '#dc3545' }}
                    >
                      <XCircle size={16} /> Reject
                    </button>
                    <button
                      onClick={() => updateStatus(selectedApp.id, 'Pending')}
                      disabled={selectedApp.status === 'Pending'}
                      className="w-full py-2.5 rounded-lg font-semibold text-sm disabled:opacity-50 flex items-center justify-center gap-1.5"
                      style={{ background: '#ffc107', color: '#212529' }}
                    >
                      <Clock size={16} /> Set Pending
                    </button>
                  </div>
                </div>

                <div className="rounded-xl p-6" style={{ background: '#f8fafb', border: '1px solid #e8f5e9' }}>
                  <h3 className="mb-3" style={{ color: '#1a7a3c', fontFamily: 'var(--font-playfair), serif', fontSize: '1.2rem' }}>
                    📞 Quick Contact
                  </h3>
                  <p className="mb-2 text-sm"><strong>{selectedApp.fullName}</strong></p>
                  <p className="text-sm mb-2">
                    📱 <a href={`tel:${selectedApp.phoneNumber}`} style={{ color: '#1a7a3c' }}>{selectedApp.phoneNumber}</a>
                  </p>
                  {selectedApp.email && (
                    <p className="text-sm">
                      📧 <a href={`mailto:${selectedApp.email}`} style={{ color: '#1a7a3c' }}>{selectedApp.email}</a>
                    </p>
                  )}
                </div>

                {/* PDF Download Button */}
                <button
                  onClick={() => downloadSinglePDF(selectedApp)}
                  className="w-full py-3 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5 btn-shine"
                  style={{ background: 'linear-gradient(135deg, #d4af37, #b8941f)' }}
                >
                  <FileText size={16} /> Download as PDF
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Dashboard */
          <div className="p-5">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
              <StatCard icon="📋" number={stats.total} label="Total" color="#1a7a3c" />
              <StatCard icon="⏳" number={stats.pending} label="Pending" color="#ffc107" />
              <StatCard icon="✅" number={stats.approved} label="Approved" color="#28a745" />
              <StatCard icon="❌" number={stats.rejected} label="Rejected" color="#dc3545" />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-4 p-3 rounded-lg" style={{ background: '#f8fafb' }}>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none"
              >
                <option value="">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
              <input
                type="text" placeholder="🔍 Search by name, CNIC, phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 min-w-[200px] px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none"
              />
              <button
                onClick={fetchApplications}
                className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
                style={{ background: '#1a7a3c' }}
              >
                🔄 Refresh
              </button>
              <button
                onClick={downloadAllPDF}
                className="px-4 py-2 rounded-lg text-sm font-medium text-white flex items-center gap-1.5 transition-transform hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, #d4af37, #b8941f)' }}
              >
                <Download size={14} /> Download All PDF
              </button>
            </div>

            {/* Table */}
            {loadingApps ? (
              <div className="text-center py-12">
                <div style={{ fontSize: '2rem' }}>⏳</div>
                <p style={{ color: '#5a6c7d' }}>Loading applications...</p>
              </div>
            ) : filteredApps.length === 0 ? (
              <div className="text-center py-12">
                <div style={{ fontSize: '4rem', opacity: 0.5 }}>📭</div>
                <h5 style={{ color: '#2c3e50' }}>Koi application nahi mili</h5>
                <p style={{ color: '#95a5a6' }}>Abhi tak koi loan application submit nahi hui hai.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: '#e8f5e9', color: '#1a7a3c' }}>
                      <th className="text-left p-3 font-semibold">Name</th>
                      <th className="text-left p-3 font-semibold hidden md:table-cell">CNIC</th>
                      <th className="text-left p-3 font-semibold hidden lg:table-cell">Phone</th>
                      <th className="text-left p-3 font-semibold hidden md:table-cell">Loan Type</th>
                      <th className="text-left p-3 font-semibold">Amount</th>
                      <th className="text-left p-3 font-semibold">Status</th>
                      <th className="text-left p-3 font-semibold hidden lg:table-cell">Date</th>
                      <th className="text-left p-3 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApps.map((app) => (
                      <tr key={app.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <strong style={{ color: '#2c3e50' }}>{app.fullName}</strong>
                          <br />
                          <small style={{ color: '#95a5a6' }}>s/o {app.fatherName}</small>
                        </td>
                        <td className="p-3 hidden md:table-cell">{app.cnicNumber}</td>
                        <td className="p-3 hidden lg:table-cell">{app.phoneNumber}</td>
                        <td className="p-3 hidden md:table-cell">{app.loanType}</td>
                        <td className="p-3 font-semibold">Rs. {app.loanAmount.toLocaleString()}</td>
                        <td className="p-3">
                          <span
                            className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold"
                            style={{
                              background: app.status === 'Approved' ? '#d4edda' : app.status === 'Rejected' ? '#f8d7da' : '#fff3cd',
                              color: app.status === 'Approved' ? '#155724' : app.status === 'Rejected' ? '#721c24' : '#856404',
                            }}
                          >
                            {app.status}
                          </span>
                        </td>
                        <td className="p-3 hidden lg:table-cell text-xs">
                          {new Date(app.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-3">
                          <div className="flex gap-1.5">
                            <button
                              onClick={() => setSelectedApp(app)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs font-medium text-white transition-transform hover:-translate-y-0.5"
                              style={{ background: '#1a7a3c' }}
                              title="View Details"
                            >
                              <Eye size={12} /> View
                            </button>
                            <button
                              onClick={() => downloadSinglePDF(app)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded text-xs font-medium text-white transition-transform hover:-translate-y-0.5"
                              style={{ background: 'linear-gradient(135deg, #d4af37, #b8941f)' }}
                              title="Download PDF"
                            >
                              <Download size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span style={{ color: '#95a5a6', fontSize: '0.8rem', fontWeight: 600 }}>{label}:</span>
      <span style={{ color: '#2c3e50' }}>{value}</span>
    </div>
  )
}

function StatCard({ icon, number, label, color }: { icon: string; number: number; label: string; color: string }) {
  return (
    <div
      className="rounded-xl p-4 text-center transition-transform hover:-translate-y-1"
      style={{ background: 'white', boxShadow: '0 2px 8px rgba(15,82,40,0.08)' }}
    >
      <div style={{ fontSize: '2rem', marginBottom: 5 }}>{icon}</div>
      <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#2c3e50', fontFamily: 'var(--font-playfair), serif' }}>
        {number}
      </div>
      <div style={{ color: '#95a5a6', fontSize: '0.8rem' }}>{label}</div>
    </div>
  )
}

// ============================================================
// DOCUMENT IMAGE COMPONENT - CNIC/Bill images display (Bigger & Clearer)
// ============================================================
function DocumentImage({ label, url, required }: { label: string; url?: string | null; required: boolean }) {
  const [imageError, setImageError] = useState(false)
  const [showFullImage, setShowFullImage] = useState(false)
  
  // Check if URL is valid image (base64 ya http URL)
  const isValidImage = url && !url.startsWith('FILE:') && !imageError
  
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#2c3e50' }}>
          {label}
        </span>
        {required ? (
          <span style={{ fontSize: '0.7rem', color: '#dc3545', fontWeight: 600 }}>
            *Required
          </span>
        ) : (
          <span style={{ fontSize: '0.7rem', color: '#95a5a6', fontWeight: 600 }}>
            Optional
          </span>
        )}
      </div>
      
      {isValidImage ? (
        <>
          <div
            className="relative rounded-lg overflow-hidden cursor-pointer group"
            style={{
              aspectRatio: '3/2',
              border: '2px solid #d4edda',
              background: 'white',
              boxShadow: '0 2px 8px rgba(15,82,40,0.1)',
            }}
            onClick={() => setShowFullImage(true)}
          >
            <img
              src={url}
              alt={label}
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'contain',
                background: 'white',
              }}
              onError={() => setImageError(true)}
            />
            {/* Hover overlay */}
            <div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: 'rgba(26,122,60,0.8)' }}
            >
              <div style={{ textAlign: 'center', color: 'white' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>🔍</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                  Click to view full size
                </div>
              </div>
            </div>
            {/* Verified badge */}
            <div
              className="absolute top-1 right-1 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1"
              style={{ background: 'rgba(26,122,60,0.95)', color: 'white', fontSize: '0.65rem' }}
            >
              ✓ Verified
            </div>
          </div>
          
          {/* Full Image Modal - bahut bada display */}
          {showFullImage && url && (
            <div
              className="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-fade-in"
              style={{ background: 'rgba(0,0,0,0.9)' }}
              onClick={() => setShowFullImage(false)}
            >
              <div
                className="relative max-w-5xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={() => setShowFullImage(false)}
                  className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all z-10"
                  style={{ color: 'white' }}
                >
                  <X size={24} />
                </button>
                
                {/* Image */}
                <img
                  src={url}
                  alt={label}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '85vh',
                    objectFit: 'contain',
                    borderRadius: 8,
                    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                  }}
                />
                
                {/* Label bar */}
                <div
                  className="mt-4 text-center px-4 py-2 rounded-full inline-block"
                  style={{
                    background: 'rgba(26,122,60,0.95)',
                    color: 'white',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                  }}
                >
                  📎 {label} - Full Size View
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div
          className="rounded-lg flex items-center justify-center"
          style={{
            aspectRatio: '3/2',
            border: `2px dashed ${required ? '#ffc107' : '#e0e0e0'}`,
            background: '#f8fafb',
            color: '#95a5a6',
            fontSize: '0.85rem',
            textAlign: 'center',
            padding: '12px',
          }}
        >
          {url && url.startsWith('FILE:') ? (
            <div>
              <div style={{ fontSize: '2rem', marginBottom: 6 }}>📄</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{url.substring(5)}</div>
              <div style={{ fontSize: '0.7rem', marginTop: 4, color: '#95a5a6' }}>(File uploaded - not an image)</div>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: '2rem', marginBottom: 6 }}>📭</div>
              <div style={{ fontWeight: 600 }}>Not uploaded</div>
              {required && <div style={{ fontSize: '0.7rem', marginTop: 4, color: '#dc3545' }}>(Required)</div>}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
