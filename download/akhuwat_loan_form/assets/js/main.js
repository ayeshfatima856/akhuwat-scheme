// ============================================================
// AKHUWAT SCHEME - MAIN JAVASCRIPT
// ============================================================
// Yeh file website ki sab JS functionality control karti hai
// Features: Preloader | Navbar Scroll | Animations | Counter |
//           Scroll-to-Top | Smooth Scroll | Active Nav Link
// ============================================================

// ===== DOM READY HO JAYE TO YEH CODE chalega =====
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Preloader hide karo (page load hone ke baad)
    hidePreloader();
    
    // 2. Navbar scroll effect (scroll karein to navbar chhota ho jaye)
    navbarScrollEffect();
    
    // 3. Scroll-triggered animations (elements ko animate karo)
    initScrollAnimations();
    
    // 4. Counter animation (numbers ko 0 se count kar ke dikhao)
    initCounters();
    
    // 5. Scroll-to-top button
    initScrollToTop();
    
    // 6. Active nav link highlighting
    highlightActiveNavLink();
    
    // 7. Navbar mobile auto-close (link click par)
    autoCloseMobileMenu();
});

// ============================================================
// 1. PRELOADER HIDE KARNA
// ============================================================
// Page completely load hone ke 1.5 second baad preloader hide karo
function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    
    // 1.5 second wait karo taake animation pura dikhe
    setTimeout(function() {
        preloader.classList.add('fade-out');
        
        // 800ms baad DOM se completely hata do
        setTimeout(function() {
            preloader.style.display = 'none';
            // Body scroll enable karo
            document.body.style.overflow = 'auto';
        }, 800);
    }, 1800);
    
    // Pehle scroll lock karo taake user preloader dekhe
    document.body.style.overflow = 'hidden';
}

// ============================================================
// 2. NAVBAR SCROLL EFFECT
// ============================================================
// Jab user scroll kare to navbar chhota ho jaye aur shadow add ho
function navbarScrollEffect() {
    const navbar = document.querySelector('.navbar-custom');
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ============================================================
// 3. SCROLL-TRIGGERED ANIMATIONS
// ============================================================
// Jo elements [data-animate] attribute rakhte hain, unhe animate karo
// Jab user unke qareeb scroll kare to visible ho jayein
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    if (animatedElements.length === 0) return;
    
    // IntersectionObserver use kar ke check karo ke element viewport mein hai ya nahi
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                // Agar element viewport mein aaya to animated class lagao
                entry.target.classList.add('animated');
                
                // Optional: stagger delay for child elements
                const delay = entry.target.getAttribute('data-delay');
                if (delay) {
                    entry.target.style.transitionDelay = delay + 'ms';
                }
                
                // Ek baar animate hone ke baad observe na karo
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,  // 15% visible hone par animate karo
        rootMargin: '0px 0px -50px 0px'  // Thoda pehle trigger karo
    });
    
    // Saare elements ko observe karo
    animatedElements.forEach(function(el) {
        observer.observe(el);
    });
}

// ============================================================
// 4. COUNTER ANIMATION (Statistics numbers)
// ============================================================
// Stats section ke numbers ko 0 se target value tak animate karo
function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (counters.length === 0) return;
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(function(c) {
        observer.observe(c);
    });
}

// Single counter ko animate karne ka function
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-counter'));
    const duration = 2000; // 2 seconds
    const stepTime = 30;   // har 30ms mein update
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;
    
    const counter = setInterval(function() {
        current += increment;
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(counter);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, stepTime);
}

// Numbers ko comma ke saath format karo (e.g., 50000 -> 50,000)
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// ============================================================
// 5. SCROLL TO TOP BUTTON
// ============================================================
// Neeche scroll karne par upar jaane ka button dikhao
function initScrollToTop() {
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (!scrollTopBtn) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    // Click par smooth scroll to top
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================================
// 6. ACTIVE NAV LINK HIGHLIGHTING
// ============================================================
// Current page ke hisaab se navbar mein active link highlight karo
function highlightActiveNavLink() {
    // Current page ka URL path lo
    const currentPage = window.location.pathname.split('/').pop() || 'index.php';
    
    const navLinks = document.querySelectorAll('.navbar-nav-custom .nav-link');
    navLinks.forEach(function(link) {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
    });
}

// ============================================================
// 7. MOBILE MENU AUTO-CLOSE
// ============================================================
// Mobile par menu se koi link click karte hi menu band ho jaye
function autoCloseMobileMenu() {
    const navLinks = document.querySelectorAll('.navbar-nav-custom .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (!navbarCollapse) return;
    
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            if (navbarCollapse.classList.contains('show')) {
                // Bootstrap collapse instance use kar ke menu band karo
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) 
                    || new bootstrap.Collapse(navbarCollapse, { toggle: false });
                bsCollapse.hide();
            }
        });
    });
}

// ============================================================
// 8. SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================================
// Page ke andar anchor links par smooth scroll karo
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        // Agar sirf # hai to skip karo
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const offset = 80; // navbar ki height
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================================
// 9. WHATSAPP PRE-FILLED MESSAGE
// ============================================================
// WhatsApp button par click karte hi message ke saath WhatsApp khule
function setupWhatsApp() {
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"], a[href*="api.whatsapp.com"]');
    
    whatsappLinks.forEach(function(link) {
        // Default message set karo agar pehle se nahi hai
        const href = link.getAttribute('href');
        if (href && !href.includes('text=')) {
            const message = encodeURIComponent('Assalam-o-Alaikum! Mujhe Akhuwat Scheme ke baare mein maloomat chahiye.');
            link.setAttribute('href', href + '?text=' + message);
        }
    });
}

// WhatsApp setup ko bhi initialize karo
document.addEventListener('DOMContentLoaded', setupWhatsApp);
