'use client'

import { useSearchParams } from 'next/navigation'

export function HomeContent() {
  const searchParams = useSearchParams()
  // Use searchParams as needed in your component logic
  console.log(searchParams) //Example usage: log the search parameters
  
  return (
    <div>
      <h1>Home Page</h1>
      {/* Rest of your HomeContent component */}
    </div>
  )
}

