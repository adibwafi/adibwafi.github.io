'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex items-center justify-center bg-[#121212] text-white p-6" suppressHydrationWarning>
        <div className="max-w-md text-center">
          <h2 className="text-2xl font-bold tracking-tight mb-3">Something went wrong</h2>
          <p className="text-sm text-[#A2A2A2] mb-6 leading-relaxed">
            An unexpected application error occurred. Sentry error monitoring has captured the incident.
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all active:scale-95"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
