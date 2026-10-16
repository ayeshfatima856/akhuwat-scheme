'use client'

import { useState, useEffect } from 'react'
import { X, LogOut, Eye, Check, XCircle, Clock } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

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
  city: string
  province: string
  loanType: string
  loanAmount: number
  loanPurpose: string
  monthlyIncome: number | null
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
                    <DetailRow label="Address" value={selectedApp.address} />
                    <DetailRow label="City" value={selectedApp.city} />
                    <DetailRow label="Province" value={selectedApp.province} />
                    <DetailRow label="Loan Type" value={selectedApp.loanType} />
                    <DetailRow label="Loan Amount" value={`Rs. ${selectedApp.loanAmount.toLocaleString()}`} />
                    <DetailRow label="Loan Purpose" value={selectedApp.loanPurpose} />
                    <DetailRow label="Monthly Income" value={selectedApp.monthlyIncome ? `Rs. ${selectedApp.monthlyIncome.toLocaleString()}` : 'Not provided'} />
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
                className="px-4 py-2 rounded-lg text-sm font-medium text-white"
                style={{ background: '#1a7a3c' }}
              >
                🔄 Refresh
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
                          <button
                            onClick={() => setSelectedApp(app)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs font-medium text-white"
                            style={{ background: '#1a7a3c' }}
                          >
                            <Eye size={12} /> View
                          </button>
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
