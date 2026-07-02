import SignalMark from './SignalMark'

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5522999999999'

export default function Footer() {
  return (
    <footer id="rodape" className="bg-brand-green-navy py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <SignalMark width={48} height={16} />
              <span className="text-white font-bold text-lg">NEWAVE.NET</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Internet fibra óptica de verdade para São João da Barra e região.
            </p>
            <p className="mt-4 text-white/30 text-xs">
              CNPJ: [00.000.000/0001-00] — São João da Barra, RJ
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Links rápidos</h3>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'Verificar cobertura', href: '#cobertura' },
                { label: 'Planos', href: '#planos' },
                { label: 'Diferenciais', href: '#diferenciais' },
                { label: 'Como funciona', href: '#como-funciona' },
                { label: 'FAQ', href: '#faq' },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-white/50 text-sm hover:text-white transition-colors duration-150">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Contato</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 text-sm hover:text-white transition-colors duration-150"
                >
                  WhatsApp: (22) 99999-9999
                </a>
              </li>
              <li>
                <span className="text-white/50 text-sm">Área: São João da Barra/RJ</span>
              </li>
              <li>
                <span className="text-white/50 text-sm">Seg–Sex: 08h–18h</span>
              </li>
            </ul>
            {/* Social */}
            <div className="flex gap-4 mt-6">
              <a href="#" aria-label="Instagram" className="text-white/40 hover:text-brand-gold transition-colors duration-150">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" aria-label="Facebook" className="text-white/40 hover:text-brand-gold transition-colors duration-150">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <p className="text-white/25 text-xs text-center">
            © {new Date().getFullYear()} NEWAVE.NET — Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
