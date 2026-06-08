import { prisma } from './prisma'
import { getAdminConfig } from './admin-config'

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
    // Load admin configuration from config/admin.json
    const config = getAdminConfig()
    const adminName = config.name
    const adminEmail = config.email
    const adminPassword = config.password
    const adminPin = config.pin

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
