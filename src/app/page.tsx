'use client'

import { useState, useEffect } from 'react'
import { Preloader } from '@/components/preloader'
import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { FloatingButtons } from '@/components/floating-buttons'
import {
  StatsSection,
  ProcessSection,
  TestimonialsSection,
} from '@/components/sections'
import { ContactSection, Footer } from '@/components/contact-footer'
import { UrduWelcomeSection, LoanPlansSection } from '@/components/loan-plans'
import { NotesSection } from '@/components/notes-section'
import { ApplyForm } from '@/components/apply-form'
import { AdminPanel } from '@/components/admin-panel'
import { AboutModal } from '@/components/about-modal'

export default function Home() {
  const [applyOpen, setApplyOpen] = useState(false)
  const [adminOpen, setAdminOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [presetPlan, setPresetPlan] = useState<any>(null)
  const [presetLoanType, setPresetLoanType] = useState<string | undefined>(undefined)

  // ===== WEBSITE KHULTE HI APPLY FORM AUTO-OPEN HO JAYE =====
  // Preloader (2.2s) ke thik baad form khul jata hai
  // User ko pehle hi form samne mil jaye ga
  useEffect(() => {
    const timer = setTimeout(() => {
      setApplyOpen(true)
    }, 2500) // 2.5 second baad (preloader 2.2s + thoda buffer)
    return () => clearTimeout(timer)
  }, [])

  const handleApplyClick = (loanType?: string) => {
    setPresetPlan(null)
    setPresetLoanType(loanType)
    setApplyOpen(true)
  }

  const handlePlanApplyClick = (plan: any) => {
    setPresetLoanType(undefined)
    setPresetPlan(plan)
    setApplyOpen(true)
  }

  const handleSecretAdmin = () => {
    setAdminOpen(true)
  }

  return (
    <main>
      <Preloader />
      <Navbar
        onApplyClick={() => handleApplyClick()}
        onSecretAdminClick={handleSecretAdmin}
        onAboutClick={() => setAboutOpen(true)}
      />
      <Hero onApplyClick={() => handleApplyClick()} />
      <StatsSection />
      <UrduWelcomeSection />
      <LoanPlansSection onApplyClick={handlePlanApplyClick} />
      <NotesSection />
      <ProcessSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      <FloatingButtons />

      {/* Modals */}
      <ApplyForm
        open={applyOpen}
        onClose={() => {
          setApplyOpen(false)
          setPresetPlan(null)
          setPresetLoanType(undefined)
        }}
        presetLoanType={presetLoanType}
        presetPlan={presetPlan}
      />
      {/* About Modal - separate full-screen interface */}
      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
      {/* Admin panel - secret access only (logo 5x click or Ctrl+Shift+A) */}
      <AdminPanel open={adminOpen} onClose={() => setAdminOpen(false)} />
    </main>
  )
}
