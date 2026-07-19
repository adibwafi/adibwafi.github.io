// sentry.client.config.ts
// Sentry client-side initialization for adibwafi.github.io (TypeScript)
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Only activate in production AND when DSN is configured
  enabled: !!process.env.NEXT_PUBLIC_SENTRY_DSN && process.env.NODE_ENV === 'production',

  // Sample 10% of transactions — portfolio gets low traffic so this is generous
  tracesSampleRate: 0.1,

  // Record session replays for 5% of sessions, 100% when errors occur
  replaysSessionSampleRate: 0.05,
  replaysOnErrorSampleRate: 1.0,

  integrations: [
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],

  debug: false,
})
