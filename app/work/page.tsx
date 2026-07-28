import type { Metadata } from 'next';
import WorkPage from '@/components/WorkPage';

/* ─── Work route — /work ─────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title:       'Projects & Work — Muhamad Adibwafi Menako',
  description:
    'Selected engineering projects: Livecode Logic Trainer, Enterprise LMS Architecture (10k+ users), AI Baby Meal Planner, Amana Care Website, and Serasa Kreatif Platform.',
  alternates:  { canonical: '/work' },
  openGraph: {
    title:       'Projects & Work — Muhamad Adibwafi Menako',
    description: 'Production-grade engineering projects spanning live-code developer tools, enterprise infrastructure, consumer apps, daycare platforms, and agency websites.',
    url:         'https://www.adibwafi.com/work',
  },
};

export default function Page() {
  return <WorkPage />;
}
