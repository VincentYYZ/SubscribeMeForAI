import { readFileSync } from 'fs'
import { join } from 'path'

interface AdminConfig {
  name: string
  email: string
  password: string
  pin: string
}

let cachedConfig: AdminConfig | null = null

export function getAdminConfig(): AdminConfig {
  if (cachedConfig) {
    return cachedConfig
  }

  try {
    const configPath = join(process.cwd(), 'config', 'admin.json')
    const raw = readFileSync(configPath, 'utf-8')
    const config = JSON.parse(raw) as AdminConfig
    cachedConfig = config
    return config
  } catch (error) {
    console.warn('⚠️ Failed to load config/admin.json, using defaults:', error)
    return {
      name: 'admin',
      email: 'admin@qq.com',
      password: 'admin',
      pin: '1212',
    }
  }
}
