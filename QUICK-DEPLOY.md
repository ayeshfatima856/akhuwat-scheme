# 🚀 AKHUWAT SCHEME - QUICK DEPLOY GUIDE (5 Minute)

## 📦 Aapka Code Already GitHub Par Hai:
👉 https://github.com/ayeshfatima856/akhuwat-scheme

---

## 🎯 SIRF 3 STEPS (5 Minute Mein Live):

### STEP 1: Vercel Par Jaayein (2 min)
1. https://vercel.com/new par jaayein
2. **"Continue with GitHub"** click karein
3. GitHub authorize karein

### STEP 2: Project Import Karein (2 min)
1. `akhuwat-scheme` repository dhundhein
2. **"Import"** click karein
3. **Sab kuch default chhod dein** (kuch change na karein)
4. **"Environment Variables"** mein sirf yeh add karein:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | `file:./prod.db` |
| `NEXTAUTH_SECRET` | `akhuwat-scheme-secret-2024-production` |

5. **"Deploy"** click karein
6. 2-3 minute wait karein
7. ✅ **LIVE!** URL milegi: `https://akhuwat-scheme.vercel.app`

### STEP 3: Namecheap Domain Connect (1 min)
1. Namecheap → Domain → **Advanced DNS**
2. Yeh 2 records add karein:

```
Type: A Record | Host: @ | Value: 76.76.21.21 | TTL: Auto
Type: CNAME | Host: www | Value: cname.vercel-dns.com | TTL: Auto
```

3. Vercel → Settings → Domains → apna domain add karein
4. 5-30 min wait karein
5. ✅ **Website live on your domain!**

---

## 🎉 BAS! WEBSITE LIVE!

**Total Time: 5 minutes**
**Total Cost: $0 (sab free)**

---

## ❓ Agar Masla Ho:

### Vercel signup nahi ho raha?
→ Netlify try karein: https://app.netlify.com/signup
→ Same steps, GitHub se login

### Deploy fail ho gaya?
→ Mujhe batao, main fix karunga

### Domain connect nahi ho raha?
→ 30 min wait karein (DNS propagate hone mein time lagta hai)

---

## 📞 Help:
Mujhe batao kya masla hai, main guide karunga!
