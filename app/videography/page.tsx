import type { Metadata } from 'next';
import { localeAlternates } from '@/lib/i18n';
import VideographyPage from '@/components/VideographyPage';

/* ─── Videography route — /videography ───────────────────────────────────── */

const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@Setipiskumis';

export const metadata: Metadata = {
  title: 'Commercial Videography & Visual Storytelling — Menako Films',
  description:
    'Commercial videography and visual storytelling practice of Muhamad Adibwafi Menako (Menako Films). Commercials for Bank Mandiri, Garuda Indonesia, and Shopee. Official YouTube: @Setipiskumis.',
  alternates: localeAlternates('/videography', 'en'),
  keywords: [
    'Menako Films',
    'Muhamad Adibwafi Menako Videography',
    'Commercial Videography Indonesia',
    'Bank Mandiri Commercial',
    'Garuda Indonesia Video Campaign',
    'Aviation Videography',
    'Automotive Documentaries',
    'Setipiskumis YouTube',
  ],
  openGraph: {
    title: 'Commercial Videography & Visual Storytelling — Menako Films',
    description:
      'Selected productions by Menako Films spanning tier-1 commercial campaigns, aviation heritage films, automotive culture documentaries, and motion graphics.',
    url: 'https://www.adibwafi.com/videography',
    siteName: 'Muhamad Adibwafi Menako Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Menako Films Commercial Videography — Muhamad Adibwafi Menako',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Commercial Videography & Visual Storytelling — Menako Films',
    description:
      'Selected productions by Menako Films spanning tier-1 commercial campaigns, aviation heritage films, and visual storytelling.',
    images: ['/og-image.png'],
    creator: '@adibwafi',
  },
};

const videographySchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': 'https://www.adibwafi.com/videography#webpage',
      url: 'https://www.adibwafi.com/videography',
      name: 'Commercial Videography & Visual Storytelling — Menako Films',
      description:
        'Selected visual productions and commercial campaigns directed by Muhamad Adibwafi Menako under Menako Films.',
      isPartOf: { '@id': 'https://www.adibwafi.com/#website' },
      mainEntity: { '@id': 'https://www.adibwafi.com/#person' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.adibwafi.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Videography',
            item: 'https://www.adibwafi.com/videography',
          },
        ],
      },
      hasPart: [
        {
          '@type': 'VideoObject',
          name: 'Enteng Ubah Transaksi di Luar Negeri Jadi Cicilan — Bank Mandiri',
          description:
            "High-stakes commercial production for Livin' by Mandiri credit card international features.",
          thumbnailUrl: 'https://i.ytimg.com/vi/IE--0Afk05w/hqdefault.jpg',
          contentUrl: 'https://www.youtube.com/watch?v=IE--0Afk05w',
          uploadDate: '2023-01-01',
          author: { '@id': 'https://www.adibwafi.com/#person' },
        },
        {
          '@type': 'VideoObject',
          name: 'Because You Matter - Pandemic Recovery Campaign — Garuda Indonesia',
          description:
            'National campaign restoring passenger trust and boosting airline flight revenue during the pandemic.',
          thumbnailUrl: 'https://i.ytimg.com/vi/lbYyqWl26Q0/hqdefault.jpg',
          contentUrl: 'https://www.youtube.com/watch?v=lbYyqWl26Q0',
          uploadDate: '2021-01-01',
          author: { '@id': 'https://www.adibwafi.com/#person' },
        },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videographySchema) }}
      />
      <VideographyPage channelUrl={YOUTUBE_CHANNEL_URL} />
    </>
  );
}
