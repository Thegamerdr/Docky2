import { NextResponse } from 'next/server'
import { google } from 'googleapis'

const customsearch = google.customsearch('v1')

// Custom Search Engine ID
const GOOGLE_SHOPPING_CX = '86e2404e67c6b42ad'

// Set up authentication
const auth = new google.auth.JWT(
  'Tgdroppin@gmail.com',
  undefined,
  process.env.GOOGLE_PRIVATE_KEY,
  ['https://www.googleapis.com/auth/cse']
)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')

  if (!query) {
    return NextResponse.json({ error: 'Query is required' }, { status: 400 })
  }

  try {
    const result = await customsearch.cse.list({
      auth: auth,
      cx: GOOGLE_SHOPPING_CX,
      q: query,
      searchType: 'shopping',
      num: 10
    })

    if (!result.data || !result.data.items || result.data.items.length === 0) {
      return NextResponse.json({ error: 'No results found' }, { status: 404 })
    }

    return NextResponse.json(result.data)
  } catch (error) {
    console.error('Error fetching from Google Shopping API:', error)
    return NextResponse.json(
      { error: 'Failed to fetch data from Google Shopping' },
      { status: 500 }
    )
  }
}

