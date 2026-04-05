'use client'
import { useEffect, useRef } from 'react'

export function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    let w = canvas.width = window.innerWidth
    let h = canvas.height = window.innerHeight
    window.addEventListener('resize', () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight })

    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.8 + 0.3,
      dx: (Math.random() - 0.5) * 0.3, dy: (Math.random() - 0.5) * 0.3,
      hue: [180, 270, 45, 200][Math.floor(Math.random() * 4)],
      alpha: Math.random() * 0.7 + 0.2,
    }))

    const floaters = ['🎮','🃏','⚡','🐉','🚀','🏆','👾','🔥'].map((emoji, i) => ({
      emoji, x: Math.random() * w, y: Math.random() * h,
      size: Math.random() * 40 + 20, speed: Math.random() * 0.2 + 0.05,
      offset: (i / 8) * Math.PI * 2,
    }))

    let frame = 0
    let raf: number
    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      // Deep space bg
      const bg = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, w)
      bg.addColorStop(0, '#0d0a1e')
      bg.addColorStop(0.6, '#06030f')
      bg.addColorStop(1, '#020108')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, w, h)

      // Grid lines
      ctx.strokeStyle = 'rgba(99,102,241,0.04)'
      ctx.lineWidth = 1
      for (let x = 0; x < w; x += 80) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,h); ctx.stroke() }
      for (let y = 0; y < h; y += 80) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(w,y); ctx.stroke() }

      // Stars
      stars.forEach(s => {
        s.x += s.dx; s.y += s.dy
        if (s.x < 0) s.x = w; if (s.x > w) s.x = 0
        if (s.y < 0) s.y = h; if (s.y > h) s.y = 0
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${s.hue},80%,80%,${s.alpha})`; ctx.fill()
      })

      // Floating emojis
      floaters.forEach(f => {
        const yo = Math.sin(frame * 0.008 + f.offset) * 20
        ctx.globalAlpha = 0.07
        ctx.font = `${f.size}px serif`
        ctx.fillText(f.emoji, f.x, f.y + yo)
        ctx.globalAlpha = 1
        f.x -= f.speed
        if (f.x < -80) f.x = w + 80
      })

      // Scan line
      const sy = (frame * 1.5) % (h + 60) - 30
      const sg = ctx.createLinearGradient(0, sy-30, 0, sy+30)
      sg.addColorStop(0, 'transparent'); sg.addColorStop(0.5, 'rgba(0,245,212,0.03)'); sg.addColorStop(1, 'transparent')
      ctx.fillStyle = sg; ctx.fillRect(0, sy-30, w, 60)

      frame++
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(raf)
  }, [])

  return <canvas ref={ref} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }} />
}