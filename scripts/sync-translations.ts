import { exec } from 'child_process'
import { promisify } from 'util'
import * as fs from 'fs/promises'
import * as path from 'path'

const execAsync = promisify(exec)

async function syncTranslations() {
  try {
    // Check if CROWDIN_PERSONAL_TOKEN is set
    if (!process.env.CROWDIN_PERSONAL_TOKEN) {
      throw new Error('CROWDIN_PERSONAL_TOKEN environment variable is not set')
    }

    // Upload source files
    console.log('Uploading source files to Crowdin...')
    await execAsync('crowdin upload sources')

    // Download translations
    console.log('Downloading translations from Crowdin...')
    await execAsync('crowdin download')

    // Verify translation files
    const locales = ['en', 'es', 'fr']
    for (const locale of locales) {
      const messagesPath = path.join(process.cwd(), 'messages', `${locale}.json`)
      try {
        await fs.access(messagesPath)
        console.log(`✓ ${locale}.json exists`)
      } catch {
        console.warn(`⚠ Warning: ${locale}.json is missing`)
      }
    }

    console.log('Translation sync completed successfully!')
  } catch (error) {
    console.error('Error syncing translations:', error)
    process.exit(1)
  }
}

syncTranslations()

