import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { sendApplicationSubmittedEmail, sendAdminNotification } from '@/lib/email-service'

// Helper: Unique tracking ID generate karna
function generateTrackingId(): string {
  const prefix = 'AKH'
  const random = Math.floor(100000 + Math.random() * 900000)
  return `${prefix}-${random}`
}

// Helper: Unique tracking ID ensure karna (collision check)
async function getUniqueTrackingId(): Promise<string> {
  let trackingId = generateTrackingId()
  let exists = await db.loanApplication.findUnique({ where: { trackingId } })
  while (exists) {
    trackingId = generateTrackingId()
    exists = await db.loanApplication.findUnique({ where: { trackingId } })
  }
  return trackingId
}

// POST: Submit a new loan application
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const required = ['fullName', 'fatherName', 'cnicNumber', 'phoneNumber', 
                      'ageAbove18', 'gender', 'maritalStatus',
                      'province', 'loanType', 'loanAmount', 'loanPurpose']
    
    for (const field of required) {
      if (!body[field] || body[field].toString().trim() === '') {
        return NextResponse.json(
          { error: `Field "${field}" is required` },
          { status: 400 }
        )
      }
    }

    // Unique tracking ID generate karo
    const trackingId = await getUniqueTrackingId()

    // Create the loan application
    const application = await db.loanApplication.create({
      data: {
        fullName: body.fullName.trim(),
        fatherName: body.fatherName.trim(),
        cnicNumber: body.cnicNumber.trim(),
        phoneNumber: body.phoneNumber.trim(),
        email: body.email?.trim() || null,
        ageAbove18: body.ageAbove18,
        gender: body.gender,
        maritalStatus: body.maritalStatus,
        city: body.city?.trim() || 'N/A',
        province: body.province,
        bankAccount: body.bankAccount?.trim() || null,
        loanType: body.loanType,
        loanAmount: parseFloat(body.loanAmount),
        loanPurpose: body.loanPurpose,
        monthlyIncome: body.monthlyIncome ? parseFloat(body.monthlyIncome) : null,
        cnicFrontUrl: body.cnicFrontUrl || null,
        cnicBackUrl: body.cnicBackUrl || null,
        utilityBillUrl: body.utilityBillUrl || null,
        trackingId,
        userId: body.userId || null,
      }
    })

    // Email notifications bhejo (async, non-blocking)
    if (body.email) {
      sendApplicationSubmittedEmail(
        body.email,
        body.fullName,
        trackingId,
        body.loanType,
        parseFloat(body.loanAmount)
      ).catch(err => console.error('Email failed:', err))
    }
    
    // Admin ko notification bhejo
    sendAdminNotification(
      body.fullName,
      trackingId,
      body.loanType,
      parseFloat(body.loanAmount),
      body.phoneNumber
    ).catch(err => console.error('Admin email failed:', err))

    return NextResponse.json(
      { 
        success: true, 
        message: `Aapki loan application successfully submit ho gayi hai! Aapka Tracking ID: ${trackingId}`,
        applicationId: application.id,
        trackingId,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Loan application error:', error)
    return NextResponse.json(
      { error: 'Application submit nahi hui. Dobara try karein.' },
      { status: 500 }
    )
  }
}

// GET: List all applications (for admin)
export async function GET() {
  try {
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
