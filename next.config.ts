import type { NextConfig } from 'next';

import { env, validateEnvClient } from './env.schema';

const nextEnv = {
  NEXT_PUBLIC_HOST_URL: env.HOST_URL,
  NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID: env.SANITY_STUDIO_PROJECT_ID,
  NEXT_PUBLIC_SANITY_STUDIO_DATASET: env.SANITY_STUDIO_DATASET,
};

validateEnvClient(nextEnv);

const nextConfig: NextConfig = {
  /* config options here */
  env: nextEnv,
};

export default nextConfig;
