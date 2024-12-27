import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  const apiKey = process.env.GOOGLE_SHOPPING_API_KEY;
  const cx = process.env.GOOGLE_SHOPPING_CX; // Custom Search Engine ID

  if (!apiKey || !cx) {
    return res.status(500).json({ error: 'Google Shopping API configuration is missing' });
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(q as string)}&searchType=shopping`
    );

    if (!response.ok) {
      throw new Error(`Google API responded with status: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching from Google Shopping API:', error);
    res.status(500).json({ error: 'Failed to fetch data from Google Shopping API' });
  }
}

