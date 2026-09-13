# PROJECT_STATE.md — Single Source of Truth

> **System Notice**: This document is generated for AI Coding Agents (such as Claude 4.6 Sonnet or Antigravity) to understand the architecture, tech stack, data model, state management, brand rules, and guidelines of this repository without needing to re-scan all files.

---

## 1. EXECUTIVE SUMMARY & TECH STACK

### Core Purpose & Scope
High-end personal portfolio for **Muhamad Adibwafi Menako** (Full Stack Software Engineer). Built upon an editorial design system following Brand Guidelines v1.0. Features bilingual support (English & Indonesian), 3-state Dark Mode integration, dynamic impact metrics, project case studies, animated monogram brand loader, automated analytics tracking, and production Sentry error reporting. Live site deployed at [adibwafi.com](https://adibwafi.com).

### Tech Stack Specifications
* **Core Framework**: Next.js 15.5.25 (App Router, Node `20.x`/`22.x` runtime, `output: 'standalone'`)
* **UI Library & Rendering**: React 18.3.1 & React-DOM 18.3.1
* **Language & Compiler**: TypeScript 5.5.4 (`tsconfig.json` with strict mode and `@/*` path alias to root)
* **Styling & Design System**:
  * Brand & Design System v1.0 (Source of truth: `public/brandGuideline/brand-package/tokens/tokens.json`, `tokens.css`, and `AGENTS.md`)
  * Color registers:
    * `accent`: Doraemon Blue (`#00A0E9`, AA contrast text `#0066CC`, tint `#E6F4FE`, `--on-accent`: `#FFFFFF`) in Light mode; Sana Labs AI Agents Electric Neon Lime (`#CDFE00`, AA text `#000000`, glow tint `rgba(205, 254, 0, 0.12)`, `--on-accent`: `#000000`) in Dark mode — zero brown/golden tones in either mode.
    * `structural`: Radio City Blue (`#4A5877`, soft `#7C879D` in light mode; `#7C8BA1`, soft `#4A5877` in dark mode) — technical construction, diagrams, and grid accents only.
    * 3-state dark mode tokens: `paper` (`#F8FAFC` / `#000000`), `surface` (`#FFFFFF` / `#121212`), `ink` (`#0F172A` / `#FFFFFF`), `ink-soft` (`#475569` / `#A2A2A2`), `ink-faint` (`#94A3B8` / `#666666`), `rule` (`#E2E8F0` / `#222222`), `accent` (`#00A0E9` / `#CDFE00`).
  * Tailwind CSS 3.4.7 (Configured with `darkMode: ['class', '[data-theme="dark"]']`, mapped to CSS variables `--paper`, `--surface`, `--ink`, `--accent`, `--rule`, etc.)
  * **Dark Mode Text Contrast**: All page components consume the `ink` / `ink-soft` / `ink-faint` / `paper` / `surface` / `rule` Tailwind color tokens directly (never raw `zinc-*`/`gray-*`/`blue-*`/`emerald-*` classes) so every text and surface color is theme-reactive by construction — no per-component `dark:` overrides needed. The header's translucent background uses a `.site-header` class (`color-mix(in srgb, var(--paper) 78%, transparent)`) rather than a Tailwind opacity modifier, since Tailwind cannot apply `/alpha` to a CSS-variable-backed color. `app/not-found.tsx` is the one deliberate exception: it runs its own standalone theme state (not `SiteContext`) with an independent `zinc-*` + explicit `dark:` palette — leave it as-is rather than migrating it to tokens.
  * PostCSS 8.5.28 & Autoprefixer 10.4.19
  * Typography: 3 distinct roles configured via `next/font/google`:
    * `--font-serif`: Cormorant Garamond (headlines >24px, pull-quotes)
    * `--font-sans`: Manrope (all body, UI, navigation, buttons)
    * `--font-mono`: JetBrains Mono (data, metrics, eyebrow labels, folio numbers, tech pills)
  * Brand Loaders: Animated SVG stroke-drawing AM monogram loader (`components/BrandLoader.tsx`), route loading state (`app/loading.tsx`), and token-based shimmer skeleton
* **Animation Engine**: Framer Motion 11.3.0 (`AnimatePresence`, `motion.div`, custom spring physics & page transition variants)
* **Iconography**: Lucide React 0.417.0
* **State Management**: React Context (`SiteContext` in `lib/site-context.tsx`) provided via `SiteShell.tsx`. Manages `theme` ('light' | 'dark'), `lang` ('en' | 'id'), and copy-to-clipboard toast states with `localStorage` persistence and `data-theme` DOM attribute binding.
* **Analytics & Performance Monitoring**:
  * `@vercel/analytics` v2.0.1 & `@vercel/speed-insights` v2.0.0
  * Google Analytics 4 (`NEXT_PUBLIC_GA_ID`) & Google Tag Manager (`NEXT_PUBLIC_GTM_ID`, default: `GTM-KHMNHQN6`)
  * Virtual SPA pageview tracking via `AnalyticsRouteTracker.tsx` and custom event logger `lib/analytics.ts`
* **Error Tracking & Observability**: `@sentry/nextjs` v10.74.0 with server-side hook (`instrumentation.ts`), modern client-side routing transition instrumentation (`instrumentation-client.ts`), and global React error boundary (`app/global-error.tsx`).
* **Email & Communication Infrastructure**:
  * Official Domain Email: `hello@adibwafi.com` centralized as Single Source of Truth via `SITE_EMAIL` & `SITE_MAILTO` in `lib/data.ts`.
  * Inbound Routing: Cloudflare Email Routing forwarding directly to personal Gmail.
  * Outbound Relay: Brevo (Sendinblue) SMTP relay integration (`smtp-relay.brevo.com:587`) for authenticated "Send mail as" delivery with SPF/DKIM verification.
* **Containerization & CI/CD**:
  * Docker multi-stage build (Alpine Node 20 runtime, non-root `nextjs` user, standalone output runner)
  * GitHub Actions CI (`.github/workflows/ci.yml` running Node 22.x, `npm ci`, `npm run lint`, `npm run build`, Lighthouse CI audit, `npm audit`)

---

## 2. PROJECT STRUCTURE & ARCHITECTURE

### Primary Directory Tree
```
adibwafi.github.io/
├── .github/workflows/
│   └── ci.yml                   # CI pipeline (Lint, Build, Lighthouse CI, Security Audit)
├── AGENTS.md                    # Brand & Design System rules for AI coding agents
├── PROJECT_STATE.md             # Single source of truth repository architecture
├── README.md                    # Public documentation and brand overview
├── analytics/                   # Exported GA4/GTM CSV analytics reports
├── app/                         # Next.js 15 App Router routes & layout configuration
│   ├── experience/
│   │   └── page.tsx             # Career history, tech stack & education route (/experience)
│   ├── work/
│   │   └── page.tsx             # Featured repositories & project portfolio route (/work)
│   ├── videography/
│   │   └── page.tsx             # Video production portfolio route (/videography)
│   ├── globals.css              # Brand design tokens, 3-state dark mode & loader animations
│   ├── global-error.tsx         # Sentry root error boundary and error capture component
│   ├── layout.tsx               # Root HTML shell, brand fonts (Serif/Sans/Mono), metadata, JSON-LD
│   ├── loading.tsx              # Route loading boundary with animated BrandLoader
│   ├── not-found.tsx            # Custom 404 page implementation
│   ├── page.tsx                 # Home route controller (renders <HomePage />)
│   └── sitemap.ts               # Dynamic XML sitemap generator
├── components/                  # Modular React UI components (Client components marked 'use client')
│   ├── AmbientBackground.tsx    # Decorative radial gradient blur blobs
│   ├── AnalyticsRouteTracker.tsx# SPA client route transition pageview tracking component
│   ├── BrandLoader.tsx          # Monogram AM SVG stroke-drawing animated brand loader
│   ├── ExperiencePage.tsx       # Content module for experience route
│   ├── FadeSection.tsx          # Framer Motion scroll-reveal animation wrappers
│   ├── FeaturedProjects.tsx     # Asymmetrical bento grid gallery for home page preview
│   ├── HomePage.tsx             # Content module for home route (Hero, Metrics, Previews, CTA)
│   ├── Nav.tsx                  # Responsive header navigation & mobile bottom tab bar
│   ├── ProjectCard.tsx          # Case study project card with alternating layout
│   ├── ShimmerImage.tsx         # Next.js Image with animated CSS skeleton shimmer placeholder
│   ├── SimpleFooter.tsx         # Minimalist page footer
│   ├── SiteShell.tsx            # Context provider shell for theme, i18n, toasts & Nav
│   ├── WorkPage.tsx             # Content module for work route
│   ├── VideographyPage.tsx      # Content module for videography route (hero, carousel, archive, principles, CTA)
│   ├── VideoStoriesCarousel.tsx # Sana Learn "customer stories"-style auto-advancing scroll-snap carousel
│   ├── VideographyCard.tsx      # Landscape archive-grid card with "Coming Soon" state for unreleased cuts
│   └── VideoLightbox.tsx        # Modal YouTube-nocookie embed player with role/tagline/BTS panel
├── lib/                         # Data sources, Context definitions & utility functions
│   ├── analytics.ts             # Helper functions for GA4 gtag & GTM dataLayer events
│   ├── animations.ts            # Framer Motion spring transition curves and page variants
│   ├── data.ts                  # Typed data models & portfolio content (metrics, roles, projects, stack)
│   ├── site-context.tsx         # React Context interface and custom hook (`useSite`)
│   ├── translations.ts          # i18n dictionary for English and Indonesian translations
│   ├── videographyProjects.ts   # Typed data model for the 11 videography productions
│   └── youtube.ts               # YouTube URL → id/thumbnail/nocookie-embed parsing helpers
├── public/                      # Static public assets (images, icons, brand package)
│   ├── apple-touch-icon.png     # iOS touch icon
│   ├── apple-touch-icon-180.png # High-res iOS touch icon
│   ├── brand/                   # Official AM monogram vector marks & supergraphics
│   ├── brandGuideline/          # Brand Guidelines PDF & tokens (JSON / CSS)
│   ├── cv/                      # Downloadable resume assets (`Muhamad_Adibwafi_Menako_Resume.pdf`)
│   ├── favicon-16.png           # 16x16 Favicon
│   ├── favicon-32.png           # 32x32 Favicon
│   ├── favicon-48.png           # 48x48 Favicon
│   ├── favicon-192.png          # 192x192 Android Chrome icon
│   ├── favicon-512.png          # 512x512 Android Chrome icon
│   ├── favicon.ico              # Standard root favicon
│   ├── og-image.png             # 1200x630 OpenGraph social share card
│   ├── portrait-adib.webp       # Profile photo asset
│   └── work/                    # WebP project preview mockups
├── .env.example                 # Environment variables template
├── .env.local                   # Local environment variables file
├── .lighthouserc.json           # Lighthouse CI assertion & target configuration
├── Dockerfile                   # Production multi-stage Docker build configuration
├── next.config.mjs              # Next.js config (Security headers, Sentry webpack plugin)
├── package.json                 # Dependencies & execution scripts
├── tailwind.config.ts           # Tailwind CSS design system tokens mapped to brand tokens
└── tsconfig.json                # TypeScript configuration with path aliases
```

### Architectural Patterns
1. **App Router with Isolated Page Content Modules**: Next.js route files (`app/page.tsx`, `app/experience/page.tsx`, `app/work/page.tsx`) serve strictly as lightweight wrappers, importing client page modules (`components/HomePage.tsx`, `components/ExperiencePage.tsx`, `components/WorkPage.tsx`).
2. **Context-Driven Shell Provider Pattern**: `app/layout.tsx` wraps children inside `SiteShell.tsx`, creating a single client context boundary for global state (`theme`, `lang`, `toast`, navigation state) while preserving server-side metadata generation in `layout.tsx`.
3. **Decoupled Data Store (Single Source of Truth)**: All textual content, impact statistics, career milestones, project case studies, and stack listings are stored in typed data files (`lib/data.ts` and `lib/translations.ts`), decoupling content updates from JSX UI code.
4. **Token-Driven Design System**: Design tokens defined in `public/brandGuideline/brand-package/tokens/` are embedded in `app/globals.css` and mapped to Tailwind utilities in `tailwind.config.ts`.
5. **3-State Dark Mode Resolution**: Dark mode is managed simultaneously via `:root:not([data-theme="light"])` for system preferences, `[data-theme="dark"]` / `.dark` classes on `<html>` for explicit user toggles, preventing flash of unstyled theme.

---

## 3. CURRENT IMPLEMENTATION STATE & DATA FLOW

### Active Modules & Features
* **Brand Identity & Typography**:
  * Strict typography system: `--font-serif` (Cormorant Garamond), `--font-sans` (Manrope), and `--font-mono` (JetBrains Mono).
  * Monogram "AM" geometric brandmark with vector stroke-drawing animation (`brand-animate-m` & `brand-animate-a`).
  * Route loading boundary in `app/loading.tsx` using `BrandLoader`.
* **Home Page (`/`)**:
  * Editorial Hero section with 6-second recruiter pitch, profile photo modal, and social verification (`rel="me"`).
  * Impact Metrics grid (40% load time reduction, 10k+ active learners, 5k+ daily data points).
  * Selected Work bento gallery with hover scale interactions.
  * Contact CTA banner with direct email copy action (`hello@adibwafi.com`) and resume download link.
* **Experience Page (`/experience`)**:
  * Work history timeline detailing software engineering and previous corporate enterprise roles.
  * Technical stack breakdown categorized into *Languages*, *Frameworks & Libraries*, and *Infrastructure & Tools*.
  * Educational background (Hacktiv8 JS Immersive & Padjadjaran University Economics).
* **Work Page (`/work`)**:
  * Comprehensive project case study list (Kinghouse Management, Enterprise LMS Blueprint, AI Baby Meal Planner, Serasa Kreatif, Amana Care, Livecode Logic Trainer).
  * Direct repository links and live website preview triggers.
  * Open source GitHub invitation card.
* **Videography Page (`/videography`)**:
  * Editorial hero with a rotated photo collage built from production thumbnails (adapts the Sana Labs careers-page collage motif without stock team photography).
  * "Selected Productions" carousel (`VideoStoriesCarousel.tsx`) adapting the Sana Learn "customer stories" pattern: native scroll-snap auto-advance (no added dependency), pause on hover/touch/manual toggle, a scrub-style progress bar, and `prefers-reduced-motion` support. Framed by the "Frame & Grid" supergraphic (ochre corner brackets + structural-color dot-grid veil), always paired per `AGENTS.md`.
  * Full archive grid (`VideographyCard.tsx`) of all 11 productions with category filter tabs; productions without an uploaded cut render a disabled "Coming Soon" state instead of a broken thumbnail.
  * Click-to-play modal (`VideoLightbox.tsx`) embedding via `youtube-nocookie.com`, showing role, tagline, and a behind-the-scenes note per production.
  * Principles band on the fixed `surface-dark`/`on-dark` tokens (reserved for "intentional dark sections" regardless of site theme) — echoes the Sana careers "Principles we live by" block without introducing a new accent color.
  * Data lives in `lib/videographyProjects.ts` (`VideographyProject[]`); YouTube id/thumbnail/embed parsing in `lib/youtube.ts`.
  * Official YouTube Channel: Direct integration with `https://www.youtube.com/@Setipiskumis` wired into hero action buttons, bottom CTA card, route metadata, and author identity verification (`rel="me"` / `sameAs`).
* **Global Navigation & Utilities**:
  * Header nav (Home, Experience, Work, Videography) with active indicator pill, "Hire Me" mailto link, & mobile bottom navigation bar.
  * EN/ID language switcher pill with instant client translation switching.
  * Light/Dark theme toggle with CSS `.dark` class injection, `data-theme` attribute synchronization, and `localStorage` syncing.
  * Interactive toast notification system for copy-to-clipboard events (`hello@adibwafi.com`).

### Data Flow Architecture
```
[User Action: Toggle Lang/Theme / Copy Email]
         │
         ▼
[SiteShell Context Provider (lib/site-context.tsx)]
         │
         ├─► Updates State & Persists to localStorage ('theme', 'lang')
         ├─► Injects '.dark' class and 'data-theme' attribute on <html>
         ├─► Triggers Toast State (copied email notification)
         └─► Invokes trackEvent() -> GA4 (gtag) & GTM (dataLayer)
         │
         ▼
[Consumer Components (HomePage, Nav, ExperiencePage, WorkPage)]
         │
         ├─► Re-renders UI using translations[lang] dictionary
         └─► Displays localized content from lib/data.ts
```

---

## 4. REMAINING TASKS, TODOs & TECHNICAL DEBT

### Identified Technical Debt & Configuration Bugs
1. **Lighthouse CI Route Mismatch [RESOLVED]**: `.lighthouserc.json` previously referenced non-existent route `http://localhost:3000/about`. Updated to audit valid routes `http://localhost:3000`, `http://localhost:3000/experience`, and `http://localhost:3000/work`.
2. **Dark Mode Text Contrast [RESOLVED]**: `HomePage.tsx`, `ExperiencePage.tsx`, `WorkPage.tsx`, `ProjectCard.tsx`, and `SimpleFooter.tsx` used hardcoded `zinc-*`/`blue-*`/`emerald-*`/`violet-*`/`bg-white` Tailwind classes with no `dark:` variants. Migrated every affected component to design tokens.
3. **Missing Unit & Component Testing Setup**: No test framework (Jest or Vitest) or test runner scripts exist in `package.json`.
4. **No Dynamic API Routes / Backend Endpoints**: Site is currently purely static/client-rendered with static data. Form submissions relying on email copy fallback to `mailto:` protocols.
5. **Sentry v10 Modernization & Global Error Boundary [RESOLVED]**: Added `app/global-error.tsx` with Sentry exception capture for root App Router crashes, migrated `sentry.client.config.ts` to `instrumentation-client.ts` with `onRouterTransitionStart` export per Next.js 15 / Turbopack specification.
6. **HTML/Body Hydration Mismatch [RESOLVED]**: Added `suppressHydrationWarning` to `<html>` and `<body>` in `app/layout.tsx` along with an inline pre-paint theme script to avoid client attribute mismatch errors and flash of unstyled theme (FOUC).

---

## 5. AI AGENT CODING GUIDELINES

### Brand & Design System Rules (MUST FOLLOW)
* **Design Token Authority**:
  * Source of truth is `public/brandGuideline/brand-package/tokens/tokens.json` and `tokens.css`.
  * **Never guess or hardcode hex colors** outside the design tokens.
  * **2 Color Registers Only**:
    * `accent` (Taxicab Ochre `#D4A26A`): Single expressive color, use sparingly and intentionally.
    * `structural` (Radio City Blue `#4A5877`): Technical construction color, strictly for grid/diagrams/structural lines.
    * Never introduce arbitrary accent colors (e.g. random blues, purples, reds).
* **Strict Typography Rules**:
  * `--font-serif` (Cormorant Garamond): EXCLUSIVELY for large editorial headlines (>24px) and pull-quotes. NEVER use for paragraph body text.
  * `--font-sans` (Manrope): Primary font for all body text, UI, navigation, buttons, and form labels.
  * `--font-mono` (JetBrains Mono): For numbers, hex values, eyebrow labels, tech pills, and metadata.
* **Brandmark Protection**:
  * Monogram "AM" at `/public/brand/mark-*.svg`: NEVER recolor, fill solid, rotate, distort, or stretch.
  * Maintain clearspace minimum of `1u` (stroke width) around mark.
* **Dark Mode Implementation**:
  * Follow 3-state dark mode pattern in `tokens.css`: `:root` default, `@media (prefers-color-scheme: dark)`, and `[data-theme="dark"]` / `.dark`.
  * Update both `.dark` class and `data-theme` attribute on `document.documentElement`.
  * **Never style text/backgrounds/borders with raw Tailwind palette classes** (`zinc-*`, `gray-*`, `blue-*`, `emerald-*`, `violet-*`, bare `white`/`black` fills) in a page component — they do not react to `.dark`/`[data-theme]` and are how the dark-mode contrast bug happened. Use the token classes instead: `text-ink` / `text-ink-soft` / `text-ink-faint`, `bg-paper` / `bg-surface`, `border-rule`, `bg-accent` / `text-accent-ink` / `bg-accent-tint`, `text-structural`. Plain `black`/`white` with an opacity modifier (e.g. `bg-black/70`) is still fine for neutral scrims/glass badges — that's a UI mechanic, not a brand-color decision — but never for headings or body copy.
  * A CSS-variable-backed color (`ink`, `paper`, `accent`, etc.) cannot take a Tailwind `/alpha` opacity modifier (`bg-ink/80` silently drops the alpha) — for a translucent tinted surface, add a small dedicated class using `color-mix(in srgb, var(--token) X%, transparent)` (see `.site-header` in `globals.css`) instead.
  * `app/not-found.tsx` is an intentional exception: it manages its own theme state independently of `SiteContext` with a `zinc-*` + explicit `dark:` palette that already works correctly — leave it as-is rather than migrating it to tokens.

### Conventions & Code Rules
* **File Naming**:
  * React Components: `PascalCase.tsx` (e.g., `BrandLoader.tsx`, `FeaturedProjects.tsx`)
  * Helper Utilities & Data: `camelCase.ts` (e.g., `analytics.ts`, `data.ts`)
  * Route Entrypoints: `page.tsx`, `layout.tsx`, `loading.tsx`, `sitemap.ts`
* **Import Ordering Structure**:
  1. React & Next.js core modules (`react`, `next/link`, `next/navigation`, `next/image`)
  2. Third-party UI & icon packages (`framer-motion`, `lucide-react`)
  3. Internal UI components (`@/components/...`)
  4. Internal context, hooks, data, and helpers (`@/lib/...`)
* **i18n & Content Enforcement**:
  * **NEVER hardcode display strings** directly inside component JSX.
  * Standard UI labels must be placed in `lib/translations.ts` under both `en` and `id` keys.
  * Project/Metric data items must be declared in `lib/data.ts` using the bilingual property format (`en: { ... }`, `id: { ... }`).
* **Client Directives & Hooks**:
  * Explicitly place `'use client';` at the top of any file consuming React hooks (`useState`, `useEffect`, `useContext`, `usePathname`), Framer Motion, or DOM events.
* **Analytics Event Instrumentation**:
  * Every interactive CTA button, external link, or tab switcher must invoke `trackEvent('click', 'Category', 'Label')` from `@/lib/analytics`.

### Step-by-Step Workflow for New Features / Edits
1. **Verify Brand & Token Compliance**: Check `tokens.json` and `AGENTS.md` before applying new styles.
2. **Update Data Contracts**: If introducing new content, define interfaces and entries in `lib/data.ts` or `lib/translations.ts`.
3. **Implement Component Layer**: Create or modify the component in `components/`, using brand tokens and ensuring dark mode compatibility via CSS variables or Tailwind tokens.
4. **Wire Context & Analytics**: Connect component to `useSite()` for i18n/theme if needed, and attach `trackEvent` to click handlers.
5. **Validate Build & Linting**: Run `npm run lint` and `npm run build` locally to verify clean compilation without errors.
