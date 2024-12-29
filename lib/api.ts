import { PerfumeData } from '@/types/perfume'

export async function fetchPerfumes(query?: string): Promise<PerfumeData[]> {
  // Implement the actual API call here
  // For now, we'll return mock data
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
    // Add more mock perfumes as needed
  ]

  if (query) {
    return mockPerfumes.filter(perfume => 
      perfume.name.toLowerCase().includes(query.toLowerCase()) ||
      perfume.brand.toLowerCase().includes(query.toLowerCase())
    )
  }

  return mockPerfumes
}

export async function getPerfumes(ids: string): Promise<PerfumeData[]> {
  // Implement the actual API call here
  // For now, we'll return mock data based on the provided ids
  const allPerfumes = await fetchPerfumes()
  const idArray = ids.split(',')
  return allPerfumes.filter(perfume => idArray.includes(perfume.id))
}

export async function getPerfumesByNames(names: string[]) {
  // In a real application, this would be an API call to your backend
  const allPerfumes = await fetchPerfumes()
  return allPerfumes.filter(perfume => 
    names.some(name => perfume.name.toLowerCase().includes(name.toLowerCase()))
  )
}

