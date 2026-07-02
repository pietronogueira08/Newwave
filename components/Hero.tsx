'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import SignalMark from './SignalMark'

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5522999999999'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá! Gostaria de saber mais sobre os planos da NEWAVE.')}`

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const signalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const words = headlineRef.current?.querySelectorAll('.word')
    const tl = gsap.timeline({ delay: 0.1 })

    // Headline words stagger
    if (words && words.length > 0) {
      tl.fromTo(
        words,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.04, ease: 'power2.out' }
      )
    }

    // Sub + CTA fade in
    tl.fromTo(
      [subRef.current, ctaRef.current],
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: 'power2.out' },
      '-=0.2'
    )

    // Ambient pulse on signal
    if (signalRef.current) {
      gsap.to(signalRef.current, {
        scale: 1.03,
        duration: 3,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1.5,
      })
    }
  }, [])

  const headline = 'Internet fibra óptica com velocidade real em São João da Barra'
  const words = headline.split(' ')

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-brand-green-deep"
    >
      {/* Background signal mark */}
      <div
        ref={signalRef}
        className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none"
        aria-hidden="true"
      >
        <SignalMark animated width={600} height={200} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 sm:py-32">
        {/* Logo / brand mark */}
        <div className="mb-8 flex items-center gap-3">
          <SignalMark width={60} height={20} />
          <span className="text-white font-semibold text-xl tracking-wide">NEWAVE.NET</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          <div ref={headlineRef} className="flex flex-wrap gap-x-4 gap-y-1">
            {words.map((word, i) => (
              <span key={i} className="word inline-block">
                {word}
              </span>
            ))}
          </div>
        </h1>

        {/* Subheadline */}
        <p
          ref={subRef}
          className="text-lg sm:text-xl text-white/75 mb-10 max-w-2xl"
        >
          Planos de 100 a 500 Mega. Instalação em até 48h. Suporte técnico local.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
          <a
            href="#cobertura"
            id="hero-cta-cobertura"
            className="inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-graphite font-semibold px-8 py-4 rounded-lg text-base hover:brightness-110 transition-all duration-200 min-h-[44px]"
          >
            Verificar cobertura
          </a>
          <a
            href={WHATSAPP_URL}
            id="hero-cta-whatsapp"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border-2 border-white/50 text-white font-semibold px-8 py-4 rounded-lg text-base hover:bg-white/10 transition-all duration-200 min-h-[44px]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Falar no WhatsApp
          </a>
        </div>

        {/* Key stats */}
        <div className="mt-16 flex flex-wrap gap-8 border-t border-white/20 pt-8">
          {[
            { value: '500', unit: 'Mega', label: 'Velocidade máxima' },
            { value: '48h', unit: '', label: 'Prazo de instalação' },
            { value: '100%', unit: '', label: 'Fibra óptica ponta a ponta' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-mono text-2xl font-semibold text-brand-gold">
                {stat.value}<span className="text-base ml-1 text-white/60">{stat.unit}</span>
              </p>
              <p className="text-sm text-white/60 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
