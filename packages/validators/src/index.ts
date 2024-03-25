import { z } from 'zod'

const StatusSchema = z.enum(['queued', 'done', 'failed'])

export const JobSchema = z.object({
  objectID: z.string().optional(),
  handler: z.string().url(),
  method: z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']),
  payload: z.record(z.unknown()).optional(),
  retries: z.number().optional().default(3),
  status: StatusSchema.default('queued'),
})

export type Job = z.infer<typeof JobSchema>
export type Status = z.infer<typeof StatusSchema>
