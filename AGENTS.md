# AGENTS.md

## Brand & Design System — adibwafi.com

Sumber kebenaran: `public/brandGuideline/brand-package/tokens/tokens.json` dan `public/brandGuideline/brand-package/tokens/tokens.css`.
Baca kedua file itu sebelum menyentuh styling apa pun. Jangan menebak warna/hex baru.

- Warna: 2 register. `accent`: Light mode mengadopsi Biru Doraemon cerulean/azure (#00A0E9, contrast text #0066CC, tint #E6F4FE, tanpa bias coklat/emas). Dark mode mengadopsi palet modern Sana Labs AI Agents dengan electric neon lime (#CDFE00, tanpa bias coklat/keemasan), dipakai sedikit dan sengaja. `structural` (slate blue, #4A5877 / #7C8BA1 di dark mode) = warna teknis, hanya untuk grid/diagram/elemen konstruksi. Jangan pernah menambah warna aksen baru di luar token.
- Tipografi 3 peran, jangan dicampur: `--font-serif` (Cormorant Garamond) HANYA untuk headline besar (>24px) dan pull-quote — tidak pernah untuk paragraf. `--font-sans` (Manrope) untuk semua body/UI/nav/button. `--font-mono` (JetBrains Mono) untuk angka/hex/label eyebrow/data.
- Brandmark: monogram "AM" di `/public/brand/mark-*.svg`. JANGAN pernah mewarnai ulang, mengisi solid, memutar, atau men-distort mark ini — lihat `Incorrect Usage` di `adibwafi-brand-guidelines.pdf` untuk daftar lengkap yang dilarang.
- Clearspace mark = 1u (u = lebar satu stroke mark pada ukuran yang dipakai). Jangan taruh teks atau elemen lain di dalam area itu.
- Dark mode: ikuti pola token 3-state di `tokens.css` (bare :root, @media prefers-color-scheme, dan [data-theme]) — background pitch black (`#000000`), surface carbon (`#121212`), text pure white (`#FFFFFF`) & silver (`#A2A2A2`), accent neon lime (`#CDFE00`). Jangan hardcode warna di luar token, termasuk saat menambah komponen baru.
- Supergraphic "Frame & Grid" (`/public/brand/supergraphic/`) dipakai berpasangan (bracket aksen + dot-grid biru), tidak pernah salah satu saja di atas foto yang ramai.
