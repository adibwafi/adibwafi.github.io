# Mengaplikasikan Brand Guidelines adibwafi.com ke Repo — Panduan Praktis

Dua bagian: (1) di mana taruh asetnya di repo Next.js kamu, (2) cara paling gampang minta
Antigravity yang mengeksekusi perubahan kodenya secara konsisten.

## 1. Struktur file di repo

Sesuai `Project Structure` di README kamu:

```
adibwafi.github.io/
├── AGENTS.md                   ← baru: instruksi persisten untuk AI coding agent
├── app/
│   ├── layout.tsx               ← font (next/font/google) + metadata favicon/OG di sini
│   └── globals.css              ← tempel isi tokens.css di sini
├── public/
│   ├── favicon.ico               ← dari favicon/favicon.ico
│   ├── icon-2.png                ← ganti dengan favicon/favicon-512.png (atau pertahankan nama lama)
│   ├── apple-touch-icon.png      ← dari favicon/apple-touch-icon-180.png
│   ├── og-image.png              ← dari social/og-card-1200x630.png
│   └── brand/
│       ├── mark-ochre.svg
│       ├── mark-ink.svg
│       ├── mark-reversed.svg
│       ├── mark-structural.svg
│       ├── lockup-primary-light.png / lockup-primary-dark.png
│       ├── lockup-secondary-light.png / lockup-secondary-dark.png
│       └── supergraphic/ (frame-corners.svg, dot-grid-pattern.svg, divider.svg)
└── tailwind.config.ts           ← extend theme.colors dari tokens.json
```

`tokens/tokens.json` adalah sumber kebenaran yang machine-readable — dipakai untuk isi
`AGENTS.md` dan untuk `tailwind.config.ts`. `adibwafi-brand-guidelines.pdf` isinya sama, tapi
formatnya untuk dibaca manusia (dan sebagai referensi kalau butuh cetak/lampiran proposal) —
agent coding umumnya kurang bisa "membaca" tata letak PDF dengan andal, jadi jangan jadikan PDF
sebagai sumber utama untuk otomasi.

### Font: pakai `next/font/google`, bukan `<link>` manual

Next.js akan self-host Google Fonts saat build (tanpa request eksternal saat runtime, tanpa layout
shift). Di `app/layout.tsx`:

```tsx
import { Cormorant_Garamond, Manrope, JetBrains_Mono } from "next/font/google";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});
const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
});
```

lalu tempel `tokens.css` ke `globals.css` (variabel `--font-serif` dst dari Next font akan
otomatis dipetakan lewat `variable`, tinggal referensikan di `font-family`).

## 2. Cara paling gampang: minta Antigravity yang eksekusi

Antigravity secara native membaca `AGENTS.md` di root repo sebagai instruksi persisten —
sekali ditulis, dipakai otomatis oleh agent di setiap task, tidak perlu diulang tiap prompt.
Untuk brand system, taruh aturannya di sana supaya konsisten dipakai lintas file/komponen.

**Langkah:**

1. Commit folder `brand-package/` (isi zip ini) ke repo, taruh assetnya sesuai struktur di atas.
2. Buat `AGENTS.md` di root repo — tempel section di bawah (atau gabung dengan AGENTS.md yang
   sudah ada kalau punya).
3. Buka Antigravity di repo ini, paste prompt siap pakai di bagian 3.
4. **Staged, jangan sekali gas**: untuk perubahan pertama, minta agent kerjakan `globals.css` +
   `tailwind.config.ts` + favicon/metadata dulu, review diff-nya, baru lanjut minta ia terapkan
   ke komponen-komponen visual (hero, ledger, featured projects, dst).

### Isi untuk `AGENTS.md`

