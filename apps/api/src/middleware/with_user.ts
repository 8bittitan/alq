import type { MiddlewareHandler } from 'hono'

// import { getCookie } from 'hono/cookie'

import type { HonoEnv } from '~/server/env'

export function withUser(): MiddlewareHandler<HonoEnv> {
  return async (c, next) => {
    const { auth } = c.get('services')

    const authorizationHeader = c.req.header('Authorization') ?? ''

    const sessionId = auth.readBearerToken(authorizationHeader)

    if (!sessionId) {
      c.set('user', null)
      c.set('session', null)

      return next()
    }

    const { session, user } = await auth.validateSession(sessionId)

    if (session && session.fresh) {
      c.header('Set-Cookie', auth.createSessionCookie(session.id).serialize(), {
        append: true,
      })
    }
    if (!session) {
      c.header('Set-Cookie', auth.createBlankSessionCookie().serialize(), {
        append: true,
      })
    }
    c.set('user', user)
    c.set('session', session)
    return next()
  }
}
