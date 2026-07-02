'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ⚠️ PLACEHOLDER — substituir por depoimentos reais de clientes antes de publicar
const testimonials = [
  { id: 1, name: '[Nome do Cliente]', neighborhood: '[Bairro]', rating: 5, text: '[Inserir depoimento real do cliente aqui. Não use texto fictício.]' },
  { id: 2, name: '[Nome do Cliente]', neighborhood: '[Bairro]', rating: 5, text: '[Inserir depoimento real do cliente aqui. Não use texto fictício.]' },
  { id: 3, name: '[Nome do Cliente]', neighborhood: '[Bairro]', rating: 5, text: '[Inserir depoimento real do cliente aqui. Não use texto fictício.]' },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !sectionRef.current) return

    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      }
    )
  }, [])

  return (
    <section ref={sectionRef} id="depoimentos" className="py-20 sm:py-28 bg-brand-sand">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-brand-graphite mb-12">Quem já é NEWAVE</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              ref={(el) => { if (el) cardsRef.current[i] = el }}
              className="bg-white rounded-2xl p-7 shadow-sm border border-brand-graphite/5"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j} className="text-brand-gold text-sm">★</span>
                ))}
              </div>
              <p className="text-brand-graphite/70 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
              <div>
                <p className="font-semibold text-brand-graphite text-sm">{t.name}</p>
                <p className="text-brand-graphite/40 text-xs">{t.neighborhood}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-brand-graphite/30">
          ⚠️ Substituir por depoimentos reais antes de publicar.
        </p>
      </div>
    </section>
  )
}
