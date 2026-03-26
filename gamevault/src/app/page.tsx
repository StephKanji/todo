import { HeroCanvas } from '@/components/HeroCanvas'
import Link from 'next/link'
import { ArrowRight, Zap, Shield, Star } from 'lucide-react'

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <HeroCanvas />

      {/* Hero */}
      <section style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px', paddingTop: 64 }}>
        <div style={{ textAlign: 'center', maxWidth: 800 }}>

          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(123,47,247,0.15)', border: '1px solid rgba(123,47,247,0.3)', borderRadius: 100, padding: '6px 18px', marginBottom: 32 }}>
            <Zap size={14} color="#00f5d4" />
            <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 12, color: '#00f5d4', letterSpacing: 2 }}>LEVEL UP YOUR COLLECTION</span>
          </div>

          {/* Headline */}
          <h1 style={{ fontFamily: 'Orbitron, monospace', fontSize: 'clamp(36px, 7vw, 80px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 24, color: '#fff' }}>
            THE ULTIMATE<br />
            <span style={{ background: 'linear-gradient(135deg,#7b2ff7,#00f5d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              GAME VAULT
            </span>
          </h1>

          <p style={{ fontSize: 18, color: '#64748b', maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.7 }}>
            Shop rare trading cards, legendary games, and exclusive drops. Your next obsession is one click away.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/shop" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: 'linear-gradient(135deg,#7b2ff7,#00f5d4)',
              color: '#fff', textDecoration: 'none', padding: '14px 32px',
              borderRadius: 12, fontWeight: 700, fontSize: 16, letterSpacing: 1,
            }}>
              Enter the Vault <ArrowRight size={18} />
            </Link>
            <Link href="/auth/signup" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)',
              color: '#e2e8f0', textDecoration: 'none', padding: '14px 32px',
              borderRadius: 12, fontWeight: 600, fontSize: 16,
            }}>
              Create Account
            </Link>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 48, justifyContent: 'center', marginTop: 64, flexWrap: 'wrap' }}>
            {[['500+', 'Rare Cards'], ['200+', 'Games'], ['10K+', 'Players'], ['4.9★', 'Rating']].map(([val, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 28, fontWeight: 900, color: '#00f5d4' }}>{val}</div>
                <div style={{ fontSize: 13, color: '#475569', marginTop: 4, letterSpacing: 1 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ position: 'relative', zIndex: 1, padding: '80px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 24 }}>
          {[
            { icon: <Zap size={28} color="#00f5d4" />, title: 'Instant Delivery', desc: 'Digital games delivered instantly. Physical cards shipped same day.' },
            { icon: <Shield size={28} color="#7b2ff7" />, title: 'Verified Authentic', desc: 'Every card graded and authenticated. 100% genuine products guaranteed.' },
            { icon: <Star size={28} color="#f59e0b" />, title: 'Exclusive Drops', desc: 'Members get early access to limited edition releases and rare finds.' },
          ].map(f => (
            <div key={f.title} style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16, padding: 32, transition: 'border-color 0.3s',
            }}>
              <div style={{ marginBottom: 16 }}>{f.icon}</div>
              <h3 style={{ fontFamily: 'Orbitron, monospace', fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 10 }}>{f.title}</h3>
              <p style={{ color: '#64748b', lineHeight: 1.7, fontSize: 14 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}