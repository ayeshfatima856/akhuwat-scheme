<?php
// ============================================================
// COMMON FOOTER FILE (includes/footer.php)
// ============================================================
// Yeh file har page ke bottom par include hogi
// Isme: Footer section + JavaScript files
// ============================================================
?>

<!-- ============================================================
     FOOTER SECTION
     ============================================================ -->
<footer class="footer">
    <div class="container">
        <div class="row">
            
            <!-- ===== COL 1: Brand & Description ===== -->
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="footer-brand">
                    <img src="assets/images/logo.svg" alt="Akhuwat Scheme">
                    <div>
                        <h4>Akhuwat</h4>
                        <small>SCHEME</small>
                    </div>
                </div>
                <p>
                    Akhuwat Scheme Pakistan ka trusted loan service hai jo aapko 
                    be-sood qarza faraham karta hai. Hamari mission hai aapki 
                    maashi maddad karna.
                </p>
                <!-- Social Links -->
                <div class="social-links">
                    <a href="#" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
                    <a href="#" aria-label="Twitter"><i class="bi bi-twitter-x"></i></a>
                    <a href="https://wa.me/923082171396" target="_blank" aria-label="WhatsApp"><i class="bi bi-whatsapp"></i></a>
                    <a href="#" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
                    <a href="#" aria-label="YouTube"><i class="bi bi-youtube"></i></a>
                </div>
            </div>
            
            <!-- ===== COL 2: Quick Links ===== -->
            <div class="col-lg-2 col-md-6 mb-4">
                <h5>Quick Links</h5>
                <ul class="footer-links">
                    <li><a href="index.php">Home</a></li>
                    <li><a href="about.php">About Us</a></li>
                    <li><a href="services.php">Loan Types</a></li>
                    <li><a href="apply.php">Apply Now</a></li>
                    <li><a href="contact.php">Contact</a></li>
                </ul>
            </div>
            
            <!-- ===== COL 3: Loan Types ===== -->
            <div class="col-lg-3 col-md-6 mb-4">
                <h5>Loan Types</h5>
                <ul class="footer-links">
                    <li><a href="services.php">Business Loan</a></li>
                    <li><a href="services.php">Personal Loan</a></li>
                    <li><a href="services.php">Agriculture Loan</a></li>
                    <li><a href="services.php">Education Loan</a></li>
                    <li><a href="services.php">Emergency Loan</a></li>
                    <li><a href="services.php">Home Loan</a></li>
                </ul>
            </div>
            
            <!-- ===== COL 4: Contact Info ===== -->
            <div class="col-lg-3 col-md-6 mb-4">
                <h5>Contact Us</h5>
                
                <div class="footer-contact-item">
                    <div class="icon">📍</div>
                    <span>Lahore, Punjab, Pakistan</span>
                </div>
                
                <div class="footer-contact-item">
                    <div class="icon">📱</div>
                    <a href="tel:+923082171396" style="color: inherit;">+92 308 2171396</a>
                </div>
                
                <div class="footer-contact-item">
                    <div class="icon">📧</div>
                    <span>info@akhuwatscheme.com</span>
                </div>
                
                <div class="footer-contact-item">
                    <div class="icon">🕒</div>
                    <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
                </div>
                
                <a href="https://wa.me/923082171396" 
                   target="_blank" 
                   class="btn btn-success btn-sm mt-3"
                   style="background: #25d366; border: none; padding: 8px 20px;">
                    <i class="bi bi-whatsapp"></i> WhatsApp Now
                </a>
            </div>
        </div>
    </div>
    
    <!-- ===== FOOTER BOTTOM ===== -->
    <div class="footer-bottom">
        <div class="container">
            &copy; <?php echo date('Y'); ?> Akhuwat Scheme. All Rights Reserved. | 
            Made with ❤️ in Pakistan
        </div>
    </div>
</footer>

<!-- ============================================================
     JAVASCRIPT FILES
     ============================================================ -->

<!-- Bootstrap 5 JS Bundle -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

<!-- Custom Main JS -->
<script src="assets/js/main.js"></script>

<!-- Form Validation JS (sirf form page par) -->
<?php if (isset($is_form_page) && $is_form_page): ?>
    <script src="assets/js/validation.js"></script>
<?php endif; ?>

</body>
</html>
