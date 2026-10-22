import { MetadataRoute } from 'next';
import { projects } from '@/lib/data';

const SITE = 'https://www.adibwafi.com';

// Stable last-modified date. Bump when content meaningfully changes — avoid
// `new Date()`, which falsely signals every page changed on every deploy.
const lastModified = new Date('2026-10-22');

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE,                 lastModified, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE}/experience`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE}/work`,       lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE}/videography`,lastModified, changeFrequency: 'weekly', priority: 0.7 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url:             `${SITE}/work/${project.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority:        0.6,
  }));

  return [...staticRoutes, ...projectRoutes];
}
