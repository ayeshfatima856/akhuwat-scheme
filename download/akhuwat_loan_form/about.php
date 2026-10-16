<?php
// ============================================================
// ABOUT PAGE (about.php) - Akhuwat Scheme
// ============================================================
$page_title = 'About Us';
require_once 'includes/header.php';
?>

<!-- ===== PAGE BANNER ===== -->
<section class="page-banner">
    <div class="container">
        <div class="page-banner-content">
            <h1>About Akhuwat Scheme</h1>
            <nav>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="index.php">Home</a></li>
                    <li class="breadcrumb-item active">About Us</li>
                </ol>
            </nav>
        </div>
    </div>
</section>

<!-- ===== ABOUT MAIN SECTION ===== -->
<section class="section">
    <div class="container">
        <div class="row align-items-center">
            
            <!-- Image -->
            <div class="col-lg-6 mb-5 mb-lg-0" data-animate="fade-left">
                <div class="about-image">
                    <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&auto=format&fit=crop" 
                         alt="About Akhuwat" 
                         style="width: 100%; height: 500px; object-fit: cover;">
                </div>
            </div>
            
            <!-- Content -->
            <div class="col-lg-6" data-animate="fade-right">
                <div class="about-content">
                    <span class="subtitle">OUR STORY</span>
                    <h2>2002 Se Aap Ki Khidmat Mein</h2>
                    <p>
                        Akhuwat Scheme 2002 mein Lahore mein shuru hua tha. 
                        Hamari shuruwaat sirf ek choti si koshish se hui thi — 
                        muft qarza de kar logon ki maddad karna. Aaj hum 
                        Pakistan ke 25+ shehron mein apni services faraham 
                        kar rahe hain.
                    </p>
                    <p>
                        Hamari mission hai ek aisa muashra banana jahan koi 
                        bhi paiso ki kami ki waja se apne khaab poore na kar sake. 
                        Hum be-sood qarza de kar logon ko khud kamar pane 
                        mein maddad karte hain.
                    </p>
                    
                    <ul class="feature-list mt-4">
                        <li>
                            <div class="check-icon">✓</div>
                            <div class="feature-text">
                                <h5>0% Interest Rate</h5>
                                <p>Bina kisi sood ke qarza, sirf principal wapis karein.</p>
                            </div>
                        </li>
                        <li>
                            <div class="check-icon">✓</div>
                            <div class="feature-text">
                                <h5>Easy Installments</h5>
                                <p>Aapki aamdani ke hisaab se qistain tay karein.</p>
                            </div>
                        </li>
                        <li>
                            <div class="check-icon">✓</div>
                            <div class="feature-text">
                                <h5>No Hidden Charges</h5>
                                <p>Bina kisi processing fee ya hidden charges ke.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- ===== MISSION & VISION ===== -->
<section class="section section-light">
    <div class="container">
        <div class="row g-4">
            
            <!-- Mission -->
            <div class="col-md-6" data-animate="fade-up">
                <div class="service-card" style="text-align: center;">
                    <div class="service-icon mx-auto">🎯</div>
                    <h4>Our Mission</h4>
                    <p>
                        Pakistan ke tamam shehron mein be-sood qarza faraham 
                        kar k logon ki maashi maddad karna aur unhe apne pairo 
                        par khade hone mein maddad dena.
                    </p>
                </div>
            </div>
            
            <!-- Vision -->
            <div class="col-md-6" data-animate="fade-up" data-delay="200">
                <div class="service-card" style="text-align: center;">
                    <div class="service-icon mx-auto">🌟</div>
                    <h4>Our Vision</h4>
                    <p>
                        Ek aisa Pakistan jahan koi bhi paiso ki waja se apne 
                        khaab poore na kar sake. Sab ke liye barabar mauke.
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- ===== VALUES SECTION ===== -->
<section class="section">
    <div class="container">
        <div class="section-header" data-animate="fade-up">
            <span class="subtitle">OUR VALUES</span>
            <h2>Jo Humen Aap Ka Sathi Banata Hai</h2>
        </div>
        
        <div class="row g-4">
            <div class="col-lg-3 col-md-6" data-animate="fade-up">
                <div class="service-card text-center">
                    <div class="service-icon mx-auto">🤝</div>
                    <h5>Amanat Daari</h5>
                    <p>Aapke paiso aur information ki mukammal amanat daari.</p>
                </div>
            </div>
            <div class="col-lg-3 col-md-6" data-animate="fade-up" data-delay="200">
                <div class="service-card text-center">
                    <div class="service-icon mx-auto">⚖️</div>
                    <h5>Insaaf</h5>
                    <p>Sab ke liye barabar mauke, koi tafreeq nahi.</p>
                </div>
            </div>
            <div class="col-lg-3 col-md-6" data-animate="fade-up" data-delay="400">
                <div class="service-card text-center">
                    <div class="service-icon mx-auto">💎</div>
                    <h5>Khulasa</h5>
                    <p>Saaf saaf process, koi hidden charges nahi.</p>
                </div>
            </div>
            <div class="col-lg-3 col-md-6" data-animate="fade-up" data-delay="600">
                <div class="service-card text-center">
                    <div class="service-icon mx-auto">❤️</div>
                    <h5>Hamdardi</h5>
                    <p>Aapki har zaroorat ko hamdardi se sunna.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<?php
require_once 'includes/footer.php';
?>
