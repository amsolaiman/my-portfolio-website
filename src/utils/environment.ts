/**
 * Derives environment from current context.
 *
 * @returns Environment string: 'DEV' or 'PROD'
 */
export const getEnvironment = (): 'DEV' | 'PROD' => {
  if (process.env.VERCEL_ENV === 'production') {
    return 'PROD';
  }

  if (process.env.NODE_ENV === 'production') {
    return 'PROD';
  }

  // Covers Vercel preview/development deployments, local dev, and test runs
  return 'DEV';
};
