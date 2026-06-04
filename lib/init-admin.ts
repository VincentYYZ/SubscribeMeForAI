import { prisma } from './prisma'

let initialized = false

/**
 * Initialize admin account if it doesn't exist
 * This function is safe to call multiple times - it only creates the account once
 */
export async function initAdminAccount() {
  // Prevent multiple initializations
  if (initialized) {
    return
  }

  try {
    // Admin account configuration from environment variables
    const adminName = process.env.ADMIN_NAME || 'admin'
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@qq.com'
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin'
    const adminPin = process.env.ADMIN_PIN || '1212'

    // Check if admin account already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail },
    })

    if (existingAdmin) {
      console.log('✅ Admin account already exists')
      initialized = true
      return
    }

    // Create admin account
    console.log('🔐 Creating admin account...')
    await prisma.user.create({
      data: {
        name: adminName,
        email: adminEmail,
        password: adminPassword,
        pin: adminPin,
      },
    })
    console.log('✅ Admin account created successfully')
    console.log(`   - Name: ${adminName}`)
    console.log(`   - Email: ${adminEmail}`)
    console.log(`   - PIN: ${adminPin}`)

    initialized = true
  } catch (error) {
    console.error('❌ Failed to initialize admin account:', error)
    // Don't throw error to prevent app from starting
  }
}
