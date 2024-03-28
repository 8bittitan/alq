import { Session, User } from 'lucia'
import { Algolia } from '@alq/algolia'

import { Auth } from '~/lib/auth'
import { DB } from '~/lib/db'
import type { Env } from '~/lib/env'

export type ServiceContext = {
  algolia: Algolia
  auth: Auth
  db: DB
}

export type HonoEnv = {
  Bindings: Env
  Variables: {
    services: ServiceContext
    user: User | null
    session: Session | null
    apikey: string
  }
}
