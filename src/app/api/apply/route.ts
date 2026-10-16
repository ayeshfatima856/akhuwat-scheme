import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// POST: Submit a new loan application
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const required = ['fullName', 'fatherName', 'cnicNumber', 'phoneNumber', 
                      'ageAbove18', 'gender', 'maritalStatus', 'address', 
                      'city', 'province', 'loanType', 'loanAmount', 'loanPurpose']
    
    for (const field of required) {
      if (!body[field] || body[field].toString().trim() === '') {
        return NextResponse.json(
          { error: `Field "${field}" is required` },
          { status: 400 }
        )
      }
    }

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
        address: body.address.trim(),
        city: body.city.trim(),
        province: body.province,
        loanType: body.loanType,
        loanAmount: parseFloat(body.loanAmount),
        loanPurpose: body.loanPurpose,
        monthlyIncome: body.monthlyIncome ? parseFloat(body.monthlyIncome) : null,
        photoUrl: body.photoUrl || null,
        cnicFrontUrl: body.cnicFrontUrl || null,
        cnicBackUrl: body.cnicBackUrl || null,
        utilityBillUrl: body.utilityBillUrl || null,
      }
    })

    return NextResponse.json(
      { 
        success: true, 
        message: 'Aapki loan application successfully submit ho gayi hai! Hamari team aap se jald raabta karegi.',
        applicationId: application.id 
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
      orderBy: { createdAt: 'desc' }
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
