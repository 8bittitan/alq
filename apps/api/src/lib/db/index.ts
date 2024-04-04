import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'

import * as schema from '~/lib/db/schema'
import type { Env } from '~/lib/env'

export function createDb(env: Env) {
  const client = createClient({
    url: env.TURSO_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  })

  return drizzle(client, { schema, logger: env.ENVIRONMENT === 'development' })
}

export type DB = ReturnType<typeof createDb>

export * from '~/lib/db/schema'
