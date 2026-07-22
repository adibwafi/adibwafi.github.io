# PROJECT_STATE.md — Single Source of Truth

> **System Notice**: This document is generated for AI Coding Agents (such as Claude 4.6 Sonnet) to understand the architecture, tech stack, data model, state management, and guidelines of this repository without needing to re-scan all files.

---

## 1. EXECUTIVE SUMMARY & TECH STACK

### Core Purpose & Scope
High-end personal portfolio for **Muhamad Adibwafi Menako** (Full Stack Software Engineer). Designed with a modern, high-end editorial aesthetic (inspired by Sana Labs / Kinfolk minimalism). Features bilingual support (English & Indonesian), full Dark Mode integration, dynamic impact metrics, project case studies, automated analytics tracking, and production Sentry error reporting. Live site deployed at [adibwafi.com](https://adibwafi.com).

### Tech Stack Specifications
* **Core Framework**: Next.js 14.2.5 (App Router, Node `20.x`/`22.x` runtime, `output: 'standalone'`)
* **UI Library & Rendering**: React 18.3.1 & React-DOM 18.3.1
* **Language & Compiler**: TypeScript 5.5.4 (`tsconfig.json` with strict mode and `@/*` path alias to root)
* **Styling & Design System**:
  * Tailwind CSS 3.4.7 (Custom theme extension: `surface`, `elevated`, `accent`, `ink`, `muted`, `faint`, display font sizes, bento border-radii)
  * PostCSS 8.4.40 & Autoprefixer 10.4.19
  * Typography: Google Inter (`next/font/google` variable `--font-inter`)
* **Animation Engine**: Framer Motion 11.3.0 (`AnimatePresence`, `motion.div`, custom spring physics & page transition variants)
* **Iconography**: Lucide React 0.417.0
* **State Management**: React Context (`SiteContext` in `lib/site-context.tsx`) provided via `SiteShell.tsx`. Manages `theme` ('light' | 'dark'), `lang` ('en' | 'id'), and copy-to-clipboard toast states with `localStorage` persistence.
* **Analytics & Performance Monitoring**:
  * `@vercel/analytics` v2.0.1 & `@vercel/speed-insights` v2.0.0
  * Google Analytics 4 (`NEXT_PUBLIC_GA_ID`) & Google Tag Manager (`NEXT_PUBLIC_GTM_ID`, default: `GTM-KHMNHQN6`)
  * Virtual SPA pageview tracking via `AnalyticsRouteTracker.tsx` and custom event logger `lib/analytics.ts`
* **Error Tracking**: `@sentry/nextjs` v8.55.2 with server instrumentation hook enabled (`instrumentationHook: true`)
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
├── analytics/                    # Exported GA4/GTM CSV analytics reports
├── app/                          # Next.js 14 App Router routes & layout configuration
│   ├── experience/
│   │   └── page.tsx             # Career history, tech stack & education route (/experience)
│   ├── work/
│   │   └── page.tsx             # Featured repositories & project portfolio route (/work)
│   ├── globals.css              # Custom design tokens, utilities & dark mode overrides
│   ├── layout.tsx               # Root HTML shell, canonical metadata, JSON-LD, GTM/GA/Sentry scripts
│   ├── not-found.tsx            # Custom 404 page implementation
│   ├── page.tsx                 # Home route controller (renders <HomePage />)
│   └── sitemap.ts               # Dynamic XML sitemap generator
├── components/                   # Modular React UI components (Client components marked 'use client')
│   ├── AmbientBackground.tsx    # Decorative radial gradient blur blobs
│   ├── AnalyticsRouteTracker.tsx# SPA client route transition pageview tracking component
│   ├── ExperiencePage.tsx       # Content module for experience route
│   ├── FadeSection.tsx          # Framer Motion scroll-reveal animation wrappers
│   ├── FeaturedProjects.tsx     # Asymmetrical bento grid gallery for home page preview
│   ├── HomePage.tsx             # Content module for home route (Hero, Metrics, Previews, CTA)
│   ├── Nav.tsx                  # Responsive header navigation & mobile bottom tab bar
│   ├── ProjectCard.tsx          # Case study project card with alternating layout
│   ├── ShimmerImage.tsx         # Next.js Image with animated CSS skeleton shimmer placeholder
│   ├── SimpleFooter.tsx         # Minimalist page footer
│   ├── SiteShell.tsx            # Context provider shell for theme, i18n, toasts & Nav
│   └── WorkPage.tsx             # Content module for work route
├── lib/                          # Data sources, Context definitions & utility functions
│   ├── analytics.ts             # Helper functions for GA4 gtag & GTM dataLayer events
│   ├── animations.ts            # Framer Motion spring transition curves and page variants
│   ├── data.ts                  # Typed data models & portfolio content (metrics, roles, projects, stack)
│   ├── site-context.tsx         # React Context interface and custom hook (`useSite`)
│   └── translations.ts          # i18n dictionary for English and Indonesian translations
├── public/                       # Static public assets (images, icons, resume PDF)
│   ├── cv/                      # Downloadable resume assets (`Muhamad_Adibwafi_Menako_Resume.pdf`)
│   ├── work/                    # WebP project preview mockups
│   └── portrait-adib.webp       # Profile photo asset
├── .env.example                  # Environment variables template
├── .env.local                    # Local environment variables file
├── .lighthouserc.json            # Lighthouse CI assertion & target configuration
├── Dockerfile                    # Production multi-stage Docker build configuration
├── next.config.mjs               # Next.js config (Security headers, Sentry webpack plugin)
├── package.json                  # Dependencies & execution scripts
├── tailwind.config.ts            # Tailwind CSS design system tokens
└── tsconfig.json                 # TypeScript configuration with path aliases
```

### Architectural Patterns
1. **App Router with Isolated Page Content Modules**: Next.js route files (`app/page.tsx`, `app/experience/page.tsx`, `app/work/page.tsx`) serve strictly as lightweight wrappers, importing client page modules (`components/HomePage.tsx`, `components/ExperiencePage.tsx`, `components/WorkPage.tsx`).
2. **Context-Driven Shell Provider Pattern**: `app/layout.tsx` wraps children inside `SiteShell.tsx`, creating a single client context boundaries for global state (`theme`, `lang`, `toast`, navigation state) while preserving server-side metadata generation in `layout.tsx`.
3. **Decoupled Data Store (Single Source of Truth)**: All textual content, impact statistics, career milestones, project case studies, and stack listings are stored in typed data files (`lib/data.ts` and `lib/translations.ts`), decoupling content updates from JSX UI code.
4. **Design System & Utility Layer**: Design tokens are declared in `tailwind.config.ts` and utility classes (`.bento-card`, `.btn-primary`, `.btn-ghost`, `.tag-chip`, `.tech-pill`, `.shimmer`) are specified in `app/globals.css`.

---

## 3. CURRENT IMPLEMENTATION STATE & DATA FLOW

### Active Modules & Features
* **Home Page (`/`)**:
  * Editorial Hero section with 6-second recruiter pitch (`3+ yrs experience`, `Startup Campus`, `FastAPI · Next.js · GCP`) and profile photo modal.
  * Impact Metrics grid (40% load time reduction, 10k+ active learners, 5k+ daily data points).
  * Selected Work bento gallery with hover scale interactions.
  * Contact CTA banner with direct email copy action and resume download link.
* **Experience Page (`/experience`)**:
  * Work history timeline detailing software engineering and previous corporate enterprise roles.
  * Technical stack breakdown categorized into *Languages*, *Frameworks & Libraries*, and *Infrastructure & Tools*.
  * Educational background (Hacktiv8 JS Immersive & Padjadjaran University Economics).
* **Work Page (`/work`)**:
  * Comprehensive project case study list (Enterprise LMS Blueprint, AI Baby Meal Planner, Serasa Kreatif, Amana Care).
  * Direct repository links and live website preview triggers.
  * Open source GitHub invitation card.
* **Global Navigation & Utilities**:
  * Header nav with active indicator pill & mobile bottom navigation bar.
  * EN/ID language switcher pill with instant client translation switching.
  * Light/Dark theme toggle with CSS `.dark` class injection and `localStorage` syncing.
  * Interactive toast notification system for copy-to-clipboard events.

### Data Flow Architecture
```
[User Action: Toggle Lang/Theme / Copy Email]
         │
         ▼
[SiteShell Context Provider (lib/site-context.tsx)]
         │
         ├─► Updates State & Persists to localStorage ('theme', 'lang')
         ├─► Injects '.dark' class on <html> & updates lang attribute
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
1. **Lighthouse CI Route Mismatch**: `.lighthouserc.json` references non-existent route `http://localhost:3000/about` on line 4. Must be updated to `http://localhost:3000/experience` or `http://localhost:3000/work` to avoid 404 warnings in CI.
2. **Missing Unit & Component Testing Setup**: No test framework (Jest or Vitest) or test runner scripts exist in `package.json`.
3. **No Dynamic API Routes / Backend Endpoints**: Site is currently purely static/client-rendered with static data. Form submissions relying on email copy fallback to `mailto:` protocols.

---

## 5. AI AGENT CODING GUIDELINES

### Conventions & Code Rules
* **File Naming**:
  * React Components: `PascalCase.tsx` (e.g., `FeaturedProjects.tsx`)
  * Helper Utilities & Data: `camelCase.ts` (e.g., `analytics.ts`, `data.ts`)
  * Route Entrypoints: `page.tsx`, `layout.tsx`, `sitemap.ts`
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
1. **Update Data Contracts**: If introducing new content, define interfaces and entries in `lib/data.ts` or `lib/translations.ts`.
2. **Implement Component Layer**: Create or modify the component in `components/`, using design system tokens (`.bento-card`, `.tag-chip`, `.btn-primary`) and ensuring dark mode compatibility via Tailwind `dark:` classes or global CSS tokens.
3. **Wire Context & Analytics**: Connect component to `useSite()` for i18n/theme if needed, and attach `trackEvent` to click handlers.
4. **Validate Build & Linting**: Run `npm run lint` and `npm run build` locally to verify clean TypeScript compilation without errors before committing.
