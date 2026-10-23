import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import SiteShell from '@/components/SiteShell';
import AnalyticsRouteTracker from '@/components/AnalyticsRouteTracker';
import { SITE_MAILTO } from '@/lib/data';

const serif = localFont({
  src: [
    {
      path: './fonts/cormorant-garamond-normal.woff2',
      weight: '300 700',
      style: 'normal',
    },
    {
      path: './fonts/cormorant-garamond-italic.woff2',
      weight: '300 700',
      style: 'italic',
    },
  ],
  variable: '--font-serif',
  display: 'swap',
  // Not the LCP font — don't let it compete with Manrope for preload bandwidth.
  preload: false,
});

const sans = localFont({
  src: './fonts/manrope.woff2',
  weight: '200 800',
  style: 'normal',
  variable: '--font-sans',
  display: 'swap',
  // Body + hero H1 (the mobile LCP element) — the only font worth preloading.
  preload: true,
});

const mono = localFont({
  src: './fonts/jetbrains-mono.woff2',
  weight: '400 700',
  style: 'normal',
  variable: '--font-mono',
  display: 'swap',
  preload: false,
});

/* ─── Site-wide metadata ─────────────────────────────────────────────────── */

export const metadata: Metadata = {
  metadataBase: new URL('https://www.adibwafi.com'),
  title: {
    default: 'Muhamad Adibwafi Menako — Full Stack Software Engineer',
    template: '%s | Muhamad Adibwafi Menako',
  },
  description:
    'Full Stack Software Engineer building scalable backend systems, high-performance web applications, and resilient cloud architectures. Based in Indonesia.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  keywords: [
    'Muhamad Adibwafi Menako',
    'Adibwafi Menako',
    'Adibwafi',
    'Full Stack Software Engineer',
    'Software Engineer Indonesia',
    'Senior Full Stack Developer',
    'Next.js Developer',
    'React Developer',
    'FastAPI Engineer',
    'Vue 3 Developer',
    'TypeScript Engineer',
    'Indonesia Software Engineer',
    'Backend Engineer Jakarta',
    'Frontend Engineer Jakarta',
    'Menako Studio',
    'System Architecture',
    'Web Performance Optimization',
    'Software Engineer Jakarta',
    'Web Developer Indonesia',
    'Full Stack Developer Depok',
    'engineer Indonesia hire',
    'remote engineer Indonesia',
  ],
  authors: [{ name: 'Muhamad Adibwafi Menako', url: 'https://www.adibwafi.com' }],
  creator: 'Muhamad Adibwafi Menako',
  publisher: 'Menako Studio',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title:       'Muhamad Adibwafi Menako — Full Stack Software Engineer',
    description: 'Full Stack Software Engineer building scalable backend systems, high-performance web applications, and resilient cloud architectures.',
    url:         'https://www.adibwafi.com',
    siteName:    'Muhamad Adibwafi Menako Portfolio',
    images: [
      {
        url:    '/og-image.png',
        width:  1200,
        height: 630,
        alt:    'Muhamad Adibwafi Menako — Full Stack Software Engineer',
      },
    ],
    locale: 'en_US',
    type:   'website',
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Muhamad Adibwafi Menako — Full Stack Software Engineer',
    description: 'Full Stack Software Engineer building scalable backend systems, high-performance web applications, and resilient cloud architectures.',
    images:      ['/og-image.png'],
    creator:     '@adibwafi',
  },
  robots: {
    index:     true,
    follow:    true,
    googleBot: {
      index:               true,
      follow:              true,
      'max-snippet':       -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

/* ─── JSON-LD structured data (Schema.org Graph) ─────────────────────────── */

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://www.adibwafi.com/#website',
      url: 'https://www.adibwafi.com',
      name: 'Muhamad Adibwafi Menako — Full Stack Software Engineer',
      description: 'Official portfolio and software engineering practice of Muhamad Adibwafi Menako.',
      publisher: { '@id': 'https://www.adibwafi.com/#person' },
      inLanguage: ['en', 'id'],
    },
    {
      '@type': 'Person',
      '@id': 'https://www.adibwafi.com/#person',
      name: 'Muhamad Adibwafi Menako',
      alternateName: ['Adibwafi', 'Adibwafi Menako'],
      jobTitle: 'Full Stack Software Engineer',
      url: 'https://www.adibwafi.com',
      image: 'https://www.adibwafi.com/portrait-adib.webp',
      email: 'hello@adibwafi.com',
      sameAs: [
        'https://github.com/adibwafi',
        'https://linkedin.com/in/adibwafi',
        'https://www.youtube.com/@Setipiskumis',
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Depok',
        addressRegion: 'West Java',
        addressCountry: 'ID',
      },
      worksFor: {
        '@type': 'Organization',
        name: 'Fortu Digital',
      },
      alumniOf: [
        {
          '@type': 'EducationalOrganization',
          name: 'Hacktiv8 Indonesia',
        },
        {
          '@type': 'EducationalOrganization',
          name: 'Universitas Padjadjaran',
        },
      ],
      knowsAbout: [
        'TypeScript', 'JavaScript', 'Python', 'PHP',
        'React', 'Next.js', 'Vue.js', 'Node.js', 'FastAPI',
        'Laravel', 'PostgreSQL', 'Docker', 'Google Cloud Platform (GCP)',
        'Supabase', 'Tailwind CSS', 'Distributed Systems', 'Software Architecture',
        'Web Performance Optimization',
      ],
      description:
        'Full Stack Software Engineer building scalable backend systems, high-performance web applications, and resilient cloud architectures.',
    },
  ],
};

/* ─── Root layout ─────────────────────────────────────────────────────────── */

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${serif.variable} ${sans.variable} ${mono.variable} scroll-smooth`}
    >
      <head>
        <link rel="icon"           href="/favicon.ico" sizes="any" />
        <meta name="viewport"      content="width=device-width, initial-scale=1" />
        <meta name="theme-color"   content="#F8FAFC" />
        {/* Preconnect & DNS prefetch for performance */}
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://i.ytimg.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
        {/* Identity verification */}
        <link rel="me" href="https://linkedin.com/in/adibwafi" />
        <link rel="me" href="https://github.com/adibwafi" />
        <link rel="me" href="https://www.youtube.com/@Setipiskumis" />
        <link rel="me" href={SITE_MAILTO} />
        {/* Prevent theme flash and sync client theme before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var savedTheme = localStorage.getItem('theme');
                var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                var theme = savedTheme || (prefersDark ? 'dark' : 'light');
                document.documentElement.setAttribute('data-theme', theme);
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
                var savedLang = localStorage.getItem('lang');
                if (savedLang) {
                  document.documentElement.setAttribute('lang', savedLang);
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Client-side route change pageview tracking */}
        <AnalyticsRouteTracker />

        {/* SiteShell provides Nav, theme, toast, and SiteContext to all pages */}
        <SiteShell>{children}</SiteShell>

        {/* Vercel Analytics & Speed Insights */}
        <Analytics />
        <SpeedInsights />

        {/* Google Analytics 4 — lazyOnload executes after critical resources.
            The config call sends the initial page view (reliable even though
            gtag loads lazily). AnalyticsRouteTracker then fires one page_view
            per subsequent SPA route change only, so views are never
            double-counted. NOTE: disable GA4 Enhanced Measurement's "Page
            changes based on browser history events" so it doesn't also fire on
            SPA navigation. */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="lazyOnload"
            />
            <Script id="google-analytics" strategy="lazyOnload">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
