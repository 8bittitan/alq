import { eq } from 'drizzle-orm'
import { generateId, Scrypt } from 'lucia'
import { zValidator } from '@hono/zod-validator'
import { AuthSchema } from '@alq/validators'

import { generateApiKey } from '~/lib/api_key'
import { user as userTable } from '~/lib/db'
import { withUser } from '~/middleware/with_user'
import { App } from '~/server/app'

export function registerV1AuthRoutes(app: App) {
  app.post('/v1/register', zValidator('json', AuthSchema), async (c) => {
    const { auth, db } = c.get('services')

    const { username, password } = c.req.valid('json')

    const userId = generateId(15)
    const hashedPassword = await new Scrypt().hash(password)
    const apiKey = generateApiKey()

    try {
      await db.insert(userTable).values({
        id: userId,
        username: username.toLowerCase(),
        hashedPassword,
        apiKey,
      })
    } catch (err) {
      console.error(err)
      return c.json(
        {
          success: false,
          user: null,
          error: 'Please try a different username.',
        },
        422,
      )
    }

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

  app.post('/v1/login', zValidator('json', AuthSchema), async (c) => {
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

  app.put(
    '/v1/user',
    withUser(),
    zValidator('json', AuthSchema.pick({ username: true })),
    async (c) => {
      const user = c.get('user')

      if (!user) {
        return c.json(
          {
            success: false,
          },
          403,
        )
      }

      const { db } = c.get('services')

      const { username } = c.req.valid('json')

      try {
        await db
          .update(userTable)
          .set({ username: username.toLowerCase() })
          .where(eq(userTable.id, user.id))
      } catch (err) {
        console.error(err)
        return c.json(
          {
            success: false,
          },
          422,
        )
      }

      return c.json({
        success: true,
      })
    },
  )

  app.post('/v1/logout', withUser(), async (c) => {
    const session = c.get('session')
    const { auth } = c.get('services')

    if (!session) {
      return c.json(
        {
          success: false,
        },
        403,
      )
    }

    await auth.invalidateSession(session.id)

    const sessionCookie = auth.createBlankSessionCookie()

    c.header('Set-Cookie', sessionCookie.serialize(), {
      append: true,
    })

    return c.json({
      success: true,
    })
  })

  app.delete('/v1/user', withUser(), async (c) => {
    const user = c.get('user')
    const session = c.get('session')

    if (!user || !session) {
      return c.json(
        {
          success: false,
        },
        403,
      )
    }

    const { db, auth } = c.get('services')

    // [TODO) Delete currently queued jobs
    try {
      await auth.invalidateUserSessions(user.id)
      await db.delete(userTable).where(eq(userTable.id, user.id))

      const sessionCookie = auth.createBlankSessionCookie()

      c.header('Set-Cookie', sessionCookie.serialize(), {
        append: true,
      })

      return c.json({
        success: true,
      })
    } catch (err) {
      console.error(err)
      return c.json(
        {
          success: false,
        },
        500,
      )
    }
  })
}
