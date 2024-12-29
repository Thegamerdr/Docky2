import fs from 'fs/promises'
import path from 'path'
import { mockPerfumes } from '../lib/mockData'

async function backupDatabase() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const backupDir = path.join(__dirname, '..', 'backups')
  const backupFile = path.join(backupDir, `backup-${timestamp}.json`)

  try {
    // Ensure the backup directory exists
    await fs.mkdir(backupDir, { recursive: true })

    // Fetch user-generated content (in a real app, this would come from a database)
    const userContent = await fetchUserContent()

    // Combine mock data and user content
    const backupData = {
      perfumes: mockPerfumes,
      userContent,
    }

    // Write the backup file
    await fs.writeFile(backupFile, JSON.stringify(backupData, null, 2))

    console.log(`Backup created successfully: ${backupFile}`)
  } catch (error) {
    console.error('Error creating backup:', error)
  }
}

async function fetchUserContent() {
  // In a real application, this would fetch data from your database
  // For now, we'll return some mock user-generated content
  return {
    reviews: [
      { id: 1, userId: 'user1', perfumeId: '1', rating: 5, comment: 'Great perfume!' },
      { id: 2, userId: 'user2', perfumeId: '2', rating: 4, comment: 'Nice scent, but a bit pricey.' },
    ],
    wishlists: [
      { id: 1, userId: 'user1', perfumeIds: ['1', '3', '5'] },
      { id: 2, userId: 'user2', perfumeIds: ['2', '4', '6'] },
    ],
  }
}

backupDatabase()

