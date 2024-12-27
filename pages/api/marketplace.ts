import { NextApiRequest, NextApiResponse } from 'next';
import { PerfumeData } from '../../types/perfume';

// Mock data for the marketplace
const marketplaceData: PerfumeData[] = [
  {
    id: 1,
    name: 'Chanel No. 5',
    brand: 'Chanel',
    price: 99.99,
    rating: 4.8
  },
  {
    id: 2,
    name: 'Dior Sauvage',
    brand: 'Dior',
    price: 89.99,
    rating: 4.7
  },
  {
    id: 3,
    name: 'Black Opium',
    brand: 'Yves Saint Laurent',
    price: 79.99,
    rating: 4.9
  },
  {
    id: 4,
    name: 'Acqua di Gio',
    brand: 'Giorgio Armani',
    price: 69.99,
    rating: 4.6
  },
  {
    id: 5,
    name: 'Black Orchid',
    brand: 'Tom Ford',
    price: 129.99,
    rating: 4.8
  }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(marketplaceData);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

