import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  const { input, messages } = await req.json()

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a code suggestion AI for a perfume marketplace analyzer project. Provide concise, relevant code snippets based on the user's input and conversation context." },
        ...messages,
        { role: "user", content: `Suggest code for: ${input}` }
      ],
    })

    return NextResponse.json({ suggestion: response.choices[0].message.content })
  } catch (error) {
    console.error('OpenAI API error:', error)
    return NextResponse.json({ error: 'Failed to get code suggestion' }, { status: 500 })
  }
}

