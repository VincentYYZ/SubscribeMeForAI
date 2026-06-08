import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const filePath = searchParams.get('path')

  if (!category || !filePath) {
    return new NextResponse('Missing parameters', { status: 400 })
  }

  // Sanitize path to prevent directory traversal
  const safeFilePath = filePath.replace(/^\.\/+/g, '').replace(/\.\.+\//g, '')
  const fullPath = path.join(process.cwd(), 'content', category, safeFilePath)

  // Ensure the resolved path stays within content directory
  const contentDir = path.join(process.cwd(), 'content')
  if (!fullPath.startsWith(contentDir)) {
    return new NextResponse('Invalid path', { status: 400 })
  }

  if (!fs.existsSync(fullPath)) {
    return new NextResponse('Not found', { status: 404 })
  }

  const ext = path.extname(fullPath).toLowerCase()
  const contentType =
    {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
      '.webp': 'image/webp',
    }[ext] || 'application/octet-stream'

  const buffer = fs.readFileSync(fullPath)

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
