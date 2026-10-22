import type { Metadata } from 'next';
import { localeAlternates } from '@/lib/i18n';
import ExperiencePage from '@/components/ExperiencePage';

/* ─── Experience route — /experience ─────────────────────────────────────── */

export const metadata: Metadata = {
  title: 'Experience & Tech Stack — Full Stack Engineer',
  description:
    'Career timeline and full technical stack of Muhamad Adibwafi Menako. Proven software engineering experience in TypeScript, React, Next.js, Vue 3, FastAPI, PostgreSQL, and GCP.',
  alternates: localeAlternates('/experience', 'en'),
  keywords: [
    'Muhamad Adibwafi Menako Experience',
    'Full Stack Engineer Career',
    'Fortu Digital Engineer',
    'Startup Campus Developer',
    'FastAPI PostgreSQL GCP',
    'Vue 3 TypeScript',
    'Next.js Full Stack',
    'Software Engineer Indonesia',
  ],
  openGraph: {
    title: 'Experience & Tech Stack — Muhamad Adibwafi Menako',
    description:
      'Career timeline and full technical stack of Muhamad Adibwafi Menako across enterprise digital signage, scalable LMS platforms, and distributed systems.',
    url: 'https://www.adibwafi.com/experience',
    siteName: 'Muhamad Adibwafi Menako Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Experience & Tech Stack — Muhamad Adibwafi Menako',
      },
    ],
    locale: 'en_US',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Experience & Tech Stack — Muhamad Adibwafi Menako',
    description:
      'Career timeline and full technical stack of Muhamad Adibwafi Menako across Fortu Digital, Startup Campus, and more.',
    images: ['/og-image.png'],
    creator: '@adibwafi',
  },
};

const experienceSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': 'https://www.adibwafi.com/experience#webpage',
      url: 'https://www.adibwafi.com/experience',
      name: 'Experience & Tech Stack — Muhamad Adibwafi Menako',
      description:
        'Professional work history, technical stack breakdown, and educational background of Full Stack Engineer Muhamad Adibwafi Menako.',
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
            name: 'Experience',
            item: 'https://www.adibwafi.com/experience',
          },
        ],
      },
    },
    {
      '@type': 'Occupation',
      name: 'Full Stack Software Engineer',
      occupationalCategory: '15-1252.00',
      skills: [
        'TypeScript', 'JavaScript', 'Python', 'PHP',
        'React', 'Next.js', 'Vue 3', 'Node.js', 'FastAPI',
        'Laravel', 'PostgreSQL', 'Docker', 'Google Cloud Platform (GCP)',
        'Supabase', 'Tailwind CSS', 'Distributed Systems', 'Software Architecture',
      ],
      estimatedSalary: [],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(experienceSchema) }}
      />
      <ExperiencePage />
    </>
  );
}
