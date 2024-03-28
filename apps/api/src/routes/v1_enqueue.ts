import { zValidator } from '@hono/zod-validator'
import { JobSchema } from '@alq/validators'

import { withApiKey } from '~/middleware/with_apikey'
import type { App } from '~/server/app'

export const registerV1EnqueueRoute = (app: App) => {
  app.post(
    '/v1/enqueue',
    withApiKey(),
    zValidator('json', JobSchema.omit({ apikey: true })),
    async (c) => {
      const data = c.req.valid('json')
      const apikey = c.get('apikey')

      const { algolia } = c.get('services')

      try {
        await algolia.queueJob({
          ...data,
          apikey,
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
