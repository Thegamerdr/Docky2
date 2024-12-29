import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { AdvancedSearch } from '@/components/AdvancedSearch'

jest.mock('@/components/ui/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}))

describe('AdvancedSearch', () => {
  it('renders all form elements', () => {
    render(<AdvancedSearch />)

    expect(screen.getByPlaceholderText('Search perfumes...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Select brand' })).toBeInTheDocument()
    expect(screen.getByText('Notes')).toBeInTheDocument()
    expect(screen.getByText('Price Range')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument()
  })

  it('updates query state when input changes', () => {
    render(<AdvancedSearch />)

    const input = screen.getByPlaceholderText('Search perfumes...')
    fireEvent.change(input, { target: { value: 'Chanel' } })

    expect(input).toHaveValue('Chanel')
  })

  it('toggles note selection when a note button is clicked', () => {
    render(<AdvancedSearch />)

    const floralButton = screen.getByRole('button', { name: 'Floral' })
    fireEvent.click(floralButton)

    expect(floralButton).toHaveClass('bg-primary')

    fireEvent.click(floralButton)

    expect(floralButton).not.toHaveClass('bg-primary')
  })

  it('submits the form with current filters', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
    render(<AdvancedSearch />)

    const input = screen.getByPlaceholderText('Search perfumes...')
    fireEvent.change(input, { target: { value: 'Chanel' } })

    const searchButton = screen.getByRole('button', { name: 'Search' })
    fireEvent.click(searchButton)

    expect(consoleSpy).toHaveBeenCalledWith(
      'Search filters:',
      expect.objectContaining({
        query: 'Chanel',
      })
    )

    consoleSpy.mockRestore()
  })
})

