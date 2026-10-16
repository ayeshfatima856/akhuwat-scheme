<?php
// ============================================================
// DATABASE CONFIGURATION FILE
// ============================================================
// Yeh file database se connection banati hai
// Har page mein yeh file include karni hai taake DB connect ho jaye
// ============================================================

// ----- DATABASE SETTINGS -----
// Yeh values apne local XAMPP ke hisaab se change kar sakte hain
$host = "localhost";        // Server name (XAMPP mein "localhost" hota hai)
$username = "root";         // Database username (XAMPP mein default "root" hota hai)
$password = "";             // Database password (XAMPP mein default empty hota hai)
$database = "akhuwat_loan"; // Database ka naam (jo humne SQL file mein banaya)

// ----- CONNECTION BANAO -----
// mysqli use kar ke MySQL se connect ho rahe hain
$conn = new mysqli($host, $username, $password, $database);

// ----- CONNECTION CHECK KARO -----
// Agar connection fail ho gaya to error dikhao aur script ruk jaye
if ($conn->connect_error) {
    die("❌ Database Connection Failed: " . $conn->connect_error);
}

// ----- CHARACTER SET SET KARO -----
// Taake Urdu/Special characters properly save hon
$conn->set_charset("utf8mb4");

// ----- TIMEZONE SET KARO (Pakistan) -----
date_default_timezone_set('Asia/Karachi');

// ============================================================
// HELPER FUNCTIONS (Yahan se neeche helper functions hain)
// ============================================================

/**
 * Yeh function input ko clean (sanitize) karta hai
 * SQL injection aur XSS attacks se bachav ke liye
 * 
 * @param string $data - Jo data clean karna hai
 * @return string - Cleaned data
 */
function clean_input($data) {
    global $conn;
    $data = trim($data);              // Spaces hatao (start/end se)
    $data = stripslashes($data);      // Backslashes hatao
    $data = htmlspecialchars($data);  // Special chars ko entities mein convert karo
    $data = $conn->real_escape_string($data); // SQL injection se bachav
    return $data;
}

/**
 * Yeh function check karta hai ke user login hai ya nahi
 * Agar login nahi hai to login page par redirect kar deta hai
 */
function checkLogin() {
    session_start();
    if (!isset($_SESSION['admin_id'])) {
        header("Location: login.php");
        exit();
    }
}

/**
 * Yeh function file upload karta hai
 * 
 * @param array $file - $_FILES se aaya file array
 * @param string $target_dir - Jis folder mein upload karna hai
 * @param array $allowed_types - Kaun se file types allow hain
 * @return array - [success => bool, path => string, error => string]
 */
function uploadFile($file, $target_dir, $allowed_types = ['jpg', 'jpeg', 'png', 'pdf']) {
    $result = ['success' => false, 'path' => '', 'error' => ''];
    
    // Agar file empty hai
    if (empty($file['name']) || $file['error'] !== UPLOAD_ERR_OK) {
        $result['error'] = 'File upload nahi hui';
        return $result;
    }
    
    // File size check karo (max 5MB)
    $max_size = 5 * 1024 * 1024; // 5MB in bytes
    if ($file['size'] > $max_size) {
        $result['error'] = 'File size 5MB se zyada hai';
        return $result;
    }
    
    // File extension nikalo
    $file_ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    
    // Check karo ke type allowed hai ya nahi
    if (!in_array($file_ext, $allowed_types)) {
        $result['error'] = 'Yeh file type allowed nahi hai. Allowed: ' . implode(', ', $allowed_types);
        return $result;
    }
    
    // Unique filename banao (taake overwrite na ho)
    $new_filename = uniqid() . '_' . time() . '.' . $file_ext;
    $target_path = $target_dir . '/' . $new_filename;
    
    // Folder exist karta hai ya nahi, agar nahi to banao
    if (!is_dir($target_dir)) {
        mkdir($target_dir, 0777, true);
    }
    
    // File ko target location par move karo
    if (move_uploaded_file($file['tmp_name'], $target_path)) {
        $result['success'] = true;
        $result['path'] = $target_path;
    } else {
        $result['error'] = 'File server par save nahi hui';
    }
    
    return $result;
}
?>
