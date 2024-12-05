import { NextResponse } from 'next/server'
import { google } from 'googleapis'

const customsearch = google.customsearch('v1')

// Custom Search Engine ID
const GOOGLE_SHOPPING_CX = process.env.GOOGLE_SHOPPING_CX || '86e2404e67c6b42ad'

// Set up authentication
const getAuth = () => {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY
    ? process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
    : undefined

  if (!privateKey) {
    throw new Error('GOOGLE_PRIVATE_KEY is not set or is invalid')
  }

  try {
    return new google.auth.JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/cse'],
    })
  } catch (error) {
    console.error('Error creating JWT client:', error)
    throw new Error('Failed to create authentication client')
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')
  const platform = searchParams.get('platform') || 'all'

  if (!query) {
    return NextResponse.json({ error: 'Query is required' }, { status: 400 })
  }

  try {
    const auth = getAuth()
    const result = await customsearch.cse.list({
      auth: auth,
      cx: GOOGLE_SHOPPING_CX,
      q: `${query} ${platform !== 'all' ? platform : ''}`,
      searchType: 'shopping',
      num: 10
    })

    if (!result.data || !result.data.items || result.data.items.length === 0) {
      return NextResponse.json({ error: 'No results found' }, { status: 404 })
    }

    const processedResults = result.data.items.map((item: any) => ({
      id: item.product?.offerId || item.cacheId,
      name: item.title,
      brand: item.product?.brand || 'Unknown',
      price: parseFloat(item.product?.inventories?.[0]?.price?.value) || 0,
      stock: item.product?.inventories?.[0]?.availability === 'inStock' ? 1 : 0,
      rating: item.product?.aggregateRating?.ratingValue || 0,
      salesVolume: item.product?.aggregateRating?.reviewCount || 0,
      platform: platform !== 'all' ? platform : detectPlatform(item.link),
      lastUpdated: new Date().toISOString(),
    }))

    return NextResponse.json(processedResults)
  } catch (error) {
    console.error('Error fetching from Google Shopping API:', error)
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Failed to fetch data from Google Shopping: ${error.message}` },
        { status: 500 }
      )
    }
    return NextResponse.json(
      { error: 'An unexpected error occurred while fetching data from Google Shopping' },
      { status: 500 }
    )
  }
}

function detectPlatform(url: string): string {
  if (url.includes('amazon')) return 'amazon'
  if (url.includes('ebay')) return 'ebay'
  if (url.includes('walmart')) return 'walmart'
  if (url.includes('alibaba')) return 'alibaba'
  return 'other'
}

