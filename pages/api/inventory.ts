import { NextApiRequest, NextApiResponse } from 'next';

// This is a mock inventory. In a real application, this would come from a database.
const inventory = [
  { id: 1, name: 'Chanel No. 5', quantity: 50, price: 99.99 },
  { id: 2, name: 'Dior Sauvage', quantity: 30, price: 89.99 },
  { id: 3, name: 'Yves Saint Laurent Black Opium', quantity: 20, price: 79.99 },
  { id: 4, name: 'Giorgio Armani Acqua di Gio', quantity: 15, price: 69.99 },
  { id: 5, name: 'Tom Ford Black Orchid', quantity: 25, price: 129.99 },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(inventory);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

