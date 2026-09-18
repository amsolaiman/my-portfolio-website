/**
 * Derives environment from current context.
 *
 * @returns Environment string: 'DEV', 'UAT', or 'PROD'
 */
export const getEnvironment = (): 'DEV' | 'UAT' | 'PROD' => {
  if (process.env.VERCEL_ENV === 'production') {
    return 'PROD';
  }

  // All non-production Vercel deployments report VERCEL_ENV as 'preview',
  // so the branch name is required to distinguish UAT from DEV/other branches
  if (process.env.VERCEL_ENV === 'preview') {
    return process.env.VERCEL_GIT_COMMIT_REF === 'uat' ? 'UAT' : 'DEV';
  }

  if (process.env.VERCEL_ENV === 'development') {
    return 'DEV';
  }

  if (process.env.NODE_ENV === 'production') {
    return 'PROD';
  }

  // All other cases (including NODE_ENV === 'test' and local dev) default to DEV
  return 'DEV';
};
