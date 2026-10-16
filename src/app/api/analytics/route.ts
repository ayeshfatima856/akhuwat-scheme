import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET: Analytics data for admin dashboard
export async function GET() {
  try {
    // Total counts
    const totalApplications = await db.loanApplication.count()
    const pendingApplications = await db.loanApplication.count({ where: { status: 'Pending' } })
    const approvedApplications = await db.loanApplication.count({ where: { status: 'Approved' } })
    const rejectedApplications = await db.loanApplication.count({ where: { status: 'Rejected' } })

    // Total loan amount
    const allApps = await db.loanApplication.findMany({
      select: { loanAmount: true, status: true, createdAt: true, loanType: true }
    })

    const totalLoanAmount = allApps.reduce((sum, app) => sum + app.loanAmount, 0)
    const approvedLoanAmount = allApps
      .filter(app => app.status === 'Approved')
      .reduce((sum, app) => sum + app.loanAmount, 0)

    // Applications by loan type
    const byLoanType: Record<string, number> = {}
    allApps.forEach(app => {
      byLoanType[app.loanType] = (byLoanType[app.loanType] || 0) + 1
    })

    // Applications by status
    const byStatus = {
      Pending: pendingApplications,
      Approved: approvedApplications,
      Rejected: rejectedApplications,
    }

    // Monthly applications (last 6 months)
    const monthlyData: { month: string; count: number; amount: number }[] = []
    const now = new Date()
    for (let i = 5; i >= 0; i--) {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59)
      
      const monthApps = allApps.filter(app => 
        app.createdAt >= startOfMonth && app.createdAt <= endOfMonth
      )
      
      const monthName = startOfMonth.toLocaleString('en-US', { month: 'short' })
      monthlyData.push({
        month: monthName,
        count: monthApps.length,
        amount: monthApps.reduce((sum, app) => sum + app.loanAmount, 0)
      })
    }

    // Recent applications (last 7 days)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    const recentApplications = allApps.filter(app => app.createdAt >= sevenDaysAgo).length

    // Conversion rate (approved / total)
    const conversionRate = totalApplications > 0 
      ? Math.round((approvedApplications / totalApplications) * 100) 
      : 0

    // Total users
    const totalUsers = await db.user.count()
    
    // Total contact messages
    const totalMessages = await db.contactMessage.count()
    const unreadMessages = await db.contactMessage.count({ where: { isRead: false } })

    return NextResponse.json({
      success: true,
      analytics: {
        // Application stats
        totalApplications,
        pendingApplications,
        approvedApplications,
        rejectedApplications,
        recentApplications,
        conversionRate,
        
        // Financial stats
        totalLoanAmount,
        approvedLoanAmount,
        averageLoanAmount: totalApplications > 0 ? Math.round(totalLoanAmount / totalApplications) : 0,
        
        // User stats
        totalUsers,
        
        // Message stats
        totalMessages,
        unreadMessages,
        
        // Charts data
        byLoanType,
        byStatus,
        monthlyData,
      }
    })

  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json(
      { error: 'Analytics data load nahi hua' },
      { status: 500 }
    )
  }
}
