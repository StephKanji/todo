import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CartProduct = {
  id: string; name: string; price: number
  emoji: string; color: string; qty: number
}

type CartStore = {
  items: CartProduct[]
  addItem:    (p: CartProduct) => void
  removeItem: (id: string) => void
  updateQty:  (id: string, qty: number) => void
  clearCart:  () => void
  total:      () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (p) => set(s => {
        const exists = s.items.find(i => i.id === p.id)
        if (exists) return { items: s.items.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i) }
        return { items: [...s.items, { ...p, qty: 1 }] }
      }),
      removeItem: (id) => set(s => ({ items: s.items.filter(i => i.id !== id) })),
      updateQty:  (id, qty) => set(s => ({
        items: qty <= 0 ? s.items.filter(i => i.id !== id) : s.items.map(i => i.id === id ? { ...i, qty } : i)
      })),
      clearCart: () => set({ items: [] }),
      total: () => get().items.reduce((s, i) => s + i.price * i.qty, 0),
    }),
    { name: 'gamevault-cart' }
  )
)