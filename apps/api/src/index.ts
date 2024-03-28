import { Env, envSchema } from '~/lib/env'
import { registerV1ApiKeysRoutes } from '~/routes/v1_apikeys'
import { registerV1AuthRoutes } from '~/routes/v1_auth'
import { registerV1BatchRoute } from '~/routes/v1_batch'
import { registerV1EnqueueRoute } from '~/routes/v1_enqueue'
import { createApp } from '~/server/app'

const app = createApp()

registerV1AuthRoutes(app)
registerV1EnqueueRoute(app)
registerV1BatchRoute(app)
registerV1ApiKeysRoutes(app)

app.get('/routes', (c) => {
  const routes = app.routes.map((r) => ({
    method: r.method,
    path: r.path,
  }))

  return c.json(routes)
})

app.post('/endpoint', (c) => {
  return c.json({ message: 'Hello, world!' })
})

export type App = typeof app

const handler = {
  fetch: (req: Request, env: Env, executionCtx: ExecutionContext) => {
    const parsedEnv = envSchema.safeParse(env)

    if (!parsedEnv.success) {
      return Response.json(
        {
          code: 'BAD_ENVIRONMENT',
          message: 'Some environment variables are missing or invalid.',
          errors: parsedEnv.error,
        },
        { status: 500 },
      )
    }

    return app.fetch(req, parsedEnv.data, executionCtx)
  },
} satisfies ExportedHandler<Env>

export default handler
