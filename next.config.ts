import type { NextConfig } from 'next';

import { env, validateEnvClient } from './env.schema';

const nextEnv = {
  NEXT_PUBLIC_HOST_URL: env.HOST_URL,
};

validateEnvClient(nextEnv);

const nextConfig: NextConfig = {
  /* config options here */
  env: nextEnv,
};

export default nextConfig;
