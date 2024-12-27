import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { SessionProvider } from 'next-auth/react'
import DashboardClient from '@/components/DashboardClient'
import { fetchPerfumes } from '@/lib/api'

jest.mock('@/lib/api', () => ({
  fetchPerfumes: jest.fn(),
}))

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

const mockSession = {
  expires: '1',
  user: { email: 'a', name: 'Delta', image: 'c' },
}

describe('DashboardClient', () => {
  it('renders loading state initially', () => {
    render(
      <SessionProvider session={mockSession}>
        <DashboardClient />
      </SessionProvider>
    )
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders perfumes when data is loaded', async () => {
    const mockPerfumes = [
      { id: '1', name: 'Perfume 1', brand: 'Brand 1', price: 100, rating: 4.5, image: '/image1.jpg', notes: ['floral'], description: 'Nice perfume' },
    ]
    ;(fetchPerfumes as jest.Mock).mockResolvedValue(mockPerfumes)

    render(
      <SessionProvider session={mockSession}>
        <DashboardClient />
      </SessionProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('Perfume 1')).toBeInTheDocument()
      expect(screen.getByText('Brand 1')).toBeInTheDocument()
      expect(screen.getByText('$100.00')).toBeInTheDocument()
    })
  })

  it('renders error message when fetch fails', async () => {
    ;(fetchPerfumes as jest.Mock).mockRejectedValue(new Error('Failed to fetch'))

    render(
      <SessionProvider session={mockSession}>
        <DashboardClient />
      </SessionProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('Error loading data')).toBeInTheDocument()
      expect(screen.getByText('Failed to fetch')).toBeInTheDocument()
    })
  })
})

