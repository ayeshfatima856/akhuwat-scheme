import { NextRequest, NextResponse } from 'next/server'
import { uploadFile, isCloudinaryConfigured } from '@/lib/upload-service'

// POST: File upload to Cloudinary
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const folder = (formData.get('folder') as string) || 'general'
    
    if (!file) {
      return NextResponse.json(
        { error: 'File nahi mili' },
        { status: 400 }
      )
    }

    // File size check (max 5MB)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size 5MB se zyada hai' },
        { status: 400 }
      )
    }

    // File type check (sirf images aur PDF allow)
    const allowedTypes = [
      'image/jpeg', 'image/jpg', 'image/png', 'image/webp',
      'application/pdf'
    ]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Yeh file type allowed nahi hai. JPG, PNG, WebP, PDF allow hai.' },
        { status: 400 }
      )
    }

    // Unique filename generate karo
    const ext = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}.${ext}`

    // Upload to Cloudinary
    const result = await uploadFile(file, fileName, folder)
    
    if (result.success && result.url) {
      return NextResponse.json({
        success: true,
        url: result.url,
        fileName: file.name,
        size: file.size,
        cloudinary: isCloudinaryConfigured(),
        message: '✅ File successfully upload ho gayi'
      })
    } else {
      return NextResponse.json(
        { error: result.error || 'Upload nahi hua' },
        { status: 500 }
      )
    }
  } catch (error: any) {
    console.error('Upload API error:', error)
    return NextResponse.json(
      { error: 'File upload nahi hui. Dobara try karein.' },
      { status: 500 }
    )
  }
}
