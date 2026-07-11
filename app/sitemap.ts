import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url:             'https://www.adibwafi.com',
      lastModified:    new Date(),
      changeFrequency: 'monthly',
      priority:        1.0,
    },
    {
      url:             'https://www.adibwafi.com/experience',
      lastModified:    new Date(),
      changeFrequency: 'monthly',
      priority:        0.9,
    },
    {
      url:             'https://www.adibwafi.com/work',
      lastModified:    new Date(),
      changeFrequency: 'monthly',
      priority:        0.8,
    },
  ];
}
