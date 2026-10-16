import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { sendContactMessageNotification } from '@/lib/email-service'

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

    // Admin ko email notification bhejo
    sendContactMessageNotification(
      body.name,
      body.email || 'N/A',
      body.phone,
      body.message
    ).catch(err => console.error('Contact email failed:', err))

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

// GET: List all contact messages (admin)
export async function GET() {
  try {
    const messages = await db.contactMessage.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json({ messages })
  } catch (error) {
    console.error('Fetch messages error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}

// PATCH: Mark message as read
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Message ID zaroori hai' },
        { status: 400 }
      )
    }

    const updated = await db.contactMessage.update({
      where: { id },
      data: { isRead: true }
    })

    return NextResponse.json({
      success: true,
      message: 'Message read mark ho gaya',
      messageData: updated
    })
  } catch (error) {
    console.error('Update message error:', error)
    return NextResponse.json(
      { error: 'Status update nahi hua' },
      { status: 500 }
    )
  }
}
