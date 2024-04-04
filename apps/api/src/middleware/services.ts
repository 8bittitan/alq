import type { MiddlewareHandler } from 'hono'
import { Algolia } from '@alq/algolia'

import { createAuth } from '~/lib/auth'
import { createDb } from '~/lib/db'
import type { HonoEnv } from '~/server/env'

export function initServices(): MiddlewareHandler<HonoEnv> {
  return async (c, next) => {
    const algolia = new Algolia({
      apiKey: c.env.ALGOLIA_ADMIN_API_KEY,
      appId: c.env.ALGOLIA_APP_ID,
      indexName: c.env.ALGOLIA_INDEX_NAME,
    })

    const db = createDb(c.env)
    const auth = createAuth(db)

    c.set('services', {
      algolia,
      auth,
      db,
    })

    await next()
  }
}
