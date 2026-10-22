import { MetadataRoute } from 'next';

// Stable last-modified date for all routes. Bump this when page content
// meaningfully changes — do NOT use `new Date()`, which would tell crawlers
// every page changed on every deploy (a false freshness signal).
const lastModified = new Date('2026-10-22');

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url:             'https://www.adibwafi.com',
      lastModified,
      changeFrequency: 'weekly',
      priority:        1.0,
    },
    {
      url:             'https://www.adibwafi.com/experience',
      lastModified,
      changeFrequency: 'weekly',
      priority:        0.9,
    },
    {
      url:             'https://www.adibwafi.com/work',
      lastModified,
      changeFrequency: 'weekly',
      priority:        0.8,
    },
    {
      url:             'https://www.adibwafi.com/videography',
      lastModified,
      changeFrequency: 'weekly',
      priority:        0.7,
    },
  ];
}
