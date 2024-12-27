import { PrismaClient } from '@prisma/client'
import { perfumes } from '../lib/perfumeData'

const prisma = new PrismaClient()

async function main() {
  for (const perfume of perfumes) {
    await prisma.perfume.create({
      data: perfume,
    })
  }
  console.log('Seed data inserted successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

