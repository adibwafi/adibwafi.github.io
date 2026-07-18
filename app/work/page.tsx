import type { Metadata } from 'next';
import WorkPage from '@/components/WorkPage';

/* ─── Work route — /work ─────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title:       'Projects & Work — Muhamad Adibwafi Menako',
  description:
    'Selected engineering projects: Enterprise LMS Architecture (10k+ users), AI Baby Meal Planner, Serasa Kreatif Platform, and Amana Care Website. Built with Next.js, Laravel, FastAPI, Supabase, and GCP.',
  alternates:  { canonical: '/work' },
  openGraph: {
    title:       'Projects & Work — Muhamad Adibwafi Menako',
    description: 'Production-grade engineering projects spanning enterprise infrastructure, consumer apps, agency platforms, and daycare websites.',
    url:         'https://www.adibwafi.com/work',
  },
};

export default function Page() {
  return <WorkPage />;
}
