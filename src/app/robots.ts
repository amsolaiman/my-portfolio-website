import type { MetadataRoute } from 'next';

// constants
import { PATHS } from '@/constants/paths';
// utils
import { getEnvironment } from '@/utils/environment';

// ----------------------------------------------------------------------

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

  const isProduction = getEnvironment() === 'PROD';

  // Block all crawlers in non-production environments
  if (!isProduction) {
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
