import { MetadataRoute } from 'next';
import { SITE } from '@/lib/i18n';
import { projects } from '@/lib/data';

// Stable last-modified date. Bump when content meaningfully changes — avoid
// `new Date()`, which falsely signals every page changed on every deploy.
const lastModified = new Date('2026-10-22');

// Core routes exist in English (root) and Indonesian (/id) with hreflang
// alternates so Google serves the right language per searcher.
const routes: { path: string; priority: number }[] = [
  { path: '',             priority: 1.0 },
  { path: '/experience',  priority: 0.9 },
  { path: '/work',        priority: 0.8 },
  { path: '/videography', priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const localized = routes.flatMap(({ path, priority }) => {
    const languages = {
      en: `${SITE}${path}`,
      id: `${SITE}/id${path}`,
    };
    return [
      {
        url: `${SITE}${path}`,
        lastModified,
        changeFrequency: 'weekly' as const,
        priority,
        alternates: { languages },
      },
      {
        url: `${SITE}/id${path}`,
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: Math.max(priority - 0.1, 0.1),
        alternates: { languages },
      },
    ];
  });

  // Per-project case studies (English). Indonesian /id/work/[slug] will join
  // once those pages exist.
  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url:             `${SITE}/work/${project.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority:        0.6,
  }));

  return [...localized, ...projectRoutes];
}
