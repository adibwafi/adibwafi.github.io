import type { Metadata } from 'next';
import HomePage from '@/components/HomePage';
import { SITE, localeAlternates } from '@/lib/i18n';

/* ─── Home route (Indonesian) — /id ──────────────────────────────────────── */

export const metadata: Metadata = {
  title: 'Muhamad Adibwafi Menako — Full Stack Software Engineer',
  description:
    'Full Stack Software Engineer yang membangun sistem backend skalabel, aplikasi web berperforma tinggi, dan arsitektur cloud yang tangguh. Berbasis di Indonesia.',
  alternates: localeAlternates('', 'id'),
  openGraph: {
    title: 'Muhamad Adibwafi Menako — Full Stack Software Engineer',
    description:
      'Full Stack Software Engineer yang membangun sistem backend skalabel, aplikasi web berperforma tinggi, dan arsitektur cloud yang tangguh.',
    url: `${SITE}/id`,
    siteName: 'Muhamad Adibwafi Menako Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Muhamad Adibwafi Menako — Full Stack Software Engineer',
      },
    ],
    locale: 'id_ID',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhamad Adibwafi Menako — Full Stack Software Engineer',
    description:
      'Full Stack Software Engineer yang membangun sistem backend skalabel, aplikasi web berperforma tinggi, dan arsitektur cloud yang tangguh.',
    images: ['/og-image.png'],
    creator: '@adibwafi',
  },
};

const homeSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfilePage',
      '@id': `${SITE}/id#profilepage`,
      url: `${SITE}/id`,
      name: 'Muhamad Adibwafi Menako — Full Stack Software Engineer',
      isPartOf: { '@id': `${SITE}/#website` },
      mainEntity: { '@id': `${SITE}/#person` },
      inLanguage: 'id',
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      <HomePage />
    </>
  );
}
