'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Gamepad2, Eye, EyeOff, Loader2, CheckCircle } from 'lucide-react'

export default function SignUpPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    let data: { error?: string; message?: string } = {}

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      try {
        data = await res.json()
      } catch {
        setError('Server returned an invalid response.')
        setLoading(false)
        return
      }

      if (!res.ok) {
        setError(data.error || 'Signup failed. Please try again.')
        setLoading(false)
        return
      }

      setSuccess(true)
    } catch (err) {
      setError('Network error — check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) return (
    <div style={{ minHeight: '100vh', background: '#06030f', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ textAlign: 'center', maxWidth: 420 }}>
        <CheckCircle size={64} color="#00f5d4" style={{ marginBottom: 24 }} />
        <h2 style={{ fontFamily: 'Orbitron, monospace', fontSize: 24, color: '#fff', marginBottom: 12 }}>Check your email!</h2>
        <p style={{ color: '#64748b', lineHeight: 1.7, marginBottom: 24 }}>
          We sent a verification link to <strong style={{ color: '#00f5d4' }}>{form.email}</strong>.<br />
          Click the link to activate your account.
        </p>
        <Link href="/auth/signin" style={{ color: '#7b2ff7', fontSize: 14 }}>Go to sign in →</Link>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#06030f', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24}}>
      <div style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, background: 'radial-gradient(circle, rgba(123,47,247,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 420, position: 'relative', zIndex: 1 }}>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(123,47,247,0.25)', borderRadius: 20, padding: 40 }}>

          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <Gamepad2 size={40} color="#00f5d4" style={{ marginBottom: 12 }} />
            <h1 style={{ fontFamily: 'Orbitron, monospace', fontSize: 22, color: '#fff', fontWeight: 900, marginBottom: 6 }}>JOIN GAMEVAULT</h1>
            <p style={{ color: '#475569', fontSize: 14 }}>Create your account and start collecting</p>
          </div>

          {error && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: '12px 14px', marginBottom: 20, color: '#f87171', fontSize: 13, lineHeight: 1.5 }}>
              ⚠ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 12, color: '#64748b', marginBottom: 6, letterSpacing: 1, fontFamily: 'Share Tech Mono, monospace' }}>DISPLAY NAME</label>
              <input
                type="text" required placeholder="Your gamer name"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '12px 16px', color: '#e2e8f0', fontSize: 14, outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 12, color: '#64748b', marginBottom: 6, letterSpacing: 1, fontFamily: 'Share Tech Mono, monospace' }}>EMAIL</label>
              <input
                type="email" required placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '12px 16px', color: '#e2e8f0', fontSize: 14, outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 12, color: '#64748b', marginBottom: 6, letterSpacing: 1, fontFamily: 'Share Tech Mono, monospace' }}>PASSWORD</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={show ? 'text' : 'password'} required placeholder="Min 8 characters"
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '12px 48px 12px 16px', color: '#e2e8f0', fontSize: 14, outline: 'none' }}
                />
                <button type="button" onClick={() => setShow(!show)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#475569', cursor: 'pointer' }}>
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} style={{
              width: '100%', padding: '13px', borderRadius: 10, border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              background: 'linear-gradient(135deg,#7b2ff7,#00f5d4)',
              color: '#fff', fontWeight: 700, fontSize: 15,
              fontFamily: 'Orbitron, monospace', letterSpacing: 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              opacity: loading ? 0.7 : 1,
            }}>
              {loading
                ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> CREATING...</>
                : 'CREATE ACCOUNT'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: '#475569' }}>
            Already have an account?{' '}
            <Link href="/auth/signin" style={{ color: '#00f5d4', textDecoration: 'none', fontWeight: 600 }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}