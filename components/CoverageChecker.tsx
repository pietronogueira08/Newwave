'use client'

import { useState, useRef } from 'react'
import { gsap } from 'gsap'
import SignalMark from './SignalMark'
import { saveCoverageLead } from '@/lib/supabase'

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5522999999999'

// Placeholder coverage data — replace with real bairros/CEPs
const COVERED_AREAS = [
  'centro', 'grussai', 'atafona', 'cajueiro', 'barra do açu',
  'pipeiras', 'barcelos', 'santa catarina', 'santo antônio',
  '28200', '28210', '28220',
]

function checkCoverage(input: string): boolean {
  const normalized = input.toLowerCase().trim().replace(/[-\s]/g, '')
  return COVERED_AREAS.some((area) =>
    normalized.includes(area.replace(/[-\s]/g, ''))
  )
}

export default function CoverageChecker() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<'idle' | 'checking' | 'covered' | 'uncovered'>('idle')
  const [nome, setNome] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [saving, setSaving] = useState(false)
  const ringsRef = useRef<HTMLDivElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  const animateRings = () => {
    if (!ringsRef.current) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const rings = ringsRef.current.querySelectorAll('.signal-ring')
    gsap.fromTo(
      rings,
      { scale: 0.5, opacity: 0.8 },
      { scale: 2.5, opacity: 0, duration: 1.2, stagger: 0.25, ease: 'power2.out' }
    )
  }

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setStatus('checking')
    animateRings()

    await new Promise((r) => setTimeout(r, 1800))

    const covered = checkCoverage(query)
    setStatus(covered ? 'covered' : 'uncovered')

    // Animate result in
    if (resultRef.current) {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (!prefersReduced) {
        gsap.fromTo(resultRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 })
      }
    }

    // Save to Supabase (covered leads)
    try {
      await saveCoverageLead({ bairro_ou_cep: query, coberto: covered })
    } catch {
      // Silent fail — don't block UX
    }
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await saveCoverageLead({
        bairro_ou_cep: query,
        nome,
        whatsapp,
        coberto: false,
      })
      setSubmitted(true)
    } catch {
      // Silent fail
    } finally {
      setSaving(false)
    }
  }

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Olá! Moro em ${query} e quero saber mais sobre os planos da NEWAVE.`)}`

  return (
    <section id="cobertura" className="py-20 sm:py-28 bg-brand-green-deep">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          A NEWAVE já chega até você?
        </h2>
        <p className="text-white/65 mb-10">
          Digite seu bairro ou CEP e veja na hora se sua região está na área de cobertura.
        </p>

        {/* Search form */}
        <form onSubmit={handleCheck} className="flex flex-col sm:flex-row gap-3 mb-10">
          <input
            id="coverage-input"
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setStatus('idle') }}
            placeholder="Ex: Centro, Grussaí ou 28200-000"
            className="flex-1 bg-white/10 border border-white/25 text-white placeholder:text-white/40 rounded-lg px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-brand-gold min-h-[44px] w-full"
            required
            autoComplete="off"
          />
          <button
            type="submit"
            id="coverage-submit"
            disabled={status === 'checking'}
            className="bg-brand-gold text-brand-graphite font-semibold px-8 py-4 rounded-lg text-base hover:brightness-110 transition-all duration-200 disabled:opacity-60 min-h-[44px] whitespace-nowrap"
          >
            {status === 'checking' ? 'Verificando...' : 'Verificar'}
          </button>
        </form>

        {/* Signal rings animation */}
        {status === 'checking' && (
          <div ref={ringsRef} className="relative flex items-center justify-center h-24 mb-8">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="signal-ring absolute rounded-full border-2 border-brand-gold"
                style={{ width: '60px', height: '60px' }}
              />
            ))}
            <SignalMark width={80} height={27} color="#EB9B14" />
          </div>
        )}

        {/* Result */}
        {(status === 'covered' || status === 'uncovered') && (
          <div ref={resultRef}>
            {status === 'covered' && (
              <div className="bg-white/10 border border-brand-gold/40 rounded-2xl p-8 text-left">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-brand-gold text-2xl">✓</span>
                  <p className="text-white font-semibold text-lg">
                    Sinal disponível na sua região!
                  </p>
                </div>
                <p className="text-white/70 mb-6">
                  Fale com a gente e ative a NEWAVE hoje mesmo.
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="coverage-whatsapp-cta"
                  className="inline-flex items-center gap-2 bg-brand-gold text-brand-graphite font-semibold px-8 py-4 rounded-lg hover:brightness-110 transition-all duration-200 min-h-[44px]"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Falar no WhatsApp
                </a>
              </div>
            )}

            {status === 'uncovered' && !submitted && (
              <div className="bg-white/10 border border-white/20 rounded-2xl p-8 text-left">
                <p className="text-white font-semibold text-lg mb-2">
                  Ainda não chegamos até você.
                </p>
                <p className="text-white/65 mb-6">
                  Estamos expandindo a rede. Deixe seu contato e avisamos assim que a NEWAVE chegar no seu bairro.
                </p>
                <form onSubmit={handleLeadSubmit} className="flex flex-col gap-4">
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Seu nome"
                    required
                    className="bg-white/10 border border-white/25 text-white placeholder:text-white/40 rounded-lg px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-brand-gold min-h-[44px]"
                  />
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="Seu WhatsApp (ex: 22 99999-9999)"
                    required
                    className="bg-white/10 border border-white/25 text-white placeholder:text-white/40 rounded-lg px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-brand-gold min-h-[44px]"
                  />
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-brand-gold text-brand-graphite font-semibold px-8 py-4 rounded-lg hover:brightness-110 transition-all duration-200 disabled:opacity-60 min-h-[44px]"
                  >
                    {saving ? 'Salvando...' : 'Quero ser avisado'}
                  </button>
                </form>
              </div>
            )}

            {status === 'uncovered' && submitted && (
              <div className="bg-white/10 border border-brand-gold/40 rounded-2xl p-8">
                <p className="text-white font-semibold text-lg">
                  Contato salvo! ✓
                </p>
                <p className="text-white/65 mt-2">
                  Vamos te avisar assim que a NEWAVE chegar na sua região.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
