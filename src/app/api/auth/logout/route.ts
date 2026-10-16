import { NextResponse } from 'next/server'

// POST: User Logout
export async function POST() {
  try {
    // Client-side par localStorage clear hoga
    return NextResponse.json({
      success: true,
      message: 'Logout successful'
    })
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Logout nahi hua' },
      { status: 500 }
    )
  }
}
