'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Gamepad2, Eye, EyeOff, Loader2 } from 'lucide-react'
import { Suspense } from 'react'

function SignInForm() {
  const router = useRouter()
  const params = useSearchParams()
  const verified = params.get('verified')
  const [form, setForm] = useState({ email: '', password: '' })
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')
    const res = await signIn('credentials', { ...form, redirect: false })
    if (res?.error) {
      setError(res.error === 'CredentialsSignin' ? 'Invalid email or password' : res.error)
      setLoading(false)
    } else {
      router.push('/')
      router.refresh()
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#06030f', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, paddingTop: 88 }}>
      <div style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, background: 'radial-gradient(circle, rgba(0,245,212,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 420, position: 'relative', zIndex: 1 }}>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(0,245,212,0.2)', borderRadius: 20, padding: 40 }}>

          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <Gamepad2 size={40} color="#00f5d4" style={{ marginBottom: 12 }} />
            <h1 style={{ fontFamily: 'Orbitron, monospace', fontSize: 22, color: '#fff', fontWeight: 900, marginBottom: 6 }}>WELCOME BACK</h1>
            <p style={{ color: '#475569', fontSize: 14 }}>Sign in to your GameVault account</p>
          </div>

          {verified && (
            <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 20, color: '#34d399', fontSize: 13 }}>
              ✅ Email verified! You can now sign in.
            </div>
          )}

          {error && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 20, color: '#f87171', fontSize: 13 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 12, color: '#64748b', marginBottom: 6, letterSpacing: 1, fontFamily: 'Share Tech Mono, monospace' }}>EMAIL</label>
              <input
                type="email" required placeholder="you@example.com"
                value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '12px 16px', color: '#e2e8f0', fontSize: 14, outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 12, color: '#64748b', marginBottom: 6, letterSpacing: 1, fontFamily: 'Share Tech Mono, monospace' }}>PASSWORD</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={show ? 'text' : 'password'} required placeholder="Your password"
                  value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '12px 48px 12px 16px', color: '#e2e8f0', fontSize: 14, outline: 'none' }}
                />
                <button type="button" onClick={() => setShow(!show)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#475569', cursor: 'pointer' }}>
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} style={{
              width: '100%', padding: '13px', borderRadius: 10, border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
              background: 'linear-gradient(135deg,#00f5d4,#7b2ff7)', color: '#fff', fontWeight: 700,
              fontSize: 15, fontFamily: 'Orbitron, monospace', letterSpacing: 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              opacity: loading ? 0.7 : 1,
            }}>
              {loading ? <><Loader2 size={16} className="animate-spin" /> SIGNING IN...</> : 'SIGN IN'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: '#475569' }}>
            No account yet?{' '}
            <Link href="/auth/signup" style={{ color: '#00f5d4', textDecoration: 'none', fontWeight: 600 }}>Create one</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function SignInPage() {
  return <Suspense><SignInForm /></Suspense>
}