// ============================================================
// AKHUWAT LOAN FORM - JAVASCRIPT VALIDATION
// ============================================================
// Yeh file form submit hone se pehle fields ko validate karti hai
// Agar koi field galat hai to submit nahi hone dega
// ============================================================

// Page load hone par yeh chalega
document.addEventListener('DOMContentLoaded', function() {
    
    const form = document.getElementById('loanApplicationForm');
    const submitBtn = document.getElementById('submitBtn');
    const spinner = document.getElementById('submitSpinner');
    
    // ----- FORM SUBMIT EVENT LISTENER -----
    form.addEventListener('submit', function(event) {
        // Pehle default submit roko
        event.preventDefault();
        
        // Sab fields validate karo
        if (validateForm()) {
            // Agar sab sahi hai to:
            // 1. Button disable karo (taake dobara click na ho)
            // 2. Spinner dikhao (loading state)
            // 3. Form submit karo
            submitBtn.disabled = true;
            spinner.style.display = 'inline-block';
            submitBtn.innerHTML = '<span class="spinner" id="submitSpinner"></span>Submit Ho Raha Hai...';
            
            // Form submit karo (PHP ke liye)
            form.submit();
        }
    });
    
    // ----- FILE UPLOAD PREVIEW -----
    // Jab user koi file select kare to preview dikhao
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        input.addEventListener('change', function(e) {
            showFilePreview(e.target);
        });
    });
    
    // ----- CNIC NUMBER AUTO FORMAT -----
    // CNIC ko automatically format karega: 35202-1234567-8
    const cnicInput = document.getElementById('cnic_number');
    if (cnicInput) {
        cnicInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, ''); // Sirf numbers rakho
            
            // Limit to 13 digits
            if (value.length > 13) {
                value = value.substring(0, 13);
            }
            
            // Format: 35202-1234567-8
            if (value.length > 5) {
                value = value.substring(0, 5) + '-' + value.substring(5);
            }
            if (value.length > 13) {
                value = value.substring(0, 13) + '-' + value.substring(13);
            }
            
            e.target.value = value;
        });
    }
    
    // ----- PHONE NUMBER AUTO FORMAT -----
    // Phone ko +92 format mein convert karega
    const phoneInput = document.getElementById('phone_number');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, ''); // Sirf numbers
            
            // Limit to 12 digits (3 for country code + 9 for number)
            if (value.length > 12) {
                value = value.substring(0, 12);
            }
            
            e.target.value = value ? '+' + value : '';
        });
    }
    
    // ----- LOAN AMOUNT: SIRF NUMBERS -----
    const loanAmountInput = document.getElementById('loan_amount');
    if (loanAmountInput) {
        loanAmountInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/[^\d]/g, '');
        });
    }
});

