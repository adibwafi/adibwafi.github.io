import type { Metadata } from 'next';
import WorkPage from '@/components/WorkPage';

/* ─── Work route — /work ─────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title:       'Projects & Work — Muhamad Adibwafi Menako',
  description:
    'Selected engineering projects: Enterprise LMS Architecture (10k+ users), AI Baby Meal Planner, and Serasa Kreatif Platform. Built with Laravel, Next.js, FastAPI, and GCP.',
  alternates:  { canonical: '/work' },
  openGraph: {
    title:       'Projects & Work — Muhamad Adibwafi Menako',
    description: 'Three production-grade projects spanning enterprise infrastructure, consumer apps, and agency platforms.',
    url:         'https://www.adibwafi.com/work',
  },
};

export default function Page() {
  return <WorkPage />;
}
