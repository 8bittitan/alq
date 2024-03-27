import { Hono } from 'hono'
import { cors } from 'hono/cors'

import { initServices } from '~/middleware/services'
import { HonoEnv } from '~/server/env'

export const createApp = () => {
  const app = new Hono<HonoEnv>()

  app.use(
    '*',
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    }),
  )

  app.use('*', initServices())

  return app
}

export type App = ReturnType<typeof createApp>
