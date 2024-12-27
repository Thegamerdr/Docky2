import { NextResponse } from 'next/server'
import { PerfumeData } from '@/types/perfume'

// Mock data (replace with your actual data source)
const perfumes: PerfumeData[] = [
  {
    id: 1,
    name: 'Chanel No. 5',
    brand: 'Chanel',
    price: 99.99,
    rating: 4.8,
    image: '/placeholder.svg'
  },
  {
    id: 2,
    name: 'Dior Sauvage',
    brand: 'Dior',
    price: 89.99,
    rating: 4.7,
    image: '/placeholder.svg'
  },
  {
    id: 3,
    name: 'Black Opium',
    brand: 'Yves Saint Laurent',
    price: 79.99,
    rating: 4.9,
    image: '/placeholder.svg'
  },
  {
    id: 4,
    name: 'Acqua di Gio',
    brand: 'Giorgio Armani',
    price: 69.99,
    rating: 4.6,
    image: '/placeholder.svg'
  },
  {
    id: 5,
    name: 'Black Orchid',
    brand: 'Tom Ford',
    price: 129.99,
    rating: 4.8,
    image: '/placeholder.svg'
  }
]

export async function GET() {
  try {
    // Implement caching headers
    const response = NextResponse.json(perfumes)
    response.headers.set('Cache-Control', 's-maxage=3600, stale-while-revalidate')
    return response
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

