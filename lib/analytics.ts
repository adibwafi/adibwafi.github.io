declare global {
  interface Window {
    // gtag.js maintains this array internally; we no longer push to it directly.
    dataLayer?: Record<string, any>[];
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Generic GA4 event for granular behavioural tracking (section views, link
 * clicks, toggles). These all share coarse event names — do NOT mark them as
 * GA4 Key events. Use `trackConversion` for anything that should count as a
 * conversion.
 */
export const trackEvent = (
  action: string,
  category: string,
  label: string,
  value?: number
) => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
    page_path: window.location.pathname,
  });
};

/**
 * Named GA4 conversion event. Each conversion gets its own distinct event name
 * (e.g. `contact_email`, `cv_download`, `pitchdeck_download`) so it can be
 * promoted to a Key event in GA4 → Admin → Events. GA4 matches Key events by
 * event NAME, which is why the generic `trackEvent` above cannot be used here.
 */
export const trackConversion = (
  eventName: string,
  params: Record<string, any> = {}
) => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  window.gtag('event', eventName, {
    ...params,
    page_path: window.location.pathname,
  });
};

/**
 * SPA route-change page view. Sent as an explicit `page_view` event (not a
 * re-`config`) so exactly one page view fires per route. The initial GA config
 * uses `send_page_view: false`, and the route tracker fires on mount, so the
 * first load is covered without being double-counted.
 */
export const trackPageView = (pagePath: string, pageTitle?: string) => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  window.gtag('event', 'page_view', {
    page_path: pagePath,
    page_title: pageTitle || document.title || 'Adibwafi Portfolio',
    page_location: window.location.href,
  });
};
