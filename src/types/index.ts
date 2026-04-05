export type Product = {
  id: string; name: string; description: string | null
  price: number; type: string; tag: string | null
  emoji: string | null; color: string | null
  rating: number | null; stock: number | null
}

export type User = {
  id: string; name: string; email: string; emailVerified: boolean | null
}