<?php
// ============================================================
// ADMIN LOGIN PAGE (admin/login.php)
// ============================================================
// Yeh admin panel ka login page hai
// Admin yahan se login kar ke saari loan applications dekh sakta hai
// ============================================================

// Session start karo (taake login state save ho)
session_start();

// Agar admin pehle se login hai to dashboard par bhej do
if (isset($_SESSION['admin_id'])) {
    header("Location: dashboard.php");
    exit();
}

// Database connection
require_once '../includes/config.php';

// ----- VARIABLES -----
$error = '';

// ----- LOGIN FORM SUBMIT HONE PAR -----
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Username aur password lo
    $username = clean_input($_POST['username'] ?? '');
    $password = $_POST['password'] ?? ''; // Password ko clean nahi karte (hash check karna hai)
    
    // Validation: dono fields bharne zaroori hain
    if (empty($username) || empty($password)) {
        $error = '❌ Username aur password dono zaroori hain';
    } else {
        // Database se admin user ko dhoondo
        $sql = "SELECT id, username, email, password FROM admin_users WHERE username = ? LIMIT 1";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows === 1) {
            // Admin mil gaya - password check karo
            $admin = $result->fetch_assoc();
            
            // password_verify() se hashed password match karo
            if (password_verify($password, $admin['password'])) {
                // Password sahi hai - session set karo
                $_SESSION['admin_id'] = $admin['id'];
                $_SESSION['admin_username'] = $admin['username'];
                $_SESSION['admin_email'] = $admin['email'];
                
                // Dashboard par redirect karo
                header("Location: dashboard.php");
                exit();
            } else {
                $error = '❌ Password galat hai';
            }
        } else {
            $error = '❌ Yeh username exist nahi karta';
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
    <title>Admin Login - Akhuwat Loan</title>
    
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
    
    <style>
        /* Login page ka custom styling */
        body {
            background: linear-gradient(135deg, #1a7a3c 0%, #0f5228 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .login-container {
            background: white;
            border-radius: 15px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            max-width: 420px;
            width: 100%;
            padding: 40px;
        }
        
        .login-header {
            text-align: center;
            margin-bottom: 30px;
        }
        
        .login-header .icon {
            font-size: 3rem;
            color: #1a7a3c;
            margin-bottom: 15px;
        }
        
        .login-header h2 {
            color: #1a7a3c;
            font-weight: 700;
            margin-bottom: 5px;
        }
        
        .login-header p {
            color: #6c757d;
            margin-bottom: 0;
        }
        
        .form-control {
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            padding: 12px 15px;
        }
        
        .form-control:focus {
            border-color: #1a7a3c;
            box-shadow: 0 0 0 0.2rem rgba(26, 122, 60, 0.15);
        }
        
        .btn-login {
            background: linear-gradient(135deg, #1a7a3c 0%, #0f5228 100%);
            color: white;
            border: none;
            padding: 12px;
            font-size: 1.1rem;
            font-weight: 600;
            border-radius: 8px;
            width: 100%;
            transition: all 0.3s ease;
        }
        
        .btn-login:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 20px rgba(26, 122, 60, 0.4);
            color: white;
        }
        
        .alert-custom {
            background: #f8d7da;
            color: #721c24;
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 20px;
            font-size: 0.9rem;
        }
        
        .default-creds {
            background: #e8f5e9;
            border: 1px dashed #1a7a3c;
            color: #0f5228;
            padding: 10px;
            border-radius: 8px;
            margin-top: 20px;
            font-size: 0.85rem;
            text-align: center;
        }
        
        .back-link {
            text-align: center;
            margin-top: 20px;
        }
        
        .back-link a {
            color: #6c757d;
            text-decoration: none;
            font-size: 0.9rem;
        }
        
        .back-link a:hover {
            color: #1a7a3c;
        }
    </style>
</head>
<body>

<div class="login-container">
    
    <!-- Login Header -->
    <div class="login-header">
        <div class="icon">🔐</div>
        <h2>Admin Login</h2>
        <p>Akhuwat Loan Management</p>
    </div>
    
    <!-- Error Message (agar login fail ho) -->
    <?php if (!empty($error)): ?>
        <div class="alert-custom">
            <?php echo $error; ?>
        </div>
    <?php endif; ?>
    
    <!-- Login Form -->
    <form method="POST" action="">
        
        <!-- Username -->
        <div class="mb-3">
            <label class="form-label">Username</label>
            <div class="input-group">
                <span class="input-group-text">👤</span>
                <input type="text" 
                       class="form-control" 
                       name="username" 
                       placeholder="Admin username"
                       value="<?php echo isset($_POST['username']) ? htmlspecialchars($_POST['username']) : ''; ?>"
                       required>
            </div>
        </div>
        
        <!-- Password -->
        <div class="mb-3">
            <label class="form-label">Password</label>
            <div class="input-group">
                <span class="input-group-text">🔑</span>
                <input type="password" 
                       class="form-control" 
                       name="password" 
                       placeholder="Password"
                       required>
                <button class="btn btn-outline-secondary" 
                        type="button" 
                        id="togglePassword"
                        onclick="togglePassword()">
                    👁
                </button>
            </div>
        </div>
        
        <!-- Submit Button -->
        <button type="submit" class="btn btn-login">
            Login
        </button>
    </form>
    
    <!-- Default credentials info (Sirf testing ke liye - production mein hata do) -->
    <div class="default-creds">
        <strong>Default Login (Testing):</strong><br>
        Username: <code>admin</code> | Password: <code>admin123</code>
    </div>
    
    <!-- Back to website -->
    <div class="back-link">
        <a href="../index.php">← Website par wapas jaen</a>
    </div>
    
</div>

<!-- Toggle password show/hide -->
<script>
function togglePassword() {
    const passwordInput = document.querySelector('input[name="password"]');
    const toggleBtn = document.getElementById('togglePassword');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        toggleBtn.textContent = '👁';
    }
}
</script>

</body>
</html>
