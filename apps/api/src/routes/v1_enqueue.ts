import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

import type { App } from '~/server/app'

const EnqueueRequest = z.object({
  payload: z.union([z.array(z.any()), z.record(z.unknown())]),
  handler: z.string().url(),
  retries: z.number().default(3),
})

export const registerV1EnqueueRoute = (app: App) => {
  app.post('/v1/enqueue', zValidator('json', EnqueueRequest), async (c) => {
    const data = c.req.valid('json')

    const { algolia } = c.get('services')

    try {
      await algolia.saveObject({
        ...data,
        status: 'queued',
      })
    } catch (err) {
      return c.json({
        success: false,
        error: (err as unknown as Error).message,
      })
    }

    return c.json({
      success: true,
    })
  })
}
