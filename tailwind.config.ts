import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Editorial New York Snow & Taxi Ochre Color Palette ─────────
        'alabaster':   '#F7F7F7',
        'parchment':   '#EAEAEA',
        'sage':        '#F7F7F7',
        'sage-dark':   '#DCDCDC',
        
        // Accent Colors
        'taxi-ochre':  '#D4A26A',
        'radio-blue':  '#4A5877',
        
        // Dark section
        'ink':         '#1A1A1A',
        'ink-soft':    '#2E2E2E',
        
        // Text
        'stone':       '#1A1A1A',
        'clay':        '#7F8C8D',
        'fog':         '#7F8C8D',
        
        // Borders
        'border-warm': '#EAEAEA',
        'border-sage': '#DCDCDC',
        'border-ink':  '#2E2E2E',
        
        // Off-white text on dark
        'cream':       '#F7F7F7',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans:  ['var(--font-manrope)', 'system-ui', 'sans-serif'],
        mono:  ['var(--font-manrope)', 'system-ui', 'monospace'],
      },
      fontSize: {
        // ── Cover / Hero ───────────────────────────────────────────────
        'cover':    ['clamp(4rem, 11vw, 9rem)',  { lineHeight: '0.93', letterSpacing: '-0.03em' }],
        'feature':  ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.0',  letterSpacing: '-0.025em' }],
        'headline': ['clamp(1.8rem, 3.5vw, 3rem)',{ lineHeight: '1.1', letterSpacing: '-0.02em' }],
        // ── Body ───────────────────────────────────────────────────────
        'intro':    ['clamp(1.1rem, 2vw, 1.35rem)', { lineHeight: '1.75', letterSpacing: '0.005em' }],
        'body-lg':  ['1.125rem', { lineHeight: '1.8' }],
        'body':     ['1rem',     { lineHeight: '1.75' }],
        'label':    ['0.75rem',  { lineHeight: '1.5',  letterSpacing: '0.1em' }],
        'metric':   ['clamp(4rem, 9vw, 7.5rem)', { lineHeight: '0.9', letterSpacing: '-0.04em' }],
      },
      spacing: {
        'section': '7rem',
        'col-gap': '4rem',
      },
      maxWidth: {
        'layout': '1440px',
        'prose':  '68ch',
      },
      transitionTimingFunction: {
        'editorial': 'cubic-bezier(0.25, 0, 0, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
