import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { url } = await req.json()

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    // Validate URL
    try {
      new URL(url)
    } catch {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 })
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; PerfumeMarketplaceBot/1.0)',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const content = await response.text()
    
    // Extract basic metadata
    const title = content.match(/<title>(.*?)<\/title>/i)?.[1] || ''
    const description = content.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"[^>]*>/i)?.[1] || ''
    
    return NextResponse.json({
      url,
      title,
      description,
      content: content.slice(0, 50000), // Limit content size
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error fetching external content:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch external content' },
      { status: 500 }
    )
  }
}

