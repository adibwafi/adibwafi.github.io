import type { Metadata } from 'next';
import VideographyPage from '@/components/VideographyPage';

/* ─── Videography route — /videography ───────────────────────────────────── */

const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@Setipiskumis';

export const metadata: Metadata = {
  title:       'Menako Films — Commercial Videography & Visual Storytelling | Muhamad Adibwafi Menako',
  description:
    'Menako Films is the freelance videography practice of Muhamad Adibwafi Menako. National commercial campaigns for Bank Mandiri and Garuda Indonesia, aviation heritage films, automotive culture documentaries, and visual storytelling. Official YouTube: @Setipiskumis.',
  alternates:  { canonical: '/videography' },
  openGraph: {
    title:       'Menako Films — Commercial Videography & Visual Storytelling | Muhamad Adibwafi Menako',
    description: 'Selected productions by Menako Films spanning tier-1 commercial campaigns, aviation heritage films, automotive culture documentaries, and motion graphics. Watch more on YouTube @Setipiskumis.',
    url:         'https://www.adibwafi.com/videography',
  },
};

export default function Page() {
  return <VideographyPage channelUrl={YOUTUBE_CHANNEL_URL} />;
}
