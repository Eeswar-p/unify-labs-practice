/* ============================================
   DAY11 - Main JavaScript
   Modal interactions and form handling
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // MODAL FUNCTIONALITY
    // ============================================
    const notifyBtn = document.getElementById('notifyBtn');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const notifyForm = document.getElementById('notifyForm');
    const modalSuccess = document.getElementById('modalSuccess');
    const successClose = document.getElementById('successClose');
    const submitButton = notifyForm.querySelector('.submit-button');

    // Open modal
    const openModal = () => {
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus trap - focus first input
        setTimeout(() => {
            document.getElementById('userName').focus();
        }, 400);

        // Announce to screen readers
        announceToScreenReader('Notification signup modal opened');
    };

    // Close modal
    const closeModal = () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset form and success state
        setTimeout(() => {
            notifyForm.reset();
            modalSuccess.classList.remove('active');
            submitButton.classList.remove('loading');
        }, 400);

        announceToScreenReader('Modal closed');
    };

    // Event listeners for modal
    notifyBtn.addEventListener('click', openModal);
    modalClose.addEventListener('click', closeModal);
    successClose.addEventListener('click', closeModal);

    // Close on overlay click (not content)
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    // ============================================
    // FORM VALIDATION & SUBMISSION
    // ============================================
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateName = (name) => {
        return name.trim().length >= 2;
    };

    // Form submission
    notifyForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('userName');
        const emailInput = document.getElementById('userEmail');
        const newsletterInput = document.getElementById('newsletter');

        // Validate inputs
        if (!validateName(nameInput.value)) {
            nameInput.focus();
            announceToScreenReader('Please enter a valid name');
            return;
        }

        if (!validateEmail(emailInput.value)) {
            emailInput.focus();
            announceToScreenReader('Please enter a valid email address');
            return;
        }

        // Show loading state
        submitButton.classList.add('loading');
        submitButton.disabled = true;

        // Simulate API call
        setTimeout(() => {
            const formData = {
                name: nameInput.value,
                email: emailInput.value,
                newsletter: newsletterInput.checked,
                timestamp: new Date().toISOString()
            };

            console.log('Form submitted successfully:', formData);

            // Show success state
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
            modalSuccess.classList.add('active');

            // Analytics tracking
            trackEvent('notify_me_signup', {
                newsletter_opted_in: newsletterInput.checked
            });

            announceToScreenReader('Subscription successful! You will receive updates.');
        }, 1500);
    });

    // Real-time validation feedback
    const inputs = document.querySelectorAll('.modal-form input[type="text"], .modal-form input[type="email"]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value.trim() !== '') {
                // Trigger browser validation
                input.checkValidity();
            }
        });

        input.addEventListener('input', () => {
            // Remove invalid state while typing
            if (input.validity.valid) {
                input.style.borderColor = '';
            }
        });
    });

    // ============================================
    // FOCUS TRAP IN MODAL
    // ============================================
    const focusableElements = 'input, button, [tabindex]:not([tabindex="-1"])';
    
    modalOverlay.addEventListener('keydown', (e) => {
        if (!modalOverlay.classList.contains('active')) return;
        
        if (e.key === 'Tab') {
            const modalContent = document.querySelector('.modal-content');
            const focusable = Array.from(modalContent.querySelectorAll(focusableElements));
            const firstFocusable = focusable[0];
            const lastFocusable = focusable[focusable.length - 1];

            if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                // Tab
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
    });

    // ============================================
    // GALLERY INTERACTIONS
    // ============================================
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach((item, index) => {
        // Add keyboard accessibility
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', `View project ${index + 1}`);

        // Keyboard navigation
        item.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                // Could open a lightbox or project details
                console.log(`Gallery item ${index + 1} activated`);
                announceToScreenReader(`Viewing project ${index + 1}`);
            }
        });

        // Track hover interactions
        item.addEventListener('mouseenter', () => {
            trackEvent('gallery_item_hover', {
                item_index: index
            });
        });
    });

    // ============================================
    // SMOOTH SCROLL TO GALLERY
    // ============================================
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const gallery = document.getElementById('gallery');
            gallery.scrollIntoView({ behavior: 'smooth' });
        });

        scrollIndicator.setAttribute('tabindex', '0');
        scrollIndicator.setAttribute('role', 'button');
        scrollIndicator.setAttribute('aria-label', 'Scroll to gallery');

        scrollIndicator.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const gallery = document.getElementById('gallery');
                gallery.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // ============================================
    // PARTICLE INTERACTION (Optional Enhancement)
    // ============================================
    const particleContainer = document.querySelector('.particle-container');
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Subtle parallax effect on particles
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            const speed = (index % 3 + 1) * 0.02;
            const x = (mouseX - window.innerWidth / 2) * speed;
            const y = (mouseY - window.innerHeight / 2) * speed;
            
            particle.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // ============================================
    // PERFORMANCE OPTIMIZATION
    // ============================================
    
    // Lazy load gallery images (if using real images)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });

        const images = document.querySelectorAll('.gallery-image');
        images.forEach(img => imageObserver.observe(img));
    }

    // Reduce particle count on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            if (index > 15) {
                particle.style.display = 'none';
            }
        });
    }

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================
    
    // Screen reader announcements
    function announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'alert');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    // Analytics tracking (replace with actual implementation)
    function trackEvent(eventName, data) {
        console.log(`Event: ${eventName}`, data);
        // Example: gtag('event', eventName, data);
        // Example: analytics.track(eventName, data);
    }

    // Debounce function for performance
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Throttle function for scroll/resize events
    function throttle(func, limit) {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // ============================================
    // SCROLL EFFECTS
    // ============================================
    
    // Hide scroll indicator after scrolling
    const handleScroll = throttle(() => {
        const scrolled = window.scrollY;
        
        if (scrollIndicator && scrolled > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else if (scrollIndicator) {
            scrollIndicator.style.opacity = '0.7';
            scrollIndicator.style.pointerEvents = 'auto';
        }

        // Parallax effect on hero
        const hero = document.querySelector('.hero-content');
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            hero.style.opacity = 1 - (scrolled / window.innerHeight);
        }
    }, 16);

    window.addEventListener('scroll', handleScroll);

    // ============================================
    // WINDOW RESIZE HANDLER
    // ============================================
    const handleResize = debounce(() => {
        // Adjust particle count based on viewport
        const particles = document.querySelectorAll('.particle');
        const isMobile = window.innerWidth < 768;
        
        particles.forEach((particle, index) => {
            if (isMobile && index > 12) {
                particle.style.display = 'none';
            } else {
                particle.style.display = 'block';
            }
        });
    }, 250);

    window.addEventListener('resize', handleResize);

    // ============================================
    // PREFERS REDUCED MOTION
    // ============================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        console.log('Reduced motion preference detected - animations simplified');
        document.body.classList.add('reduced-motion');
    }

    // ============================================
    // PAGE LOAD COMPLETE
    // ============================================
    console.log('DAY11 JavaScript initialized ✓');
    console.log('Features loaded:');
    console.log('- Modal overlay with focus trap');
    console.log('- Form validation');
    console.log('- Gallery interactions');
    console.log('- Particle parallax effect');
    console.log('- Accessibility enhancements');
    
    // Announce page ready to screen readers
    setTimeout(() => {
        announceToScreenReader('Page loaded. Interactive elements ready.');
    }, 1000);
});

// ============================================
// SERVICE WORKER (Optional for PWA)
// ============================================
if ('serviceWorker' in navigator) {
    // Uncomment to enable service worker
    // navigator.serviceWorker.register('/sw.js')
    //     .then(reg => console.log('Service Worker registered', reg))
    //     .catch(err => console.log('Service Worker registration failed', err));
}
