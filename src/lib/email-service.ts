// ============================================================
// EMAIL SERVICE - Akhuwat Scheme
// ============================================================
// Yeh file email send karne ka kaam karti hai
// Production mein Resend use karein (free 3000 emails/month)
// Local dev mein console par print hoga ( agar API key nahi hai)
// ============================================================

import { Resend } from 'resend'
import { db } from './db'

// Initialize Resend only if API key is set
const resendApiKey = process.env.RESEND_API_KEY
const resend = resendApiKey ? new Resend(resendApiKey) : null

const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@akhuwatscheme.com'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@akhuwatscheme.com'

// ============================================================
// MAIN EMAIL SEND FUNCTION
// ============================================================
export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  type: string = 'general'
): Promise<boolean> {
  try {
    if (resend) {
      // Production: Resend se email bhejo
      const { data, error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: [to],
        subject,
        html,
      })

      if (error) {
        console.error('❌ Email send error:', error)
        await logEmail(to, subject, html, 'failed', type)
        return false
      }

      await logEmail(to, subject, html, 'sent', type)
      console.log(`✅ Email sent to ${to}: ${subject}`)
      return true
    } else {
      // Local dev: Console par print karo
      console.log('\n📧 ===== EMAIL (DEV MODE) =====')
      console.log(`To: ${to}`)
      console.log(`From: ${FROM_EMAIL}`)
      console.log(`Subject: ${subject}`)
      console.log(`Type: ${type}`)
      console.log('---')
      console.log(html)
      console.log('===== END EMAIL =====\n')
      await logEmail(to, subject, html, 'sent', type)
      return true
    }
  } catch (error) {
    console.error('❌ Email send failed:', error)
    await logEmail(to, subject, html, 'failed', type)
    return false
  }
}

// ============================================================
// EMAIL LOG SAVE KARNA (database mein)
// ============================================================
async function logEmail(
  toEmail: string,
  subject: string,
  body: string,
  status: string,
  type: string
) {
  try {
    await db.emailLog.create({
      data: { toEmail, subject, body, status, type }
    })
  } catch (error) {
    console.error('Email log save nahi hua:', error)
  }
}

// ============================================================
// PRE-DEFINED EMAIL TEMPLATES
// ============================================================

// 1. Jab nai loan application submit ho
export async function sendApplicationSubmittedEmail(
  applicantEmail: string,
  applicantName: string,
  trackingId: string,
  loanType: string,
  loanAmount: number
) {
  const subject = `✅ Loan Application Submitted - Tracking ID: ${trackingId}`
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #1a7a3c, #0f5228); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0;">🏦 Akhuwat Scheme</h1>
        <p style="color: #f4d03f; margin: 5px 0 0 0;">Be-sood Qarza Pakistan</p>
      </div>
      
      <div style="background: white; padding: 30px; border: 1px solid #e8f5e9; border-radius: 0 0 12px 12px;">
        <h2 style="color: #1a7a3c;">Assalam-o-Alaikum ${applicantName}!</h2>
        
        <p style="color: #2c3e50; font-size: 16px;">
          Aapki loan application successfully submit ho gayi hai. Hamari team aapki application review kar rahi hai.
        </p>
        
        <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; border-left: 4px solid #1a7a3c; margin: 20px 0;">
          <p style="margin: 0; color: #2c3e50;">
            <strong>📋 Tracking ID:</strong> <span style="color: #1a7a3c; font-weight: bold; font-size: 18px;">${trackingId}</span>
          </p>
          <p style="margin: 10px 0 0 0; color: #2c3e50;">
            <strong>💰 Loan Type:</strong> ${loanType}
          </p>
          <p style="margin: 10px 0 0 0; color: #2c3e50;">
            <strong>💵 Amount:</strong> Rs. ${loanAmount.toLocaleString()}
          </p>
        </div>
        
        <p style="color: #2c3e50;">
          ⏰ <strong>Aapki application 2 ghante mein review ki jayegi.</strong>
        </p>
        
        <p style="color: #5a6c7d;">
          Apni application track karne ke liye apna Tracking ID aur phone number use karein.
        </p>
        
        <hr style="border: none; border-top: 1px solid #e8f5e9; margin: 25px 0;">
        
        <p style="color: #95a5a6; font-size: 14px; text-align: center;">
          آخوت لون سروس استعمال کرنے کا شکریہ!<br>
          ہمیں خوشی ہوگی کہ ہم آپ کی مدد کر سکیں!
        </p>
      </div>
    </div>
  `
  
  return sendEmail(applicantEmail, subject, html, 'application_submitted')
}

// 2. Admin ko notification jab nai application aaye
export async function sendAdminNotification(
  applicantName: string,
  trackingId: string,
  loanType: string,
  loanAmount: number,
  phoneNumber: string
) {
  const subject = `🔔 New Loan Application - ${applicantName} (${trackingId})`
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #1a7a3c, #0f5228); padding: 20px; text-align: center; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0;">🔔 New Application Received</h1>
      </div>
      
      <div style="background: white; padding: 30px; border: 1px solid #e8f5e9; border-radius: 0 0 12px 12px;">
        <h2 style="color: #1a7a3c;">New Loan Application</h2>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #e8f5e9; color: #5a6c7d;"><strong>Applicant:</strong></td><td style="padding: 8px; border-bottom: 1px solid #e8f5e9;">${applicantName}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #e8f5e9; color: #5a6c7d;"><strong>Tracking ID:</strong></td><td style="padding: 8px; border-bottom: 1px solid #e8f5e9; color: #1a7a3c; font-weight: bold;">${trackingId}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #e8f5e9; color: #5a6c7d;"><strong>Phone:</strong></td><td style="padding: 8px; border-bottom: 1px solid #e8f5e9;">${phoneNumber}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #e8f5e9; color: #5a6c7d;"><strong>Loan Type:</strong></td><td style="padding: 8px; border-bottom: 1px solid #e8f5e9;">${loanType}</td></tr>
          <tr><td style="padding: 8px; color: #5a6c7d;"><strong>Amount:</strong></td><td style="padding: 8px;">Rs. ${loanAmount.toLocaleString()}</td></tr>
        </table>
        
        <p style="color: #5a6c7d; margin-top: 20px;">
          Admin panel par ja kar application review karein.
        </p>
      </div>
    </div>
  `
  
  return sendEmail(ADMIN_EMAIL, subject, html, 'admin_notification')
}

