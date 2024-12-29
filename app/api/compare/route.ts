import { NextResponse } from 'next/server'

// Mock data to replace database queries
const mockPerfumes = [
  { id: '1', name: 'Chanel No. 5', brand: 'Chanel', price: 99.99, rating: 4.5 },
  { id: '2', name: 'Dior Sauvage', brand: 'Dior', price: 89.99, rating: 4.7 },
  { id: '3', name: 'Black Opium', brand: 'Yves Saint Laurent', price: 79.99, rating: 4.8 },
]

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const ids = searchParams.getAll('id')

  const perfumes = mockPerfumes.filter(p => ids.includes(p.id))

  return NextResponse.json(perfumes)
}

