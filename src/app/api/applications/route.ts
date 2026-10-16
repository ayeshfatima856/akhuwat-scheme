import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { sendStatusUpdateEmail } from '@/lib/email-service'

// PATCH: Update application status (Approve/Reject/Pending)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json(
        { error: 'Application ID aur status zaroori hain' },
        { status: 400 }
      )
    }

    if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be: Pending, Approved, or Rejected' },
        { status: 400 }
      )
    }

    // Pehle application nikalo (email bhejne ke liye)
    const existingApp = await db.loanApplication.findUnique({ where: { id } })
    
    if (!existingApp) {
      return NextResponse.json(
        { error: 'Application nahi mili' },
        { status: 404 }
      )
    }

    // Status update karo
    const updated = await db.loanApplication.update({
      where: { id },
      data: { status }
    })

    // Email notification bhejo user ko (agar email hai)
    if (existingApp.email && existingApp.status !== status) {
      sendStatusUpdateEmail(
        existingApp.email,
        existingApp.fullName,
        existingApp.trackingId,
        status
      ).catch(err => console.error('Status update email failed:', err))
    }

    return NextResponse.json({
      success: true,
      message: `Application status update ho gaya: ${status}`,
      application: updated
    })
  } catch (error) {
    console.error('Update application error:', error)
    return NextResponse.json(
      { error: 'Status update nahi hua' },
      { status: 500 }
    )
  }
}

// GET: Single application details
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const trackingId = searchParams.get('trackingId')
    const phone = searchParams.get('phone')

    // Single application by ID
    if (id) {
      const application = await db.loanApplication.findUnique({
        where: { id },
        include: { user: { select: { name: true, email: true } } }
      })
      
      if (!application) {
        return NextResponse.json(
          { error: 'Application nahi mili' },
          { status: 404 }
        )
      }
      
      return NextResponse.json({ application })
    }

    // Track application by trackingId + phone
    if (trackingId && phone) {
      const application = await db.loanApplication.findFirst({
        where: {
          trackingId,
          phoneNumber: phone
        }
      })
      
      if (!application) {
        return NextResponse.json(
          { error: 'Galat Tracking ID ya Phone number' },
          { status: 404 }
        )
      }
      
      return NextResponse.json({ application })
    }

    // All applications (admin)
    const applications = await db.loanApplication.findMany({
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { name: true, email: true } } }
    })
    
    return NextResponse.json({ applications })
  } catch (error) {
    console.error('Fetch applications error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    )
  }
}
