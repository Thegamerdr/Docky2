import { PrismaClient } from '@prisma/client'
import fetch from 'node-fetch'
import { parse } from 'csv-parse/sync'

const prisma = new PrismaClient()

async function importDupes() {
  try {
    const response = await fetch('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/List%20perfume%20clone.pdf.xlsx%20-%20Copy%20of%20Full%20Master%20Perfume%20Lis-fWheyWPuIWeLbHHJcyYTiOGr1boH6e.csv')
    const text = await response.text()
    
    const records = parse(text, {
      columns: true,
      skip_empty_lines: true
    })

    for (const record of records) {
      const originalPerfume = await prisma.perfume.findFirst({
        where: {
          name: record.Phantom
        }
      })

      if (!originalPerfume) {
        // Create the original perfume if it doesn't exist
        const newPerfume = await prisma.perfume.create({
          data: {
            name: record.Phantom,
            brand: 'Unknown', // You might want to add this to your CSV
            price: 0, // Default price
            rating: 0, // Default rating
            image: '/placeholder.svg', // Default image
            notes: [],
            description: '',
            concentration: record['Concentration'],
            season: record['Season'] || null,
          }
        })

        // Create the dupe
        await prisma.perfumeDupe.create({
          data: {
            perfumeId: newPerfume.id,
            dupeBrand: record['Dupe Brand'],
            dupeName: record['Name of Dupe Fragrance'],
            concentration: record['Concentration'],
          }
        })
      } else {
        // Create just the dupe for existing perfume
        await prisma.perfumeDupe.create({
          data: {
            perfumeId: originalPerfume.id,
            dupeBrand: record['Dupe Brand'],
            dupeName: record['Name of Dupe Fragrance'],
            concentration: record['Concentration'],
          }
        })
      }
    }

    console.log('Import completed successfully')
  } catch (error) {
    console.error('Error importing dupes:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

importDupes()

