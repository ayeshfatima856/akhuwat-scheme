<?php
// ============================================================
// ADMIN LOGOUT (admin/logout.php)
// ============================================================
// Yeh file admin ko logout karwati hai
// Session destroy kar ke login page par redirect karti hai
// ============================================================

// Session start karo (taake destroy kar sakein)
session_start();

// Saari session variables unset karo
$_SESSION = array();

// Session cookie destroy karo (agar set hai)
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

// Final session destroy
session_destroy();

// Login page par redirect karo
header("Location: login.php");
exit();
?>
