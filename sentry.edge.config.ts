// sentry.edge.config.ts
// Sentry Edge Runtime initialization for adibwafi.github.io (TypeScript)
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  enabled: !!process.env.NEXT_PUBLIC_SENTRY_DSN && process.env.NODE_ENV === 'production',

  tracesSampleRate: 0.05,

  debug: false,
})
