import type { Metadata } from 'next';
import WorkPage from '@/components/WorkPage';

/* ─── Work route — /work ─────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title:       'Menako Studio — Software Engineering Practice | Muhamad Adibwafi Menako',
  description:
    'Menako Studio is the independent software engineering practice of Muhamad Adibwafi Menako. Production-grade systems, developer tooling, and distributed architectures engineered with the Twin Frame system.',
  alternates:  { canonical: '/work' },
  openGraph: {
    title:       'Menako Studio — Software Engineering Practice | Muhamad Adibwafi Menako',
    description: 'Production-grade engineering projects and systems spanning hospitality ERP platforms, live-code developer tools, enterprise infrastructure, consumer apps, and agency platforms under the Menako Studio imprint.',
    url:         'https://www.adibwafi.com/work',
  },
};

export default function Page() {
  return <WorkPage />;
}
