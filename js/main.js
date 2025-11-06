// Enhanced main.js with all functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }

    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
            // Change icon
            const icon = mobileMenuButton.querySelector('i');
            if (icon) {
                icon.className = mobileMenu.classList.contains('hidden') ? 
                    'fas fa-bars text-xl' : 
                    'fas fa-times text-xl';
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileMenu && !mobileMenu.contains(event.target) && 
            mobileMenuButton && !mobileMenuButton.contains(event.target) && 
            !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuButton.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-bars text-xl';
            }
        }
    });

    // Header Scroll Effect with Color Change
    const header = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateHeaderStyle() {
        const scrolled = window.scrollY > 100;
        
        if (scrolled) {
            header.classList.add('shadow-lg', 'bg-white');
            header.classList.remove('bg-white/80', 'backdrop-blur-md');
            navLinks.forEach(link => {
                if (!link.classList.contains('text-blue-600')) {
                    link.classList.add('text-gray-800');
                    link.classList.remove('text-white');
                }
            });
        } else {
            header.classList.remove('shadow-lg', 'bg-white');
            header.classList.add('bg-white/80', 'backdrop-blur-md');
            
            // Check if we're in hero section for white text
            const heroSection = document.querySelector('section.relative.min-h-screen');
            if (heroSection && window.scrollY < heroSection.offsetHeight - 100) {
                navLinks.forEach(link => {
                    if (!link.classList.contains('text-blue-600')) {
                        link.classList.add('text-white');
                        link.classList.remove('text-gray-800');
                    }
                });
            } else {
                navLinks.forEach(link => {
                    if (!link.classList.contains('text-blue-600')) {
                        link.classList.remove('text-white');
                        link.classList.add('text-gray-800');
                    }
                });
            }
        }
    }

    // Initial call and scroll event listener
    updateHeaderStyle();
    window.addEventListener('scroll', updateHeaderStyle);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#contact') {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add current year to footer if element exists
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Add loading animation to elements
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in-up');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    // Initial check for animations
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // WhatsApp order enhancement
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        link.addEventListener('click', function() {
            // You can add analytics tracking here
            console.log('WhatsApp order initiated:', this.href);
        });
    });

    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.group.relative');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    console.log('MakkyDualCare website initialized successfully!');
});

// Utility function for form validation
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('border-red-500');
        } else {
            input.classList.remove('border-red-500');
        }
    });
    
    return isValid;
}

// Utility function for formatting phone numbers
function formatPhoneNumber(phone) {
    const cleaned = ('' + phone).replace(/\D/g, '');
    
    if (cleaned.length === 10 && cleaned.startsWith('0')) {
        return '+234' + cleaned.substring(1);
    }
    
    return cleaned;
}