import { withUser } from '~/middleware/with_user'
import { App } from '~/server/app'

export function registerV1JobsRoutes(app: App) {
  app.get('/v1/jobs', withUser(), async (c) => {
    const { algolia, db } = c.get('services')
    const user = c.get('user')

    if (!user) {
      return c.json({ jobs: [] })
    }

    const u = await db.query.user.findFirst({
      where(fields, { eq }) {
        return eq(fields.id, user.id)
      },
    })

    if (!u) {
      return c.json({ jobs: [] })
    }

    const jobs = await algolia.jobsByApiKey(u.apiKey)

    return c.json({ jobs })
  })
}
