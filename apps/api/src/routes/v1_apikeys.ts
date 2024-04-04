import { eq } from 'drizzle-orm'

import { generateApiKey } from '~/lib/api_key'
import { user as userTable } from '~/lib/db'
import { withUser } from '~/middleware/with_user'
import type { App } from '~/server/app'

export function registerV1ApiKeysRoutes(app: App) {
  app.get('/v1/apikeys', withUser(), async (c) => {
    const user = c.get('user')
    const { db } = c.get('services')

    if (!user) {
      return c.json(
        {
          error: 'Unauthorized',
        },
        401,
      )
    }

    const apikey = await db.query.user.findFirst({
      where(fields, { eq }) {
        return eq(fields.id, user.id)
      },
    })

    return c.json({
      apikey: apikey?.apiKey,
    })
  })

  app.put('/v1/apikeys', withUser(), async (c) => {
    const user = c.get('user')
    const { db } = c.get('services')

    if (!user) {
      return c.json(
        {
          error: 'Unauthorized',
        },
        401,
      )
    }

    const apikey = await db.query.user.findFirst({
      where(fields, { eq }) {
        return eq(fields.id, user.id)
      },
    })

    if (!apikey) {
      return c.json(
        {
          error: 'User not found',
        },
        404,
      )
    }

    const newApiKey = generateApiKey()

    try {
      await db
        .update(userTable)
        .set({
          apiKey: newApiKey,
        })
        .where(eq(userTable.id, user.id))

      return c.json({
        apikey: newApiKey,
      })
    } catch (err) {
      return c.json(
        {
          error: 'Failed to update api key',
        },
        500,
      )
    }
  })
}
