# Adibwafi Portfolio — Custom Domain Deployment

High-end personal portfolio for **Muhamad Adibwafi Menako**, Full Stack Software Engineer. 

Built with Next.js (App Router, static export), Tailwind CSS, Framer Motion, and Lucide React. Custom deployed at [adibwafi.com](https://adibwafi.com).

## Design System & Art Direction
The visual identity follows **High-End Editorial Minimalism** inspired by *Kinfolk Magazine* aesthetics with a New York winter mood palette:
*   **Primary Background:** Snow-Muted White (`#F7F7F7`)
*   **Surface Background:** Pure White (`#FFFFFF`)
*   **Typography:** Cormorant Garamond (Serif for editorial headings) & Manrope (Legible sans-serif for metadata)
*   **Accent Color:** Taxicab Ochre (`#D4A26A`) & Radio City Blue (`#4A5877`)
*   **Dark Section Background:** Jet Black (`#1A1A1A`)

## Features & Sections
1.  **Cover / Hero:** Clean editorial title layout featuring a framed portrait with a subtle ochre outline accent.
2.  **Cinematic Quote Section:** Floating editorial transition over a desaturated background image (`public/alley-bg-new.webp`).
3.  **Proof of Impact:** High-contrast typographic columns displaying key database & scaling metrics.
4.  **The Work (Ledger):** Asymmetric 12-column grid displaying professional chapters with hover backdrop shifts.
5.  **The Archive (Featured Projects):** A staggered editorial gallery of selected repositories with live WebP mockups and footnote interaction links.
6.  **Tools of the Craft:** Category-organized technical tags with outlined custom borders on deep charcoal.

## Local Setup

```bash
npm install
npm run dev
```

## Build & Static Export

```bash
npm run build
# The build output is outputted inside the `out/` folder, ready for static deployment.
```

## Project Structure

```
adibwafi.github.io/
├── app/
│   ├── layout.tsx             # Root layout, fonts config & canonical SEO metadata
│   ├── page.tsx               # Primary layout sections (Cover, Impact, Ledger, Stack, Footer)
│   └── globals.css            # Custom design tokens, transitions & editorial utilities
├── components/
│   └── FeaturedProjects.tsx   # Asymmetrical grid gallery showing selected repositories
├── public/
│   ├── portrait.jpg           # Framed hero profile picture
│   ├── alley-bg-new.webp      # Cinematic background layer
│   ├── icon-2.png             # Website Favicon asset
│   └── work/
│       ├── lms-blueprint-rev.webp
│       ├── smart-fridge-mpasi-2.webp
│       └── serasa-kreatif-2.webp
├── next.config.mjs            # Next.js configurations
└── tailwind.config.ts         # Tailwind theme & Editorial color mappings
```

## SEO Optimization
Fully configured with Next.js Metadata API in `app/layout.tsx`:
*   `metadataBase` defined with canonical alternates pointing directly to [adibwafi.com](https://adibwafi.com).
*   OpenGraph & Twitter Cards setup.
*   Favicon and Apple Touch icons configured via `/icon-2.png`.
