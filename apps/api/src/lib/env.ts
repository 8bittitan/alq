import { z } from 'zod'

export const envSchema = z.object({
  ENVIRONMENT: z
    .enum(['development', 'production', 'preview'])
    .default('development'),
  ALGOLIA_APP_ID: z.string(),
  ALGOLIA_ADMIN_API_KEY: z.string(),
  ALGOLIA_INDEX_NAME: z.string(),
})

export type Env = z.infer<typeof envSchema>
