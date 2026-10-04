import type { Metadata } from 'next';
import ExperiencePage from '@/components/ExperiencePage';

/* ─── Experience route — /experience ─────────────────────────────────────── */

export const metadata: Metadata = {
  title:       'Experience & Stack — Muhamad Adibwafi Menako',
  description:
    'Full-stack engineering at Fortu Digital, Startup Campus, and Politeknik Digital Indonesia. Vue 3, Next.js, FastAPI, GCP, TypeScript — full technical stack and career timeline.',
  alternates:  { canonical: '/experience' },
  openGraph: {
    title:       'Experience & Stack — Muhamad Adibwafi Menako',
    description: 'Full-stack engineering career and technical stack at Fortu Digital, Startup Campus, and beyond.',
    url:         'https://www.adibwafi.com/experience',
  },
};

export default function Page() {
  return <ExperiencePage />;
}
