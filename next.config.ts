import type { NextConfig } from 'next';

import { env, validateEnvClient } from './env.schema';

const nextEnv = {
  NEXT_PUBLIC_HOST_URL: env.HOST_URL,
  NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID: env.SANITY_STUDIO_PROJECT_ID,
  NEXT_PUBLIC_SANITY_STUDIO_DATASET: env.SANITY_STUDIO_DATASET,
  NEXT_PUBLIC_DEFAULT_EMAIL_ADDRESS: env.DEFAULT_EMAIL_ADDRESS,
  NEXT_PUBLIC_DEFAULT_SOCIAL_LINK_GITHUB: env.DEFAULT_SOCIAL_LINK_GITHUB,
  NEXT_PUBLIC_DEFAULT_SOCIAL_LINK_LINKEDIN: env.DEFAULT_SOCIAL_LINK_LINKEDIN,
  NEXT_PUBLIC_DEFAULT_RESUME_URL: env.DEFAULT_RESUME_URL,
};

validateEnvClient(nextEnv);

const nextConfig: NextConfig = {
  /* config options here */
  env: nextEnv,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
