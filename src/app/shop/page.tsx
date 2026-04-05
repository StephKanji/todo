'use client'
import { useEffect, useState } from 'react'
import { useCart } from '@/lib/store'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ShoppingCart, Star, Filter } from 'lucide-react'
import type { Product } from '@/types'

const TAG_COLORS: Record<string, string> = {
  HOT: '#ff6b35', RARE: '#a855f7', NEW: '#10b981',
  EPIC: '#f59e0b', TOP: '#8b5cf6', LEGEND: '#00f5d4',
  INDIE: '#ec4899',
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filter, setFilter] = useState<'all' | 'game' | 'card'>('all')
  const [loading, setLoading] = useState(true)
  const [added, setAdded] = useState<string | null>(null)
  const { data: session } = useSession()
  const router = useRouter()
  const addItem = useCart(s => s.addItem)

  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(d => { setProducts(d); setLoading(false) })
  }, [])

  const filtered = products.filter(p => filter === 'all' || p.type === filter)

  const handleAdd = (p: Product) => {
    if (!session) { router.push('/auth/signin'); return }
    addItem({ id: p.id, name: p.name, price: p.price, emoji: p.emoji || '🎮', color: p.color || '#00f5d4', qty: 1 })
    setAdded(p.id)
    setTimeout(() => setAdded(null), 1500)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#06030f', paddingTop: 88, paddingBottom: 80 }}>
      {/* Bg glow */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(123,47,247,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ marginBottom: 40, textAlign: 'center' }}>
          <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 12, color: '#00f5d4', letterSpacing: 4, marginBottom: 10 }}>▸ GAMEVAULT STORE</div>
          <h1 style={{ fontFamily: 'Orbitron, monospace', fontSize: 'clamp(28px,5vw,48px)', fontWeight: 900, color: '#fff', marginBottom: 12 }}>
            THE <span style={{ color: '#00f5d4' }}>VAULT</span>
          </h1>
          <p style={{ color: '#475569', fontSize: 15 }}>{products.length} items available — games, cards, and rare drops</p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 40, flexWrap: 'wrap' }}>
          {(['all', 'game', 'card'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: '9px 24px', borderRadius: 100, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13, letterSpacing: 1,
              background: filter === f ? 'linear-gradient(135deg,#7b2ff7,#00f5d4)' : 'rgba(255,255,255,0.05)',
              color: filter === f ? '#fff' : '#64748b',
              transition: 'all 0.2s',
            }}>
              {f === 'all' ? '⚡ ALL' : f === 'game' ? '🎮 GAMES' : '🃏 CARDS'}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: 80 }}>
            <div style={{ fontFamily: 'Orbitron, monospace', color: '#475569', fontSize: 14, letterSpacing: 2 }}>LOADING VAULT...</div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
            {filtered.map(p => (
              <div key={p.id} style={{
                background: 'rgba(255,255,255,0.03)', border: `1px solid ${p.color || '#333'}33`,
                borderRadius: 16, overflow: 'hidden', transition: 'transform 0.2s, box-shadow 0.2s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 40px ${p.color || '#7b2ff7'}22` }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none' }}
              >
                {/* Card art */}
                <div style={{ height: 140, background: `linear-gradient(135deg, ${p.color || '#7b2ff7'}22, ${p.color || '#00f5d4'}11)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <span style={{ fontSize: 64 }}>{p.emoji}</span>
                  {p.tag && (
                    <span style={{ position: 'absolute', top: 12, right: 12, background: TAG_COLORS[p.tag] || '#475569', color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 4, letterSpacing: 1, fontFamily: 'Share Tech Mono, monospace' }}>
                      {p.tag}
                    </span>
                  )}
                  <span style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(0,0,0,0.4)', color: '#64748b', fontSize: 10, padding: '3px 8px', borderRadius: 4, letterSpacing: 1 }}>
                    {p.type.toUpperCase()}
                  </span>
                </div>

                {/* Info */}
                <div style={{ padding: '16px 18px' }}>
                  <h3 style={{ fontFamily: 'Orbitron, monospace', fontSize: 14, color: '#fff', fontWeight: 700, marginBottom: 6 }}>{p.name}</h3>
                  <p style={{ fontSize: 12, color: '#475569', marginBottom: 14, lineHeight: 1.5 }}>{p.description}</p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 20, fontWeight: 900, color: '#00f5d4' }}>${p.price}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                        <Star size={11} color="#f59e0b" fill="#f59e0b" />
                        <span style={{ fontSize: 11, color: '#64748b' }}>{p.rating?.toFixed(1)}</span>
                      </div>
                    </div>
                    <button onClick={() => handleAdd(p)} style={{
                      background: added === p.id ? '#10b981' : `linear-gradient(135deg, ${p.color || '#7b2ff7'}, ${p.color || '#00f5d4'}99)`,
                      border: 'none', borderRadius: 10, padding: '10px 16px', cursor: 'pointer',
                      color: '#fff', fontWeight: 700, fontSize: 12, display: 'flex', alignItems: 'center', gap: 6,
                      transition: 'all 0.2s', fontFamily: 'Orbitron, monospace', letterSpacing: 0.5,
                    }}>
                      <ShoppingCart size={14} />
                      {added === p.id ? '✓ ADDED' : 'ADD'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}