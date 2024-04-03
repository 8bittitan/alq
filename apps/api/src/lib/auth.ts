import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle'
import { Lucia } from 'lucia'

import { DB, session, user, User } from '~/lib/db'

export function createAuth(db: DB) {
  const adapter = new DrizzleSQLiteAdapter(db, session, user)

  const auth = new Lucia(adapter, {
    getUserAttributes(databaseUserAttributes) {
      return {
        username: databaseUserAttributes.username,
        apiKey: databaseUserAttributes.apiKey,
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
