import { MiddlewareHandler } from 'hono'

import { HonoEnv } from '~/server/env'

export function withApiKey(): MiddlewareHandler<HonoEnv> {
  return async (c, next) => {
    const { db } = c.get('services')

    const apiKey = c.req.header('X-API-Key') || c.req.header('x-api-key') || ''

    if (!apiKey) {
      return c.json(
        {
          success: false,
        },
        403,
      )
    }

    const dbApikey = await db.query.user.findFirst({
      where(fields, operators) {
        return operators.eq(fields.apiKey, apiKey)
      },
    })

    if (!dbApikey) {
      return c.json(
        {
          success: false,
        },
        403,
      )
    }

    await next()
  }
}
