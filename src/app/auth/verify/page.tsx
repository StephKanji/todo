'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { Suspense } from 'react'

function VerifyContent() {
  const params = useSearchParams()
  const token = params.get('token')
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')

  useEffect(() => {
    if (!token) { setStatus('error'); return }
    fetch(`/api/auth/verify?token=${token}`)
      .then(res => setStatus(res.ok ? 'success' : 'error'))
      .catch(() => setStatus('error'))
  }, [token])

  return (
    <div style={{ minHeight: '100vh', background: '#06030f', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ textAlign: 'center', maxWidth: 420 }}>
        {status === 'loading' && (
          <>
            <Loader2 size={56} color="#00f5d4" style={{ marginBottom: 20, animation: 'spin 1s linear infinite' }} />
            <h2 style={{ fontFamily: 'Orbitron, monospace', color: '#fff', fontSize: 20 }}>Verifying your email...</h2>
          </>
        )}
        {status === 'success' && (
          <>
            <CheckCircle size={64} color="#00f5d4" style={{ marginBottom: 20 }} />
            <h2 style={{ fontFamily: 'Orbitron, monospace', color: '#fff', fontSize: 22, marginBottom: 12 }}>Email Verified! 🎉</h2>
            <p style={{ color: '#64748b', marginBottom: 28 }}>Your GameVault account is active. Time to play!</p>
            <Link href="/auth/signin" style={{ background: 'linear-gradient(135deg,#7b2ff7,#00f5d4)', color: '#fff', padding: '12px 28px', borderRadius: 10, textDecoration: 'none', fontWeight: 700, fontFamily: 'Orbitron, monospace', fontSize: 14 }}>
              SIGN IN NOW →
            </Link>
          </>
        )}
        {status === 'error' && (
          <>
            <XCircle size={64} color="#ef4444" style={{ marginBottom: 20 }} />
            <h2 style={{ fontFamily: 'Orbitron, monospace', color: '#fff', fontSize: 22, marginBottom: 12 }}>Link Expired</h2>
            <p style={{ color: '#64748b', marginBottom: 28 }}>This verification link is invalid or has expired. Try signing up again.</p>
            <Link href="/auth/signup" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', color: '#e2e8f0', padding: '12px 28px', borderRadius: 10, textDecoration: 'none', fontWeight: 600 }}>
              Back to Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default function VerifyPage() {
  return <Suspense><VerifyContent /></Suspense>
}