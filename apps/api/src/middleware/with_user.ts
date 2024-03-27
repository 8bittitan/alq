import { MiddlewareHandler } from 'hono'

// import { getCookie } from 'hono/cookie'

import { HonoEnv } from '~/server/env'

export function withUser(): MiddlewareHandler<HonoEnv> {
  return async (c, next) => {
    const { auth } = c.get('services')

    const [bearer, sessionId] = c.req.header('Authorization')?.split(' ') ?? []

    if (!sessionId || !bearer || bearer !== 'Bearer') {
      c.set('user', null)

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
    return next()
  }
}
