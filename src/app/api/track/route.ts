import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// POST: Track application by Tracking ID + Phone
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { trackingId, phone } = body

    if (!trackingId || !phone) {
      return NextResponse.json(
        { error: 'Tracking ID aur Phone number dono zaroori hain' },
        { status: 400 }
      )
    }

    const application = await db.loanApplication.findFirst({
      where: {
        trackingId: trackingId.trim().toUpperCase(),
        phoneNumber: phone.trim()
      }
    })

    if (!application) {
      return NextResponse.json(
        { error: 'Galat Tracking ID ya Phone number. Dobara check karein.' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      application: {
        trackingId: application.trackingId,
        fullName: application.fullName,
        loanType: application.loanType,
        loanAmount: application.loanAmount,
        status: application.status,
        createdAt: application.createdAt,
        updatedAt: application.updatedAt,
      }
    })

  } catch (error) {
    console.error('Track application error:', error)
    return NextResponse.json(
      { error: 'Application track nahi ho paayi. Dobara try karein.' },
      { status: 500 }
    )
  }
}
