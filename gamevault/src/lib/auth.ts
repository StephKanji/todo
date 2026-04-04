import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin',
  },
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        try {
          const user = await db.query.users.findFirst({
            where: eq(users.email, credentials.email as string),
          })
          if (!user) return null
          if (!user.emailVerified) throw new Error('Please verify your email first')
          const valid = await bcrypt.compare(credentials.password as string, user.passwordHash)
          if (!valid) return null
          return { id: user.id, name: user.name, email: user.email }
        } catch (err: any) {
          throw new Error(err.message || 'Authentication failed')
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    session({ session, token }) {
      if (token) session.user.id = token.id as string
      return session
    },
  },
})