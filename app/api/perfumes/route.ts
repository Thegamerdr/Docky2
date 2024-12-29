import { NextResponse } from 'next/server'
import { mockPerfumes } from '@/lib/mockData'
import { logger } from '@/utils/logger'

// Simple in-memory cache
const cache = new Map()

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')?.toLowerCase()
  const ids = searchParams.getAll('id')
  const brand = searchParams.get('brand')
  const minPrice = searchParams.get('minPrice')
  const maxPrice = searchParams.get('maxPrice')
  const notes = searchParams.getAll('notes')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '12')

  // Create a cache key based on the request parameters
  const cacheKey = `${query}-${ids.join(',')}-${brand}-${minPrice}-${maxPrice}-${notes.join(',')}-${page}-${limit}`

  // Check if we have a cached response
  if (cache.has(cacheKey)) {
    logger.info('Serving from cache', { cacheKey })
    return NextResponse.json(cache.get(cacheKey))
  }

  try {
    let filteredPerfumes = [...mockPerfumes]

    if (ids.length > 0) {
      filteredPerfumes = filteredPerfumes.filter(perfume => ids.includes(perfume.id))
    } else {
      if (query) {
        filteredPerfumes = filteredPerfumes.filter(perfume => 
          perfume.name.toLowerCase().includes(query) || 
          perfume.brand.toLowerCase().includes(query) ||
          perfume.notes?.some(note => note.toLowerCase().includes(query))
        )
      }

      if (brand && brand !== 'All') {
        filteredPerfumes = filteredPerfumes.filter(perfume => 
          perfume.brand.toLowerCase() === brand.toLowerCase()
        )
      }

      if (minPrice) {
        filteredPerfumes = filteredPerfumes.filter(perfume => 
          perfume.price && perfume.price >= Number(minPrice)
        )
      }

      if (maxPrice) {
        filteredPerfumes = filteredPerfumes.filter(perfume => 
          perfume.price && perfume.price <= Number(maxPrice)
        )
      }

      if (notes.length > 0) {
        filteredPerfumes = filteredPerfumes.filter(perfume => 
          perfume.notes?.some(note => notes.includes(note.toLowerCase()))
        )
      }
    }

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedPerfumes = filteredPerfumes.slice(startIndex, endIndex)

    logger.info(`Fetched ${paginatedPerfumes.length} perfumes`, { query, brand, minPrice, maxPrice, notes, page, limit })

    // Cache the response
    cache.set(cacheKey, paginatedPerfumes)

    return NextResponse.json(paginatedPerfumes)
  } catch (error) {
    logger.error('Error fetching perfumes:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unknown error occurred while fetching perfumes' },
      { status: 500 }
    )
  }
}

