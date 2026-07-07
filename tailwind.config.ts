import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Sana Labs Clean Palette ──────────────────────────────────────
        // Backgrounds
        'surface':        '#FFFFFF',
        'elevated':       '#F4F4F5',
        // Accent (blue)
        'accent':         '#2563EB',
        'accent-hover':   '#1D4ED8',
        'accent-subtle':  '#EFF6FF',
        'accent-border':  '#BFDBFE',
        // Neutral text (mirrors zinc)
        'ink':            '#0A0A0A',
        'muted':          '#71717A',
        'faint':          '#A1A1AA',
        // Borders
        'border-base':    '#E4E4E7',
        'border-strong':  '#D4D4D8',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        // Hero
        'display':  ['clamp(3rem, 6.5vw, 5.5rem)', { lineHeight: '1.03', letterSpacing: '-0.03em' }],
        'hero':     ['clamp(2rem, 4.5vw, 3.75rem)', { lineHeight: '1.1',  letterSpacing: '-0.025em' }],
        'title':    ['clamp(1.6rem, 3vw, 2.5rem)',  { lineHeight: '1.2',  letterSpacing: '-0.02em' }],
        'subtitle': ['1.125rem', { lineHeight: '1.7' }],
      },
      maxWidth: {
        'layout': '1280px',
        'prose':  '68ch',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.25, 0, 0, 1)',
      },
      borderRadius: {
        'bento': '1.5rem',   // 24px
        'card':  '1.25rem',  // 20px
      },
      boxShadow: {
        'card':  '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.04)',
        'lift':  '0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
        'glow':  '0 0 40px rgba(37,99,235,0.12)',
      },
    },
  },
  plugins: [],
};

export default config;
