import { config } from 'dotenv'
config({ path: '.env.local' })

// Force direct connection for seeding
process.env.DATABASE_URL = process.env.DIRECT_URL!

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'
import { products } from './schema'

const client = postgres(process.env.DIRECT_URL!, { ssl: 'require', max: 1 })
const db = drizzle(client, { schema })

const PRODUCTS = [
  { name:'Cyber Legends',    type:'game', price:29.99, rating:4.8, tag:'HOT',    emoji:'🎮', color:'#ff6b35', description:'An epic RPG set in a neon-drenched dystopia. 100+ hours of gameplay.', stock:100 },
  { name:'Dragon Holo Rare', type:'card', price:49.99, rating:4.9, tag:'RARE',   emoji:'🐉', color:'#a855f7', description:'Holographic foil dragon card. Limited to 500 prints worldwide.', stock:50 },
  { name:'Galaxy Shooter',   type:'game', price:19.99, rating:4.5, tag:'NEW',    emoji:'🚀', color:'#06b6d4', description:'Bullet-hell space shooter with procedural galaxies and 4-player co-op.', stock:100 },
  { name:'Phoenix Strike',   type:'card', price:24.99, rating:4.7, tag:'EPIC',   emoji:'🔥', color:'#f59e0b', description:'Epic-tier fire card with animated border. Part of the Blazing Series.', stock:75 },
  { name:'Shadow Realm',     type:'game', price:34.99, rating:4.6, tag:'TOP',    emoji:'🌑', color:'#8b5cf6', description:'Atmospheric horror-adventure with dynamic shadow mechanics.', stock:100 },
  { name:'Void Titan',       type:'card', price:79.99, rating:5.0, tag:'LEGEND', emoji:'⚡', color:'#10b981', description:'Legendary-tier card. Only 100 ever made. Museum-quality print.', stock:12 },
  { name:'Pixel Quest',      type:'game', price:14.99, rating:4.3, tag:'INDIE',  emoji:'👾', color:'#ec4899', description:'Charming pixel-art platformer with 8 worlds and a chiptune soundtrack.', stock:100 },
  { name:'Storm Archer',     type:'card', price:34.99, rating:4.8, tag:'NEW',    emoji:'🏹', color:'#3b82f6', description:'Rare archer card with lightning strike effect. Foil stamped.', stock:60 },
]

async function seed() {
  console.log('🌱 Seeding products...')
  await db.insert(products).values(PRODUCTS)
  console.log(`✅ Inserted ${PRODUCTS.length} products`)
  await client.end()
  process.exit(0)
}

seed().catch(async e => {
  console.error('❌ Seed failed:', e.message)
  await client.end()
  process.exit(1)
})