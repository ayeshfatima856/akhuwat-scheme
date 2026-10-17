// ============================================================
// 🔧 SITE CONFIGURATION FILE (Central Settings)
// ============================================================
// YEH FILE EK BAAR EDIT KAREIN - SAARI SETTINGS YAHAN SE CHANGE HONGI
// Yahan WhatsApp number, email, address, etc. sab ek jagah par hain
// ============================================================

export const SITE_CONFIG = {
  
  // ============================================================
  // 📱 WHATSAPP NUMBER (Yahan apna number change karein)
  // ============================================================
  // Format: Country code + number (without 0 at start)
  // Example: 03082171396 -> 923082171396 (92 = Pakistan code)
  // Agar number change karna ho to sirf yahan edit karein
  WHATSAPP_NUMBER: '923109999464',
  
  // Display format (jo website par dikhana hai)
  WHATSAPP_DISPLAY: '+923109999464',
  
  // Default WhatsApp message (jab koi chat kholta hai)
  WHATSAPP_MESSAGE: 'Assalam-o-Alaikum! Mujhe Akhuwat Scheme ke baare mein maloomat chahiye.',
  
  // ============================================================
  // 📧 CONTACT INFORMATION
  // ============================================================
  PHONE: '+92 308 2171396',
  EMAIL: 'info@akhuwatscheme.com',
  ADDRESS: 'Lahore, Punjab, Pakistan',
  WORKING_HOURS: 'Mon - Sat: 9:00 AM - 6:00 PM',
  
  // ============================================================
  // 🏦 LOAN PLANS (Yahan plans edit kar sakte hain)
  // ============================================================
  LOAN_PLANS: [
    { id: 1, amount: 50000, amountUrdu: 'پچاس ہزار', period: '1 Year', periodUrdu: 'ایک سال', installment: 4167, category: 'Personal', categoryUrdu: 'ذاتی', categoryIcon: '👤' },
    { id: 2, amount: 100000, amountUrdu: 'ایک لاکھ', period: '1 Year', periodUrdu: 'ایک سال', installment: 8335, category: 'Personal', categoryUrdu: 'ذاتی', categoryIcon: '👤' },
    { id: 3, amount: 200000, amountUrdu: 'دو لاکھ', period: '2 Years', periodUrdu: 'دو سال', installment: 8335, category: 'Personal', categoryUrdu: 'ذاتی', categoryIcon: '👤', popular: true },
    { id: 4, amount: 500000, amountUrdu: 'پانچ لاکھ', period: '5 Years', periodUrdu: 'پانچ سال', installment: 8335, category: 'Personal', categoryUrdu: 'ذاتی', categoryIcon: '👤' },
    { id: 5, amount: 1000000, amountUrdu: 'دس لاکھ', period: '10 Years', periodUrdu: 'دس سال', installment: 8335, category: 'Business', categoryUrdu: 'بزنس', categoryIcon: '💼', popular: true },
    { id: 6, amount: 2000000, amountUrdu: 'بیس لاکھ', period: '10 Years', periodUrdu: 'دس سال', installment: 16670, category: 'Business', categoryUrdu: 'بزنس', categoryIcon: '💼' },
    { id: 7, amount: 3000000, amountUrdu: 'تیس لاکھ', period: '10 Years', periodUrdu: 'دس سال', installment: 25000, category: 'Home Construction', categoryUrdu: 'نیا گھر تعمیر', categoryIcon: '🏠' },
    { id: 8, amount: 5000000, amountUrdu: 'پچاس لاکھ', period: '15 Years', periodUrdu: 'پندرہ سال', installment: 27780, category: 'Home Construction', categoryUrdu: 'نیا گھر تعمیر', categoryIcon: '🏠' },
  ],
  
  // ============================================================
  // 💰 REGISTRATION FEES
  // ============================================================
  REGISTRATION_FEES: {
    upTo5Lakh: 4400,
    from6LakhTo50Lakh: 5600,
  },
  
  // ============================================================
  // 🔐 ADMIN CREDENTIALS (Default - change karna zaroori hai production mein)
  // ============================================================
  ADMIN: {
    defaultUsername: 'admin',
    defaultPassword: 'admin123', // Production mein change karein!
  },
}

// ============================================================
// 🛠️ HELPER FUNCTIONS (Inhe change na karein)
// ============================================================

// WhatsApp link banane ka function
export function getWhatsAppLink(customMessage?: string): string {
  const message = encodeURIComponent(customMessage || SITE_CONFIG.WHATSAPP_MESSAGE)
  return `https://wa.me/${SITE_CONFIG.WHATSAPP_NUMBER}?text=${message}`
}

// Phone link banane ka function
export function getPhoneLink(): string {
  return `tel:${SITE_CONFIG.PHONE}`
}

// Email link banane ka function
export function getEmailLink(): string {
  return `mailto:${SITE_CONFIG.EMAIL}`
}

// Amount ko Pakistani format mein convert karne ka function
// Example: 50000 -> "Rs. 50,000"
export function formatPKR(amount: number): string {
  return `Rs. ${amount.toLocaleString('en-PK')}`
}
