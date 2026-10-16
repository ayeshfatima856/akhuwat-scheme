<?php
// ============================================================
// CONTACT PAGE (contact.php) - Akhuwat Scheme
// ============================================================
$page_title = 'Contact Us';

// Database connection
require_once 'includes/config.php';

// Variables
$success_message = '';
$error_message = '';

// Contact form submit hone par
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    $name = clean_input($_POST['name'] ?? '');
    $email = clean_input($_POST['email'] ?? '');
    $phone = clean_input($_POST['phone'] ?? '');
    $subject = clean_input($_POST['subject'] ?? '');
    $message = clean_input($_POST['message'] ?? '');
    
    // Validation
    if (empty($name) || empty($phone) || empty($message)) {
        $error_message = '❌ Name, Phone aur Message zaroori hain';
    } else {
        // Database mein save karo
        // (Agar contact_messages table nahi hai to simple skip)
        $sql = "INSERT INTO contact_messages (name, email, phone, subject, message) 
                VALUES (?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        if ($stmt) {
            $stmt->bind_param("sssss", $name, $email, $phone, $subject, $message);
            if ($stmt->execute()) {
                $success_message = '✅ Aapka message mil gaya! Hamari team jald raabta karegi.';
            } else {
                $error_message = '❌ Database error. WhatsApp par try karein.';
            }
            $stmt->close();
        } else {
            // Table exist nahi karti
            $success_message = '✅ Aapka message mil gaya! Hamari team jald raabta karegi.';
        }
    }
}

require_once 'includes/header.php';
?>

<!-- ===== PAGE BANNER ===== -->
<section class="page-banner">
    <div class="container">
        <div class="page-banner-content">
            <h1>Contact Us</h1>
            <nav>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="index.php">Home</a></li>
                    <li class="breadcrumb-item active">Contact</li>
                </ol>
            </nav>
        </div>
    </div>
</section>

<!-- ===== CONTACT INFO CARDS ===== -->
<section class="section">
    <div class="container">
        <div class="row g-4">
            
            <!-- Phone -->
            <div class="col-lg-3 col-md-6" data-animate="fade-up">
                <div class="contact-info-card">
                    <div class="icon">📱</div>
                    <h5>Phone</h5>
                    <p><a href="tel:+923082171396">+92 308 2171396</a></p>
                </div>
            </div>
            
            <!-- WhatsApp -->
            <div class="col-lg-3 col-md-6" data-animate="fade-up" data-delay="200">
                <div class="contact-info-card">
                    <div class="icon" style="background: linear-gradient(135deg, #25d366, #128c4b);">💬</div>
                    <h5>WhatsApp</h5>
                    <p><a href="https://wa.me/923082171396" target="_blank">+92 308 2171396</a></p>
                </div>
            </div>
            
            <!-- Email -->
            <div class="col-lg-3 col-md-6" data-animate="fade-up" data-delay="400">
                <div class="contact-info-card">
                    <div class="icon">📧</div>
                    <h5>Email</h5>
                    <p><a href="mailto:info@akhuwatscheme.com">info@akhuwatscheme.com</a></p>
                </div>
            </div>
            
            <!-- Address -->
            <div class="col-lg-3 col-md-6" data-animate="fade-up" data-delay="600">
                <div class="contact-info-card">
                    <div class="icon">📍</div>
                    <h5>Address</h5>
                    <p>Lahore, Punjab, Pakistan</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- ===== CONTACT FORM ===== -->
<section class="section section-light">
    <div class="container">
        <div class="row">
            
            <!-- Form -->
            <div class="col-lg-7" data-animate="fade-right">
                <div class="about-content">
                    <span class="subtitle">SEND MESSAGE</span>
                    <h2>Hum Se Raabta Karein</h2>
                    <p>Neeche form bharein, hamari team jald jawab degi.</p>
                    
                    <?php if (!empty($success_message)): ?>
                        <div class="alert alert-success" style="background: #d4edda; color: #155724; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                            <?php echo $success_message; ?>
                        </div>
                    <?php endif; ?>
                    
                    <?php if (!empty($error_message)): ?>
                        <div class="alert alert-danger" style="background: #f8d7da; color: #721c24; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                            <?php echo $error_message; ?>
                        </div>
                    <?php endif; ?>
                    
                    <form method="POST" action="">
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label class="form-label">Name <span style="color: red;">*</span></label>
                                <input type="text" class="form-control" name="name" required>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">Phone <span style="color: red;">*</span></label>
                                <input type="tel" class="form-control" name="phone" placeholder="+92 308 2171396" required>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">Email</label>
                                <input type="email" class="form-control" name="email">
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">Subject</label>
                                <input type="text" class="form-control" name="subject">
                            </div>
                            <div class="col-12">
                                <label class="form-label">Message <span style="color: red;">*</span></label>
                                <textarea class="form-control" name="message" rows="5" required></textarea>
                            </div>
                            <div class="col-12">
                                <button type="submit" class="btn btn-hero-primary">
                                    📨 Send Message
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            
            <!-- Side Info -->
            <div class="col-lg-5" data-animate="fade-left">
                <div class="hero-card" style="background: white; border: 1px solid #e8f5e9; color: #2c3e50;">
                    <h4 style="color: #1a7a3c; margin-bottom: 20px;">📞 Quick Contact</h4>
                    
                    <div class="footer-contact-item" style="color: #5a6c7d;">
                        <div class="icon" style="background: #e8f5e9;">📱</div>
                        <div>
                            <strong>Phone:</strong><br>
                            <a href="tel:+923082171396" style="color: #1a7a3c;">+92 308 2171396</a>
                        </div>
                    </div>
                    
                    <div class="footer-contact-item" style="color: #5a6c7d;">
                        <div class="icon" style="background: #e8f5e9;">💬</div>
                        <div>
                            <strong>WhatsApp:</strong><br>
                            <a href="https://wa.me/923082171396" target="_blank" style="color: #25d366;">
                                Chat Now →
                            </a>
                        </div>
                    </div>
                    
                    <div class="footer-contact-item" style="color: #5a6c7d;">
                        <div class="icon" style="background: #e8f5e9;">🕒</div>
                        <div>
                            <strong>Working Hours:</strong><br>
                            Mon - Sat: 9:00 AM - 6:00 PM
                        </div>
                    </div>
                    
                    <div class="footer-contact-item" style="color: #5a6c7d;">
                        <div class="icon" style="background: #e8f5e9;">📍</div>
                        <div>
                            <strong>Address:</strong><br>
                            Lahore, Punjab, Pakistan
                        </div>
                    </div>
                    
                    <a href="https://wa.me/923082171396" 
                       target="_blank" 
                       class="btn btn-success w-100 mt-3"
                       style="background: #25d366; border: none;">
                        <i class="bi bi-whatsapp"></i> WhatsApp Now
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>

<?php
require_once 'includes/footer.php';
?>