// 3. Application status update hone par user ko email
export async function sendStatusUpdateEmail(
  applicantEmail: string,
  applicantName: string,
  trackingId: string,
  newStatus: string
) {
  const statusColors: Record<string, string> = {
    Approved: '#28a745',
    Rejected: '#dc3545',
    Pending: '#ffc107',
  }
  
  const statusMessages: Record<string, string> = {
    Approved: 'Mubarak Ho! Aapki loan application approve ho gayi hai. Hamari team aap se jald raabta karegi.',
    Rejected: 'Aapki loan application reject ho gayi hai. Mazeed information ke liye hamari team se raabta karein.',
    Pending: 'Aapki application dobara review ke liye pending kar di gayi hai.',
  }
  
  const subject = `📋 Application Update - ${newStatus} (${trackingId})`
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #1a7a3c, #0f5228); padding: 20px; text-align: center; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0;">📋 Application Status Update</h1>
      </div>
      
      <div style="background: white; padding: 30px; border: 1px solid #e8f5e9; border-radius: 0 0 12px 12px;">
        <h2 style="color: #1a7a3c;">Assalam-o-Alaikum ${applicantName},</h2>
        
        <p style="color: #2c3e50; font-size: 16px;">
          Aapki loan application ka status update hua hai:
        </p>
        
        <div style="background: ${statusColors[newStatus]}; color: white; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0; font-size: 18px; font-weight: bold;">
          ${newStatus}
        </div>
        
        <p style="color: #2c3e50;">${statusMessages[newStatus]}</p>
        
        <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; border-left: 4px solid #1a7a3c;">
          <p style="margin: 0; color: #2c3e50;">
            <strong>Tracking ID:</strong> ${trackingId}
          </p>
        </div>
        
        <p style="color: #95a5a6; font-size: 14px; text-align: center; margin-top: 25px;">
          آخوت لون سروس | سود سے پاک
        </p>
      </div>
    </div>
  `
  
  return sendEmail(applicantEmail, subject, html, 'status_update')
}

// 4. Contact form message receive hone par admin ko
export async function sendContactMessageNotification(
  name: string,
  email: string,
  phone: string,
  message: string
) {
  const subject = `💬 New Contact Message from ${name}`
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #1a7a3c, #0f5228); padding: 20px; text-align: center; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0;">💬 New Contact Message</h1>
      </div>
      
      <div style="background: white; padding: 30px; border: 1px solid #e8f5e9; border-radius: 0 0 12px 12px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; color: #5a6c7d;"><strong>Name:</strong></td><td style="padding: 8px;">${name}</td></tr>
          <tr><td style="padding: 8px; color: #5a6c7d;"><strong>Email:</strong></td><td style="padding: 8px;">${email || 'N/A'}</td></tr>
          <tr><td style="padding: 8px; color: #5a6c7d;"><strong>Phone:</strong></td><td style="padding: 8px;">${phone}</td></tr>
        </table>
        
        <h4 style="color: #1a7a3c; margin-top: 20px;">Message:</h4>
        <div style="background: #f8fafb; padding: 15px; border-radius: 8px; border-left: 4px solid #1a7a3c; color: #2c3e50;">
          ${message}
        </div>
      </div>
    </div>
  `
  
  return sendEmail(ADMIN_EMAIL, subject, html, 'contact_message')
}