// ============================================================
// MAIN VALIDATION FUNCTION
// ============================================================
function validateForm() {
    let isValid = true;
    
    // Pehle saari errors clear karo
    clearAllErrors();
    
    // ----- 1. FULL NAME CHECK -----
    const fullName = document.getElementById('full_name').value.trim();
    if (fullName === '') {
        showError('full_name', 'Naam likhna zaroori hai');
        isValid = false;
    } else if (fullName.length < 3) {
        showError('full_name', 'Naam kam az kam 3 letters ka hona chahiye');
        isValid = false;
    }
    
    // ----- 2. FATHER NAME CHECK -----
    const fatherName = document.getElementById('father_name').value.trim();
    if (fatherName === '') {
        showError('father_name', 'Waald ka naam zaroori hai');
        isValid = false;
    }
    
    // ----- 3. CNIC NUMBER CHECK -----
    // Format: 35202-1234567-8 (5 digits - 7 digits - 1 digit)
    const cnic = document.getElementById('cnic_number').value.trim();
    const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;
    if (cnic === '') {
        showError('cnic_number', 'CNIC number zaroori hai');
        isValid = false;
    } else if (!cnicRegex.test(cnic)) {
        showError('cnic_number', 'CNIC format galat hai. Sahi: 35202-1234567-8');
        isValid = false;
    }
    
    // ----- 4. PHONE NUMBER CHECK -----
    // Format: +923001234567
    const phone = document.getElementById('phone_number').value.trim();
    const phoneRegex = /^\+92\d{10}$/;
    if (phone === '') {
        showError('phone_number', 'Phone number zaroori hai');
        isValid = false;
    } else if (!phoneRegex.test(phone)) {
        showError('phone_number', 'Phone format: +923001234567 (12 digits ke baad +)');
        isValid = false;
    }
    
    // ----- 5. AGE ABOVE 18 CHECK -----
    const ageAbove18 = document.getElementById('age_above_18').value;
    if (ageAbove18 === '') {
        showError('age_above_18', 'Yeh field zaroori hai');
        isValid = false;
    }
    
    // ----- 6. GENDER CHECK -----
    const gender = document.getElementById('gender').value;
    if (gender === '') {
        showError('gender', 'Gender select karein');
        isValid = false;
    }
    
    // ----- 7. MARITAL STATUS CHECK -----
    const maritalStatus = document.getElementById('marital_status').value;
    if (maritalStatus === '') {
        showError('marital_status', 'Marital status select karein');
        isValid = false;
    }
    
    // ----- 8. ADDRESS CHECK -----
    const address = document.getElementById('address').value.trim();
    if (address === '') {
        showError('address', 'Address zaroori hai');
        isValid = false;
    } else if (address.length < 10) {
        showError('address', 'Address mukammal likhein (kam az kam 10 letters)');
        isValid = false;
    }
    
    // ----- 9. CITY CHECK -----
    const city = document.getElementById('city').value.trim();
    if (city === '') {
        showError('city', 'Shehr ka naam zaroori hai');
        isValid = false;
    }
    
    // ----- 10. PROVINCE CHECK -----
    const province = document.getElementById('province').value;
    if (province === '') {
        showError('province', 'Province select karein');
        isValid = false;
    }
    
    // ----- 11. LOAN TYPE CHECK -----
    const loanType = document.getElementById('loan_type').value;
    if (loanType === '') {
        showError('loan_type', 'Loan type select karein');
        isValid = false;
    }
    
    // ----- 12. LOAN AMOUNT CHECK -----
    const loanAmount = document.getElementById('loan_amount').value;
    if (loanAmount === '') {
        showError('loan_amount', 'Loan amount zaroori hai');
        isValid = false;
    } else if (parseInt(loanAmount) < 1000) {
        showError('loan_amount', 'Loan amount kam az kam 1,000 PKR hona chahiye');
        isValid = false;
    } else if (parseInt(loanAmount) > 1000000) {
        showError('loan_amount', 'Loan amount 10,00,000 PKR se zyada nahi ho sakti');
        isValid = false;
    }
    
    // ----- 13. LOAN PURPOSE CHECK -----
    const loanPurpose = document.getElementById('loan_purpose').value;
    if (loanPurpose === '') {
        showError('loan_purpose', 'Loan purpose select karein');
        isValid = false;
    }
    
    // ----- 14. PHOTO UPLOAD CHECK -----
    const photo = document.getElementById('photo').files[0];
    if (!photo) {
        showError('photo', 'Apni photo upload karein');
        isValid = false;
    } else {
        // File type check
        if (!isValidImageFile(photo)) {
            showError('photo', 'Sirf JPG, JPEG, PNG files allowed hain');
            isValid = false;
        }
        // File size check (max 2MB for photo)
        else if (photo.size > 2 * 1024 * 1024) {
            showError('photo', 'Photo size 2MB se kam hona chahiye');
            isValid = false;
        }
    }
    
    // ----- 15. CNIC FRONT CHECK -----
    const cnicFront = document.getElementById('cnic_front').files[0];
    if (!cnicFront) {
        showError('cnic_front', 'CNIC ki front side photo zaroori hai');
        isValid = false;
    } else if (!isValidImageFile(cnicFront)) {
        showError('cnic_front', 'Sirf JPG, JPEG, PNG files allowed hain');
        isValid = false;
    }
    
    // ----- 16. CNIC BACK CHECK -----
    const cnicBack = document.getElementById('cnic_back').files[0];
    if (!cnicBack) {
        showError('cnic_back', 'CNIC ki back side photo zaroori hai');
        isValid = false;
    } else if (!isValidImageFile(cnicBack)) {
        showError('cnic_back', 'Sirf JPG, JPEG, PNG files allowed hain');
        isValid = false;
    }
    
    // ----- 17. EMAIL CHECK (Agar diya hai to sahi hona chahiye) -----
    const email = document.getElementById('email').value.trim();
    if (email !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('email', 'Email format galat hai (example@email.com)');
            isValid = false;
        }
    }
    
    // ----- 18. CONFIRMATION CHECKBOX -----
    const confirmCheck = document.getElementById('confirm_info');
    if (!confirmCheck.checked) {
        showError('confirm_info', 'Pehle confirm karein ke information sahi hai');
        isValid = false;
    }
    
    // Agar sab sahi hai to scroll up karo (taake success message dikhe)
    if (!isValid) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    return isValid;
}

// ============================================================
// HELPER: CHECK IF FILE IS VALID IMAGE
// ============================================================
function isValidImageFile(file) {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    return validTypes.includes(file.type);
}

// ============================================================
// ERROR SHOW KARNE KA FUNCTION
// ============================================================
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    // Field ko red border do
    if (field.type === 'checkbox') {
        field.classList.add('is-invalid');
    } else {
        field.classList.add('is-invalid');
    }
    
    // Error message show karo (field ke neeche)
    // Pehle check karo ke pehle se koi error to nahi
    const existingError = field.parentNode.querySelector('.invalid-feedback');
    if (existingError) {
        existingError.textContent = message;
    } else {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback d-block';
        errorDiv.style.color = '#dc3545';
        errorDiv.style.fontSize = '0.85rem';
        errorDiv.style.marginTop = '4px';
        errorDiv.textContent = '⚠️ ' + message;
        field.parentNode.appendChild(errorDiv);
    }
}

// ============================================================
// CLEAR ALL ERRORS (Form submit hone se pehle)
// ============================================================
function clearAllErrors() {
    // Saari invalid classes hatao
    document.querySelectorAll('.is-invalid').forEach(el => {
        el.classList.remove('is-invalid');
    });
    
    // Saare error messages hatao
    document.querySelectorAll('.invalid-feedback').forEach(el => {
        el.remove();
    });
}

// ============================================================
// FILE PREVIEW SHOW KARNE KA FUNCTION
// ============================================================
function showFilePreview(input) {
    // Agar file select hui hai
    if (input.files && input.files[0]) {
        const file = input.files[0];
        
        // Sirf image files ke liye preview
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                // Preview image find karo
                let preview = input.parentNode.querySelector('.file-preview');
                
                // Agar preview element nahi hai to banao
                if (!preview) {
                    preview = document.createElement('img');
                    preview.className = 'file-preview';
                    input.parentNode.appendChild(preview);
                }
                
                // Preview set karo aur dikhao
                preview.src = e.target.result;
                preview.style.display = 'block';
            };
            
            reader.readAsDataURL(file);
        }
    }
}
