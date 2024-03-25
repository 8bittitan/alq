import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { JobSchema } from '@alq/validators'

import { App } from '~/server/app'

const BatchRequest = z.array(JobSchema)

export const registerV1BatchRoute = (app: App) => {
  app.post('/v1/batch', zValidator('json', BatchRequest), async (c) => {
    return c.json({
      success: false,
      error: 'Not implemented yet',
    })
  })
}
