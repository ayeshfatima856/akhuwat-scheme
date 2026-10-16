<?php
// ============================================================
// SERVICES PAGE (services.php) - Loan Types
// ============================================================
$page_title = 'Loan Types';
require_once 'includes/header.php';
?>

<!-- ===== PAGE BANNER ===== -->
<section class="page-banner">
    <div class="container">
        <div class="page-banner-content">
            <h1>Loan Types & Plans</h1>
            <nav>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="index.php">Home</a></li>
                    <li class="breadcrumb-item active">Loan Types</li>
                </ol>
            </nav>
        </div>
    </div>
</section>

<!-- ===== INTRO TEXT ===== -->
<section class="section">
    <div class="container">
        <div class="section-header" data-animate="fade-up">
            <span class="subtitle">OUR LOAN PLANS</span>
            <h2>Aapki Zaroorat Ke Hisaab Se Qarza</h2>
            <p>
                Har zaroorat ke liye alag plan. Sab be-sood, asaan qistoon mein.
                Neeche se apni zaroorat ke hisaab se loan select karein.
            </p>
        </div>
        
        <!-- Loan Cards Grid -->
        <div class="row g-4">
            
            <!-- Business Loan -->
            <div class="col-lg-4 col-md-6" data-animate="fade-up">
                <div class="service-card">
                    <div class="service-icon">💼</div>
                    <h4>Business Loan</h4>
                    <p>
                        Naya karobar shuru karne ya purane business ko expand 
                        karne ke liye be-sood qarza. Asaan qistoon mein wapsi.
                    </p>
                    <ul style="list-style: none; padding: 0; margin: 15px 0;">
                        <li>✓ Amount: Rs. 10,000 - 10,00,000</li>
                        <li>✓ Period: 6 - 36 months</li>
                        <li>✓ 0% Interest Rate</li>
                        <li>✓ No Hidden Charges</li>
                    </ul>
                    <a href="apply.php?loan_type=Business Loan" class="btn btn-hero-primary w-100">Apply Now</a>
                </div>
            </div>
            
            <!-- Personal Loan -->
            <div class="col-lg-4 col-md-6" data-animate="fade-up" data-delay="200">
                <div class="service-card">
                    <div class="service-icon">👤</div>
                    <h4>Personal Loan</h4>
                    <p>
                        Shakhsi zaroorat ke liye — medical bills, family event, 
                        ya ghar ke kharoche. Jaldi approval, asaan qistain.
                    </p>
                    <ul style="list-style: none; padding: 0; margin: 15px 0;">
                        <li>✓ Amount: Rs. 5,000 - 5,00,000</li>
                        <li>✓ Period: 3 - 24 months</li>
                        <li>✓ 0% Interest Rate</li>
                        <li>✓ Quick Approval</li>
                    </ul>
                    <a href="apply.php?loan_type=Personal Loan" class="btn btn-hero-primary w-100">Apply Now</a>
                </div>
            </div>
            
            <!-- Agriculture Loan -->
            <div class="col-lg-4 col-md-6" data-animate="fade-up" data-delay="400">
                <div class="service-card">
                    <div class="service-icon">🌾</div>
                    <h4>Agriculture Loan</h4>
                    <p>
                        Kashtkari ke liye — beej, khaad, machinery ya fasal 
                        ke kharoche ke liye. Kisanon ke liye special plan.
                    </p>
                    <ul style="list-style: none; padding: 0; margin: 15px 0;">
                        <li>✓ Amount: Rs. 10,000 - 7,00,000</li>
                        <li>✓ Period: 6 - 24 months</li>
                        <li>✓ 0% Interest Rate</li>
                        <li>✓ Harvest-time Repayment</li>
                    </ul>
                    <a href="apply.php?loan_type=Agriculture Loan" class="btn btn-hero-primary w-100">Apply Now</a>
                </div>
            </div>
            
            <!-- Education Loan -->
            <div class="col-lg-4 col-md-6" data-animate="fade-up">
                <div class="service-card">
                    <div class="service-icon">🎓</div>
                    <h4>Education Loan</h4>
                    <p>
                        Taleem ki fees, books, ya hostel ke kharoche ke liye 
                        asaan qarza. Apne bachon ka mustaqbil banayen.
                    </p>
                    <ul style="list-style: none; padding: 0; margin: 15px 0;">
                        <li>✓ Amount: Rs. 5,000 - 3,00,000</li>
                        <li>✓ Period: 12 - 48 months</li>
                        <li>✓ 0% Interest Rate</li>
                        <li>✓ Flexible Repayment</li>
                    </ul>
                    <a href="apply.php?loan_type=Education Loan" class="btn btn-hero-primary w-100">Apply Now</a>
                </div>
            </div>
            
            <!-- Home Loan -->
            <div class="col-lg-4 col-md-6" data-animate="fade-up" data-delay="200">
                <div class="service-card">
                    <div class="service-icon">🏠</div>
                    <h4>Home Loan</h4>
                    <p>
                        Makan ki tameer, mukammal karne, ya repair ke liye 
                        qarza. Apne khaab ka ghar banayen.
                    </p>
                    <ul style="list-style: none; padding: 0; margin: 15px 0;">
                        <li>✓ Amount: Rs. 50,000 - 10,00,000</li>
                        <li>✓ Period: 12 - 60 months</li>
                        <li>✓ 0% Interest Rate</li>
                        <li>✓ Long-term Plan</li>
                    </ul>
                    <a href="apply.php?loan_type=Home Loan" class="btn btn-hero-primary w-100">Apply Now</a>
                </div>
            </div>
            
            <!-- Emergency Loan -->
            <div class="col-lg-4 col-md-6" data-animate="fade-up" data-delay="400">
                <div class="service-card">
                    <div class="service-icon">🚨</div>
                    <h4>Emergency Loan</h4>
                    <p>
                        Medical emergency ya koi aur zaroori kaam ke liye 
                        fori qarza. 24 ghante mein approval!
                    </p>
                    <ul style="list-style: none; padding: 0; margin: 15px 0;">
                        <li>✓ Amount: Rs. 5,000 - 2,00,000</li>
                        <li>✓ Period: 3 - 12 months</li>
                        <li>✓ 0% Interest Rate</li>
                        <li>✓ Fast 24h Approval</li>
                    </ul>
                    <a href="apply.php?loan_type=Emergency Loan" class="btn btn-hero-primary w-100">Apply Now</a>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- ===== CTA SECTION ===== -->
<section class="cta-section">
    <div class="container text-center" data-animate="zoom-in">
        <h2>Koi Confusion Hai?</h2>
        <p>Hamari team aapki maddad ke liye yahan hai. WhatsApp par raabta karein!</p>
        <a href="https://wa.me/923082171396" target="_blank" class="btn btn-hero-primary">
            <i class="bi bi-whatsapp"></i> WhatsApp Now
        </a>
    </div>
</section>

<?php
require_once 'includes/footer.php';
?>
