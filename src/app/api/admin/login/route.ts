import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'

// POST: Admin login
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username aur password dono zaroori hain' },
        { status: 400 }
      )
    }

    // Find admin user
    const admin = await db.adminUser.findUnique({
      where: { username: username.trim() }
    })

    if (!admin) {
      return NextResponse.json(
        { error: 'Yeh username exist nahi karta' },
        { status: 401 }
      )
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, admin.password)
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Password galat hai' },
        { status: 401 }
      )
    }

    // Return admin info (without password)
    return NextResponse.json({
      success: true,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
      }
    })
  } catch (error) {
    console.error('Admin login error:', error)
    return NextResponse.json(
      { error: 'Login nahi hua. Dobara try karein.' },
      { status: 500 }
    )
  }
}
