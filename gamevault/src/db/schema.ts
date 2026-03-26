import { pgTable, text, timestamp, boolean, integer, uuid, doublePrecision } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id:                     uuid('id').defaultRandom().primaryKey(),
  name:                   text('name').notNull(),
  email:                  text('email').notNull().unique(),
  passwordHash:           text('password_hash').notNull(),
  emailVerified:          boolean('email_verified').default(false),
  verificationToken:      text('verification_token'),
  verificationTokenExpiry:timestamp('verification_token_expiry'),
  createdAt:              timestamp('created_at').defaultNow(),
})

export const products = pgTable('products', {
  id:          uuid('id').defaultRandom().primaryKey(),
  name:        text('name').notNull(),
  description: text('description'),
  price:       doublePrecision('price').notNull(),
  type:        text('type').notNull(),   // 'game' | 'card'
  tag:         text('tag'),              // 'HOT' | 'RARE' | 'NEW' etc
  emoji:       text('emoji'),
  color:       text('color'),
  rating:      doublePrecision('rating').default(0),
  stock:       integer('stock').default(100),
  createdAt:   timestamp('created_at').defaultNow(),
})

export const cartItems = pgTable('cart_items', {
  id:        uuid('id').defaultRandom().primaryKey(),
  userId:    uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  productId: uuid('product_id').references(() => products.id, { onDelete: 'cascade' }),
  quantity:  integer('quantity').default(1),
  createdAt: timestamp('created_at').defaultNow(),
})

export const orders = pgTable('orders', {
  id:        uuid('id').defaultRandom().primaryKey(),
  userId:    uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  total:     doublePrecision('total').notNull(),
  status:    text('status').default('pending'),  // pending | paid | shipped
  createdAt: timestamp('created_at').defaultNow(),
})