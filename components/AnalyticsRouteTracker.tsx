'use client';

import { useEffect, useRef, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageView } from '@/lib/analytics';

function RouteTrackerContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // The GA4 config call sends the initial page view, so skip the first render
  // here and only track subsequent SPA route changes — otherwise the landing
  // page is counted twice.
  const isInitialLoad = useRef(true);

  useEffect(() => {
    if (!pathname) return;

    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    const url = searchParams?.toString()
      ? `${pathname}?${searchParams.toString()}`
      : pathname;

    // Small delay to ensure document.title is updated by Next.js metadata
    const timer = setTimeout(() => {
      trackPageView(url, document.title || 'Adibwafi Portfolio');
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return null;
}

export default function AnalyticsRouteTracker() {
  return (
    <Suspense fallback={null}>
      <RouteTrackerContent />
    </Suspense>
  );
}
