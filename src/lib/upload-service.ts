// ============================================================
// FILE UPLOAD SERVICE - Cloudinary Integration
// ============================================================
// Yeh file CNIC photos, utility bills ko Cloudinary par upload karti hai
// Free tier: 25GB storage, 25 GB bandwidth per month
// ============================================================

import { v2 as cloudinary } from 'cloudinary'

// Cloudinary config
const cloudName = process.env.CLOUDINARY_CLOUD_NAME
const apiKey = process.env.CLOUDINARY_API_KEY
const apiSecret = process.env.CLOUDINARY_API_SECRET

// Cloudinary configure karo (agar credentials hain to)
if (cloudName && apiKey && apiSecret) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  })
}

// Check if Cloudinary is configured
export const isCloudinaryConfigured = (): boolean => {
  return !!(cloudName && apiKey && apiSecret)
}

// ============================================================
// FILE UPLOAD FUNCTION
// ============================================================
// Yeh function file ko Cloudinary par upload karta hai
// Aur return mein URL deta hai jo database mein save hota hai

export async function uploadFile(
  file: File | Buffer,
  fileName: string,
  folder: string = 'akhuwat'
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    if (!isCloudinaryConfigured()) {
      // Local dev: Return placeholder URL
      console.log(`📁 [DEV MODE] File upload simulated: ${fileName}`)
      return {
        success: true,
        url: `/uploads/${folder}/${fileName}` // Placeholder
      }
    }

    // Convert File to buffer
    let buffer: Buffer
    if (file instanceof File) {
      const arrayBuffer = await file.arrayBuffer()
      buffer = Buffer.from(arrayBuffer)
    } else {
      buffer = file
    }

    // Upload to Cloudinary
    return new Promise((resolve) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: 'auto',
            folder: `akhuwat/${folder}`,
            public_id: fileName.replace(/\.[^/.]+$/, ''), // Remove extension
            unique_filename: true,
            overwrite: false,
          },
          (error, result) => {
            if (error) {
              console.error('❌ Cloudinary upload error:', error)
              resolve({ success: false, error: error.message })
            } else {
              console.log(`✅ File uploaded to Cloudinary: ${result?.secure_url}`)
              resolve({ success: true, url: result?.secure_url })
            }
          }
        )
        .end(buffer)
    })
  } catch (error: any) {
    console.error('❌ Upload failed:', error)
    return { success: false, error: error.message }
  }
}

// ============================================================
// FILE DELETE FUNCTION
// ============================================================
export async function deleteFile(publicId: string): Promise<boolean> {
  try {
    if (!isCloudinaryConfigured()) {
      console.log(`📁 [DEV MODE] File delete simulated: ${publicId}`)
      return true
    }

    const result = await cloudinary.uploader.destroy(publicId)
    return result.result === 'ok'
  } catch (error) {
    console.error('❌ File delete failed:', error)
    return false
  }
}

// ============================================================
// GET FILE INFO FROM URL
// ============================================================
// Cloudinary URL se public ID nikalne ke liye
export function getPublicIdFromUrl(url: string): string | null {
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.(jpg|jpeg|png|pdf|gif|webp)$/i)
  return match ? match[1] : null
}
