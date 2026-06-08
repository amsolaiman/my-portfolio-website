import * as Yup from 'yup';

// ----------------------------------------------------------------------

const isValidDomain = (url: string, expectedDomains: string[]) => {
  try {
    const { hostname } = new URL(url);

    return expectedDomains.some(
      (domain) => hostname === domain || hostname.endsWith(`.${domain}`)
    );
  } catch {
    return false;
  }
};

// ----------------------------------------------------------------------

export const envSchema = Yup.object({
  // WEBSITE
  BASE_URL: Yup.string().url().required('BASE_URL is required'),
  REVALIDATION_SECRET: Yup.string()
    .required('REVALIDATION_SECRET is required')
    .min(128, 'REVALIDATION_SECRET must be a 64-byte hex string')
    .matches(/^[a-f0-9]+$/, 'REVALIDATION_SECRET must be a valid hex string'),
  // BASIC AUTH
  BASIC_AUTH_USERNAME: Yup.string().required('BASIC_AUTH_USERNAME is required'),
  BASIC_AUTH_PASSWORD: Yup.string().required('BASIC_AUTH_PASSWORD is required'),
  BASIC_AUTH_BYPASS: Yup.string()
    .oneOf(['true', 'false'])
    .default('false')
    .optional(),
  // SANITY.IO
  SANITY_STUDIO_PROJECT_ID: Yup.string().required(
    'SANITY_STUDIO_PROJECT_ID is required'
  ),
  SANITY_STUDIO_DATASET: Yup.string().required(
    'SANITY_STUDIO_DATASET is required'
  ),
  // CONTENT
  DEFAULT_EMAIL_ADDRESS: Yup.string()
    .email()
    .required('DEFAULT_EMAIL_ADDRESS is required'),
  DEFAULT_SOCIAL_LINK_GITHUB: Yup.string()
    .url()
    .test(
      'is-github-url',
      'DEFAULT_SOCIAL_LINK_GITHUB must be a valid GitHub URL',
      (value) => !value || isValidDomain(value, ['github.com'])
    )
    .required('DEFAULT_SOCIAL_LINK_GITHUB is required'),
  DEFAULT_SOCIAL_LINK_LINKEDIN: Yup.string()
    .url()
    .test(
      'is-linkedin-url',
      'DEFAULT_SOCIAL_LINK_LINKEDIN must be a valid LinkedIn URL',
      (value) => !value || isValidDomain(value, ['linkedin.com'])
    )
    .required('DEFAULT_SOCIAL_LINK_LINKEDIN is required'),
  DEFAULT_RESUME_URL: Yup.string()
    .url()
    .required('DEFAULT_RESUME_URL is required'),
});

export const envClientSchema = Yup.object({
  // WEBSITE
  NEXT_PUBLIC_BASE_URL: Yup.string()
    .url()
    .required('NEXT_PUBLIC_BASE_URL is required'),
  // SANITY.IO
  NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID: Yup.string().required(
    'NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID is required'
  ),
  NEXT_PUBLIC_SANITY_STUDIO_DATASET: Yup.string().required(
    'NEXT_PUBLIC_SANITY_STUDIO_DATASET is required'
  ),
  // CONTENT
  NEXT_PUBLIC_DEFAULT_EMAIL_ADDRESS: Yup.string()
    .email()
    .required('NEXT_PUBLIC_DEFAULT_EMAIL_ADDRESS is required'),
  NEXT_PUBLIC_DEFAULT_SOCIAL_LINK_GITHUB: Yup.string()
    .url()
    .test(
      'is-github-url',
      'NEXT_PUBLIC_DEFAULT_SOCIAL_LINK_GITHUB must be a valid GitHub URL',
      (value) => !value || isValidDomain(value, ['github.com'])
    )
    .required('NEXT_PUBLIC_DEFAULT_SOCIAL_LINK_GITHUB is required'),
  NEXT_PUBLIC_DEFAULT_SOCIAL_LINK_LINKEDIN: Yup.string()
    .url()
    .test(
      'is-linkedin-url',
      'NEXT_PUBLIC_DEFAULT_SOCIAL_LINK_LINKEDIN must be a valid LinkedIn URL',
      (value) => !value || isValidDomain(value, ['linkedin.com'])
    )
    .required('NEXT_PUBLIC_DEFAULT_SOCIAL_LINK_LINKEDIN is required'),
  NEXT_PUBLIC_DEFAULT_RESUME_URL: Yup.string()
    .url()
    .required('NEXT_PUBLIC_DEFAULT_RESUME_URL is required'),
});

export type EnvSchemaType = Yup.InferType<typeof envSchema>;

export type EnvClientSchemaType = Yup.InferType<typeof envClientSchema>;

// ----------------------------------------------------------------------

export const validateEnv = (): EnvSchemaType => {
  try {
    return envSchema.validateSync(process.env, {
      abortEarly: false,
    }) as EnvSchemaType;
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      throw new Error(
        `Environment variable validation failed:\n● ${error.errors.join('\n● ')}`
      );
    }
    throw error;
  }
};

export const validateEnvClient = (
  env: Record<string, string>
): EnvClientSchemaType => {
  return envClientSchema.validateSync(env, { abortEarly: false });
};

export const env = validateEnv();
