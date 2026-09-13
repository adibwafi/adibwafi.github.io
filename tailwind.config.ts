import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── adibwafi.com Brand Tokens (from Brand Guidelines v1.0) ────────
        paper:            'var(--paper)',
        surface:          'var(--surface)',
        ink:              'var(--ink)',
        'ink-soft':       'var(--ink-soft)',
        inkSoft:          'var(--ink-soft)',
        'ink-faint':      'var(--ink-faint)',
        inkFaint:         'var(--ink-faint)',
        rule:             'var(--rule)',
        accent:           'var(--accent)',
        'accent-ink':     'var(--accent-ink)',
        accentInk:        'var(--accent-ink)',
        'accent-tint':    'var(--accent-tint)',
        accentTint:       'var(--accent-tint)',
        'on-accent':      'var(--on-accent)',
        onAccent:         'var(--on-accent)',
        structural:       'var(--structural)',
        'structural-soft':'var(--structural-soft)',
        structuralSoft:   'var(--structural-soft)',
        'surface-dark':   'var(--surface-dark)',
        surfaceDark:      'var(--surface-dark)',
        'on-dark':        'var(--on-dark)',
        onDark:           'var(--on-dark)',
        'on-dark-soft':   'var(--on-dark-soft)',
        onDarkSoft:       'var(--on-dark-soft)',

        // Backward compatibility aliases
        elevated:         'var(--surface)',
        muted:            'var(--ink-soft)',
        faint:            'var(--ink-faint)',
        'border-base':    'var(--rule)',
        'border-strong':  'var(--ink-faint)',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans:  ['var(--font-sans)', 'Manrope', '-apple-system', 'sans-serif'],
        mono:  ['var(--font-mono)', 'JetBrains Mono', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        // Hero / Display scale
        'folio':    ['clamp(3.5rem, 7vw, 7rem)',    { lineHeight: '1.0', letterSpacing: '-0.03em' }],
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
        'glow':  '0 0 40px rgba(212,162,106,0.18)',
      },
    },
  },
  plugins: [],
};

export default config;
