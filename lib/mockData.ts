import { Perfume } from '@/types/perfume'

export const mockPerfumes: Perfume[] = [
  {
    id: '1',
    name: 'Chanel No. 5',
    brand: 'Chanel',
    price: 99.99,
    rating: 4.5,
    image: '/images/chanel-no-5.jpg',
    notes: ['aldehydes', 'jasmine', 'rose'],
    description: 'An iconic fragrance that has endured for decades.',
  },
  {
    id: '2',
    name: 'Dior Sauvage',
    brand: 'Dior',
    price: 89.99,
    rating: 4.7,
    image: '/images/dior-sauvage.jpg',
    notes: ['bergamot', 'pepper', 'ambroxan'],
    description: 'A fresh and bold scent for the modern man.',
  },
  // Add more mock perfumes here...
]

