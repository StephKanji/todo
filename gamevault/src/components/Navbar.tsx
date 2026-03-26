'use client'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useCart } from '@/lib/store'
import { ShoppingCart, Gamepad2, LogOut, User, Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Navbar() {
  const { data: session } = useSession()
  const items = useCart(s => s.items)
  const cartCount = items.reduce((sum, i) => sum + i.qty, 0)
  const [open, setOpen] = useState(false)

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: 'rgba(6,3,15,0.85)', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(123,47,247,0.2)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          
          <span style={{ fontFamily: 'Orbitron, monospace', fontSize: 18, fontWeight: 900, color: '#fff', letterSpacing: 2 }}>
            GAME<span style={{ color: '#00f5d4' }}><Gamepad2 size={28} color="#00f5d4" />VAULT</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="hidden md:flex">
          {[['/', 'Home'], ['/shop', 'Shop'], ['/future', 'Coming Soon']].map(([href, label]) => (
            <Link key={href} href={href} style={{ color: '#94a3b8', textDecoration: 'none', fontSize: 14, fontWeight: 500, letterSpacing: 1, transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#00f5d4')}
              onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}>
              {label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Cart */}
          <Link href="/cart" style={{ position: 'relative', color: '#94a3b8', textDecoration: 'none' }}>
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute', top: -8, right: -8,
                background: '#00f5d4', color: '#06030f',
                borderRadius: '50%', width: 18, height: 18,
                fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{cartCount}</span>
            )}
          </Link>

          {/* Auth */}
          {session ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 13, color: '#64748b' }}>{session.user?.name}</span>
              <button onClick={() => signOut()} style={{
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8, padding: '6px 12px', color: '#94a3b8', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 6, fontSize: 13,
              }}>
                <LogOut size={14} /> Sign out
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 8 }}>
              <Link href="/auth/signin" style={{
                padding: '7px 16px', borderRadius: 8, fontSize: 13, fontWeight: 500,
                border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', textDecoration: 'none',
              }}>Sign in</Link>
              <Link href="/auth/signup" style={{
                padding: '7px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600,
                background: 'linear-gradient(135deg,#7b2ff7,#00f5d4)', color: '#fff', textDecoration: 'none',
              }}>Sign up</Link>
            </div>
          )}

          {/* Mobile menu toggle */}
          <button onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }} className="md:hidden">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: 'rgba(6,3,15,0.98)', padding: '16px 24px 24px', borderTop: '1px solid rgba(123,47,247,0.2)' }}>
          {[['/', 'Home'], ['/shop', 'Shop'], ['/cart', 'Cart'], ['/future', 'Coming Soon']].map(([href, label]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}
              style={{ display: 'block', padding: '12px 0', color: '#94a3b8', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: 15 }}>
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}