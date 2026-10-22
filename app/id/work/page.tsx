import type { Metadata } from 'next';
import WorkPage from '@/components/WorkPage';
import { SITE, localeAlternates } from '@/lib/i18n';

/* ─── Work route (Indonesian) — /id/work ─────────────────────────────────── */

export const metadata: Metadata = {
  title: 'Proyek & Karya Software Engineering — Menako Studio',
  description:
    'Proyek rekayasa perangkat lunak tingkat produksi, arsitektur sistem, dan developer tools karya Muhamad Adibwafi Menako di bawah bendera Menako Studio.',
  alternates: localeAlternates('/work', 'id'),
  openGraph: {
    title: 'Proyek & Karya Software Engineering — Menako Studio',
    description:
      'Proyek rekayasa tingkat produksi mulai dari platform hospitality ERP, developer tools, hingga blueprint arsitektur skalabel.',
    url: `${SITE}/id/work`,
    siteName: 'Muhamad Adibwafi Menako Portfolio',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Proyek Software Engineering Menako Studio — Muhamad Adibwafi Menako' }],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Proyek & Karya Software Engineering — Menako Studio',
    description: 'Proyek rekayasa tingkat produksi: hospitality ERP, developer tools, dan blueprint arsitektur.',
    images: ['/og-image.png'],
    creator: '@adibwafi',
  },
};

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${SITE}/id/work#webpage`,
      url: `${SITE}/id/work`,
      name: 'Proyek & Karya Software Engineering — Menako Studio',
      inLanguage: 'id',
      isPartOf: { '@id': `${SITE}/#website` },
      mainEntity: { '@id': `${SITE}/#person` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Beranda', item: `${SITE}/id` },
          { '@type': 'ListItem', position: 2, name: 'Proyek', item: `${SITE}/id/work` },
        ],
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <WorkPage />
    </>
  );
}
