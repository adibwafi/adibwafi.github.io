# Adibwafi Portfolio — GitHub Pages

High-end personal portfolio for **Muhamad Adibwafi Menako**, Full Stack Engineer.

Built with Next.js (static export), Tailwind CSS, Framer Motion, and Lucide React.

## Setup

```bash
npm install
npm run dev
```

## Build & Deploy

```bash
npm run build
# The `out/` folder is the static site — deploy this to GitHub Pages
```

## Photo

Place your `adib-refined.png` in the `/public/` directory before building.

## Project Structure

```
adibwafi.github.io/
├── app/
│   ├── layout.tsx        # Root layout + SEO metadata
│   ├── page.tsx          # Main page (all sections)
│   └── globals.css       # Design tokens, typography, utilities
├── components/
│   ├── Section.tsx       # Scroll-animated section wrapper
│   ├── MetricCard.tsx    # Editorial typographic metrics
│   ├── ExperienceItem.tsx # Ledger-style experience rows
│   └── TechGroup.tsx     # Monospace tech stack grid
├── public/
│   └── adib-refined.png  # ← DROP YOUR PHOTO HERE
├── next.config.mjs       # Static export for GitHub Pages
├── tailwind.config.ts    # Design system
└── package.json
```
