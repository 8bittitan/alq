import type { MiddlewareHandler } from 'hono'

import { Algolia } from '~/lib/algolia'
import { HonoEnv } from '~/server/env'

export function initServices(): MiddlewareHandler<HonoEnv> {
  return async (c, next) => {
    const algolia = new Algolia({
      apiKey: c.env.ALGOLIA_ADMIN_API_KEY,
      appId: c.env.ALGOLIA_APP_ID,
      indexName: c.env.ALGOLIA_INDEX_NAME,
    })

    c.set('services', {
      algolia,
    })

    await next()
  }
}
