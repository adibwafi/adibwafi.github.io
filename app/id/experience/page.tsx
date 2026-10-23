import type { Metadata } from 'next';
import ExperiencePage from '@/components/ExperiencePage';
import { SITE, localeAlternates } from '@/lib/i18n';

/* ─── Experience route (Indonesian) — /id/experience ─────────────────────── */

export const metadata: Metadata = {
  title: 'Pengalaman & Tech Stack — Full Stack Engineer',
  description:
    'Timeline karier dan tech stack lengkap Muhamad Adibwafi Menako. Pengalaman rekayasa perangkat lunak di TypeScript, React, Next.js, Vue 3, FastAPI, PostgreSQL, dan GCP.',
  alternates: localeAlternates('/experience', 'id'),
  openGraph: {
    title: 'Pengalaman & Tech Stack — Muhamad Adibwafi Menako',
    description:
      'Timeline karier dan tech stack lengkap Muhamad Adibwafi Menako di berbagai platform skala produksi dan sistem terdistribusi.',
    url: `${SITE}/id/experience`,
    siteName: 'Muhamad Adibwafi Menako Portfolio',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Pengalaman & Tech Stack — Muhamad Adibwafi Menako' }],
    locale: 'id_ID',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pengalaman & Tech Stack — Muhamad Adibwafi Menako',
    description: 'Timeline karier dan tech stack lengkap Muhamad Adibwafi Menako.',
    images: ['/og-image.png'],
    creator: '@adibwafi',
  },
};

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': `${SITE}/id/experience#webpage`,
      url: `${SITE}/id/experience`,
      name: 'Pengalaman & Tech Stack — Muhamad Adibwafi Menako',
      inLanguage: 'id',
      isPartOf: { '@id': `${SITE}/#website` },
      mainEntity: { '@id': `${SITE}/#person` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Beranda', item: `${SITE}/id` },
          { '@type': 'ListItem', position: 2, name: 'Pengalaman', item: `${SITE}/id/experience` },
        ],
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ExperiencePage />
    </>
  );
}
