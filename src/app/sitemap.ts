import { type MetadataRoute } from 'next';

// constants
import { BASE_URL } from '@/constants/meta';

// ----------------------------------------------------------------------

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ];
}
