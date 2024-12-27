import { cache } from 'react'
import { API_CONFIG } from '@/lib/constants'

class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message)
    this.name = 'APIError'
  }
}

async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout)

  try {
    const response = await fetch(`${API_CONFIG.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new APIError(
        error.message || 'An error occurred',
        response.status,
        error
      )
    }

    return response.json()
  } catch (error) {
    if (error instanceof APIError) throw error
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new APIError('Request timeout', 408)
      }
      throw new APIError(error.message, 500)
    }
    throw new APIError('An unknown error occurred', 500)
  }
}

export const api = {
  get: cache(async <T>(endpoint: string, options?: RequestInit) => {
    return fetchAPI<T>(endpoint, { ...options, method: 'GET' })
  }),

  post: cache(async <T>(endpoint: string, data: any, options?: RequestInit) => {
    return fetchAPI<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    })
  }),

  put: cache(async <T>(endpoint: string, data: any, options?: RequestInit) => {
    return fetchAPI<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }),

  delete: cache(async <T>(endpoint: string, options?: RequestInit) => {
    return fetchAPI<T>(endpoint, { ...options, method: 'DELETE' })
  }),
}

