<?php
// ============================================================
// AKHUWAT LOAN APPLICATION FORM (index.php)
// ============================================================
// Yeh main form hai jo user bharega
// Form submit hone par yehi page data ko database mein save karega
// ============================================================

// Database connection file include karo
require_once 'includes/config.php';

// ----- VARIABLES FOR SUCCESS/ERROR MESSAGES -----
$success_message = '';
$error_message = '';

// ----- FORM SUBMIT HONE PAR YEH CODE chalega -----
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Saari input values clean (sanitize) kar ke variables mein save karo
    $full_name = clean_input($_POST['full_name'] ?? '');
    $father_name = clean_input($_POST['father_name'] ?? '');
    $cnic_number = clean_input($_POST['cnic_number'] ?? '');
    $phone_number = clean_input($_POST['phone_number'] ?? '');
    $email = clean_input($_POST['email'] ?? '');
    $age_above_18 = clean_input($_POST['age_above_18'] ?? '');
    $gender = clean_input($_POST['gender'] ?? '');
    $marital_status = clean_input($_POST['marital_status'] ?? '');
    $address = clean_input($_POST['address'] ?? '');
    $city = clean_input($_POST['city'] ?? '');
    $province = clean_input($_POST['province'] ?? '');
    $loan_type = clean_input($_POST['loan_type'] ?? '');
    $loan_amount = clean_input($_POST['loan_amount'] ?? '');
    $loan_purpose = clean_input($_POST['loan_purpose'] ?? '');
    $monthly_income = !empty($_POST['monthly_income']) ? clean_input($_POST['monthly_income']) : null;
    
    // ----- FILE UPLOADS -----
    // Har file ko apne folder mein upload karo
    
    // 1. Personal Photo upload
    $photo_path = '';
    if (!empty($_FILES['photo']['name'])) {
        $result = uploadFile($_FILES['photo'], 'assets/uploads/photo', ['jpg', 'jpeg', 'png']);
        if ($result['success']) {
            $photo_path = $result['path'];
        } else {
            $error_message .= 'Photo: ' . $result['error'] . '<br>';
        }
    }
    
    // 2. CNIC Front photo upload
    $cnic_front_path = '';
    if (!empty($_FILES['cnic_front']['name'])) {
        $result = uploadFile($_FILES['cnic_front'], 'assets/uploads/cnic_front', ['jpg', 'jpeg', 'png']);
        if ($result['success']) {
            $cnic_front_path = $result['path'];
        } else {
            $error_message .= 'CNIC Front: ' . $result['error'] . '<br>';
        }
    }
    
    // 3. CNIC Back photo upload
    $cnic_back_path = '';
    if (!empty($_FILES['cnic_back']['name'])) {
        $result = uploadFile($_FILES['cnic_back'], 'assets/uploads/cnic_back', ['jpg', 'jpeg', 'png']);
        if ($result['success']) {
            $cnic_back_path = $result['path'];
        } else {
            $error_message .= 'CNIC Back: ' . $result['error'] . '<br>';
        }
    }
    
    // 4. Utility bill (optional - agar diya hai to upload karo)
    $utility_bill_path = '';
    if (!empty($_FILES['utility_bill']['name'])) {
        $result = uploadFile($_FILES['utility_bill'], 'assets/uploads/utility_bill', ['jpg', 'jpeg', 'png', 'pdf']);
        if ($result['success']) {
            $utility_bill_path = $result['path'];
        } else {
            $error_message .= 'Utility Bill: ' . $result['error'] . '<br>';
        }
    }
    
    // ----- DATABASE MEIN SAVE KARO -----
    // Agar koi error nahi hai to data database mein insert karo
    if (empty($error_message)) {
        
        // SQL query with placeholders (?) - SQL injection se bachav
        $sql = "INSERT INTO loan_applications 
                (full_name, father_name, cnic_number, phone_number, email, 
                 age_above_18, gender, marital_status, address, city, province, 
                 loan_type, loan_amount, loan_purpose, monthly_income,
                 photo_path, cnic_front_path, cnic_back_path, utility_bill_path) 
                VALUES 
                (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        
        // Prepared statement banao (security ke liye)
        $stmt = $conn->prepare($sql);
        
        // Types: s=string, d=double (decimal)
        $stmt->bind_param(
            "ssssssssssssssdssss",
            $full_name, $father_name, $cnic_number, $phone_number, $email,
            $age_above_18, $gender, $marital_status, $address, $city, $province,
            $loan_type, $loan_amount, $loan_purpose, $monthly_income,
            $photo_path, $cnic_front_path, $cnic_back_path, $utility_bill_path
        );
        
        // Query execute karo
        if ($stmt->execute()) {
            $success_message = '✅ Aapki loan application successfully submit ho gayi hai! Hamari team aap se jald raabta karegi.';
            // Form submit ke baad page scroll up karo
            echo '<script>window.onload = function() { window.scrollTo(0, 0); }</script>';
        } else {
            $error_message = '❌ Database error: ' . $stmt->error;
        }
        
        $stmt->close();
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Akhuwat Loan Application Form</title>
    
    <!-- ===== BOOTSTRAP 5 CSS (CDN se) ===== -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <!-- ===== BOOTSTRAP ICONS ===== -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
    
    <!-- ===== CUSTOM CSS ===== -->
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>

<div class="container">
    <div class="form-container">
        
        <!-- ========== HEADER (Top green banner) ========== -->
        <div class="form-header">
            <h1>🏦 Akhuwat Loan Application Form</h1>
            <p>Bharo aur submit karein — Hamari team aap se raabta karegi</p>
        </div>
        
        <!-- ========== FORM BODY ========== -->
        <div class="form-body">
            
            <!-- Success message (agar form submit ho gaya) -->
            <?php if (!empty($success_message)): ?>
                <div class="alert-success" role="alert">
                    <?php echo $success_message; ?>
                </div>
            <?php endif; ?>
            
            <!-- Error message (agar koi masla hua) -->
            <?php if (!empty($error_message)): ?>
                <div class="alert-error" role="alert">
                    <strong>Masla:</strong><br>
                    <?php echo $error_message; ?>
                </div>
            <?php endif; ?>
            
            <!-- ========== FORM START ========== -->
            <!-- enctype="multipart/form-data" zaroori hai file uploads ke liye -->
            <form id="loanApplicationForm" 
                  method="POST" 
                  action="" 
                  enctype="multipart/form-data"
                  novalidate>
                
                <!-- ============================================
                     SECTION 1: PERSONAL PHOTO UPLOAD
                     ============================================ -->
                <h3 class="section-title">📸 Personal Photo</h3>
                <div class="row">
                    <div class="col-md-12 mb-3">
                        <label class="form-label">Upload Your Photo <span class="required">*</span></label>
                        <div class="file-upload-area">
                            <div class="file-upload-icon">📷</div>
                            <div class="file-upload-text">Photo yahan click ya drag karein</div>
                            <div class="file-upload-hint">JPG, JPEG, PNG (Max 2MB)</div>
                            <input type="file" 
                                   id="photo" 
                                   name="photo" 
                                   accept="image/jpeg,image/jpg,image/png">
                        </div>
                        <div class="field-help">Yeh photo aapki application pe show hogi</div>
                    </div>
                </div>
                
                <!-- ============================================
                     SECTION 2: PERSONAL INFORMATION
                     ============================================ -->
                <h3 class="section-title">👤 Personal Information</h3>
                <div class="row">
                    
                    <!-- Full Name -->
                    <div class="col-md-6 mb-3">
                        <label for="full_name" class="form-label">
                            Full Name <span class="required">*</span>
                        </label>
                        <input type="text" 
                               class="form-control" 
                               id="full_name" 
                               name="full_name" 
                               placeholder="e.g., Ahmed Khan"
                               value="<?php echo isset($_POST['full_name']) ? htmlspecialchars($_POST['full_name']) : ''; ?>">
                    </div>
                    
                    <!-- Father Name -->
                    <div class="col-md-6 mb-3">
                        <label for="father_name" class="form-label">
                            Father Name <span class="required">*</span>
                        </label>
                        <input type="text" 
                               class="form-control" 
                               id="father_name" 
                               name="father_name" 
                               placeholder="e.g., Muhammad Khan"
                               value="<?php echo isset($_POST['father_name']) ? htmlspecialchars($_POST['father_name']) : ''; ?>">
                    </div>
                    
                    <!-- CNIC Number -->
                    <div class="col-md-6 mb-3">
                        <label for="cnic_number" class="form-label">
                            CNIC Number <span class="required">*</span>
                        </label>
                        <input type="text" 
                               class="form-control" 
                               id="cnic_number" 
                               name="cnic_number" 
                               placeholder="35202-1234567-8"
                               maxlength="15"
                               value="<?php echo isset($_POST['cnic_number']) ? htmlspecialchars($_POST['cnic_number']) : ''; ?>">
                        <div class="field-help">Format: 35202-1234567-8 (13 digits)</div>
                    </div>
                    
                    <!-- Phone Number -->
                    <div class="col-md-6 mb-3">
                        <label for="phone_number" class="form-label">
                            Mobile Number <span class="required">*</span>
                        </label>
                        <input type="tel" 
                               class="form-control" 
                               id="phone_number" 
                               name="phone_number" 
                               placeholder="+923001234567"
                               value="<?php echo isset($_POST['phone_number']) ? htmlspecialchars($_POST['phone_number']) : ''; ?>">
                        <div class="field-help">Format: +923001234567</div>
                    </div>
                    
                    <!-- Email (optional) -->
                    <div class="col-md-6 mb-3">
                        <label for="email" class="form-label">
                            Email <span class="text-muted-custom">(Optional)</span>
                        </label>
                        <input type="email" 
                               class="form-control" 
                               id="email" 
                               name="email" 
                               placeholder="example@email.com"
                               value="<?php echo isset($_POST['email']) ? htmlspecialchars($_POST['email']) : ''; ?>">
                    </div>
                    
                    <!-- Age Above 18 -->
                    <div class="col-md-6 mb-3">
                        <label for="age_above_18" class="form-label">
                            Kya aap ki umar 18 saal se zyada hai? <span class="required">*</span>
                        </label>
                        <select class="form-select" id="age_above_18" name="age_above_18">
                            <option value="">Select karein</option>
                            <option value="Yes" <?php echo (isset($_POST['age_above_18']) && $_POST['age_above_18'] === 'Yes') ? 'selected' : ''; ?>>Yes (Haan)</option>
                            <option value="No" <?php echo (isset($_POST['age_above_18']) && $_POST['age_above_18'] === 'No') ? 'selected' : ''; ?>>No (Nahi)</option>
                        </select>
                    </div>
                    
                    <!-- Gender -->
                    <div class="col-md-6 mb-3">
                        <label for="gender" class="form-label">
                            Gender <span class="required">*</span>
                        </label>
                        <select class="form-select" id="gender" name="gender">
                            <option value="">Select karein</option>
                            <option value="Male" <?php echo (isset($_POST['gender']) && $_POST['gender'] === 'Male') ? 'selected' : ''; ?>>Male (Mard)</option>
                            <option value="Female" <?php echo (isset($_POST['gender']) && $_POST['gender'] === 'Female') ? 'selected' : ''; ?>>Female (Aurat)</option>
                            <option value="Other" <?php echo (isset($_POST['gender']) && $_POST['gender'] === 'Other') ? 'selected' : ''; ?>>Other (Doosra)</option>
                        </select>
                    </div>
                    
                    <!-- Marital Status -->
                    <div class="col-md-6 mb-3">
                        <label for="marital_status" class="form-label">
                            Marital Status <span class="required">*</span>
                        </label>
                        <select class="form-select" id="marital_status" name="marital_status">
                            <option value="">Select karein</option>
                            <option value="Married" <?php echo (isset($_POST['marital_status']) && $_POST['marital_status'] === 'Married') ? 'selected' : ''; ?>>Married (Shadi shuda)</option>
                            <option value="Unmarried" <?php echo (isset($_POST['marital_status']) && $_POST['marital_status'] === 'Unmarried') ? 'selected' : ''; ?>>Unmarried (Single)</option>
                        </select>
                    </div>
                </div>
                
                <!-- ============================================
                     SECTION 3: ADDRESS INFORMATION
                     ============================================ -->
                <h3 class="section-title">📍 Address Information</h3>
                <div class="row">
                    
                    <!-- Address -->
                    <div class="col-md-12 mb-3">
                        <label for="address" class="form-label">
                            Complete Address <span class="required">*</span>
                        </label>
                        <textarea class="form-control" 
                                  id="address" 
                                  name="address" 
                                  rows="2"
                                  placeholder="House #, Street, Area, etc."><?php echo isset($_POST['address']) ? htmlspecialchars($_POST['address']) : ''; ?></textarea>
                    </div>
                    
                    <!-- City -->
                    <div class="col-md-6 mb-3">
                        <label for="city" class="form-label">
                            City <span class="required">*</span>
                        </label>
                        <input type="text" 
                               class="form-control" 
                               id="city" 
                               name="city" 
                               placeholder="e.g., Lahore"
                               value="<?php echo isset($_POST['city']) ? htmlspecialchars($_POST['city']) : ''; ?>">
                    </div>
                    
                    <!-- Province -->
                    <div class="col-md-6 mb-3">
                        <label for="province" class="form-label">
                            Province <span class="required">*</span>
                        </label>
                        <select class="form-select" id="province" name="province">
                            <option value="">Select karein</option>
                            <option value="Punjab" <?php echo (isset($_POST['province']) && $_POST['province'] === 'Punjab') ? 'selected' : ''; ?>>Punjab</option>
                            <option value="Sindh" <?php echo (isset($_POST['province']) && $_POST['province'] === 'Sindh') ? 'selected' : ''; ?>>Sindh</option>
                            <option value="KPK" <?php echo (isset($_POST['province']) && $_POST['province'] === 'KPK') ? 'selected' : ''; ?>>Khyber Pakhtunkhwa (KPK)</option>
                            <option value="Balochistan" <?php echo (isset($_POST['province']) && $_POST['province'] === 'Balochistan') ? 'selected' : ''; ?>>Balochistan</option>
                            <option value="Gilgit-Baltistan" <?php echo (isset($_POST['province']) && $_POST['province'] === 'Gilgit-Baltistan') ? 'selected' : ''; ?>>Gilgit-Baltistan</option>
                            <option value="AJK" <?php echo (isset($_POST['province']) && $_POST['province'] === 'AJK') ? 'selected' : ''; ?>>Azad Jammu & Kashmir</option>
                            <option value="Islamabad" <?php echo (isset($_POST['province']) && $_POST['province'] === 'Islamabad') ? 'selected' : ''; ?>>Islamabad Capital Territory</option>
                        </select>
                    </div>
                </div>
                
                <!-- ============================================
                     SECTION 4: LOAN INFORMATION
                     ============================================ -->
                <h3 class="section-title">💰 Loan Information</h3>
                <div class="row">
                    
                    <!-- Loan Type -->
                    <div class="col-md-6 mb-3">
                        <label for="loan_type" class="form-label">
                            Loan Type <span class="required">*</span>
                        </label>
                        <select class="form-select" id="loan_type" name="loan_type">
                            <option value="">Select karein</option>
                            <option value="Business Loan" <?php echo (isset($_POST['loan_type']) && $_POST['loan_type'] === 'Business Loan') ? 'selected' : ''; ?>>Business Loan (Karobar)</option>
                            <option value="Personal Loan" <?php echo (isset($_POST['loan_type']) && $_POST['loan_type'] === 'Personal Loan') ? 'selected' : ''; ?>>Personal Loan (Shakhsi)</option>
                            <option value="Agriculture Loan" <?php echo (isset($_POST['loan_type']) && $_POST['loan_type'] === 'Agriculture Loan') ? 'selected' : ''; ?>>Agriculture Loan (Zarat)</option>
                            <option value="Education Loan" <?php echo (isset($_POST['loan_type']) && $_POST['loan_type'] === 'Education Loan') ? 'selected' : ''; ?>>Education Loan (Taleem)</option>
                            <option value="Home Loan" <?php echo (isset($_POST['loan_type']) && $_POST['loan_type'] === 'Home Loan') ? 'selected' : ''; ?>>Home Loan (Makan)</option>
                            <option value="Emergency Loan" <?php echo (isset($_POST['loan_type']) && $_POST['loan_type'] === 'Emergency Loan') ? 'selected' : ''; ?>>Emergency Loan (Emergency)</option>
                        </select>
                    </div>
                    
                    <!-- Loan Amount -->
                    <div class="col-md-6 mb-3">
                        <label for="loan_amount" class="form-label">
                            Loan Amount (PKR) <span class="required">*</span>
                        </label>
                        <input type="text" 
                               class="form-control" 
                               id="loan_amount" 
                               name="loan_amount" 
                               placeholder="e.g., 50000"
                               value="<?php echo isset($_POST['loan_amount']) ? htmlspecialchars($_POST['loan_amount']) : ''; ?>">
                        <div class="field-help">Range: 1,000 — 10,00,000 PKR</div>
                    </div>
                    
                    <!-- Loan Purpose -->
                    <div class="col-md-6 mb-3">
                        <label for="loan_purpose" class="form-label">
                            Loan Purpose <span class="required">*</span>
                        </label>
                        <select class="form-select" id="loan_purpose" name="loan_purpose">
                            <option value="">Select karein</option>
                            <option value="New Business" <?php echo (isset($_POST['loan_purpose']) && $_POST['loan_purpose'] === 'New Business') ? 'selected' : ''; ?>>New Business Start Karna</option>
                            <option value="Business Expansion" <?php echo (isset($_POST['loan_purpose']) && $_POST['loan_purpose'] === 'Business Expansion') ? 'selected' : ''; ?>>Business Expand Karna</option>
                            <option value="Medical" <?php echo (isset($_POST['loan_purpose']) && $_POST['loan_purpose'] === 'Medical') ? 'selected' : ''; ?>>Medical Treatment</option>
                            <option value="Education" <?php echo (isset($_POST['loan_purpose']) && $_POST['loan_purpose'] === 'Education') ? 'selected' : ''; ?>>Education Fees</option>
                            <option value="Marriage" <?php echo (isset($_POST['loan_purpose']) && $_POST['loan_purpose'] === 'Marriage') ? 'selected' : ''; ?>>Marriage Expenses</option>
                            <option value="Home Construction" <?php echo (isset($_POST['loan_purpose']) && $_POST['loan_purpose'] === 'Home Construction') ? 'selected' : ''; ?>>Home Construction/Repair</option>
                            <option value="Agriculture" <?php echo (isset($_POST['loan_purpose']) && $_POST['loan_purpose'] === 'Agriculture') ? 'selected' : ''; ?>>Agriculture Inputs</option>
                            <option value="Other" <?php echo (isset($_POST['loan_purpose']) && $_POST['loan_purpose'] === 'Other') ? 'selected' : ''; ?>>Other (Doosra)</option>
                        </select>
                    </div>
                    
                    <!-- Monthly Income (Optional) -->
                    <div class="col-md-6 mb-3">
                        <label for="monthly_income" class="form-label">
                            Monthly Income (PKR) <span class="text-muted-custom">(Optional)</span>
                        </label>
                        <input type="number" 
                               class="form-control" 
                               id="monthly_income" 
                               name="monthly_income" 
                               placeholder="e.g., 25000"
                               min="0"
                               value="<?php echo isset($_POST['monthly_income']) ? htmlspecialchars($_POST['monthly_income']) : ''; ?>">
                        <div class="field-help urdu-text" style="font-size: 1rem;">آپ کی آمدنی</div>
                    </div>
                </div>
                
                <!-- ============================================
                     SECTION 5: DOCUMENT UPLOADS
                     ============================================ -->
                <h3 class="section-title">📎 Document Uploads</h3>
                <div class="row">
                    
                    <!-- CNIC Front -->
                    <div class="col-md-6 mb-3">
                        <label class="form-label">
                            CNIC Front Side <span class="required">*</span>
                        </label>
                        <div class="file-upload-area">
                            <div class="file-upload-icon">🆔</div>
                            <div class="file-upload-text">CNIC Front Photo Upload Karein</div>
                            <div class="file-upload-hint">JPG, JPEG, PNG (Max 5MB)</div>
                            <input type="file" 
                                   id="cnic_front" 
                                   name="cnic_front" 
                                   accept="image/jpeg,image/jpg,image/png">
                        </div>
                    </div>
                    
                    <!-- CNIC Back -->
                    <div class="col-md-6 mb-3">
                        <label class="form-label">
                            CNIC Back Side <span class="required">*</span>
                        </label>
                        <div class="file-upload-area">
                            <div class="file-upload-icon">🆔</div>
                            <div class="file-upload-text">CNIC Back Photo Upload Karein</div>
                            <div class="file-upload-hint">JPG, JPEG, PNG (Max 5MB)</div>
                            <input type="file" 
                                   id="cnic_back" 
                                   name="cnic_back" 
                                   accept="image/jpeg,image/jpg,image/png">
                        </div>
                    </div>
                    
                    <!-- Utility Bill (Optional) -->
                    <div class="col-md-12 mb-3">
                        <label class="form-label">
                            Utility Bill / Salary Slip <span class="text-muted-custom">(Optional)</span>
                        </label>
                        <div class="file-upload-area">
                            <div class="file-upload-icon">📄</div>
                            <div class="file-upload-text">Utility Bill Ya Salary Slip Upload Karein</div>
                            <div class="file-upload-hint">JPG, JPEG, PNG, PDF (Max 5MB)</div>
                            <input type="file" 
                                   id="utility_bill" 
                                   name="utility_bill" 
                                   accept="image/jpeg,image/jpg,image/png,application/pdf">
                        </div>
                    </div>
                </div>
                
                <!-- ============================================
                     SECTION 6: CONFIRMATION
                     ============================================ -->
                <h3 class="section-title">✅ Confirmation</h3>
                <div class="col-md-12 mb-3">
                    <div class="form-check">
                        <input class="form-check-input" 
                               type="checkbox" 
                               id="confirm_info" 
                               name="confirm_info">
                        <label class="form-check-label" for="confirm_info">
                            Main tasalli karta/karti hoon ke meri saari information sahi hai. 
                            Agar koi information galat paayi gayi to meri application reject ho sakti hai.
                        </label>
                    </div>
                </div>
                
                <!-- Submit Button -->
                <div class="col-md-12 mt-4">
                    <button type="submit" 
                            class="btn btn-submit" 
                            id="submitBtn">
                        <span class="spinner" id="submitSpinner"></span>
                        Submit Form
                    </button>
                </div>
                
            </form>
            <!-- ========== FORM END ========== -->
            
        </div>
        <!-- ========== FORM BODY END ========== -->
        
        <!-- ========== FOOTER (Bottom green banner with Urdu) ========== -->
        <div class="form-footer">
            <span class="urdu-text">آخوت انٹر لوگن</span><br>
            <small>Asaan Karobar Qarza | Akhuwat Loan Services</small>
        </div>
        
    </div>
</div>

<!-- ===== BOOTSTRAP 5 JS (CDN se) ===== -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

<!-- ===== CUSTOM VALIDATION JS ===== -->
<script src="assets/js/validation.js"></script>

</body>
</html>
