import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

config({
  path: '.dev.vars',
})

export default defineConfig({
  driver: 'turso',
  dbCredentials: {
    url: process.env.TURSO_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
  schema: './src/lib/db/schema.ts',
})
