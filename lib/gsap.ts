'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false

export function registerGSAP() {
  if (typeof window === 'undefined' || registered) return
  gsap.registerPlugin(ScrollTrigger)
  registered = true
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function scrollReveal(
  targets: gsap.TweenTarget,
  trigger: Element,
  stagger = 0.1
) {
  if (prefersReducedMotion()) return

  gsap.fromTo(
    targets,
    { opacity: 0, y: 24 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
      stagger,
      scrollTrigger: {
        trigger,
        start: 'top 80%',
        once: true,
      },
    }
  )
}

export { gsap, ScrollTrigger }
