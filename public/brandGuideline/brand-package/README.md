# adibwafi.com — Brand Asset Package

Companion assets to `Brand Guidelines v1.0`. Everything here is derived directly from that
document — same coordinates, same hex values, same rules.

## What's inside

```
adibwafi-brand-guidelines.pdf   Full guideline, 9 chapters, print-paginated (A4 landscape)

logo/
  mark-ochre.svg                Primary colorway — the one to reach for by default
  mark-ink.svg                  Single-ink black, for constrained/print contexts
  mark-reversed.svg             Cream, for placing on Jet Black or photography
  mark-structural.svg           Slate blue — technical/construction contexts only
  lockup-primary-light.png      Monogram + full name, on Snow White (3200×2000)
  lockup-primary-dark.png       Same, reversed on Jet Black (3200×2000)
  lockup-secondary-light.png    Monogram + "adibwafi.com", on white (2400×800)
  lockup-secondary-dark.png     Same, reversed on Jet Black (2400×800)

favicon/
  favicon.ico                   Multi-resolution (16/32/48) — put at site root
  favicon-16.png / favicon-32.png / favicon-48.png
  favicon-192.png / favicon-512.png   PWA / Android icons, Jet Black rounded app-icon style
  apple-touch-icon-180.png      iOS home-screen icon

social/
  og-card-1200x630.png          Default Open Graph / Twitter card image

supergraphic/
  frame-corners.svg             The viewfinder corner-bracket motif, standalone
  dot-grid-pattern.svg          Tileable dot lattice (16×16 tile inside a 64×64 viewBox)
  divider.svg                   Section-divider line + dot, 800×40

tokens/
  tokens.css                    CSS custom properties — paste straight into globals.css
  tokens.json                   Same values as structured JSON, for tools/config/agents
```

## Quick usage notes

- **Default logo** for anything on a light background: `logo/mark-ochre.svg`. On Jet Black or a
  photo: `logo/mark-reversed.svg`. Never recolor a mark outside these four files — see the
  guideline's Incorrect Usage chapter.
- **Favicons**: drop the whole `favicon/` folder's contents into a Next.js app's `public/`
  (or `app/`) directory. `favicon.ico`, `favicon-16.png` and `favicon-32.png` are picked up
  automatically by most setups if named exactly this way at the app/public root.
- **Colors/type**: `tokens/tokens.css` is the source of truth — every color in every other asset
  here was generated from these same hex values.
- All SVGs are plain, dependency-free vector markup (no external font or script references) —
  safe to inline directly in JSX/HTML.

See `integration-guide.md` (sent alongside this package) for how to wire this into the
adibwafi.com Next.js repo, including a ready-to-paste prompt for an AI coding agent.
