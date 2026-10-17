import type { Metadata } from 'next';
import WorkPage from '@/components/WorkPage';

/* ─── Work route — /work ─────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: 'Software Engineering Work & Projects — Menako Studio',
  description:
    'Production-grade software engineering projects, system architectures, and developer tools built by Muhamad Adibwafi Menako under the Menako Studio imprint.',
  alternates: {
    canonical: 'https://www.adibwafi.com/work',
  },
  keywords: [
    'Menako Studio',
    'Muhamad Adibwafi Menako Projects',
    'Software Engineering Portfolio',
    'Kinghouse Management',
    'Lotus Semarang',
    'Amana Care',
    'Livecode Logic Trainer',
    'Enterprise LMS Architecture Blueprint',
    'Next.js Supabase TypeScript',
    'Full Stack Software Projects',
  ],
  openGraph: {
    title: 'Software Engineering Work & Projects — Menako Studio',
    description:
      'Production-grade engineering projects spanning hospitality ERP platforms, live-code developer tools, enterprise infrastructure, and consumer applications.',
    url: 'https://www.adibwafi.com/work',
    siteName: 'Muhamad Adibwafi Menako Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Menako Studio Software Engineering Projects — Muhamad Adibwafi Menako',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Software Engineering Work & Projects — Menako Studio',
    description:
      'Production-grade engineering projects spanning hospitality ERP platforms, developer tools, and scalable architecture blueprints.',
    images: ['/og-image.png'],
    creator: '@adibwafi',
  },
};

const workSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': 'https://www.adibwafi.com/work#webpage',
      url: 'https://www.adibwafi.com/work',
      name: 'Software Engineering Work & Projects — Menako Studio',
      description:
        'Portfolio of production systems, developer tools, and distributed architectures engineered by Muhamad Adibwafi Menako.',
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
            name: 'Work',
            item: 'https://www.adibwafi.com/work',
          },
        ],
      },
      hasPart: [
        {
          '@type': 'SoftwareApplication',
          name: 'Kinghouse Management',
          description:
            'An editorial-grade property management, SEO CMS, and 100% Free-Tier Hospitality ERP/POS platform built with Next.js 16, Tailwind CSS v4, TypeScript, and Supabase PostgreSQL.',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          programmingLanguage: 'TypeScript',
          codeRepository: 'https://github.com/menako-studio/kinghouse-management',
          url: 'https://www.kinghousemanagement.com/',
          author: { '@id': 'https://www.adibwafi.com/#person' },
        },
        {
          '@type': 'SoftwareApplication',
          name: 'Lotus Semarang',
          description:
            'A high-performance modern wellness and integrated clinical therapy web application engineered under a Turborepo monorepo architecture with a 4-step WhatsApp appointment booking wizard.',
          applicationCategory: 'HealthApplication',
          operatingSystem: 'Web',
          programmingLanguage: 'TypeScript',
          codeRepository: 'https://github.com/menako-studio/lotus-semarang',
          url: 'https://www.lotussemarang.com/',
          author: { '@id': 'https://www.adibwafi.com/#person' },
        },
        {
          '@type': 'SoftwareApplication',
          name: 'Livecode Logic Trainer',
          description:
            'An interactive, timed web application designed for live-code technical interview preparation under 30-minute constraints.',
          applicationCategory: 'EducationalApplication',
          operatingSystem: 'Web',
          programmingLanguage: 'JavaScript',
          codeRepository: 'https://github.com/adibwafi/livecode-logic-trainer',
          url: 'https://livecode-logic-trainer.vercel.app/',
          author: { '@id': 'https://www.adibwafi.com/#person' },
        },
        {
          '@type': 'SoftwareSourceCode',
          name: 'Enterprise LMS Architecture Blueprint',
          description:
            'A production-grade architecture blueprint extracted and sanitized from a real-world Learning Management System serving 10,000+ active learners with 98% uptime.',
          programmingLanguage: 'PHP',
          codeRepository: 'https://github.com/adibwafi/laravel-vue-lms-blueprint',
          url: 'https://laravel-vue-lms-blueprint.vercel.app/',
          author: { '@id': 'https://www.adibwafi.com/#person' },
        },
        {
          '@type': 'SoftwareApplication',
          name: 'AI Baby Meal Planner',
          description:
            'A mobile-first Progressive Web App (PWA) designed to help parents plan nutrient-dense complementary feeding menus using fridge inventory and AI.',
          applicationCategory: 'LifestyleApplication',
          operatingSystem: 'Web',
          programmingLanguage: 'TypeScript',
          codeRepository: 'https://github.com/adibwafi/ai-baby-meal-planner',
          url: 'https://ai-baby-meal-planner-beta.vercel.app/',
          author: { '@id': 'https://www.adibwafi.com/#person' },
        },
        {
          '@type': 'SoftwareApplication',
          name: 'Amana Care Website',
          description:
            'A high-end profile and registration platform built for Amana Care using Next.js 15, TypeScript, Lenis smooth scrolling, and Supabase.',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          programmingLanguage: 'TypeScript',
          codeRepository: 'https://github.com/menako-studio/amana-care',
          url: 'https://www.amanacare.id/',
          author: { '@id': 'https://www.adibwafi.com/#person' },
        },
        {
          '@type': 'SoftwareApplication',
          name: 'Serasa Kreatif Digital Platform',
          description:
            'Digital storefront and operations platform for a creative agency specialising in social media management, video production, and targeted advertising.',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          programmingLanguage: 'JavaScript',
          codeRepository: 'https://github.com/menako-studio/serasa-kreatif',
          url: 'https://serasakreatif.id/',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(workSchema) }}
      />
      <WorkPage />
    </>
  );
}
