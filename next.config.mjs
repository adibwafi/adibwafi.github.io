import { withSentryConfig } from '@sentry/nextjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for Docker multi-stage builds
  // Vercel deployment is unaffected by this setting
  output: 'standalone',

  // Security headers for production grade A+ security score on Vercel
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
    ];
  },

  experimental: {
    // Required for Sentry server-side instrumentation in Next.js 14
    instrumentationHook: true,
  },
};

// Sentry webpack plugin configuration
const sentryConfig = {
  silent: !process.env.CI,
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: false,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
}

export default withSentryConfig(nextConfig, sentryConfig);


