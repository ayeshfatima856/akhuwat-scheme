<?php
// ============================================================
// HOMEPAGE (index.php) - Akhuwat Scheme
// ============================================================
// Yeh website ka main landing page hai
// Isme: Hero section | Stats | Services | About | Process |
//        Testimonials | CTA
// ============================================================

// Page title set karo (header.php mein use hoga)
$page_title = 'Home';

// Header file include karo (navbar, preloader, WhatsApp button)
require_once 'includes/header.php';
?>

<!-- ============================================================
     HERO SECTION (Top main section)
     ============================================================ -->
<section class="hero">
    <!-- Decorative floating circles -->
    <div class="hero-decoration d1"></div>
    <div class="hero-decoration d2"></div>
    <div class="hero-decoration d3"></div>
    
    <div class="container">
        <div class="row align-items-center">
            
            <!-- ===== LEFT: Hero Text ===== -->
            <div class="col-lg-6 hero-content">
                
                <!-- Badge (top label) -->
                <span class="hero-badge">
                    ✨ Pakistan's Trusted Loan Scheme
                </span>
                
                <!-- Main heading -->
                <h1>
                    Be-sood Qarza,<br>
                    <span class="highlight">Aapke Karam</span> ka Sathi
                </h1>
                
                <!-- Subtitle paragraph -->
                <p>
                    Akhuwat Scheme aapko deta hai asaan, be-sood qarza — 
                    karobar shuru karne, taleem hasil karne, ya emergency 
                    waqt mein maddad ke liye. Abhi apply karein aur apne 
                    khaab poore karein!
                </p>
                
                <!-- CTA Buttons -->
                <div class="hero-buttons">
                    <a href="apply.php" class="btn btn-hero-primary">
                        📝 Apply for Loan
                    </a>
                    <a href="https://wa.me/923082171396" 
                       target="_blank" 
                       class="btn btn-hero-secondary">
                        <i class="bi bi-whatsapp"></i> WhatsApp Us
                    </a>
                </div>
            </div>
            
            <!-- ===== RIGHT: Stats Card ===== -->
            <div class="col-lg-5 offset-lg-1">
                <div class="hero-card">
                    <div class="row">
                        <div class="col-6 hero-stat">
                            <div class="number">50K+</div>
                            <div class="label">Loans Approved</div>
                        </div>
                        <div class="col-6 hero-stat">
                            <div class="number">Rs. 5B+</div>
                            <div class="label">Total Disbursed</div>
                        </div>
                    </div>
                    <hr style="border-color: rgba(255,255,255,0.2); margin: 25px 0;">
                    <div class="row">
                        <div class="col-6 hero-stat">
                            <div class="number">25+</div>
                            <div class="label">Cities Served</div>
                        </div>
                        <div class="col-6 hero-stat">
                            <div class="number">98%</div>
                            <div class="label">Satisfaction</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- ============================================================
     STATS COUNTER SECTION
     ============================================================ -->
<section class="stats-section">
    <div class="container">
        <div class="row">
            
            <!-- Total Loans -->
            <div class="col-md-3 col-6 mb-4 mb-md-0" data-animate="zoom-in">
                <div class="stat-item">
                    <div class="number"><span data-counter="50000">0</span><span class="plus">+</span></div>
                    <div class="label">HAPPY CUSTOMERS</div>
                </div>
            </div>
            
            <!-- Total Amount -->
            <div class="col-md-3 col-6 mb-4 mb-md-0" data-animate="zoom-in" data-delay="200">
                <div class="stat-item">
                    <div class="number"><span data-counter="500">0</span>Crore<span class="plus">+</span></div>
                    <div class="label">LOAN DISBURSED</div>
                </div>
            </div>
            
            <!-- Cities -->
            <div class="col-md-3 col-6" data-animate="zoom-in" data-delay="400">
                <div class="stat-item">
                    <div class="number"><span data-counter="25">0</span><span class="plus">+</span></div>
                    <div class="label">CITIES SERVED</div>
                </div>
            </div>
            
            <!-- Years -->
            <div class="col-md-3 col-6" data-animate="zoom-in" data-delay="600">
                <div class="stat-item">
                    <div class="number"><span data-counter="15">0</span><span class="plus">+</span></div>
                    <div class="label">YEARS EXPERIENCE</div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- ============================================================
     SERVICES / LOAN TYPES SECTION
     ============================================================ -->
