import { Clock, Mail, Zap } from 'lucide-react'

const PROJECTS = [
  { emoji: '🥽', title: 'GameVault AR',    eta: 'Q3 2026', color: '#a855f7', desc: 'Scan physical cards and battle in augmented reality from your living room.' },
  { emoji: '🏆', title: 'TournamentHub',   eta: 'Q4 2026', color: '#f59e0b', desc: 'Live bracket tournaments with prize pools and integrated streaming.' },
  { emoji: '🔄', title: 'TradeFloor',      eta: 'Q1 2027', color: '#10b981', desc: 'Peer-to-peer marketplace to trade, auction, and grade your cards.' },
  { emoji: '💎', title: 'VaultPass',       eta: 'Q2 2027', color: '#06b6d4', desc: 'Monthly subscription box — curated rare cards + exclusive digital drops.' },
]

export default function FuturePage() {
  return (
    <div style={{ minHeight: '100vh', background: '#06030f', paddingTop: 88, paddingBottom: 80 }}>
      <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(123,47,247,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 12, color: '#00f5d4', letterSpacing: 4, marginBottom: 12 }}>▸ WHAT'S COMING</div>
          <h1 style={{ fontFamily: 'Orbitron, monospace', fontSize: 'clamp(28px,5vw,52px)', fontWeight: 900, color: '#fff', marginBottom: 16 }}>
            FUTURE <span style={{ color: '#7b2ff7' }}>PROJECTS</span>
          </h1>
          <p style={{ color: '#475569', fontSize: 16, maxWidth: 520, margin: '0 auto' }}>
            We're building the future of gaming commerce. Get on the waitlist for early access.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(440px, 1fr))', gap: 24, marginBottom: 64 }}>
          {PROJECTS.map((p, i) => (
            <div key={p.title} style={{
              background: 'rgba(255,255,255,0.03)', border: `1px solid ${p.color}33`,
              borderRadius: 20, padding: 32, position: 'relative', overflow: 'hidden',
            }}>
              {/* Glow */}
              <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, background: `radial-gradient(circle, ${p.color}15 0%, transparent 70%)`, pointerEvents: 'none' }} />

              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
                <span style={{ fontSize: 48 }}>{p.emoji}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: `${p.color}15`, border: `1px solid ${p.color}33`, borderRadius: 100, padding: '4px 12px' }}>
                  <Clock size={12} color={p.color} />
                  <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 12, color: p.color }}>{p.eta}</span>
                </div>
              </div>

              <h3 style={{ fontFamily: 'Orbitron, monospace', fontSize: 20, color: '#fff', fontWeight: 700, marginBottom: 10 }}>{p.title}</h3>
              <p style={{ color: '#64748b', lineHeight: 1.7, marginBottom: 20, fontSize: 14 }}>{p.desc}</p>

              {/* Hype bar */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 11, color: '#475569', letterSpacing: 1 }}>HYPE METER</span>
                  <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 11, color: p.color }}>{[87, 94, 72, 81][i]}%</span>
                </div>
                <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${[87, 94, 72, 81][i]}%`, background: `linear-gradient(90deg, ${p.color}88, ${p.color})`, borderRadius: 2 }} />
                </div>
              </div>

              {/* Waitlist */}
              <div style={{ display: 'flex', gap: 8 }}>
                <input type="email" placeholder="your@email.com" style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: `1px solid ${p.color}33`, borderRadius: 8, padding: '9px 14px', color: '#e2e8f0', fontSize: 13, outline: 'none' }} />
                <button style={{ background: p.color, border: 'none', borderRadius: 8, padding: '9px 14px', cursor: 'pointer', color: '#fff', fontWeight: 700, fontSize: 12, display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}>
                  <Mail size={13} /> Notify me
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', background: 'rgba(123,47,247,0.08)', border: '1px solid rgba(123,47,247,0.2)', borderRadius: 20, padding: 48 }}>
          <Zap size={40} color="#00f5d4" style={{ marginBottom: 16 }} />
          <h2 style={{ fontFamily: 'Orbitron, monospace', fontSize: 24, color: '#fff', marginBottom: 12 }}>Stay in the loop</h2>
          <p style={{ color: '#475569', marginBottom: 24 }}>Follow our journey as we build the future of gaming commerce.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/shop" style={{ background: 'linear-gradient(135deg,#7b2ff7,#00f5d4)', color: '#fff', padding: '12px 28px', borderRadius: 10, textDecoration: 'none', fontWeight: 700, fontFamily: 'Orbitron, monospace', fontSize: 13 }}>SHOP NOW</a>
          </div>
        </div>
      </div>
    </div>
  )
}