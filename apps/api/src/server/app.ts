import { Hono } from 'hono'

import { initServices } from '~/middleware/services'
import { HonoEnv } from '~/server/env'

export const createApp = () => {
  const app = new Hono<HonoEnv>()

  app.use('*', initServices())

  return app
}

export type App = ReturnType<typeof createApp>
