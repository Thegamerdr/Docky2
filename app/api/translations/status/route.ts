import { NextResponse } from 'next/server'
import { CrowdinApi } from '@crowdin/crowdin-api-client'

const crowdin = new CrowdinApi({
  token: process.env.CROWDIN_PERSONAL_TOKEN!,
  organization: process.env.CROWDIN_ORGANIZATION
})

export async function GET() {
  try {
    if (!process.env.CROWDIN_PERSONAL_TOKEN) {
      throw new Error('CROWDIN_PERSONAL_TOKEN is not configured')
    }

    const projectId = process.env.CROWDIN_PROJECT_ID
    if (!projectId) {
      throw new Error('CROWDIN_PROJECT_ID is not configured')
    }

    // Get project progress
    const progress = await crowdin.translationStatus.getProjectProgress(projectId)

    // Format the response
    const formattedProgress = progress.data.map((lang) => ({
      locale: lang.data.languageId,
      progress: lang.data.translationProgress,
      approvalProgress: lang.data.approvalProgress,
      totalStrings: lang.data.phrases.total,
      translatedStrings: lang.data.phrases.translated
    }))

    return NextResponse.json(formattedProgress)
  } catch (error) {
    console.error('Error fetching translation status:', error)
    return NextResponse.json(
      { error: 'Failed to fetch translation status' },
      { status: 500 }
    )
  }
}

