import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'

// POST: User Login
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email aur password zaroori hain' },
        { status: 400 }
      )
    }

    // Find user by email or phone
    const user = await db.user.findFirst({
      where: {
        OR: [
          { email: email.trim().toLowerCase() },
          { phone: email.trim() }
        ]
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Yeh email/phone registered nahi hai. Pehle signup karein.' },
        { status: 401 }
      )
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Password galat hai' },
        { status: 401 }
      )
    }

    // Return user (without password)
    return NextResponse.json({
      success: true,
      message: 'Login successful!',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        cnicNumber: user.cnicNumber,
      }
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Login nahi hua. Dobara try karein.' },
      { status: 500 }
    )
  }
}
