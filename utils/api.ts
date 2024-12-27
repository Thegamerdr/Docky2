import { PerfumeData } from '@/types/perfume'

export async function fetchMarketplaceData(): Promise<PerfumeData[]> {
  try {
    const response = await fetch('/api/perfumes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching marketplace data:', error)
    throw error
  }
}

export async function fetchInventoryData(): Promise<PerfumeData[]> {
  try {
    const response = await fetch('/api/inventory', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching inventory data:', error)
    throw error
  }
}

