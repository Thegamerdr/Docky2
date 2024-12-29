'use client'

import { useSearchParams } from 'next/navigation'

export function DashboardContent() {
  const searchParams = useSearchParams()
  // Use searchParams as needed in your component logic
  console.log(searchParams) //Example usage: log the search parameters

  return (
    <div>
      <h1>Dashboard</h1>
      {/* rest of your DashboardContent component */}
    </div>
  )
}

