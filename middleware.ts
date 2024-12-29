import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { processUrl } from './utils/url'

export function middleware(request: NextRequest) {
  try {
    const url = processUrl(request.url)
    
    // Only modify the request if the URL was changed
    if (url !== request.url) {
      return NextResponse.redirect(new URL(url))
    }
  } catch (error) {
    console.error('Middleware error:', error)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api/* (API routes)
     * 2. /_next/* (Next.js internals)
     * 3. /_static/* (static files)
     * 4. /_vercel/* (Vercel internals)
     * 5. /favicon.ico, /sitemap.xml (static files)
     */
    '/((?!api|_next|_static|_vercel|favicon.ico|sitemap.xml).*)',
  ],
}

