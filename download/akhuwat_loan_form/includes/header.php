<?php
// ============================================================
// COMMON HEADER FILE (includes/header.php)
// ============================================================
// Yeh file har page ke top par include hogi
// Isme: <head> section, preloader, navbar, aur WhatsApp button hai
// ============================================================
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Page title (har page se set hoga) -->
    <title><?php echo isset($page_title) ? $page_title . ' | ' : ''; ?>Akhuwat Scheme</title>
    
    <!-- SEO Meta Tags -->
    <meta name="description" content="Akhuwat Scheme - Asaan Qarza, Karobar Loan, Personal Loan. Pakistan ka trusted loan service. Apply online today!">
    <meta name="keywords" content="Akhuwat, Loan, Qarza, Pakistan, Business Loan, Personal Loan">
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="assets/images/favicon.svg">
    
    <!-- ===== BOOTSTRAP 5 CSS ===== -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <!-- ===== BOOTSTRAP ICONS ===== -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
    
    <!-- ===== GOOGLE FONTS (Playfair Display + Poppins) ===== -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- ===== CUSTOM CSS ===== -->
    <link rel="stylesheet" href="assets/css/main.css">
    
    <!-- ===== Form CSS (sirf apply page par) ===== -->
    <?php if (isset($is_form_page) && $is_form_page): ?>
        <link rel="stylesheet" href="assets/css/style.css">
    <?php endif; ?>
</head>
<body>

<!-- ============================================================
     PRELOADER (Logo Intro Animation)
     ============================================================ -->
<div id="preloader">
    <!-- Logo SVG -->
    <img src="assets/images/logo.svg" alt="Akhuwat Scheme" class="preloader-logo">
    
    <!-- Brand text -->
    <div class="preloader-text">AKHUWAT</div>
    <div class="preloader-subtext">SCHEME</div>
    
    <!-- Loading bar -->
    <div class="preloader-loader"></div>
</div>

<!-- ============================================================
     NAVBAR (Top menu)
     ============================================================ -->
<nav class="navbar navbar-expand-lg navbar-custom fixed-top">
    <div class="container">
        
        <!-- Brand Logo -->
        <a class="navbar-brand-custom" href="index.php">
            <img src="assets/images/logo.svg" alt="Akhuwat Scheme">
            <div class="navbar-brand-text">
                <h4>Akhuwat</h4>
                <small>SCHEME</small>
            </div>
        </a>
        
        <!-- Mobile menu toggle button -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
                data-bs-target="#mainNav" aria-controls="mainNav" 
                aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        
        <!-- Menu Links -->
        <div class="collapse navbar-collapse" id="mainNav">
            <ul class="navbar-nav navbar-nav-custom ms-auto align-items-lg-center">
                <li class="nav-item">
                    <a class="nav-link" href="index.php">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="about.php">About</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="services.php">Loan Types</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="contact.php">Contact</a>
                </li>
                <li class="nav-item ms-lg-3">
                    <a class="nav-link btn-apply" href="apply.php">Apply Now</a>
                </li>
            </ul>
        </div>
    </div>
</nav>

<!-- ============================================================
     WHATSAPP FLOATING BUTTON
     Number: 03082171396
     ============================================================ -->
<a href="https://wa.me/923082171396" 
   class="whatsapp-float" 
   target="_blank" 
   rel="noopener"
   title="Chat with us on WhatsApp">
    <i class="bi bi-whatsapp"></i>
</a>
<div class="whatsapp-tooltip">💬 Chat with us on WhatsApp!</div>

<!-- ============================================================
     SCROLL TO TOP BUTTON
     ============================================================ -->
<button class="scroll-top" aria-label="Scroll to top">
    <i class="bi bi-arrow-up"></i>
</button>

<!-- Spacing for fixed navbar (taake content navbar ke neeche na chhupe) -->
<div style="height: 80px;"></div>
