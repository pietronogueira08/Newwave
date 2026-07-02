'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SignalMark from './SignalMark'

gsap.registerPlugin(ScrollTrigger)

export default function FinalCta() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !sectionRef.current || !contentRef.current) return

    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
    )
  }, [])

  return (
    <section ref={sectionRef} id="cta-final" className="py-24 sm:py-32 bg-brand-green-deep relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none" aria-hidden>
        <SignalMark width={500} height={166} />
      </div>
      <div ref={contentRef} className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Pronto pra ter internet de verdade?
        </h2>
        <p className="text-white/65 mb-10">
          Verifique a cobertura e ative sua conexão NEWAVE hoje mesmo.
        </p>
        <a
          href="#cobertura"
          id="final-cta-btn"
          className="inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-graphite font-semibold px-10 py-5 rounded-lg text-base hover:brightness-110 transition-all duration-200 min-h-[44px]"
        >
          Verificar cobertura agora
        </a>
      </div>
    </section>
  )
}
