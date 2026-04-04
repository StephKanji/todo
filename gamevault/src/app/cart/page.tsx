'use client'
import { useCart } from '@/lib/store'
import Link from 'next/link'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'

export default function CartPage() {
  const { items, updateQty, removeItem, clearCart } = useCart()
  const total = items.reduce((s, i) => s + i.price * i.qty, 0)
  const count = items.reduce((s, i) => s + i.qty, 0)
  const tax = total * 0.08
  const grand = total + tax

  if (items.length === 0) return (
    <div style={{ minHeight: '100vh', background: '#06030f', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 64, flexDirection: 'column', gap: 20 }}>
      <span style={{ fontSize: 72 }}>🛒</span>
      <h2 style={{ fontFamily: 'Orbitron, monospace', fontSize: 24, color: '#fff' }}>YOUR VAULT IS EMPTY</h2>
      <p style={{ color: '#475569' }}>Add some games or cards to get started</p>
      <Link href="/shop" style={{ background: 'linear-gradient(135deg,#7b2ff7,#00f5d4)', color: '#fff', padding: '12px 28px', borderRadius: 10, textDecoration: 'none', fontWeight: 700, fontFamily: 'Orbitron, monospace', fontSize: 14 }}>
        BROWSE SHOP →
      </Link>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#06030f', paddingTop: 88, paddingBottom: 80 }}>
      <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,245,212,0.05) 0%, transparent 60%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 12, color: '#00f5d4', letterSpacing: 4, marginBottom: 8 }}>▸ YOUR CART</div>
          <h1 style={{ fontFamily: 'Orbitron, monospace', fontSize: 32, fontWeight: 900, color: '#fff' }}>
            VAULT CART <span style={{ color: '#475569', fontSize: 18 }}>({count} items)</span>
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, alignItems: 'start' }}>

          {/* Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {items.map(item => (
              <div key={item.id} style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${item.color}33`, borderRadius: 14, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 18 }}>
                {/* Emoji */}
                <div style={{ width: 60, height: 60, borderRadius: 12, background: `linear-gradient(135deg, ${item.color}33, ${item.color}11)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, flexShrink: 0 }}>
                  {item.emoji}
                </div>

                {/* Name + price */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 14, color: '#fff', fontWeight: 700, marginBottom: 4 }}>{item.name}</div>
                  <div style={{ fontSize: 13, color: '#475569' }}>${item.price.toFixed(2)} each</div>
                </div>

                {/* Qty controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Minus size={13} />
                  </button>
                  <span style={{ fontFamily: 'Orbitron, monospace', fontSize: 14, color: '#fff', minWidth: 24, textAlign: 'center' }}>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Plus size={13} />
                  </button>
                </div>

                {/* Line total */}
                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 16, color: '#00f5d4', fontWeight: 700, minWidth: 72, textAlign: 'right' }}>
                  ${(item.price * item.qty).toFixed(2)}
                </div>

                {/* Remove */}
                <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', padding: 4 }}>
                  <Trash2 size={16} />
                </button>
              </div>
            ))}

            <button onClick={clearCart} style={{ alignSelf: 'flex-start', background: 'none', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', padding: '8px 16px', borderRadius: 8, cursor: 'pointer', fontSize: 13, marginTop: 4 }}>
              Clear cart
            </button>
          </div>

          {/* Summary */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(123,47,247,0.25)', borderRadius: 16, padding: 24, position: 'sticky', top: 88 }}>
            <h2 style={{ fontFamily: 'Orbitron, monospace', fontSize: 16, color: '#fff', marginBottom: 24 }}>ORDER SUMMARY</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
              {[['Subtotal', `$${total.toFixed(2)}`], ['Tax (8%)', `$${tax.toFixed(2)}`]].map(([l, v]) => (
                <div key={l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#64748b' }}>
                  <span>{l}</span><span style={{ color: '#94a3b8' }}>{v}</span>
                </div>
              ))}
              <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '4px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, fontFamily: 'Orbitron, monospace', fontWeight: 900 }}>
                <span style={{ color: '#fff' }}>TOTAL</span>
                <span style={{ color: '#00f5d4' }}>${grand.toFixed(2)}</span>
              </div>
            </div>

            <button style={{
              width: '100%', padding: '14px', borderRadius: 12, border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg,#7b2ff7,#00f5d4)', color: '#fff',
              fontWeight: 700, fontSize: 15, fontFamily: 'Orbitron, monospace', letterSpacing: 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              CHECKOUT <ArrowRight size={16} />
            </button>

            <Link href="/shop" style={{ display: 'block', textAlign: 'center', marginTop: 14, fontSize: 13, color: '#475569', textDecoration: 'none' }}>
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}