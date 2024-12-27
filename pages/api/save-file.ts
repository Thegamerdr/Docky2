import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs/promises'
import path from 'path'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { path: filePath, content } = req.body

    if (!filePath || typeof filePath !== 'string') {
      return res.status(400).json({ message: 'Invalid file path' })
    }

    if (typeof content !== 'string') {
      return res.status(400).json({ message: 'Invalid content' })
    }

    // Ensure the file path is within the project directory
    const fullPath = path.join(process.cwd(), filePath)
    if (!fullPath.startsWith(process.cwd())) {
      return res.status(403).json({ message: 'Access to file path is forbidden' })
    }

    await fs.writeFile(fullPath, content, 'utf-8')

    res.status(200).json({ message: 'File saved successfully' })
  } catch (error) {
    console.error('Error saving file:', error)
    res.status(500).json({ message: 'Error saving file', error: error.message })
  }
}

