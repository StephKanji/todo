import {
    pgTable,
    serial,
    integer,
    varchar,
    boolean,
    timestamp,
    text,
} from "drizzle-orm/pg-core";


// USERS TABLE
export const users = pgTable("users", {
    // Primary Key
    id: serial("id").primaryKey(),
    // Email - must be unique
    email: varchar("email", { length: 255 }).notNull().unique(),
    // Password (hashed) - never store plain passwords!
    passwordHash: text("password_hash").notNull(),
    title: text("title").notNull(),
    //username
    name: varchar("name", { length: 255 }).notNull(),
    // When user signed up
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// TODOS TABLE
export const todos = pgTable("todos", {
    // Primary Key
    id: serial("id").primaryKey(),

    // Foreign Key - links to users table
    userId: integer("user_id")
        .notNull()
        // if a user is deleted, all their todos are automatically deleted
        .references(() => users.id, { onDelete: "cascade" }),

    // Todo text
    title: varchar("title", { length: 500 }).notNull(),

    //description
    description: text("description").default(""),

    // Completion status
    completed: boolean("completed").notNull().default(false),

    // For drag-and-drop ordering
    position: integer("position").notNull().default(0),

});

// TypeScript types for use in your app
export type User = typeof users.$inferSelect;      // What you get when reading
export type NewUser = typeof users.$inferInsert;   // What you send when creating

export type Todo = typeof todos.$inferSelect;
export type NewTodo = typeof todos.$inferInsert;
