'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = `${pathname}${searchParams?.toString() ? `?${searchParams}` : ''}`
    // Add your analytics tracking code here
    console.log(`Page view: ${url}`)
  }, [pathname, searchParams])

  return null
}

