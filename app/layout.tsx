import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Script from 'next/script';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.adibwafi.com'),
  alternates: { canonical: '/' },
  title: 'Muhamad Adibwafi Menako — Full Stack Engineer',
  description:
    'Results-driven Full Stack Engineer building scalable backend infrastructure and intuitive frontend experiences. Based in Indonesia.',
  icons: {
    icon: '/icon-2.png',
    shortcut: '/icon-2.png',
    apple: '/icon-2.png',
  },
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
  ],
  authors: [{ name: 'Muhamad Adibwafi Menako', url: 'https://www.adibwafi.com' }],
  openGraph: {
    title: 'Muhamad Adibwafi Menako — Full Stack Engineer',
    description:
      'Results-driven Full Stack Engineer building scalable backend infrastructure and intuitive frontend experiences.',
    url: 'https://www.adibwafi.com',
    siteName: 'Adibwafi Portfolio',
    images: [
      {
        url: '/portrait.jpg',
        width: 1200,
        height: 630,
        alt: 'Muhamad Adibwafi Menako — Full Stack Engineer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhamad Adibwafi Menako — Full Stack Engineer',
    description:
      'Results-driven Full Stack Engineer building scalable backend infrastructure and intuitive frontend experiences.',
    images: ['/portrait.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#FAFAFA" />
      </head>
      <body className="antialiased">
        {children}
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
