'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const diffs = [
  {
    icon: '⚡',
    title: 'Fibra óptica ponta a ponta',
    desc: 'Sem perda de sinal em dia de chuva. Conexão estável 24h por dia.',
  },
  {
    icon: '🏠',
    title: 'Suporte técnico local',
    desc: 'Atendido por gente da região, que conhece São João da Barra.',
  },
  {
    icon: '🔓',
    title: 'Sem fidelidade e sem multa',
    desc: 'Cancele quando quiser. Sem letras miúdas, sem surpresas.',
  },
  {
    icon: '🚀',
    title: 'Instalação em até 48h',
    desc: 'Após a contratação, nossa equipe agenda e instala rapidinho.',
  },
  {
    icon: '📡',
    title: 'Wi-Fi 6 incluso em todos os planos',
    desc: 'Roteador de última geração sem custo adicional.',
  },
]

export default function Differentiators() {
  const sectionRef = useRef<HTMLElement>(null)
  const itemsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !sectionRef.current) return

    gsap.fromTo(
      itemsRef.current,
      { opacity: 0, y: 28 },
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
  }, [])

  return (
    <section ref={sectionRef} id="diferenciais" className="py-20 sm:py-28 bg-brand-sand">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-graphite">Por que escolher a NEWAVE</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {diffs.map((d, i) => (
            <div
              key={d.title}
              ref={(el) => { if (el) itemsRef.current[i] = el }}
              className="bg-white rounded-2xl p-7 shadow-sm border border-brand-graphite/5"
            >
              <span className="text-3xl mb-4 block">{d.icon}</span>
              <h3 className="font-semibold text-brand-graphite text-base mb-2">{d.title}</h3>
              <p className="text-sm text-brand-graphite/60 leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
