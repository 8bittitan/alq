import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

import { App } from '~/server/app'

const BatchRequest = z.array(
  z.object({
    handler: z.string().url(),
    payload: z.union([z.array(z.any()), z.object({})]),
  }),
)

export const registerV1BatchRoute = (app: App) => {
  app.post('/v1/batch', zValidator('json', BatchRequest), async (c) => {
    return c.json({
      success: false,
      error: 'Not implemented yet',
    })
  })
}
