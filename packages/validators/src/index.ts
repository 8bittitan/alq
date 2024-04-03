import { z } from 'zod'

export const AuthSchema = z.object({
  username: z.string().email({
    message: 'Invalid email address',
  }),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
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

export type Job = z.output<typeof JobSchema>
export type Status = z.output<typeof StatusSchema>
