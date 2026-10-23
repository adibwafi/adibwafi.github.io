import type { Metadata } from 'next';
import { localeAlternates } from '@/lib/i18n';
import HomePage from '@/components/HomePage';

/* ─── Home route — / ─────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: 'Muhamad Adibwafi Menako — Full Stack Software Engineer',
  description:
    'Full Stack Software Engineer building scalable backend systems, high-performance web applications, and resilient cloud architectures. Based in Indonesia.',
  alternates: localeAlternates('', 'en'),
  openGraph: {
    title: 'Muhamad Adibwafi Menako — Full Stack Software Engineer',
    description:
      'Full Stack Software Engineer building scalable backend systems, high-performance web applications, and resilient cloud architectures.',
    url: 'https://www.adibwafi.com',
    siteName: 'Muhamad Adibwafi Menako Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Muhamad Adibwafi Menako — Full Stack Software Engineer',
      },
    ],
    locale: 'en_US',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhamad Adibwafi Menako — Full Stack Software Engineer',
    description:
      'Full Stack Software Engineer building scalable backend systems, high-performance web applications, and resilient cloud architectures.',
    images: ['/og-image.png'],
    creator: '@adibwafi',
  },
};

const homeSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfilePage',
      '@id': 'https://www.adibwafi.com/#profilepage',
      url: 'https://www.adibwafi.com',
      name: 'Muhamad Adibwafi Menako — Full Stack Software Engineer',
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
        ],
      },
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
