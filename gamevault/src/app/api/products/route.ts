import { NextResponse } from 'next/server'
import { db } from '@/db'

export async function GET() {
    try {
        const products = await db.query.products.findMany({
            orderBy: (p, { desc }) => [desc(p.createdAt)],
        })
        return NextResponse.json(products)
    } catch (err) {
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
    }
}