import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: {
            deep: '#004C1B',
            navy: '#00330F',
          },
          gold: '#EB9B14',
          sand: '#F7F4EC',
          graphite: '#16241C',
        },
      },
      fontFamily: {
        sans: ['var(--font-ibm-plex-sans)', 'sans-serif'],
        mono: ['var(--font-ibm-plex-mono)', 'monospace'],
      },
      animation: {
        'pulse-idle': 'pulse-idle 4s ease-in-out infinite',
        'signal-ring': 'signal-ring 1.5s ease-out forwards',
      },
      keyframes: {
        'pulse-idle': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.03)', opacity: '0.85' },
        },
        'signal-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.8' },
          '100%': { transform: 'scale(2.5)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}

export default config
