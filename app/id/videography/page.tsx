import type { Metadata } from 'next';
import VideographyPage from '@/components/VideographyPage';
import { SITE, localeAlternates } from '@/lib/i18n';

/* ─── Videography route (Indonesian) — /id/videography ───────────────────── */

const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@Setipiskumis';

export const metadata: Metadata = {
  title: 'Videografi Komersial & Visual Storytelling — Menako Films',
  description:
    'Praktik videografi komersial dan visual storytelling Muhamad Adibwafi Menako (Menako Films). Iklan untuk Bank Mandiri, Garuda Indonesia, dan Shopee. YouTube resmi: @Setipiskumis.',
  alternates: localeAlternates('/videography', 'id'),
  openGraph: {
    title: 'Videografi Komersial & Visual Storytelling — Menako Films',
    description:
      'Karya pilihan Menako Films: kampanye komersial tier-1, film heritage penerbangan, dokumenter budaya otomotif, dan motion graphics.',
    url: `${SITE}/id/videography`,
    siteName: 'Muhamad Adibwafi Menako Portfolio',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Videografi Komersial Menako Films — Muhamad Adibwafi Menako' }],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Videografi Komersial & Visual Storytelling — Menako Films',
    description: 'Karya pilihan Menako Films: kampanye komersial tier-1, film heritage penerbangan, dan visual storytelling.',
    images: ['/og-image.png'],
    creator: '@adibwafi',
  },
};

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${SITE}/id/videography#webpage`,
      url: `${SITE}/id/videography`,
      name: 'Videografi Komersial & Visual Storytelling — Menako Films',
      inLanguage: 'id',
      isPartOf: { '@id': `${SITE}/#website` },
      mainEntity: { '@id': `${SITE}/#person` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Beranda', item: `${SITE}/id` },
          { '@type': 'ListItem', position: 2, name: 'Videografi', item: `${SITE}/id/videography` },
        ],
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VideographyPage channelUrl={YOUTUBE_CHANNEL_URL} />
    </>
  );
}
