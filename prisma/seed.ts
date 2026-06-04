import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Admin account configuration from environment variables
  const adminName = process.env.ADMIN_NAME || 'admin'
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@qq.com'
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin'
  const adminPin = process.env.ADMIN_PIN || '1212'

  console.log(`📧 Checking for admin account: ${adminEmail}`)

  // Check if admin account already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  })

  if (existingAdmin) {
    console.log('✅ Admin account already exists, skipping creation')
  } else {
    // Create admin account
    console.log('🔐 Creating admin account...')
    const admin = await prisma.user.create({
      data: {
        name: adminName,
        email: adminEmail,
        password: adminPassword,
        pin: adminPin,
      },
    })
    console.log('✅ Admin account created successfully')
    console.log(`   - Name: ${admin.name}`)
    console.log(`   - Email: ${admin.email}`)
    console.log(`   - PIN: ${admin.pin}`)
  }

  console.log('🎉 Seed completed successfully')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
