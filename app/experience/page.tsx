import type { Metadata } from 'next';
import ExperiencePage from '@/components/ExperiencePage';

/* ─── Experience route — /experience ─────────────────────────────────────── */

export const metadata: Metadata = {
  title:       'Experience & Stack — Muhamad Adibwafi Menako',
  description:
    '3+ years of full-stack engineering at Startup Campus and Politeknik Digital Indonesia. FastAPI, GCP, PostgreSQL, Next.js, React — full technical stack and career timeline.',
  alternates:  { canonical: '/experience' },
  openGraph: {
    title:       'Experience & Stack — Muhamad Adibwafi Menako',
    description: '3+ years of full-stack engineering. See work history, technical stack, and education.',
    url:         'https://www.adibwafi.com/experience',
  },
};

export default function Page() {
  return <ExperiencePage />;
}