<section class="section section-light">
    <div class="container">
        
        <!-- Section Header -->
        <div class="section-header" data-animate="fade-up">
            <span class="subtitle">OUR SERVICES</span>
            <h2>Loan Types We Offer</h2>
            <p>
                Aapki zaroorat ke hisaab se mukhtalif loan plans. 
                Sab be-sood, asaan qistoon mein.
            </p>
        </div>
        
        <!-- Service Cards Grid -->
        <div class="row g-4">
            
            <!-- Business Loan -->
            <div class="col-lg-4 col-md-6" data-animate="fade-up">
                <div class="service-card">
                    <div class="service-icon">💼</div>
                    <h4>Business Loan</h4>
                    <p>Naya karobar shuru karein ya purana expand karein. 
                       Be-sood qarza asaan qistoon mein.</p>
                    <div class="amount">Rs. 10,000 - 10,00,000</div>
                </div>
            </div>
            
            <!-- Personal Loan -->
            <div class="col-lg-4 col-md-6" data-animate="fade-up" data-delay="200">
                <div class="service-card">
                    <div class="service-icon">👤</div>
                    <h4>Personal Loan</h4>
                    <p>Shakhsi zaroorat ke liye — medical, education, 
                       ya ghar ke kharoche.</p>
                    <div class="amount">Rs. 5,000 - 5,00,000</div>
                </div>
            </div>
            
            <!-- Agriculture Loan -->
            <div class="col-lg-4 col-md-6" data-animate="fade-up" data-delay="400">
                <div class="service-card">
                    <div class="service-icon">🌾</div>
                    <h4>Agriculture Loan</h4>
                    <p>Kashtkari ke liye be-sood qarza — beej, khaad, 
                       ya machinery ke liye.</p>
                    <div class="amount">Rs. 10,000 - 7,00,000</div>
                </div>
            </div>
            
            <!-- Education Loan -->
            <div class="col-lg-4 col-md-6" data-animate="fade-up">
                <div class="service-card">
                    <div class="service-icon">🎓</div>
                    <h4>Education Loan</h4>
                    <p>Taleem ki fees, books, ya hostel ke liye 
                       asaan qarza.</p>
                    <div class="amount">Rs. 5,000 - 3,00,000</div>
                </div>
            </div>
            
            <!-- Home Loan -->
            <div class="col-lg-4 col-md-6" data-animate="fade-up" data-delay="200">
                <div class="service-card">
                    <div class="service-icon">🏠</div>
                    <h4>Home Loan</h4>
                    <p>Makan ki tameer, mukammal karne, ya repair 
                       ke liye qarza.</p>
                    <div class="amount">Rs. 50,000 - 10,00,000</div>
                </div>
            </div>
            
            <!-- Emergency Loan -->
            <div class="col-lg-4 col-md-6" data-animate="fade-up" data-delay="400">
                <div class="service-card">
                    <div class="service-icon">🚨</div>
                    <h4>Emergency Loan</h4>
                    <p>Medical emergency ya koi aur zaroori kaam 
                       ke liye fori qarza.</p>
                    <div class="amount">Rs. 5,000 - 2,00,000</div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- ============================================================
     ABOUT SECTION
     ============================================================ -->
<section class="section section-cream">
    <div class="container">
        <div class="row align-items-center">
            
            <!-- ===== LEFT: About Image ===== -->
            <div class="col-lg-6 mb-5 mb-lg-0" data-animate="fade-left">
                <div class="about-image">
                    <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop" 
                         alt="About Akhuwat Scheme" 
                         style="width: 100%; height: 450px; object-fit: cover;">
                </div>
            </div>
            
            <!-- ===== RIGHT: About Content ===== -->
            <div class="col-lg-6" data-animate="fade-right">
                <div class="about-content">
                    <span class="subtitle">ABOUT US</span>
                    <h2>Aapki Beteri Ke Liye Hum Aap Ke Sath Hain</h2>
                    <p>
                        Akhuwat Scheme 2002 se Pakistan mein be-sood qarza 
                        faraham kar raha hai. Hamari mission hai muft mein 
                        financial maddad dana taake log apne pairo par 
                        khade ho sakein.
                    </p>
                    
                    <!-- Feature List -->
                    <ul class="feature-list">
                        <li>
                            <div class="check-icon">✓</div>
                            <div class="feature-text">
                                <h5>Be-sood Qarza (0% Interest)</h5>
                                <p>Bina kisi sood ke asaan qistoon mein qarza.</p>
                            </div>
                        </li>
                        <li>
                            <div class="check-icon">✓</div>
                            <div class="feature-text">
                                <h5>Asaan Application Process</h5>
                                <p>Online form bharein aur 24-48 ghante mein response pa lein.</p>
                            </div>
                        </li>
                        <li>
                            <div class="check-icon">✓</div>
                            <div class="feature-text">
                                <h5>Trusted & Secure</h5>
                                <p>Aapki information puri tarah secure aur confidential hai.</p>
                            </div>
                        </li>
                        <li>
                            <div class="check-icon">✓</div>
                            <div class="feature-text">
                                <h5>Pakistan Wide Service</h5>
                                <p>25+ shehron mein hamari service mawjood hai.</p>
                            </div>
                        </li>
                    </ul>
                    
                    <a href="about.php" class="btn btn-hero-primary mt-3">
                        Learn More →
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- ============================================================
     PROCESS / HOW IT WORKS SECTION
     ============================================================ -->
