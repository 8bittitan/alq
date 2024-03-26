import { InferSelectModel } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const user = sqliteTable('user', {
  id: text('id').notNull().primaryKey(),
  username: text('username').notNull().unique(),
  hashedPassword: text('hashed_password'),
  apiKey: text('api_key').notNull(),
})

export const session = sqliteTable('session', {
  id: text('id').notNull().primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  expiresAt: integer('expires_at').notNull(),
})

export type User = InferSelectModel<typeof user>
