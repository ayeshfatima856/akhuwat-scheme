import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// POST: Submit a contact message
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    if (!body.name || !body.phone || !body.message) {
      return NextResponse.json(
        { error: 'Name, Phone aur Message zaroori hain' },
        { status: 400 }
      )
    }

    const message = await db.contactMessage.create({
      data: {
        name: body.name.trim(),
        email: body.email?.trim() || null,
        phone: body.phone.trim(),
        subject: body.subject?.trim() || null,
        message: body.message.trim(),
      }
    })

    return NextResponse.json(
      { 
        success: true, 
        message: 'Aapka message mil gaya! Hamari team jald raabta karegi.',
        messageId: message.id 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Contact message error:', error)
    return NextResponse.json(
      { error: 'Message submit nahi hua. Dobara try karein.' },
      { status: 500 }
    )
  }
}
