'use client'

import { useState } from 'react'

const faqs = [
  {
    q: 'Quanto tempo demora a instalação?',
    a: 'Em até 48 horas após a contratação. Nossa equipe agenda um horário que seja conveniente para você.',
  },
  {
    q: 'Preciso pagar taxa de instalação?',
    a: 'Não. A instalação é gratuita em todos os planos.',
  },
  {
    q: 'A NEWAVE atende empresas?',
    a: 'Sim! Atendemos residências e empresas em São João da Barra. Entre em contato para um plano empresarial personalizado.',
  },
  {
    q: 'Como funciona o suporte técnico?',
    a: 'Nosso suporte é local, feito por técnicos da região. Atendimento via WhatsApp e telefone em horário comercial.',
  },
  {
    q: 'Posso trocar de plano depois?',
    a: 'Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento, sem multa.',
  },
]

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="py-20 sm:py-28 bg-brand-sand">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-brand-graphite mb-12">Perguntas frequentes</h2>
        <dl className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-brand-graphite/8 overflow-hidden"
            >
              <dt>
                <button
                  id={`faq-${i}`}
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-brand-graphite text-sm hover:bg-brand-sand/50 transition-colors duration-150 min-h-[44px]"
                  aria-expanded={open === i}
                >
                  <span>{faq.q}</span>
                  <span
                    className="flex-shrink-0 text-brand-gold transition-transform duration-200"
                    style={{ transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </span>
                </button>
              </dt>
              {open === i && (
                <dd className="px-6 pb-5">
                  <p className="text-sm text-brand-graphite/65 leading-relaxed">{faq.a}</p>
                </dd>
              )}
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
