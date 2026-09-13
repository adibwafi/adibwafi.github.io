import type { Metadata } from 'next';
import VideographyPage from '@/components/VideographyPage';

/* ─── Videography route — /videography ───────────────────────────────────── */

export const metadata: Metadata = {
  title:       'Videography & Visual Storytelling — Muhamad Adibwafi Menako',
  description:
    'Eleven selected video productions: national commercial campaigns for Bank Mandiri and Garuda Indonesia, aviation heritage films, automotive culture documentaries, and lifestyle features.',
  alternates:  { canonical: '/videography' },
  openGraph: {
    title:       'Videography & Visual Storytelling — Muhamad Adibwafi Menako',
    description: 'Selected productions spanning tier-1 commercial campaigns, aviation heritage films, automotive culture documentaries, and motion graphics.',
    url:         'https://www.adibwafi.com/videography',
  },
};

export default function Page() {
  return <VideographyPage />;
}
