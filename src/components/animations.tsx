'use client'

import { useEffect, useRef, useState } from 'react'

// Hook: Animate on scroll (intersection observer)
function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return { ref, inView }
}

// Hook: Counter animation
function useCounter(target: number, start: boolean, duration = 2000) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    const stepTime = 30
    const steps = duration / stepTime
    const increment = target / steps
    let current = 0

    const interval = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(interval)
      } else {
        setCount(Math.floor(current))
      }
    }, stepTime)

    return () => clearInterval(interval)
  }, [target, start, duration])

  return count
}

// Animation wrapper component
export function AnimateIn({ children, delay = 0, variant = 'fade-up' }: { 
  children: React.ReactNode
  delay?: number
  variant?: 'fade-up' | 'fade-left' | 'fade-right' | 'zoom-in'
}) {
  const { ref, inView } = useInView<HTMLDivElement>()
  
  const transforms = {
    'fade-up': 'translateY(40px)',
    'fade-left': 'translateX(-40px)',
    'fade-right': 'translateX(40px)',
    'zoom-in': 'scale(0.8)',
  }

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translate(0, 0) scale(1)' : transforms[variant],
        transition: `opacity 0.8s ease, transform 0.8s ease`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// Counter display component
export function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const { ref, inView } = useInView<HTMLSpanElement>()
  const count = useCounter(target, inView)
  
  const formatted = count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  
  return (
    <span ref={ref}>
      {formatted}{suffix}
    </span>
  )
}
