import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create default admin user
  // Username: admin
  // Password: admin123
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  await prisma.adminUser.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@akhuwatscheme.com',
      password: hashedPassword,
    },
  })

  // Create sample loan applications for demo
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
      address: 'House 123, Block A, Johar Town',
      city: 'Lahore',
      province: 'Punjab',
      loanType: 'Business Loan',
      loanAmount: 100000,
      loanPurpose: 'New Business',
      monthlyIncome: 45000,
      status: 'Pending',
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
      address: 'House 45, Block C, Gulshan',
      city: 'Karachi',
      province: 'Sindh',
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
      address: 'Village Chak 45, Tehsil Pindi',
      city: 'Rawalpindi',
      province: 'Punjab',
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
      await prisma.loanApplication.create({ data: app })
    }
  }

  console.log('✅ Seed data inserted successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