```markdown
## Brand & Design System — adibwafi.com

Sumber kebenaran: `/brand-package/tokens/tokens.json` dan `/brand-package/tokens/tokens.css`.
Baca kedua file itu sebelum menyentuh styling apa pun. Jangan menebak warna/hex baru.

- Warna: 2 register. `accent` (ochre, #D4A26A) = warna ekspresif tunggal, dipakai sedikit dan
  sengaja. `structural` (slate blue, #4A5877) = warna teknis, hanya untuk grid/diagram/elemen
  konstruksi. Jangan pernah menambah warna aksen baru di luar token.
- Tipografi 3 peran, jangan dicampur: `--font-serif` (Cormorant Garamond) HANYA untuk headline
  besar (>24px) dan pull-quote — tidak pernah untuk paragraf. `--font-sans` (Manrope) untuk semua
  body/UI/nav/button. `--font-mono` (JetBrains Mono) untuk angka/hex/label eyebrow/data.
- Brandmark: monogram "AM" di `/public/brand/mark-*.svg`. JANGAN pernah mewarnai ulang,
  mengisi solid, memutar, atau men-distort mark ini — lihat `Incorrect Usage` di
  `adibwafi-brand-guidelines.pdf` untuk daftar lengkap yang dilarang.
- Clearspace mark = 1u (u = lebar satu stroke mark pada ukuran yang dipakai). Jangan taruh teks
  atau elemen lain di dalam area itu.
- Dark mode: ikuti pola token 3-state di `tokens.css` (bare :root, @media prefers-color-scheme,
  dan [data-theme]) — jangan hardcode warna di luar token, termasuk saat menambah komponen baru.
- Supergraphic "Frame & Grid" (`/public/brand/supergraphic/`) dipakai berpasangan (bracket ochre +
  dot-grid biru), tidak pernah salah satu saja di atas foto yang ramai.
```

## 3. Prompt siap pakai untuk Antigravity

Paste langsung (edit bagian scope kalau mau lebih sempit):

```
Terapkan brand system baru dari /brand-package ke repo ini. Baca dulu:
- brand-package/tokens/tokens.json dan tokens/tokens.css (sumber warna & tipografi)
- AGENTS.md bagian "Brand & Design System" (aturan pemakaian)

Lakukan secara bertahap, tampilkan diff untuk saya review sebelum lanjut ke tahap berikutnya:

Tahap 1 — Foundation:
1. Ganti isi app/globals.css dengan token dari tokens/tokens.css, pastikan pola 3-state
   (light default, prefers-color-scheme dark, [data-theme=dark]) tetap utuh.
2. Update tailwind.config.ts: map theme.colors ke token yang sama (paper, surface, ink, inkSoft,
   inkFaint, rule, accent, accentInk, accentTint, structural, structuralSoft) supaya kelas
   Tailwind (bg-paper, text-accent, dst) tersedia.
3. Ganti font loading di app/layout.tsx pakai next/font/google untuk Cormorant Garamond, Manrope,
   dan JetBrains Mono (bukan <link> manual), dan expose sebagai CSS variable yang match tokens.css.
4. Update favicon & metadata: pindahkan file dari brand-package/favicon/ ke public/, dan
   brand-package/social/og-card-1200x630.png ke public/og-image.png, lalu update metadata di
   app/layout.tsx (icons, apple touch icon, openGraph.images, twitter.images).

Jangan lanjut ke komponen visual sebelum saya approve diff Tahap 1.

Tahap 2 (setelah saya approve) — Terapkan ke komponen:
5. Ganti aset logo/monogram yang dipakai di hero/nav/footer dengan public/brand/mark-*.svg sesuai
   konteks (ochre di light bg, reversed di dark bg) — ikuti aturan clearspace & minimum size di
   AGENTS.md, jangan mengubah proporsi svg.
6. Terapkan supergraphic "Frame & Grid" (public/brand/supergraphic/) sebagai elemen dekoratif yang
   pas untuk section divider / hero framing, sesuai deskripsi di AGENTS.md.
7. Audit seluruh file di components/ dan app/ untuk hardcoded hex color atau font-family yang
   menyimpang dari token — ganti dengan variabel token, laporkan kalau ada yang ambigu.
```

Kalau ingin cek hasil visual, mengingat pengaruh utama datang dari Sana Labs (sanalabs.com),
tambahkan kalimat ini di akhir prompt Tahap 2:

```
Setelah token & font ini terpasang, review ulang section landing page — pastikan whitespace
antar-section besar/lega, transisi scroll halus (gunakan CSS scroll-driven animation
`animation-timeline: view()` dengan progressive-enhancement lewat @supports, bukan library berat),
dan tidak ada elemen yang bertabrakan dengan aturan clearspace brandmark.
```
