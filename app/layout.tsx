import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import SiteShell from '@/components/SiteShell';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

/* ─── Site-wide metadata ─────────────────────────────────────────────────── */

export const metadata: Metadata = {
  metadataBase: new URL('https://www.adibwafi.com'),
  alternates: { canonical: '/' },
  title: 'Muhamad Adibwafi Menako — Full Stack Engineer',
  description:
    'Results-driven Full Stack Engineer building scalable backend infrastructure and intuitive frontend experiences. Based in Indonesia.',
  icons: {
    icon:     '/icon-2.png',
    shortcut: '/icon-2.png',
    apple:    '/icon-2.png',
  },
  // PRIORITY 4 — Indonesian local recruiter keywords added
  keywords: [
    'Muhamad Adibwafi Menako',
    'Adibwafi Menako',
    'Adibwafi',
    'Full Stack Engineer',
    'Software Engineer',
    'Next.js',
    'React',
    'FastAPI',
    'TypeScript',
    'Indonesia',
    'Backend Engineer',
    'Frontend Engineer',
    'Menako Studio',
    'Web Developer Portfolio',
    // Local Indonesia keywords
    'Software Engineer Jakarta',
    'Web Developer Indonesia',
    'Full Stack Developer Depok',
    'engineer Indonesia hire',
    'mid level engineer Indonesia',
    'remote engineer Indonesia',
    'developer Indonesia',
    'Startup Campus engineer',
  ],
  authors: [{ name: 'Muhamad Adibwafi Menako', url: 'https://www.adibwafi.com' }],
  openGraph: {
    title:       'Muhamad Adibwafi Menako — Full Stack Engineer',
    description: 'Results-driven Full Stack Engineer building scalable backend infrastructure and intuitive frontend experiences.',
    url:         'https://www.adibwafi.com',
    siteName:    'Adibwafi Portfolio',
    images: [
      {
        // PRIORITY 3 — use portrait photo as OG image
        url:    '/portrait-adib.webp',
        width:  1200,
        height: 630,
        alt:    'Muhamad Adibwafi Menako — Full Stack Engineer',
      },
    ],
    locale: 'en_US',
    type:   'website',
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Muhamad Adibwafi Menako — Full Stack Engineer',
    description: 'Results-driven Full Stack Engineer building scalable backend infrastructure and intuitive frontend experiences.',
    images:      ['/portrait-adib.webp'],
  },
  robots: {
    index:     true,
    follow:    true,
    googleBot: {
      index:               true,
      follow:              true,
      'max-snippet':       -1,
      'max-image-preview': 'large',
    },
  },
};

/* ─── JSON-LD structured data ─────────────────────────────────────────────── */

const jsonLd = {
  '@context': 'https://schema.org',
  '@type':    'Person',
  name:       'Muhamad Adibwafi Menako',
  // Updated to reflect mid-level seniority signal
  jobTitle:   'Mid-Level Full Stack Software Engineer',
  url:        'https://www.adibwafi.com',
  image:      'https://www.adibwafi.com/portrait-adib.webp',
  sameAs: [
    'https://github.com/adibwafi',
    'https://linkedin.com/in/adibwafi',
  ],
  address: {
    '@type':         'PostalAddress',
    addressLocality: 'Depok',
    addressRegion:   'West Java',
    addressCountry:  'ID',
  },
  description:
    'Results-driven Full Stack Engineer building scalable backend infrastructure and intuitive frontend experiences.',
  knowsAbout: [
    'TypeScript', 'JavaScript', 'Python', 'PHP',
    'React.js', 'Next.js', 'Node.js', 'FastAPI',
    'Laravel', 'PostgreSQL', 'GCP', 'Docker', 'System Architecture',
  ],
  publishingPrinciples: [
    {
      '@type':             'CreativeWork',
      name:                'Enterprise LMS Architecture Blueprint',
      description:         'A structural, sanitized blueprint demonstrating scalable backend architecture for high-traffic Learning Management Systems.',
      programmingLanguage: 'PHP',
      codeRepository:      'https://github.com/adibwafi/laravel-vue-lms-blueprint',
    },
    {
      '@type':             'CreativeWork',
      name:                'AI Baby Meal Planner',
      description:         'A mobile-first Progressive Web App (PWA) designed to help parents plan nutrient-dense complementary feeding (weaning) menus in seconds using fridge inventory and AI.',
      programmingLanguage: 'TypeScript',
      codeRepository:      'https://github.com/adibwafi/ai-baby-meal-planner',
      url:                 'https://ai-baby-meal-planner-beta.vercel.app/',
    },
    {
      '@type':             'CreativeWork',
      name:                'Serasa Kreatif Digital Platform',
      description:         'Digital storefront and operations platform for a Bintaro-based creative agency specialising in social media management, video production, and targeted advertising.',
      programmingLanguage: 'JavaScript',
      url:                 'https://serasakreatif.id/',
    },
  ],
};

/* ─── Root layout ─────────────────────────────────────────────────────────── */

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        <link rel="icon"           href="/favicon.ico" sizes="any" />
        <meta name="viewport"      content="width=device-width, initial-scale=1" />
        <meta name="theme-color"   content="#FAFAFA" />
        {/* PRIORITY 6 — rel="me" identity verification */}
        <link rel="me" href="https://linkedin.com/in/adibwafi" />
        <link rel="me" href="https://github.com/adibwafi" />
        <link rel="me" href="mailto:adibwafi@gmail.com" />
      </head>
      <body className="antialiased">
        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* SiteShell provides Nav, theme, toast, and SiteContext to all pages */}
        <SiteShell>{children}</SiteShell>

        {/* Google Analytics */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
