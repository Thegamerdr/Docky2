import { mockPerfumes } from './mockData'

export async function getPerfumes(query: string) {
  // In a real application, this would be an API call to your backend
  return mockPerfumes.filter(perfume => 
    perfume.name.toLowerCase().includes(query.toLowerCase()) ||
    perfume.brand.toLowerCase().includes(query.toLowerCase())
  )
}

export async function getPerfumesByNames(names: string[]) {
  // In a real application, this would be an API call to your backend
  return mockPerfumes.filter(perfume => 
    names.some(name => perfume.name.toLowerCase().includes(name.toLowerCase()))
  )
}