<section class="section">
    <div class="container">
        
        <div class="section-header" data-animate="fade-up">
            <span class="subtitle">SIMPLE PROCESS</span>
            <h2>Kaise Apply Karein?</h2>
            <p>4 aasaan steps mein loan pa lein — sirf 5 minute mein!</p>
        </div>
        
        <div class="row">
            
            <!-- Step 1 -->
            <div class="col-lg-3 col-md-6 mb-5" data-animate="fade-up">
                <div class="process-step">
                    <div class="step-number">1</div>
                    <h5>Form Bharein</h5>
                    <p>Online application form bharein aur apni details submit karein.</p>
                </div>
            </div>
            
            <!-- Step 2 -->
            <div class="col-lg-3 col-md-6 mb-5" data-animate="fade-up" data-delay="200">
                <div class="process-step">
                    <div class="step-number">2</div>
                    <h5>Documents Upload</h5>
                    <p>Apni photo, CNIC, aur zaroori documents upload karein.</p>
                </div>
            </div>
            
            <!-- Step 3 -->
            <div class="col-lg-3 col-md-6 mb-5" data-animate="fade-up" data-delay="400">
                <div class="process-step">
                    <div class="step-number">3</div>
                    <h5>Verification</h5>
                    <p>Hamari team aapki application verify karegi (24-48 hours).</p>
                </div>
            </div>
            
            <!-- Step 4 -->
            <div class="col-lg-3 col-md-6 mb-5" data-animate="fade-up" data-delay="600">
                <div class="process-step">
                    <div class="step-number">4</div>
                    <h5>Loan Approved!</h5>
                    <p>Approval ke baad foran qarza aapke account mein transfer ho jayega.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- ============================================================
     TESTIMONIALS SECTION
     ============================================================ -->
<section class="section section-light">
    <div class="container">
        
        <div class="section-header" data-animate="fade-up">
            <span class="subtitle">TESTIMONIALS</span>
            <h2>Hamare Khush Gumnaam Customers</h2>
            <p>Suniye apni kahani un logon ki jinhone Akhuwat Scheme se faida uthaya.</p>
        </div>
        
        <div class="row g-4">
            
            <!-- Testimonial 1 -->
            <div class="col-lg-4 col-md-6" data-animate="fade-up">
                <div class="testimonial-card">
                    <div class="quote-mark">"</div>
                    <div class="stars">★★★★★</div>
                    <p class="testimonial-text">
                        "Akhuwat Scheme se mujhe business loan mila jis se main 
                        apna karobar shuru kar saka. Ab mera monthly income 
                        50,000 se 200,000 ho gaya. Bohot shukriya!"
                    </p>
                    <div class="testimonial-author">
                        <div class="avatar">AK</div>
                        <div>
                            <h6>Ahmed Khan</h6>
                            <small>Lahore - Business Owner</small>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Testimonial 2 -->
            <div class="col-lg-4 col-md-6" data-animate="fade-up" data-delay="200">
                <div class="testimonial-card">
                    <div class="quote-mark">"</div>
                    <div class="stars">★★★★★</div>
                    <p class="testimonial-text">
                        "Education loan ki waja se meri beti FSc mein top ki. 
                        Be-sood qarza aur asaan qistain — Akhuwat waqai 
                        logon ki maddad karta hai."
                    </p>
                    <div class="testimonial-author">
                        <div class="avatar">FN</div>
                        <div>
                            <h6>Fatima Noor</h6>
                            <small>Faisalabad - Housewife</small>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Testimonial 3 -->
            <div class="col-lg-4 col-md-6" data-animate="fade-up" data-delay="400">
                <div class="testimonial-card">
                    <div class="quote-mark">"</div>
                    <div class="stars">★★★★★</div>
                    <p class="testimonial-text">
                        "Agriculture loan se main nai tractor khareed li. 
                        Ab fasal 3 guna behti hai. Akhuwat ki team bohot 
                        supportive aur fast hai."
                    </p>
                    <div class="testimonial-author">
                        <div class="avatar">MR</div>
                        <div>
                            <h6>Muhammad Raza</h6>
                            <small>Multan - Farmer</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- ============================================================
     CTA SECTION (Call to Action)
     ============================================================ -->
<section class="cta-section">
    <div class="container text-center" data-animate="zoom-in">
        <h2>Aaj Hi Apply Karein!</h2>
        <p>Aapke khaab poore karne ke liye hum yahan hain. Abhi application bharein.</p>
        <div class="hero-buttons justify-content-center">
            <a href="apply.php" class="btn btn-hero-primary">
                📝 Apply Now
            </a>
            <a href="https://wa.me/923082171396" 
               target="_blank" 
               class="btn btn-hero-secondary">
                <i class="bi bi-whatsapp"></i> Chat on WhatsApp
            </a>
        </div>
    </div>
</section>

<?php
// Footer file include karo
require_once 'includes/footer.php';
?>
