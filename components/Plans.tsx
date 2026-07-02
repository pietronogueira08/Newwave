'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5522999999999'

const plans = [
  {
    id: 'plan-100',
    speed: '100',
    price: 'R$ [VALOR]',
    period: '/mês',
    label: 'Básico',
    featured: false,
    features: [
      'Wi-Fi 6 incluso',
      'Instalação gratuita',
      'Sem fidelidade',
      'Suporte técnico local',
      'Fibra ponta a ponta',
    ],
  },
  {
    id: 'plan-300',
    speed: '300',
    price: 'R$ [VALOR]',
    period: '/mês',
    label: 'Mais popular',
    featured: true,
    features: [
      'Wi-Fi 6 incluso',
      'Instalação gratuita',
      'Sem fidelidade',
      'Suporte técnico local',
      'Fibra ponta a ponta',
    ],
  },
  {
    id: 'plan-500',
    speed: '500',
    price: 'R$ [VALOR]',
    period: '/mês',
    label: 'Premium',
    featured: false,
    features: [
      'Wi-Fi 6 incluso',
      'Instalação gratuita',
      'Sem fidelidade',
      'Suporte técnico local',
      'Fibra ponta a ponta',
    ],
  },
]

export default function Plans() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !sectionRef.current) return

    // ScrollTrigger reveal
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    )

    // Hover GSAP quickTo on each card
    cardsRef.current.forEach((card) => {
      if (!card) return
      const moveY = gsap.quickTo(card, 'y', { duration: 0.3, ease: 'power2.out' })

      card.addEventListener('mouseenter', () => moveY(-6))
      card.addEventListener('mouseleave', () => moveY(0))
    })
  }, [])

  const whatsappMsg = (speed: string) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Olá! Quero assinar o plano ${speed} Mega da NEWAVE.`)}`

  return (
    <section
      ref={sectionRef}
      id="planos"
      className="py-20 sm:py-28 bg-brand-sand"
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-graphite">Planos</h2>
          <p className="mt-3 text-brand-graphite/60">Escolha a velocidade ideal para você e sua família.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <div
              key={plan.id}
              id={plan.id}
              ref={(el) => { if (el) cardsRef.current[i] = el }}
              className={`relative rounded-2xl p-8 flex flex-col transition-shadow duration-300 ${
                plan.featured
                  ? 'bg-brand-green-deep text-white shadow-2xl ring-2 ring-brand-gold'
                  : 'bg-white text-brand-graphite shadow-md hover:shadow-xl hover:ring-2 hover:ring-brand-gold'
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-gold text-brand-graphite text-xs font-semibold px-4 py-1 rounded-full">
                  {plan.label}
                </span>
              )}
              {!plan.featured && (
                <span className="text-xs font-medium uppercase tracking-widest text-brand-graphite/40 mb-4">
                  {plan.label}
                </span>
              )}
              {plan.featured && (
                <span className="text-xs font-medium uppercase tracking-widest text-white/50 mb-4">
                  &nbsp;
                </span>
              )}

              {/* Speed */}
              <div className="mb-2">
                <span className="font-mono text-6xl font-bold">{plan.speed}</span>
                <span className={`ml-2 text-xl font-mono ${plan.featured ? 'text-white/70' : 'text-brand-graphite/50'}`}>
                  Mega
                </span>
              </div>

              {/* Price */}
              <p className={`font-mono text-xl font-semibold mb-6 ${plan.featured ? 'text-brand-gold' : 'text-brand-graphite'}`}>
                {plan.price}<span className={`text-sm font-normal ${plan.featured ? 'text-white/60' : 'text-brand-graphite/50'}`}>{plan.period}</span>
              </p>

              {/* Features */}
              <ul className="flex flex-col gap-3 flex-1 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <span className="text-brand-gold flex-shrink-0">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span className={plan.featured ? 'text-white/85' : 'text-brand-graphite/75'}>{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={whatsappMsg(plan.speed)}
                target="_blank"
                rel="noopener noreferrer"
                id={`cta-${plan.id}`}
                className={`flex items-center justify-center gap-2 font-semibold px-6 py-4 rounded-lg text-sm transition-all duration-200 min-h-[44px] ${
                  plan.featured
                    ? 'bg-brand-gold text-brand-graphite hover:brightness-110'
                    : 'bg-brand-green-deep text-white hover:bg-brand-green-navy'
                }`}
              >
                Assinar agora
              </a>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-brand-graphite/40">
          * Preços a confirmar. Sem taxa de instalação. Sem fidelidade.
        </p>
      </div>
    </section>
  )
}
