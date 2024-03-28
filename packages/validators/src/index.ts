import { z } from 'zod'

export const AuthSchema = z.object({
  username: z.string().email(),
  password: z.string().min(6),
})

export const UsernameSchema = AuthSchema.pick({ username: true })

const StatusSchema = z.enum(['queued', 'done', 'failed'])

export const JobSchema = z.object({
  objectID: z.string().optional(),
  handler: z.string().url(),
  method: z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']),
  payload: z.record(z.unknown()).optional(),
  retries: z.number().optional().default(3),
  status: StatusSchema.default('queued'),
  apikey: z.string(),
  headers: z.record(z.string()).optional(),
})

export type Job = z.infer<typeof JobSchema>
export type Status = z.infer<typeof StatusSchema>
