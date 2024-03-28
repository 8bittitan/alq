import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { JobSchema } from '@alq/validators'

import { App } from '~/server/app'

const BatchRequest = z.array(JobSchema)

export const registerV1BatchRoute = (app: App) => {
  app.post('/v1/batch', zValidator('json', BatchRequest), async (c) => {
    const { algolia } = c.get('services')

    try {
      const jobs = c.req.valid('json')

      const queuedJobs = await algolia.queueJobs(jobs)

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
  })
}
