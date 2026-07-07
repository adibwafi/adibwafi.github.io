export const trackEvent = (action: string, category: string, label: string, value?: number) => {
  if (typeof window !== 'undefined') {
    // GA4 tracking
    if ((window as any).gtag) {
      (window as any).gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
    // GTM / generic dataLayer tracking
    const dataLayer = (window as any).dataLayer || [];
    dataLayer.push({
      event: 'custom_event',
      eventAction: action,
      eventCategory: category,
      eventLabel: label,
      eventValue: value,
    });
  }
};

export const trackPageView = (pagePath: string, pageTitle: string) => {
  if (typeof window !== 'undefined') {
    // GA4 virtual page view
    const gaId = process.env.NEXT_PUBLIC_GA_ID;
    if ((window as any).gtag && gaId) {
      (window as any).gtag('config', gaId, {
        page_path: pagePath,
        page_title: pageTitle,
      });
    }
    // GTM virtual page view
    const dataLayer = (window as any).dataLayer || [];
    dataLayer.push({
      event: 'virtual_page_view',
      page_path: pagePath,
      page_title: pageTitle,
    });
  }
};
