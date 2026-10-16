// ============================================================
// VERCEL BUILD SCRIPT - Database Setup
// ============================================================
// Yeh script Vercel ke build ke time chalegi
// Naya SQLite database banayega aur seed data add karega
// ============================================================

const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const { execSync } = require('child_process')

async function main() {
  console.log('🚀 Setting up production database...')
  
  // Database push karo (schema create karo)
  try {
    execSync('npx prisma db push --accept-data-loss', { stdio: 'inherit' })
    console.log('✅ Database schema created')
  } catch (error) {
    console.log('⚠️ Database push skipped (may already exist)')
  }

  const prisma = new PrismaClient()
  
  try {
    // Admin user create karo (agar nahi hai to)
    const existingAdmin = await prisma.adminUser.findUnique({ where: { username: 'admin' } })
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10)
      await prisma.adminUser.create({
        data: {
          username: 'admin',
          email: 'admin@akhuwatscheme.com',
          password: hashedPassword,
          role: 'super_admin',
        },
      })
      console.log('✅ Admin user created (admin / admin123)')
    } else {
      console.log('ℹ️ Admin user already exists')
    }
    
    console.log('🎉 Database setup complete!')
  } catch (error) {
    console.error('❌ Database setup error:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

main()
  .catch(console.error)
