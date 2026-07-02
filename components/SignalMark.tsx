'use client'

import { useEffect, useRef } from 'react'

interface SignalMarkProps {
  className?: string
  animated?: boolean
  rings?: boolean
  color?: string
  width?: number
  height?: number
}

export default function SignalMark({
  className = '',
  animated = false,
  rings = false,
  color = '#EB9B14',
  width = 240,
  height = 80,
}: SignalMarkProps) {
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    if (!animated || !pathRef.current) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return
    pathRef.current.classList.add('animate-draw-signal')
  }, [animated])

  if (rings) {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute rounded-full border-2 opacity-0"
            style={{
              borderColor: color,
              width: `${80 + i * 60}px`,
              height: `${80 + i * 60}px`,
              animation: `signal-ring 1.5s ease-out ${i * 0.3}s forwards`,
            }}
          />
        ))}
        <svg viewBox="0 0 240 80" fill="none" xmlns="http://www.w3.org/2000/svg" width={width} height={height}>
          <path
            d="M0,60 L40,20 L80,55 L120,15 L160,55 L200,20 L240,60"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    )
  }

  return (
    <svg
      viewBox="0 0 240 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
      aria-hidden="true"
    >
      <path
        ref={pathRef}
        d="M0,60 L40,20 L80,55 L120,15 L160,55 L200,20 L240,60"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
