import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { SearchForm } from '@/components/SearchForm'

describe('SearchForm', () => {
  it('renders correctly', () => {
    render(<SearchForm onSearch={() => {}} />)
    expect(screen.getByPlaceholderText('Search perfumes...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument()
  })

  it('calls onSearch with input value when form is submitted', () => {
    const mockOnSearch = jest.fn()
    render(<SearchForm onSearch={mockOnSearch} />)
    
    const input = screen.getByPlaceholderText('Search perfumes...')
    fireEvent.change(input, { target: { value: 'Chanel' } })
    
    const button = screen.getByRole('button', { name: 'Search' })
    fireEvent.click(button)

    expect(mockOnSearch).toHaveBeenCalledWith('Chanel')
  })
})

