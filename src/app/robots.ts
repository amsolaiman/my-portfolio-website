import type { MetadataRoute } from 'next';

// constants
import { PATHS } from '@/constants/paths';

// ----------------------------------------------------------------------

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

  // Block all crawlers in non-production environments
  if (process.env.NODE_ENV !== 'production') {
    return {
      rules: {
        userAgent: '*',
        disallow: PATHS.root,
      },
    };
  }

  return {
    rules: {
      userAgent: '*',
      allow: PATHS.root,
      disallow: [PATHS.studio, PATHS.api.root],
    },
    sitemap: baseUrl ? `${baseUrl}/sitemap.xml` : undefined,
  };
}
