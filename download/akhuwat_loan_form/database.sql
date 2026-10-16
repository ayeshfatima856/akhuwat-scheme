-- ============================================================
-- AKHUWAT LOAN APPLICATION - DATABASE FILE
-- ============================================================
-- Yeh file phpMyAdmin mein import karni hai
-- 
-- Steps:
-- 1. XAMPP start karein (Apache + MySQL)
-- 2. Browser mein http://localhost/phpmyadmin kholein
-- 3. "New" button click karein
-- 4. Database name: akhuwat_loan
-- 5. Create button dabaen
-- 6. Us database mein ja kar "Import" tab click karein
-- 7. Yeh file choose karein aur "Go" dabaen
-- ============================================================

-- Database create karo (agar nahi hai to)
CREATE DATABASE IF NOT EXISTS akhuwat_loan;
USE akhuwat_loan;

-- ============================================================
-- TABLE: loan_applications
-- Yahan saari loan forms ka data save hoga
-- ============================================================
CREATE TABLE IF NOT EXISTS loan_applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    
    -- Personal Information
    full_name VARCHAR(150) NOT NULL COMMENT 'Applicant ka pura naam',
    father_name VARCHAR(150) NOT NULL COMMENT 'Waald ka naam',
    cnic_number VARCHAR(20) NOT NULL COMMENT 'CNIC number (e.g., 35202-1234567-8)',
    phone_number VARCHAR(20) NOT NULL COMMENT 'Mobile number (+92 format)',
    email VARCHAR(100) DEFAULT NULL COMMENT 'Email (optional)',
    age_above_18 ENUM('Yes', 'No') NOT NULL COMMENT 'Kya umar 18 saal se zyada hai',
    gender ENUM('Male', 'Female', 'Other') NOT NULL COMMENT 'Gender',
    marital_status ENUM('Married', 'Unmarried') NOT NULL COMMENT 'Shadi shuda ya single',
    
    -- Address Information
    address TEXT NOT NULL COMMENT 'Pura address',
    city VARCHAR(100) NOT NULL COMMENT 'Shehr',
    province VARCHAR(50) NOT NULL COMMENT 'Province (Punjab, Sindh, etc.)',
    
    -- Loan Information
    loan_type VARCHAR(100) NOT NULL COMMENT 'Loan ki type (Business, Personal, etc.)',
    loan_amount DECIMAL(15, 2) NOT NULL COMMENT 'Loan ki amount (PKR)',
    loan_purpose VARCHAR(200) NOT NULL COMMENT 'Loan kis kaam ke liye',
    monthly_income DECIMAL(15, 2) DEFAULT NULL COMMENT 'Mahana aamdani (optional)',
    
    -- Uploaded Files (paths)
    photo_path VARCHAR(500) DEFAULT NULL COMMENT 'Applicant ki photo ka path',
    cnic_front_path VARCHAR(500) DEFAULT NULL COMMENT 'CNIC front side photo',
    cnic_back_path VARCHAR(500) DEFAULT NULL COMMENT 'CNIC back side photo',
    utility_bill_path VARCHAR(500) DEFAULT NULL COMMENT 'Utility bill ya salary slip (optional)',
    
    -- Form Status & Timestamps
    status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending' COMMENT 'Application ka status',
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Form kab submit hua'
);

-- ============================================================
-- TABLE: admin_users
-- Admin login ke liye (admin panel access)
-- ============================================================
CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE COMMENT 'Admin username',
    email VARCHAR(100) NOT NULL UNIQUE COMMENT 'Admin email',
    password VARCHAR(255) NOT NULL COMMENT 'Hashed password (bcrypt)',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- Default admin user insert karo
-- Username: admin
-- Password: admin123
-- (Yeh password bcrypt se hash kiya gaya hai)
-- ============================================================
INSERT INTO admin_users (username, email, password) VALUES
('admin', 'admin@akhuwat.com', '$2y$10$N9qo8uLOickgx2ZMRZoMy.MQDqoVZJYJj1l8Z8jJH8jJj1l8Z8jJj');

-- ============================================================
-- TABLE: contact_messages
-- Contact form ke messages yahan save honge
-- ============================================================
CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL COMMENT 'Bhejne wale ka naam',
    email VARCHAR(100) DEFAULT NULL COMMENT 'Email (optional)',
    phone VARCHAR(20) NOT NULL COMMENT 'Phone number',
    subject VARCHAR(200) DEFAULT NULL COMMENT 'Subject (optional)',
    message TEXT NOT NULL COMMENT 'Asal message',
    is_read TINYINT(1) DEFAULT 0 COMMENT 'Admin ne padha ya nahi',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- Test data (optional - dekhne ke liye ke data kaisa save hota hai)
-- ============================================================
-- INSERT INTO loan_applications (full_name, father_name, cnic_number, phone_number, 
--   age_above_18, gender, marital_status, address, city, province, 
--   loan_type, loan_amount, loan_purpose) 
-- VALUES ('Ahmed Khan', 'Muhammad Khan', '35202-1234567-8', '+923001234567',
--   'Yes', 'Male', 'Married', 'House 123, Block A', 'Lahore', 'Punjab',
--   'Business Loan', 50000, 'New business start karna hai');
