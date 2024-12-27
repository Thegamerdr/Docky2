import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
import { getSession } from 'next-auth/react'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { query } = req.query
    
    try {
      let perfumes
      if (query) {
        perfumes = await prisma.perfume.findMany({
          where: {
            OR: [
              { name: { contains: query.toString(), mode: 'insensitive' } },
              { brand: { contains: query.toString(), mode: 'insensitive' } },
            ],
          },
          include: {
            dupes: true
          }
        })
      } else {
        perfumes = await prisma.perfume.findMany({
          include: {
            dupes: true
          }
        })
      }
      res.status(200).json(perfumes)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch perfumes' })
    }
  } else {
    const session = await getSession({ req })

    if (!session || session.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Unauthorized' })
    }

    switch (req.method) {
      case 'POST':
        return handlePOST(req, res)
      case 'PUT':
        return handlePUT(req, res)
      case 'DELETE':
        return handleDELETE(req, res)
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  }
}

async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
  const { name, brand, price, rating, image, notes, description, concentration, season, dupes } = req.body

  try {
    const perfume = await prisma.perfume.create({
      data: {
        name,
        brand,
        price: parseFloat(price),
        rating: parseFloat(rating),
        image,
        notes: notes.split(',').map((note: string) => note.trim()),
        description,
        concentration,
        season,
        dupes: {
          create: dupes || []
        }
      },
      include: {
        dupes: true
      }
    })
    res.status(201).json(perfume)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create perfume' })
  }
}

async function handlePUT(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const { name, brand, price, rating, image, notes, description, concentration, season, dupes } = req.body

  try {
    const perfume = await prisma.perfume.update({
      where: { id: id as string },
      data: {
        name,
        brand,
        price: parseFloat(price),
        rating: parseFloat(rating),
        image,
        notes: notes.split(',').map((note: string) => note.trim()),
        description,
        concentration,
        season,
        dupes: {
          deleteMany: {},
          create: dupes || []
        }
      },
      include: {
        dupes: true
      }
    })
    res.status(200).json(perfume)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update perfume' })
  }
}

async function handleDELETE(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  try {
    await prisma.perfumeDupe.deleteMany({
      where: { perfumeId: id as string }
    })
    await prisma.perfume.delete({
      where: { id: id as string }
    })
    res.status(204).end()
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete perfume' })
  }
}

