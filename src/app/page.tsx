'use client'

import { useState } from 'react'
import { Preloader } from '@/components/preloader'
import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { FloatingButtons } from '@/components/floating-buttons'
import {
  StatsSection,
  AboutSection,
  ProcessSection,
  TestimonialsSection,
} from '@/components/sections'
import { ContactSection, Footer } from '@/components/contact-footer'
import { UrduWelcomeSection, LoanPlansSection } from '@/components/loan-plans'
import { NotesSection } from '@/components/notes-section'
import { ApplyForm } from '@/components/apply-form'
import { AdminPanel } from '@/components/admin-panel'

export default function Home() {
  const [applyOpen, setApplyOpen] = useState(false)
  const [adminOpen, setAdminOpen] = useState(false)
  const [presetPlan, setPresetPlan] = useState<any>(null)
  const [presetLoanType, setPresetLoanType] = useState<string | undefined>(undefined)

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
      />
      <Hero onApplyClick={() => handleApplyClick()} />
      <StatsSection />
      <UrduWelcomeSection />
      <LoanPlansSection onApplyClick={handlePlanApplyClick} />
      <NotesSection />
      <AboutSection />
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
      {/* Admin panel - secret access only (logo 5x click or Ctrl+Shift+A) */}
      <AdminPanel open={adminOpen} onClose={() => setAdminOpen(false)} />
    </main>
  )
}
