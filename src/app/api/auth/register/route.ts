import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'

// POST: User Registration (signup)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, password, cnicNumber } = body

    // Validation
    if (!name || !email || !phone || !password) {
      return NextResponse.json(
        { error: 'Saari fields zaroori hain (name, email, phone, password)' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password kam az kam 6 characters ka hona chahiye' },
        { status: 400 }
      )
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email format galat hai' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingEmail = await db.user.findUnique({ where: { email } })
    if (existingEmail) {
      return NextResponse.json(
        { error: 'Yeh email pehle se registered hai. Login karein.' },
        { status: 409 }
      )
    }

    const existingPhone = await db.user.findUnique({ where: { phone } })
    if (existingPhone) {
      return NextResponse.json(
        { error: 'Yeh phone number pehle se registered hai' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await db.user.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        password: hashedPassword,
        cnicNumber: cnicNumber?.trim() || null,
      }
    })

    // Return user (without password)
    return NextResponse.json({
      success: true,
      message: 'Account successfully ban gaya! Ab login karein.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Account nahi bana. Dobara try karein.' },
      { status: 500 }
    )
  }
}
