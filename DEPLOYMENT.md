# 🚀 AKHUWAT SCHEME - Deployment Guide (Namecheap + Vercel)

Complete step-by-step guide to deploy your website live on internet using **Namecheap domain + Vercel hosting + MySQL database**.

---

## 📋 QUICK SUMMARY

| Component | Provider | Cost |
|-----------|----------|------|
| **Domain** | Namecheap (you have this) | Already paid |
| **Hosting** | Vercel (Next.js maker) | FREE |
| **Database** | PlanetScale (MySQL) or Namecheap cPanel | FREE (PlanetScale) |
| **Email Service** | Resend | FREE (3000 emails/month) |
| **File Storage** | Cloudinary | FREE (25GB) |

**Total monthly cost: $0 (sab free)**

---

## 🎯 STEP 1: Database Setup (PlanetScale - Free MySQL)

PlanetScale free MySQL database deta hai. Yahan database banayenge:

### 1.1 PlanetScale Account Banayein
1. https://planetscale.com par jaayein
2. "Sign Up" button click karein (GitHub se login kar sakte hain)
3. Email verify karein

### 1.2 Database Banayein
1. Dashboard mein "New Database" button click karein
2. Database name: `akhuwat_scheme`
3. Region: `aws-ap-south-1` (Mumbai - Pakistan ke qareeb)
4. Plan: **Free** (Scylla)
5. "Create Database" button dabaayein

### 1.3 Connection String Lein
1. Database page mein "Connect" button click karein
2. "Create password" dabaayein
3. Branch: `main`
4. **Connection string copy karein** - is tarah ka hoga:
   ```
   mysql://user:password@aws.connect.psdb.cloud/akhuwat_scheme?sslaccept=strict
   ```

### 1.4 Schema Deploy Karein
Local terminal mein:
```bash
# Project directory mein jaayein
cd /home/z/my-project

# .env file edit karein
# DATABASE_URL = PlanetScale wala connection string daalein

# Schema push karein
bun run db:push

# Seed data add karein
bun run scripts/seed.ts
```

---

## 🎯 STEP 2: Email Service Setup (Resend - Free)

### 2.1 Resend Account
1. https://resend.com par jaayein
2. GitHub se signup karein
3. Email verify karein

### 2.2 API Key Lein
1. Dashboard mein "API Keys" par jaayein
2. "Create API Key" button dabaayein
3. Name: `Akhuwat Production`
4. Permission: `Full Access`
5. API key copy karein (is tarah: `re_xxxxxxxxxxxxxxxxxx`)

### 2.3 Domain Verify (Optional - Recommended)
Free tier mein `onboarding@resend.dev` se emails bhej sakte hain. Custom domain ke liye:
1. Resend mein "Domains" par jaayein
2. "Add Domain" - apna Namecheap domain daalein
3. DNS records Namecheap DNS mein add karein (instructions milengi)

---

## 🎯 STEP 3: File Storage Setup (Cloudinary - Free)

### 3.1 Cloudinary Account
1. https://cloudinary.com par jaayein
2. "Sign Up for Free" click karein
3. Email verify karein

### 3.2 Credentials Lein
Dashboard se 3 cheezein copy karein:
- **Cloud Name** (e.g., `dxyz123abc`)
- **API Key** (e.g., `123456789012345`)
- **API Secret** (e.g., `abcdef1234567890abcdef1234567890`)

---

## 🎯 STEP 4: Code Upload to GitHub

### 4.1 GitHub Repository Banayein
1. https://github.com par jaayein
2. "New" button click karein
3. Repository name: `akhuwat-scheme`
4. **Private** rakhein (important - code private rakhne ke liye)
5. "Create repository" dabaayein

### 4.2 Code Push Karein
Terminal mein:
```bash
cd /home/z/my-project

# Git initialize (agar nahi hai)
git init

# Saari files add karein
git add .

# Commit karein
git commit -m "Akhuwat Scheme - Production Ready"

# GitHub remote add karein (apna repo URL daalein)
git remote add origin https://github.com/YOUR_USERNAME/akhuwat-scheme.git

# Push karein
git branch -M main
git push -u origin main
```

---

## 🎯 STEP 5: Vercel Deployment (FREE)

### 5.1 Vercel Account
1. https://vercel.com par jaayein
2. "Sign Up" - GitHub se login karein

### 5.2 Project Import Karein
1. "Add New Project" click karein
2. Apna `akhuwat-scheme` GitHub repo select karein
3. "Import" dabaayein

### 5.3 Environment Variables Set Karein
**Bohot important!** Vercel mein yeh variables add karein:

| Variable Name | Value |
|---------------|-------|
| `DATABASE_URL` | `mysql://...` (PlanetScale se mila) |
| `RESEND_API_KEY` | `re_xxxxx` (Resend se mila) |
| `FROM_EMAIL` | `noreply@yourdomain.com` |
| `ADMIN_EMAIL` | `admin@yourdomain.com` |
| `CLOUDINARY_CLOUD_NAME` | `dxyz123abc` |
| `CLOUDINARY_API_KEY` | `123456789012345` |
| `CLOUDINARY_API_SECRET` | `abcdef1234567890abcdef1234567890` |
| `NEXTAUTH_SECRET` | Koi bhi random 32+ character string |
| `NEXTAUTH_URL` | `https://yourdomain.com` |
| `NEXT_PUBLIC_SITE_URL` | `https://yourdomain.com` |

### 5.4 Deploy Karein
1. "Deploy" button dabaayein
2. 2-3 minute wait karein
3. ✅ Live! URL milega: `https://akhuwat-scheme.vercel.app`

