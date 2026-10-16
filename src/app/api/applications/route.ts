import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

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

    const updated = await db.loanApplication.update({
      where: { id },
      data: { status }
    })

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
