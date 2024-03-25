import { Algolia } from '@alq/algolia'

import type { Env } from '~/lib/env'

export type ServiceContext = {
  algolia: Algolia
}

export type HonoEnv = {
  Bindings: Env
  Variables: {
    services: ServiceContext
  }
}
