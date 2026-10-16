'use client'

import { useState } from 'react'
import { Preloader } from '@/components/preloader'
import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { FloatingButtons } from '@/components/floating-buttons'
import {
  StatsSection,
  ServicesSection,
  AboutSection,
  ProcessSection,
  TestimonialsSection,
} from '@/components/sections'
import { ContactSection, Footer } from '@/components/contact-footer'
import { ApplyForm } from '@/components/apply-form'
import { AdminPanel } from '@/components/admin-panel'

export default function Home() {
  const [applyOpen, setApplyOpen] = useState(false)
  const [adminOpen, setAdminOpen] = useState(false)
  const [presetLoanType, setPresetLoanType] = useState<string | undefined>(undefined)

  const handleApplyClick = (loanType?: string) => {
    setPresetLoanType(loanType)
    setApplyOpen(true)
  }

  return (
    <main>
      <Preloader />
      <Navbar
        onApplyClick={() => handleApplyClick()}
        onAdminClick={() => setAdminOpen(true)}
      />
      <Hero onApplyClick={() => handleApplyClick()} />
      <StatsSection />
      <ServicesSection onApplyClick={handleApplyClick} />
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
          setPresetLoanType(undefined)
        }}
        presetLoanType={presetLoanType}
      />
      <AdminPanel open={adminOpen} onClose={() => setAdminOpen(false)} />
    </main>
  )
}
