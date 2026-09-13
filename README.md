# Muhamad Adibwafi Menako — Portfolio

[![Node.js CI](https://github.com/adibwafi/adibwafi.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/adibwafi/adibwafi.github.io/actions/workflows/ci.yml)
[![Live Site](https://img.shields.io/badge/Live%20Site-adibwafi.com-D4A26A?style=flat-square)](https://adibwafi.com)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.25-000000?style=flat-square&logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.4-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.7-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

High-end personal portfolio for **Muhamad Adibwafi Menako**, Full Stack Software Engineer. Deployed and served at [adibwafi.com](https://adibwafi.com).

Built with Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, and Lucide React. Implements bilingual internationalization (EN/ID), 3-state dark mode synchronization, interactive case studies, a videography portfolio with an auto-advancing production carousel, animated SVG brand identity loaders, and enterprise-grade observability (Sentry, Vercel Analytics, GA4, GTM).

---

## Brand Identity & Design System (v1.0)

The visual identity follows **High-End Editorial Minimalism** specified in the brand design tokens (`public/brandGuideline/brand-package/tokens/` and `AGENTS.md`):

### 1. Dual Color Registers
- **Expressive Accent (`accent`)**: Doraemon Blue (`#00A0E9`) in Light mode (AA contrast text `#0066CC`, tint `#E6F4FE`, on-accent `#FFFFFF`); Electric Neon Lime (`#CDFE00`) in Dark mode — no gold/brown in either mode.
- **Technical Structural (`structural`)**: Radio City Blue (`#4A5877`) — reserved exclusively for diagrams, architectural construction elements, and dot-grids.

### 2. 3-State Dark Mode Tokens
Supports system preference (`prefers-color-scheme`), explicit toggle (`data-theme`), and CSS class overrides:
- **Light Theme**: Paper `#F8FAFC`, Surface `#FFFFFF`, Ink `#0F172A`, Ink-Soft `#475569`, Rule `#E2E8F0`, Accent `#00A0E9`
- **Dark Theme**: Paper `#000000`, Surface `#121212`, Ink `#FFFFFF`, Ink-Soft `#A2A2A2`, Rule `#222222`, Accent `#CDFE00`

### 3. Typography Hierarchy (Strict 3 Roles)
- **Serif (`--font-serif`) — Cormorant Garamond**: Editorial headlines (>24px), display titles, and pull-quotes. Never used for body paragraphs.
- **Sans (`--font-sans`) — Manrope**: Primary body copy, navigation labels, interactive buttons, and interface components.
- **Mono (`--font-mono`) — JetBrains Mono**: Eyebrow tags, metrics, dates, folio numbering, tech stack pills, and metadata.

### 4. Brandmark & Supergraphic
- **Monogram "AM" Brandmark**: Linear geometric monogram (`/public/brand/mark-*.svg`) with strict 1u clearspace enforcement.
- **Animated Brand Loader**: Custom SVG stroke-drawing animation (`components/BrandLoader.tsx` and `app/loading.tsx`) dynamically morphing M contours and A crossbars.
- **"Frame & Grid" Supergraphic**: Paired ochre bracket and slate blue dot-grid elements for structured editorial accents.

---

## Key Features & Architecture

1. **Editorial Bento Hero**: Concise 6-second recruiter pitch, interactive profile modal, and social verification (`rel="me"`).
2. **Dynamic Impact Proof**: Typographic metric columns highlighting system performance gains, scaling milestones, and database optimization figures.
3. **Curated Work & Case Studies**: Asymmetrical card layouts with live WebP mockups, architectural summaries, repository links, and live demo triggers for production systems including **Kinghouse Management** (Short-Stay Hospitality ERP & Dynamic Pricing), **Enterprise LMS Architecture Blueprint**, **AI Baby Meal Planner**, **Amana Care**, and **Livecode Logic Trainer**.
4. **Career Ledger & Tech Stack**: Detailed career timeline detailing software engineering milestones and categorized tool stack.
5. **Videography Portfolio**: `/videography` showcases 11 selected video productions (commercial campaigns, aviation heritage films, automotive culture documentaries, motion graphics) through a Sana Learn-inspired "customer stories" auto-advancing carousel, a filterable full archive grid, and a click-to-play modal player, linked directly to the official YouTube channel ([@Setipiskumis](https://www.youtube.com/@Setipiskumis)).
6. **Bilingual Support (i18n)**: Seamless English & Indonesian translation switching powered by React Context (`SiteContext`).
7. **Observability & Analytics**: Integrated Sentry 10 error reporting (`instrumentation.ts`, `instrumentation-client.ts`, and `app/global-error.tsx`), Vercel Speed Insights, Google Tag Manager (`GTM-KHMNHQN6`), and custom virtual route pageview tracking.
8. **Official Domain Email Infrastructure**: Centralized email configuration (`hello@adibwafi.com`) powered by Cloudflare Email Routing for inbound forwarding and Brevo SMTP relay for outbound delivery, integrated with copy-to-clipboard toast feedback.

---

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Build & Validation

```bash
# Typecheck and production build
npm run build

# Run ESLint validation
npm run lint
```

---

## Directory Structure

```
adibwafi.github.io/
├── AGENTS.md                  # Brand rules & design system guidelines for AI agents
├── PROJECT_STATE.md           # Single source of truth repository architecture
├── app/
│   ├── layout.tsx             # Root HTML shell, brand fonts, metadata & analytics scripts
│   ├── loading.tsx            # Route loading boundary with animated BrandLoader
│   ├── global-error.tsx       # Sentry root error boundary and error capture handler
│   ├── page.tsx               # Home route wrapper (<HomePage />)
│   ├── experience/page.tsx    # Experience & career timeline route (/experience)
│   ├── work/page.tsx          # Featured portfolio case studies route (/work)
│   ├── videography/page.tsx   # Video production portfolio route (/videography)
│   ├── globals.css            # Brand design tokens, CSS variables & animations
│   ├── sitemap.ts             # Dynamic XML sitemap generator
│   └── not-found.tsx          # Custom 404 page
├── components/
│   ├── BrandLoader.tsx        # Monogram AM SVG stroke-drawing animated loader
│   ├── SiteShell.tsx          # Context provider for theme, i18n & toast states
│   ├── Nav.tsx                # Header navigation & mobile bottom navigation bar
│   ├── HomePage.tsx           # Home page sections (Hero, Metrics, Previews, CTA)
│   ├── ExperiencePage.tsx     # Career ledger & tech stack components
│   ├── WorkPage.tsx           # Project case study cards
│   ├── FeaturedProjects.tsx   # Asymmetric bento grid gallery
│   ├── SimpleFooter.tsx       # Minimalist footer with brand links
│   ├── VideographyPage.tsx    # Videography portfolio route content
│   ├── VideoStoriesCarousel.tsx # Auto-advancing "customer stories"-style carousel
│   ├── VideographyCard.tsx    # Archive grid card with "Coming Soon" state
│   └── VideoLightbox.tsx      # Modal YouTube player with production details
├── lib/
│   ├── site-context.tsx       # React Context (`useSite`) for theme & language
│   ├── translations.ts        # Bilingual dictionary (EN / ID)
│   ├── data.ts                # Structured portfolio data (projects, metrics, history)
│   ├── videographyProjects.ts # Video production data model
│   ├── youtube.ts             # YouTube URL/thumbnail/embed helpers
│   └── analytics.ts           # GA4 and GTM event dispatcher helpers
├── public/
│   ├── brand/                 # Monogram AM SVG marks & supergraphic assets
│   ├── brandGuideline/        # Brand guidelines PDF & tokens (JSON / CSS)
│   ├── cv/                    # Downloadable resume assets
│   ├── work/                  # Case study preview WebP mockups
│   ├── favicon.ico            # Brand favicon
│   ├── apple-touch-icon.png   # iOS home screen touch icon
│   └── og-image.png           # Social OpenGraph card (1200x630)
├── tailwind.config.ts         # Tailwind design system mapped to brand tokens
├── next.config.mjs            # Next.js security headers & Sentry configuration
├── instrumentation.ts         # Server-side instrumentation & Sentry request error handler
├── instrumentation-client.ts  # Client-side instrumentation & Sentry router transition tracking
└── tsconfig.json              # TypeScript strict configuration
```

---

## SEO & Metadata

Fully configured via Next.js Metadata API in `app/layout.tsx`:
- Canonical URL alternates mapped to [adibwafi.com](https://adibwafi.com)
- OpenGraph & Twitter Summary Large Image cards (`/og-image.png`)
- Multi-resolution favicons (`favicon.ico`, `favicon-16.png` through `favicon-512.png`) and Apple Touch icons
- JSON-LD structured data for Person profile and website identity
- Identity verification links (`rel="me"`) for LinkedIn, GitHub, and official email (`hello@adibwafi.com`)
