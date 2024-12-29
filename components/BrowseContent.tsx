'use client'

import { useSearchParams } from 'next/navigation'

export function BrowseContent() {
  const searchParams = useSearchParams()
  // Use searchParams as needed in your component logic
  console.log(searchParams) //Example usage: log the search parameters

  return (
    <div>
      <h1>Browse Content</h1>
      {/* Rest of your BrowseContent component */}
    </div>
  )
}

