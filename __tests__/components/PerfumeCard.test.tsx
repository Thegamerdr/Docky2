import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { PerfumeCard } from '@/components/PerfumeCard'

const mockPerfume = {
  id: '1',
  name: 'Test Perfume',
  brand: 'Test Brand',
  price: 99.99,
  rating: 4.5,
  concentration: 'EDP',
  image: '/test-image.jpg',
}

describe('PerfumeCard', () => {
  it('renders perfume details correctly', () => {
    render(
      <PerfumeCard
        perfume={mockPerfume}
        isSelected={false}
        onSelect={() => {}}
      />
    )

    expect(screen.getByText('Test Perfume')).toBeInTheDocument()
    expect(screen.getByText('Test Brand')).toBeInTheDocument()
    expect(screen.getByText('$99.99')).toBeInTheDocument()
    expect(screen.getByText('4.5')).toBeInTheDocument()
    expect(screen.getByText('EDP')).toBeInTheDocument()
  })

  it('calls onSelect when the button is clicked', () => {
    const mockOnSelect = jest.fn()
    render(
      <PerfumeCard
        perfume={mockPerfume}
        isSelected={false}
        onSelect={mockOnSelect}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: 'Select' }))
    expect(mockOnSelect).toHaveBeenCalledTimes(1)
  })

  it('displays "Remove from Wishlist" when actionLabel prop is provided', () => {
    render(
      <PerfumeCard
        perfume={mockPerfume}
        isSelected={false}
        onSelect={() => {}}
        actionLabel="Remove from Wishlist"
      />
    )

    expect(screen.getByRole('button', { name: 'Remove from Wishlist' })).toBeInTheDocument()
  })
})

