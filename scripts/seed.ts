import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

// Helper: Random tracking ID generate karna
function generateTrackingId(): string {
  const prefix = 'AKH'
  const random = Math.floor(100000 + Math.random() * 900000)
  return `${prefix}-${random}`
}

async function main() {
  console.log('🌱 Seeding database...')
  
  // ===== 1. Admin User Create =====
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  await prisma.adminUser.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@akhuwatscheme.com',
      password: hashedPassword,
      role: 'super_admin',
    },
  })
  console.log('✅ Admin user created (admin / admin123)')

  // ===== 2. Regular User Create (for testing user login) =====
  const userPassword = await bcrypt.hash('user123', 10)
  
  const testUser = await prisma.user.upsert({
    where: { email: 'ahmed@example.com' },
    update: {},
    create: {
      name: 'Ahmed Khan',
      email: 'ahmed@example.com',
      phone: '+923001234567',
      password: userPassword,
      cnicNumber: '35202-1234567-1',
    },
  })
  console.log('✅ Test user created (ahmed@example.com / user123)')

  // ===== 3. Sample Loan Applications =====
  const sampleApps = [
    {
      fullName: 'Ahmed Khan',
      fatherName: 'Muhammad Khan',
      cnicNumber: '35202-1234567-1',
      phoneNumber: '+923001234567',
      email: 'ahmed@example.com',
      ageAbove18: 'Yes',
      gender: 'Male',
      maritalStatus: 'Married',
      city: 'Lahore',
      province: 'Punjab',
      bankAccount: 'PK36SCBL0000001123456702',
      loanType: 'Business Loan',
      loanAmount: 100000,
      loanPurpose: 'New Business',
      monthlyIncome: 45000,
      status: 'Pending',
      userId: testUser.id,
    },
    {
      fullName: 'Fatima Bibi',
      fatherName: 'Abdul Rahman',
      cnicNumber: '42101-9876543-2',
      phoneNumber: '+923211234567',
      email: 'fatima@example.com',
      ageAbove18: 'Yes',
      gender: 'Female',
      maritalStatus: 'Married',
      city: 'Karachi',
      province: 'Sindh',
      bankAccount: 'PK24MEBL0000000223456789',
      loanType: 'Education Loan',
      loanAmount: 50000,
      loanPurpose: 'Education',
      monthlyIncome: 30000,
      status: 'Approved',
    },
    {
      fullName: 'Muhammad Raza',
      fatherName: 'Ghulam Raza',
      cnicNumber: '33100-5555555-3',
      phoneNumber: '+923331234567',
      email: 'raza@example.com',
      ageAbove18: 'Yes',
      gender: 'Male',
      maritalStatus: 'Married',
      city: 'Multan',
      province: 'Punjab',
      bankAccount: 'PK58BAHL0000000334567890',
      loanType: 'Agriculture Loan',
      loanAmount: 75000,
      loanPurpose: 'Agriculture',
      monthlyIncome: 35000,
      status: 'Pending',
    },
  ]

  for (const app of sampleApps) {
    const existing = await prisma.loanApplication.findFirst({
      where: { cnicNumber: app.cnicNumber }
    })
    if (!existing) {
      // Unique tracking ID generate karo
      let trackingId = generateTrackingId()
      let trackingExists = await prisma.loanApplication.findUnique({ where: { trackingId } })
      while (trackingExists) {
        trackingId = generateTrackingId()
        trackingExists = await prisma.loanApplication.findUnique({ where: { trackingId } })
      }
      
      await prisma.loanApplication.create({
        data: { ...app, trackingId }
      })
    }
  }
  console.log('✅ Sample loan applications created (3)')

  // ===== 4. Sample Contact Messages =====
  const sampleMessages = [
    {
      name: 'Sara Ali',
      email: 'sara@example.com',
      phone: '+923331234567',
      subject: 'Loan inquiry',
      message: 'Mujhe business loan ke baare mein maloomat chahiye. Kya main apply kar sakti hoon?',
      isRead: false,
    },
    {
      name: 'Bilal Ahmad',
      email: 'bilal@example.com',
      phone: '+923451234567',
      subject: 'Application status',
      message: 'Meri application ka status kya hai? Tracking ID: AKH-123456',
      isRead: true,
    },
  ]

  for (const msg of sampleMessages) {
    const existing = await prisma.contactMessage.findFirst({
      where: { phone: msg.phone }
    })
    if (!existing) {
      await prisma.contactMessage.create({ data: msg })
    }
  }
  console.log('✅ Sample contact messages created (2)')

  console.log('\n🎉 Database seeded successfully!')
  console.log('\n📋 Login Credentials:')
  console.log('   Admin:  admin / admin123')
  console.log('   User:   ahmed@example.com / user123')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
