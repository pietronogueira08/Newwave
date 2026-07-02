'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  { number: '01', title: 'Verifique a cobertura', desc: 'Digite seu bairro ou CEP e confirme que a NEWAVE atende sua rua.' },
  { number: '02', title: 'Escolha seu plano', desc: 'Selecione entre 100, 300 ou 500 Mega conforme a sua necessidade.' },
  { number: '03', title: 'Agendamos a visita técnica', desc: 'Nossa equipe entra em contato para marcar o melhor horário para você.' },
  { number: '04', title: 'Você conectado em até 48h', desc: 'Instalamos e configuramos tudo. Você já sai usando.' },
]

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)
  const stepsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !sectionRef.current) return

    gsap.fromTo(
      stepsRef.current,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      }
    )
  }, [])

  return (
    <section ref={sectionRef} id="como-funciona" className="py-20 sm:py-28 bg-brand-green-deep">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">Como funciona a instalação</h2>
        <ol className="flex flex-col gap-8">
          {steps.map((step, i) => (
            <li
              key={step.number}
              ref={(el) => { if (el) stepsRef.current[i] = el as unknown as HTMLDivElement }}
              className="flex gap-6 items-start"
            >
              <span className="font-mono text-4xl font-bold text-brand-gold flex-shrink-0 leading-none">{step.number}</span>
              <div>
                <h3 className="font-semibold text-white text-lg mb-1">{step.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
