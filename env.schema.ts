import * as Yup from 'yup';

// ----------------------------------------------------------------------

export const envSchema = Yup.object({
  // HOST
  HOST_URL: Yup.string().url().required('HOST_URL is required'),
  // BASIC AUTH
  BASIC_AUTH_USERNAME: Yup.string().required('BASIC_AUTH_USERNAME is required'),
  BASIC_AUTH_PASSWORD: Yup.string().required('BASIC_AUTH_PASSWORD is required'),
  BASIC_AUTH_BYPASS: Yup.string()
    .oneOf(['true', 'false'])
    .default('false')
    .optional(),
});

export const envClientSchema = Yup.object({
  // HOST
  NEXT_PUBLIC_HOST_URL: Yup.string()
    .url()
    .required('NEXT_PUBLIC_HOST_URL is required'),
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
