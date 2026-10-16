# 🏦 Akhuwat Loan Application System

Ek mukammal loan application system jo **HTML + CSS + Bootstrap 5 + JavaScript + PHP + MySQL** par bana hai.

---

## 📋 ZAROORI BAATEIN (Pehle Yeh Parhein)

Yeh project **XAMPP** par chalta hai. Live hosting ke liye bhi same steps hain bas cPanel/File Manager use karna hoga.

---

## 🚀 SETUP KARNE KA TARIQA (Step by Step)

### Step 1: XAMPP Install Karein
Agar XAMPP installed nahi hai to:
1. https://www.apachefriends.org/ par ja kar XAMPP download karein
2. Install karein
3. **XAMPP Control Panel** kholein
4. **Apache** aur **MySQL** dono ko **Start** karein (green color ho jayein)

---

### Step 2: Project Ko XAMPP Mein Copy Karein
1. Is folder (`akhuwat_loan_form`) ko copy karein
2. XAMPP ke `htdocs` folder mein paste karein
3. Path aesa banna chahiye:
   ```
   C:\xampp\htdocs\akhuwat_loan_form\
   ```

---

### Step 3: Database Setup Karein
1. Browser mein http://localhost/phpmyadmin kholein
2. **"New"** button par click karein (left sidebar mein)
3. Database ka naam likhein: **`akhuwat_loan`**
4. **"Create"** button dabaen
5. Naye database `akhuwat_loan` par click karein
6. Upar **"Import"** tab par click karein
7. **"Choose File"** dabaen aur `database.sql` file select karein (jo is project mein hai)
8. Neeche **"Go"** button dabaen
9. ✅ Database ban gayi! 2 tables ban jayengi: `loan_applications` aur `admin_users`

---

### Step 4: Website Chalayen
1. Browser mein http://localhost/akhuwat_loan_form/ kholein
2. 🎉 **Loan Application Form** khul jayegi!

---

### Step 5: Admin Panel Mein Jaen
1. Browser mein http://localhost/akhuwat_loan_form/admin/login.php kholein
2. **Username:** `admin`
3. **Password:** `admin123`
4. Login button dabaen
5. Dashboard khul jayega jahan saari applications dikhengi

---

## 📁 PROJECT STRUCTURE (File Ka Kaam)

```
akhuwat_loan_form/
│
├── index.php              ← Main loan application form (users bharte hain)
├── database.sql           ← Database file (phpMyAdmin mein import karna)
├── README.md              ← Yeh file (instructions)
│
├── includes/
│   └── config.php         ← Database connection + helper functions
│
├── assets/
│   ├── css/
│   │   └── style.css      ← Form ki styling (green theme)
│   ├── js/
│   │   └── validation.js  ← Form validation (CNIC, phone, etc.)
│   └── uploads/           ← User ki upload ki hui files yahan save hoti hain
│       ├── photo/         ← Personal photos
│       ├── cnic_front/    ← CNIC front images
│       ├── cnic_back/     ← CNIC back images
│       └── utility_bill/  ← Utility bills (optional)
│
└── admin/                 ← ADMIN PANEL (sirf admin ke liye)
    ├── login.php          ← Admin login page
    ├── dashboard.php      ← Saari applications list + statistics
    ├── view_application.php ← Ek application ki mukammal details
    └── logout.php         ← Admin logout
```

---

## 🎯 KYA KAR SAKTE HAIN?

### 👤 User (Public Form):
- Form bhar kar loan apply karna
- Apni photo, CNIC front/back, utility bill upload karna
- CNIC aur phone number auto-format hota hai
- Real-time validation (galat input pe error dikhata hai)

### 🔐 Admin (Admin Panel):
- Login kar ke dashboard dekhna
- Saari applications list dekhna
- Status ke hisaab se filter (Pending/Approved/Rejected)
- Search by Name, CNIC, ya Phone
- Ek application ki mukammal details dekhna
- Application ko Approve/Reject karna
- Uploaded documents (photo, CNIC, bill) dekhna

---

## 🔒 SECURITY FEATURES

- ✅ **SQL Injection Protection**: Prepared statements use kiye hain
- ✅ **XSS Protection**: htmlspecialchars() use kiya hai
- ✅ **Password Hashing**: bcrypt hashing (password_verify)
- ✅ **File Upload Validation**: Sirf images/PDF allow, size limit 5MB
- ✅ **Admin Session Check**: Har admin page par login check
- ✅ **Input Sanitization**: clean_input() function har input ko sanitize karta hai

---

## 🌐 LIVE HOSTING PAR KASE DEPLOY KAREN?

Agar aap website ko internet par live karna chahte hain:

### Option 1: cPanel Hosting (Hostinger, Bluehost, etc.)
1. Hosting account lein (jo PHP + MySQL support karta ho)
2. cPanel mein jaen → **File Manager** → `public_html` folder kholein
3. `akhuwat_loan_form` ke saari files `public_html` mein upload karein
4. cPanel mein **MySQL Databases** par jaen
5. Naya database banaen: `akhuwat_loan` (ya hosting ke hisaab se naam)
6. Database user banayein aur usko database ko assign karein
7. **phpMyAdmin** mein jaen → database select karein → `database.sql` import karein
8. `includes/config.php` file edit karein aur database credentials update karein:
   ```php
   $host = "localhost";
   $username = "your_db_username";
   $password = "your_db_password";
   $database = "your_db_name";
   ```
9. ✅ Website live! URL: `https://yourdomain.com/`

### Option 2: Free Hosting (InfinityFree, 000webhost)
1. Free PHP hosting account banayein
2. FTP ya File Manager se files upload karein
3. Database banayein aur SQL import karein
4. `config.php` update karein

---

## 🛠️ TROUBLESHOOTING (Masle Hal Karne Ka Tariqa)

### Masla 1: "Database Connection Failed"
**Hal:** `includes/config.php` mein database credentials check karein. XAMPP mein default:
- Host: localhost
- Username: root
- Password: (empty)

### Masla 2: "Page blank dikha raha hai"
**Hal:** XAMPP mein Apache aur MySQL dono running hain check karein. Browser console (F12) check karein errors ke liye.

### Masla 3: "File upload nahi ho rahi"
**Hal:** `assets/uploads/` ke saare subfolders ki permissions check karein. Unhe writable hona chahiye (777 ya 755).

### Masla 4: "Admin login nahi ho raha"
**Hal:** `database.sql` file sahi se import hui hai check karein. `admin_users` table mein data hona chahiye.

### Masla 5: "CSS/JS load nahi ho rahi"
**Hal:** Page refresh karein (Ctrl+F5) cache clear karne ke liye.

---

## 📞 DEFAULT ADMIN CREDENTIALS

```
URL:      http://localhost/akhuwat_loan_form/admin/login.php
Username: admin
Password: admin123
```

⚠️ **ZAROORI:** Production (live hosting) par jaate hi yeh password change karein!
Database mein ja kar naya admin user add karein ya password update karein.

---

## 💡 FUTURE IMPROVEMENTS (Aage Badhane Ke Liye)

- Email notification jab application submit ho
- SMS alert integration
- PDF export of application
- Multiple admin users with roles
- Application tracking system for users
- Loan calculator tool
- Multi-language support (Urdu + English)
- REST API for mobile app

---

## 📝 LAST BAAT

Agar koi masla ho ya koi cheez samajh na aaye to:
1. Pehle README file dobara parhein
2. Error message ko dhyaan se parhein
3. Browser console (F12) check karein
4. XAMPP/Apache/MySQL running hain check karein

Good luck! 🚀
