import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { JobSchema } from '@alq/validators'

import { withApiKey } from '~/middleware/with_apikey'
import type { App } from '~/server/app'

const BatchRequest = z.array(JobSchema.omit({ apikey: true }))

export const registerV1BatchRoute = (app: App) => {
  app.post(
    '/v1/batch',
    withApiKey(),
    zValidator('json', BatchRequest),
    async (c) => {
      const { algolia } = c.get('services')
      const apikey = c.get('apikey')

      try {
        const jobs = c.req.valid('json')

        const queuedJobs = await algolia.queueJobs(
          jobs.map((j) => ({ ...j, apikey })),
        )

        return c.json({
          success: true,
          jobs: queuedJobs,
        })
      } catch (err) {
        const error = err as unknown as Error

        return c.json({
          success: false,
          error: error.message,
        })
      }
    },
  )
}
