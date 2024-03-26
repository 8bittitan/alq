import { generateId, Scrypt } from 'lucia'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

import { generateApiKey } from '~/lib/api_key'
import { user } from '~/lib/db'
import { withUser } from '~/middleware/with_user'
import { App } from '~/server/app'

const AuthRequestSchema = z.object({
  username: z.string(),
  password: z.string(),
})

export function registerV1AuthRoutes(app: App) {
  app.post('/v1/register', zValidator('json', AuthRequestSchema), async (c) => {
    const { auth, db } = c.get('services')

    const { username, password } = c.req.valid('json')

    const userId = generateId(15)
    const hashedPassword = await new Scrypt().hash(password)
    const apiKey = generateApiKey()

    await db.insert(user).values({
      id: userId,
      username: username.toLowerCase(),
      hashedPassword,
      apiKey,
    })

    const session = await auth.createSession(userId, {})
    const sessionCookie = auth.createSessionCookie(session.id)

    c.header('Set-Cookie', sessionCookie.serialize(), {
      append: true,
    })

    return c.json(
      {
        user: {
          username,
        },
      },
      201,
    )
  })

  app.post('/v1/login', zValidator('json', AuthRequestSchema), async (c) => {
    const { auth, db } = c.get('services')

    const { username, password } = c.req.valid('json')

    const existingUser = await db.query.user.findFirst({
      where(fields, operators) {
        return operators.eq(fields.username, username.toLowerCase())
      },
    })

    if (!existingUser) {
      return c.json(
        {
          success: false,
          user: null,
        },
        422,
      )
    }

    const validPassword = await new Scrypt().verify(
      existingUser.hashedPassword ?? '',
      password,
    )

    if (!validPassword) {
      return c.json(
        {
          success: false,
          user: null,
        },
        422,
      )
    }

    const session = await auth.createSession(existingUser.id, {})
    const sessionCookie = auth.createSessionCookie(session.id)

    c.header('Set-Cookie', sessionCookie.serialize(), {
      append: true,
    })

    return c.json({
      user: {
        username,
      },
    })
  })

  app.get('/v1/user', withUser(), async (c) => {
    const user = c.get('user')

    if (!user) {
      return c.json(
        {
          user: null,
        },
        403,
      )
    }

    return c.json({
      user,
    })
  })
}
