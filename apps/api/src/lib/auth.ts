import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle'
import { Lucia } from 'lucia'

import type { DB, User } from '~/lib/db'
import { session, user } from '~/lib/db'

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
