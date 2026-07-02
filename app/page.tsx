import Hero from '@/components/Hero'
import CoverageChecker from '@/components/CoverageChecker'
import Plans from '@/components/Plans'
import Differentiators from '@/components/Differentiators'
import HowItWorks from '@/components/HowItWorks'
import Testimonials from '@/components/Testimonials'
import Faq from '@/components/Faq'
import FinalCta from '@/components/FinalCta'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function Home() {
  return (
    <main>
      <Hero />
      <CoverageChecker />
      <Plans />
      <Differentiators />
      <HowItWorks />
      <Testimonials />
      <Faq />
      <FinalCta />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
