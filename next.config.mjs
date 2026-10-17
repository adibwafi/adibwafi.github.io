import { withSentryConfig } from '@sentry/nextjs/config'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for Docker multi-stage builds
  // Vercel deployment is unaffected by this setting
  output: 'standalone',

  // High-performance image optimization (AVIF + WebP next-gen formats)
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
    ],
  },

  // Production compiler optimizations (tree-shaking and console stripping)
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },

  // Enable gzip/brotli compression
  compress: true,

  // Redirect erroneous or crawled junk paths to canonical locations
  async redirects() {
    return [
      {
        source: '/$',
        destination: '/',
        permanent: true,
      },
      {
        source: '/\\$',
        destination: '/',
        permanent: true,
      },
    ];
  },

  // Security & HTTP caching headers for production performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:asset(portrait-adib\\.webp|favicon.*|apple-touch-icon.*|og-image\\.png|brand/.*|work/.*|pitchDeck/.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

// Sentry configuration
const sentryConfig = {
  silent: !process.env.CI,
  hideSourceMaps: true,
  webpack: {
    treeshake: {
      removeDebugLogging: true,
    },
    automaticVercelMonitors: false,
  },
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
}

export default withSentryConfig(nextConfig, sentryConfig);


