import { zValidator } from '@hono/zod-validator'
import { JobSchema } from '@alq/validators'

import { withApiKey } from '~/middleware/with_apikey'
import type { App } from '~/server/app'

export const registerV1EnqueueRoute = (app: App) => {
  app.post(
    '/v1/enqueue',
    withApiKey(),
    zValidator('json', JobSchema),
    async (c) => {
      const data = c.req.valid('json')

      const { algolia } = c.get('services')

      try {
        await algolia.queueJob({
          ...data,
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
    },
  )
}
