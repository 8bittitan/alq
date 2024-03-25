import { zValidator } from '@hono/zod-validator'
import { JobSchema } from '@alq/validators'

import type { App } from '~/server/app'

export const registerV1EnqueueRoute = (app: App) => {
  app.post('/v1/enqueue', zValidator('json', JobSchema), async (c) => {
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
