import { sql } from 'drizzle-orm';
import { int, timestamp, tinyint, varchar } from 'drizzle-orm/mysql-core';
import { mysqlTable } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: int('id').primaryKey().autoincrement(),

  email: varchar('email', { length: 255 }).notNull().unique(),

  password_hash: varchar('password_hash', { length: 255 }).notNull(),

  full_name: varchar('full_name', { length: 255 }).notNull(),

  avatar_url: varchar('avatar_url', { length: 500 }),

  role: varchar('role', { length: 50 }).notNull().default('developer'),

  is_active: tinyint('is_active').default(1),

  email_verified: tinyint('email_verified').default(0),

  created_at: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),

  updated_at: timestamp('updated_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .onUpdateNow(),
});
