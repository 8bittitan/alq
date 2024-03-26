import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle'
import { Lucia } from 'lucia'

import { DB, session, user, User } from '~/lib/db'
import { Env } from '~/lib/env'

export function createAuth(env: Env, db: DB) {
  const adapter = new DrizzleSQLiteAdapter(db, session, user)

  const auth = new Lucia(adapter, {
    sessionCookie: {
      attributes: {
        secure: env.ENVIRONMENT === 'production',
      },
    },
    getUserAttributes(databaseUserAttributes) {
      return {
        username: databaseUserAttributes.username,
      }
    },
  })

  return auth
}

export type Auth = ReturnType<typeof createAuth>

declare module 'lucia' {
  interface Register {
    Lucia: Auth
    DatabaseUserAttributes: User
  }
}
