import { PerfumeData } from '@/types/perfume'
import { getSession } from 'next-auth/react'

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
}

export const fetchPerfumes = async (query?: string): Promise<PerfumeData[]> => {
  try {
    const session = await getSession()
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}/api/perfumes${query ? `?query=${encodeURIComponent(query)}` : ''}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }
    if (session?.accessToken) {
      headers['Authorization'] = `Bearer ${session.accessToken}`
    }
    const response = await fetch(url, { headers })
    
    if (!response.ok) {
      throw new Error(`Failed to fetch perfumes: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching perfumes:', error);
    throw error;
  }
}

