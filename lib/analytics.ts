declare global {
  interface Window {
    dataLayer?: Record<string, any>[];
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Standard Analytics Event tracking for GA4 and GTM.
 */
export const trackEvent = (
  action: string,
  category: string,
  label: string,
  value?: number
) => {
  if (typeof window === 'undefined') return;

  const pagePath = window.location.pathname;

  // Google Analytics 4
  if (typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      page_path: pagePath,
    });
  }

  // Google Tag Manager / dataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: action,
    event_action: action,
    event_category: category,
    event_label: label,
    event_value: value,
    page_path: pagePath,
  });
};

/**
 * Flexible Custom Event tracking for GA4 and GTM with custom parameters.
 */
export const trackCustomEvent = (
  eventName: string,
  params: Record<string, any> = {}
) => {
  if (typeof window === 'undefined') return;

  const pagePath = window.location.pathname;
  const payload = { ...params, page_path: pagePath };

  // Google Analytics 4
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, payload);
  }

  // Google Tag Manager / dataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...payload,
  });
};

/**
 * Virtual Page View tracking for SPA route transitions.
 */
export const trackPageView = (pagePath: string, pageTitle?: string) => {
  if (typeof window === 'undefined') return;

  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const title = pageTitle || document.title || 'Adibwafi Portfolio';

  // GA4 Virtual Page View
  if (typeof window.gtag === 'function' && gaId) {
    window.gtag('config', gaId, {
      page_path: pagePath,
      page_title: title,
    });
  }

  // GTM Virtual Page View
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'page_view',
    page_path: pagePath,
    page_title: title,
  });
};
