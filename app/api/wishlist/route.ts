import { NextResponse } from 'next/server'
import { mockPerfumes } from '@/lib/mockData'

// This is a mock implementation. In a real app, you'd use a database.
let wishlist = mockPerfumes.slice(0, 3)

export async function GET() {
  return NextResponse.json(wishlist)
}

export async function POST(request: Request) {
  const { id } = await request.json()
  const perfume = mockPerfumes.find(p => p.id === id)
  
  if (!perfume) {
    return NextResponse.json({ error: 'Perfume not found' }, { status: 404 })
  }

  if (!wishlist.some(p => p.id === id)) {
    wishlist.push(perfume)
  }

  return NextResponse.json(wishlist)
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 })
  }

  wishlist = wishlist.filter(p => p.id !== id)

  return NextResponse.json(wishlist)
}

