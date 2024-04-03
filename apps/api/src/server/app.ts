import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { sentry } from '@hono/sentry'

import { initServices } from '~/middleware/services'
import { HonoEnv } from '~/server/env'

export const createApp = () => {
  const app = new Hono<HonoEnv>()

  app.use('*', sentry())

  app.use('*', cors())

  app.use('*', initServices())

  app.onError((e, c) => {
    const s = c.get('sentry')

    s.captureException(e)

    return c.json(
      {
        message: 'Internal Server Error',
        error: e.message,
        cause: e.cause,
      },
      500,
    )
  })

  return app
}

export type App = ReturnType<typeof createApp>
