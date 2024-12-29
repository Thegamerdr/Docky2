import { NextResponse } from 'next/server'
import { hash } from 'bcryptjs'

// In-memory storage for users (this is temporary and not suitable for production)
let users: any[] = []

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: 'Password must be at least 8 characters long' },
        { status: 400 }
      )
    }

    const existingUser = users.find(user => user.email === email)
    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 409 }
      )
    }

    const hashedPassword = await hash(password, 12)

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
    }

    users.push(newUser)

    return NextResponse.json({ user: { id: newUser.id, name: newUser.name, email: newUser.email } })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { message: 'An error occurred while registering the user.' },
      { status: 500 }
    )
  }
}

