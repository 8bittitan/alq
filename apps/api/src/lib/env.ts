import { z } from 'zod'

export const envSchema = z.object({
  ENVIRONMENT: z
    .enum(['development', 'production', 'staging'])
    .default('development'),
  ALGOLIA_APP_ID: z.string(),
  ALGOLIA_ADMIN_API_KEY: z.string(),
  ALGOLIA_INDEX_NAME: z.string(),
  TURSO_URL: z.string(),
  TURSO_AUTH_TOKEN: z.string(),
  SENTRY_DNS: z.string().optional(),
})

export type Env = z.infer<typeof envSchema>
