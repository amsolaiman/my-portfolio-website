import { type MetadataRoute } from 'next';

// constants
import { BASE_URL } from '@/constants/meta';
import { PATHS } from '@/constants/paths';
// utils
import { getEnvironment } from '@/utils/environment';

// ----------------------------------------------------------------------

export default function robots(): MetadataRoute.Robots {
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
    rules: [
      {
        userAgent: '*',
        allow: PATHS.root,
        disallow: [PATHS.studio.root, PATHS.api.root],
      },
      {
        userAgent: 'Googlebot-Image',
        disallow: PATHS.root,
      },
    ],
    sitemap: BASE_URL ? `${BASE_URL}/sitemap.xml` : undefined,
  };
}
