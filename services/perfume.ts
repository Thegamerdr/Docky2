import { PerfumeData } from '@/types/perfume'

// This is a mock implementation. In a real application, this would make an API call.
const mockPerfumes: PerfumeData[] = [
  {
    id: '1',
    name: 'Chanel No. 5',
    brand: 'Chanel',
    price: 99.99,
    rating: 4.5,
    image: '/images/chanel-no-5.jpg',
    notes: ['aldehydes', 'jasmine', 'rose'],
    description: 'An iconic fragrance that has endured for decades.',
  },
  {
    id: '2',
    name: 'Dior Sauvage',
    brand: 'Dior',
    price: 89.99,
    rating: 4.7,
    image: '/images/dior-sauvage.jpg',
    notes: ['bergamot', 'pepper', 'ambroxan'],
    description: 'A fresh and bold scent for the modern man.',
  },
  // Add more mock perfumes as needed
]

export async function getPerfumes(ids: string): Promise<PerfumeData[]> {
  // In a real application, this would fetch data from an API
  const idArray = ids.split(',')
  return mockPerfumes.filter(perfume => idArray.includes(perfume.id))
}

export async function fetchPerfumes(query?: string): Promise<PerfumeData[]> {
  if (query) {
    return mockPerfumes.filter(perfume => 
      perfume.name.toLowerCase().includes(query.toLowerCase()) ||
      perfume.brand.toLowerCase().includes(query.toLowerCase())
    )
  }
  return mockPerfumes
}

