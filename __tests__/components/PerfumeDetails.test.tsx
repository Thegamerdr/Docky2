import React from 'react'
import { render, screen } from '@testing-library/react'
import PerfumeDetails from '@/components/PerfumeDetails'

const mockPerfume = {
  id: '1',
  name: 'Test Perfume',
  brand: 'Test Brand',
  price: 99.99,
  rating: 4.5,
  image: '/test-image.jpg',
  notes: ['vanilla', 'musk'],
  description: 'A test perfume',
  concentration: 'EDP',
  season: 'Spring',
  dupes: [
    {
      id: '2',
      dupeBrand: 'Dupe Brand',
      dupeName: 'Dupe Perfume',
      concentration: 'EDT',
    },
  ],
}

describe('PerfumeDetails', () => {
  it('renders perfume details correctly', () => {
    render(<PerfumeDetails perfume={mockPerfume} />)

    expect(screen.getByText('Test Perfume')).toBeInTheDocument()
    expect(screen.getByText('Test Brand')).toBeInTheDocument()
    expect(screen.getByText('$99.99')).toBeInTheDocument()
    expect(screen.getByText('4.5')).toBeInTheDocument()
    expect(screen.getByText('EDP')).toBeInTheDocument()
    expect(screen.getByText('Spring')).toBeInTheDocument()
    expect(screen.getByText('vanilla, musk')).toBeInTheDocument()
    expect(screen.getByText('A test perfume')).toBeInTheDocument()
  })

  it('renders dupe information', () => {
    render(<PerfumeDetails perfume={mockPerfume} />)

    expect(screen.getByText('Dupes:')).toBeInTheDocument()
    expect(screen.getByText('Dupe Brand - Dupe Perfume (EDT)')).toBeInTheDocument()
  })
})

