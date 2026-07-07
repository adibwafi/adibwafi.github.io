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
    'Full Stack Engineer',
    'Software Engineer',
    'Next.js',
    'React',
    'FastAPI',
    'TypeScript',
    'Indonesia',
  ],
  authors: [{ name: 'Muhamad Adibwafi Menako', url: 'https://www.adibwafi.com' }],
  openGraph: {
    title: 'Muhamad Adibwafi Menako — Full Stack Engineer',
    description:
      'Results-driven Full Stack Engineer building scalable backend infrastructure and intuitive frontend experiences.',
    url: 'https://www.adibwafi.com',
    siteName: 'Adibwafi Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Muhamad Adibwafi Menako — Full Stack Engineer',
    description:
      'Results-driven Full Stack Engineer building scalable backend infrastructure and intuitive frontend experiences.',
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
