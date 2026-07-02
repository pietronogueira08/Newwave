import type { Metadata } from 'next'
import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex-sans',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'NEWAVE.NET — Internet Fibra Óptica em São João da Barra',
  description:
    'Planos de internet fibra óptica de 100 a 500 Mega em São João da Barra/RJ. Instalação em até 48h, sem fidelidade, suporte técnico local. Verifique a cobertura agora.',
  keywords: [
    'internet fibra óptica',
    'São João da Barra',
    'RJ',
    'NEWAVE',
    'banda larga',
    'fibra',
    'internet rápida',
  ],
  openGraph: {
    title: 'NEWAVE.NET — Internet Fibra Óptica em São João da Barra',
    description:
      'Planos de 100 a 500 Mega. Instalação em até 48h. Suporte técnico local.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'NEWAVE.NET',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEWAVE.NET — Internet Fibra Óptica em São João da Barra',
    description: 'Planos de 100 a 500 Mega. Instalação em até 48h.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'NEWAVE.NET',
  description: 'Provedora de internet fibra óptica em São João da Barra, RJ.',
  url: 'https://newave.net',
  telephone: '+55-22-99999-9999',
  areaServed: {
    '@type': 'City',
    name: 'São João da Barra',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'São João da Barra',
    addressRegion: 'RJ',
    addressCountry: 'BR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${ibmPlexSans.variable} ${ibmPlexMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
