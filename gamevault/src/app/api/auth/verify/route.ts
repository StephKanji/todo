import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')
  if (!token)
    return NextResponse.redirect(new URL('/auth/signin?error=missing-token', req.url))

  const user = await db.query.users.findFirst({ where: eq(users.verificationToken, token) })
  if (!user || !user.verificationTokenExpiry || user.verificationTokenExpiry < new Date())
    return NextResponse.redirect(new URL('/auth/signin?error=invalid-token', req.url))

  await db.update(users)
    .set({ emailVerified: true, verificationToken: null, verificationTokenExpiry: null })
    .where(eq(users.id, user.id))

  return NextResponse.redirect(new URL('/auth/signin?verified=true', req.url))
}