import { NextApiRequest, NextApiResponse } from 'next'
import { createMocks } from 'node-mocks-http'
import handler from '@/pages/api/perfumes'

jest.mock('@/lib/mockData', () => ({
  mockPerfumes: [
    { id: '1', name: 'Perfume 1', brand: 'Brand A', price: 100, notes: ['floral'] },
    { id: '2', name: 'Perfume 2', brand: 'Brand B', price: 200, notes: ['woody'] },
  ],
}))

describe('/api/perfumes', () => {
  it('returns all perfumes when no query params are provided', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toHaveLength(2)
  })

  it('filters perfumes by query', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
      query: { query: 'Perfume 1' },
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toHaveLength(1)
    expect(JSON.parse(res._getData())[0].name).toBe('Perfume 1')
  })

  it('filters perfumes by brand', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
      query: { brand: 'Brand B' },
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toHaveLength(1)
    expect(JSON.parse(res._getData())[0].brand).toBe('Brand B')
  })

  it('filters perfumes by price range', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
      query: { minPrice: '150', maxPrice: '250' },
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toHaveLength(1)
    expect(JSON.parse(res._getData())[0].price).toBe(200)
  })

  it('filters perfumes by notes', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
      query: { notes: ['woody'] },
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toHaveLength(1)
    expect(JSON.parse(res._getData())[0].notes).toContain('woody')
  })
})

