import { sql } from 'drizzle-orm';
import { int, timestamp, tinyint, varchar } from 'drizzle-orm/mysql-core';
import { mysqlTable } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: int('id').primaryKey().autoincrement(),

  email: varchar('email', { length: 255 }).notNull().unique(),

  passwordHash: varchar('password_hash', { length: 255 }).notNull(),

  fullName: varchar('full_name', { length: 255 }).notNull(),

  avatarUrl: varchar('avatar_url', { length: 500 }),

  role: varchar('role', { length: 50 }).notNull().default('developer'),

  isActive: tinyint('is_active').default(1),

  emailVerified: tinyint('email_verified').default(0),

  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),

  updatedAt: timestamp('updated_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .onUpdateNow(),
});
