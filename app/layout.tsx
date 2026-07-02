import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import './globals.css';

// 1. Inisialisasi Kinfolk Serif
const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-cormorant', // Custom CSS variable untuk Tailwind
})

// 2. Inisialisasi Kinfolk/Uniqlo Sans
const manrope = Manrope({ 
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-manrope',
})

export const metadata: Metadata = {
  title: 'Muhamad Adibwafi Menako — Full Stack Engineer',
  description:
    'Results-driven Full Stack Engineer bridging complex backend infrastructure and intuitive frontend design. Based in Indonesia.',
  keywords: [
    'Full Stack Engineer',
    'Software Engineer',
    'Next.js',
    'React',
    'FastAPI',
    'TypeScript',
    'Indonesia',
  ],
  authors: [{ name: 'Muhamad Adibwafi Menako', url: 'https://adibwafi.github.io' }],
  openGraph: {
    title: 'Muhamad Adibwafi Menako — Full Stack Engineer',
    description:
      'Results-driven Full Stack Engineer bridging complex backend infrastructure and intuitive frontend design.',
    url: 'https://adibwafi.github.io',
    siteName: 'Adibwafi Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Muhamad Adibwafi Menako — Full Stack Engineer',
    description:
      'Results-driven Full Stack Engineer bridging complex backend infrastructure and intuitive frontend design.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#FAFAFA" />
      </head>
      <body className="bg-[#FAFAFA] text-[#27272A] font-sans antialiased selection:bg-neutral-200">{children}</body>
    </html>
  );
}

