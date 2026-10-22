import type { Metadata } from 'next';

export const SITE = 'https://www.adibwafi.com';

/**
 * Build hreflang alternates for a page that exists in both locales.
 * `path` is the English (root) path, e.g. '' for home or '/work'.
 * English lives at the root, Indonesian under /id.
 */
export function localeAlternates(path: string, locale: 'en' | 'id'): Metadata['alternates'] {
  const enUrl = `${SITE}${path}`;
  const idUrl = `${SITE}/id${path}`;
  return {
    canonical: locale === 'en' ? enUrl : idUrl,
    languages: {
      'en-US': enUrl,
      'id-ID': idUrl,
      'x-default': enUrl,
    },
  };
}