---

## 🎯 STEP 6: Namecheap Domain Connect

Ab apne Namecheap domain ko Vercel se connect karein:

### 6.1 Vercel mein Domain Add Karein
1. Vercel project → "Settings" → "Domains"
2. Apna Namecheap domain daalein (e.g., `akhuwatscheme.com`)
3. "Add" button dabaayein
4. DNS records copy karein (Vercel dikhayega)

### 6.2 Namecheap DNS Update Karein
1. Namecheap.com par login karein
2. "Domain List" → apne domain ke saath "Manage" dabaayein
3. "Advanced DNS" tab par jaayein
4. Existing records delete karein (sirf A record aur CNAME)
5. Yeh records add karein:

**A Record:**
```
Type: A Record
Host: @
Value: 76.76.21.21 (Vercel ka IP)
TTL: Automatic
```

**CNAME Record:**
```
Type: CNAME Record
Host: www
Value: cname.vercel-dns.com
TTL: Automatic
```

6. "Save All Changes" dabaayein
7. 5-30 minute wait karein (DNS propagate hone ke liye)

### 6.3 Domain Verify
1. Vercel mein domain check karein
2. "Verify" button dabaayein
3. Green tick milega - domain connected!

### 6.4 SSL Certificate
Vercel automatically SSL deta hai:
- `https://yourdomain.com` chalega
- "Valid Certificate" dikhayega

---

## 🎯 STEP 7: Production Testing

### 7.1 Admin Panel Test
1. Apni website khol: `https://yourdomain.com`
2. Logo par 5 baar click karein
3. Admin login: `admin` / `admin123`
4. **IMPORTANT:** Pehle password change karein!

### 7.2 Form Test
1. "Apply Now" button dabaayein
2. Form bharein
3. CNIC photos upload karein (Cloudinary par save honge)
4. Submit karein
5. Email check karein - notification aana chahiye

### 7.3 Track Application Test
1. Form submit ke baad tracking ID milega (e.g., `AKH-123456`)
2. User ko woh ID aur phone number yaad rakhein
3. Track section mein daal kar status dekh sakte hain

---

## 🔧 TROUBLESHOOTING

### Masla 1: "Database connection failed"
- PlanetScale connection string sahi hai check karein
- `?sslaccept=strict` end mein hona chahiye
- Vercel environment variables mein `DATABASE_URL` set hai check karein

### Masla 2: "Emails nahi aa rahe"
- Resend API key sahi hai check karein
- Spam folder check karein
- From email `onboarding@resend.dev` se aa raha hoga jab tak custom domain verify na ho

### Masla 3: "File upload error"
- Cloudinary credentials check karein
- Cloud name mein `d` hona chahiye start mein
- API key aur secret sahi daalein

### Masla 4: "Domain not working"
- 30 minute wait karein (DNS propagate hone ke liye)
- Namecheap DNS records sahi hain check karein
- Vercel mein domain "Verified" hai check karein

### Masla 5: "Build failed on Vercel"
- GitHub par code push kiya hai check karein
- `package.json` mein dependencies sahi hain check karein
- Vercel build logs check karein

---

## 💰 COST BREAKDOWN

| Service | Free Tier | Paid Plan (if needed) |
|---------|-----------|----------------------|
| **Namecheap domain** | Already paid | $10/year renewal |
| **Vercel** | Free (100GB bandwidth) | $20/month (Pro) |
| **PlanetScale MySQL** | Free (5GB, 1B reads/month) | $29/month (Scylla Pro) |
| **Resend** | Free (3000 emails/month) | $20/month (50k emails) |
| **Cloudinary** | Free (25GB storage, 25GB BW) | $89/month (Plus) |

**Total for small website: $0/month (sab free tier)**

---

## 🚨 IMPORTANT SECURITY NOTES

### 1. Admin Password Change
Production mein jaate hi:
1. Admin login karein
2. Default password `admin123` change karein
3. Strong password use karein (min 12 characters, special chars)

### 2. Environment Variables
- `.env` file kabhi GitHub par push na karein
- `.gitignore` mein `.env` hona chahiye (already hai)
- Vercel mein sab variables set karein

### 3. Database Backups
- PlanetScale automatic backups deta hai
- Weekly manual backup bhi lein (export SQL)

### 4. SSL/HTTPS
- Vercel automatically SSL deta hai
- HTTP requests automatically HTTPS par redirect hote hain

---

## 📞 SUPPORT

Agar koi masla ho:
1. **Vercel docs**: https://vercel.com/docs
2. **PlanetScale docs**: https://planetscale.com/docs
3. **Resend docs**: https://resend.com/docs
4. **Cloudinary docs**: https://cloudinary.com/documentation

---

## ✅ FINAL CHECKLIST

- [ ] PlanetScale MySQL database created
- [ ] Schema pushed to PlanetScale
- [ ] Seed data added
- [ ] Resend account + API key
- [ ] Cloudinary account + credentials
- [ ] Code pushed to GitHub
- [ ] Vercel project imported
- [ ] All environment variables set in Vercel
- [ ] Vercel deployment successful
- [ ] Namecheap DNS records updated
- [ ] Domain pointing to Vercel
- [ ] SSL certificate active
- [ ] Admin password changed
- [ ] Test form submission
- [ ] Test email notifications
- [ ] Test file uploads
- [ ] Test admin panel
- [ ] Test track application

**🎉 Website Live! Ab koi bhi internet user aapki website visit kar sakta hai!**
