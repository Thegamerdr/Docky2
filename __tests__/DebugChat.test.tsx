import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import DebugChat from '../components/DebugChat'

jest.mock('ai/react', () => ({
  useChat: () => ({
    messages: [],
    input: '',
    handleInputChange: jest.fn(),
    handleSubmit: jest.fn(),
    isLoading: false,
    error: null,
  }),
}))

describe('DebugChat', () => {
  it('renders correctly', () => {
    render(<DebugChat onClose={() => {}} />)
    expect(screen.getByText('Debug Chat (BlenderBot)')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Type a message...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    const onCloseMock = jest.fn()
    render(<DebugChat onClose={onCloseMock} />)
    fireEvent.click(screen.getByRole('button', { name: 'Close' }))
    expect(onCloseMock).toHaveBeenCalled()
  })
})

