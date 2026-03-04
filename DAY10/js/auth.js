/* ============================================
   DAY10 - Auth Page JavaScript
   Form validation and interactive features
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Form elements
    const form = document.getElementById('signupForm');
    const emailInput = document.getElementById('email');
    const fullnameInput = document.getElementById('fullname');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const submitButton = document.querySelector('.btn-submit');
    const togglePasswordBtn = document.querySelector('.toggle-password');

    // ============================================
    // PASSWORD VISIBILITY TOGGLE
    // ============================================
    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', () => {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            togglePasswordBtn.textContent = type === 'password' ? 'Show' : 'Hide';
        });
    }

    // ============================================
    // REAL-TIME VALIDATION
    // ============================================
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateUsername = (username) => {
        const usernameRegex = /^[a-zA-Z0-9._]+$/;
        return username.length >= 3 && usernameRegex.test(username);
    };

    const validateFullname = (name) => {
        return name.trim().length >= 3;
    };

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    // Input validation with visual feedback
    const addInputValidation = (input, validationFn) => {
        input.addEventListener('blur', () => {
            if (input.value.trim() !== '') {
                if (!validationFn(input.value)) {
                    input.classList.add('error');
                    setTimeout(() => input.classList.remove('error'), 300);
                }
            }
        });

        input.addEventListener('input', () => {
            if (input.value.trim() !== '') {
                input.classList.remove('error');
            }
            checkFormValidity();
        });
    };

    // Apply validation to all inputs
    addInputValidation(emailInput, validateEmail);
    addInputValidation(fullnameInput, validateFullname);
    addInputValidation(usernameInput, validateUsername);
    addInputValidation(passwordInput, validatePassword);

    // ============================================
    // SUBMIT BUTTON STATE MANAGEMENT
    // ============================================
    const checkFormValidity = () => {
        const isEmailValid = validateEmail(emailInput.value);
        const isFullnameValid = validateFullname(fullnameInput.value);
        const isUsernameValid = validateUsername(usernameInput.value);
        const isPasswordValid = validatePassword(passwordInput.value);

        const isFormValid = isEmailValid && isFullnameValid && isUsernameValid && isPasswordValid;

        if (isFormValid) {
            submitButton.disabled = false;
            submitButton.style.opacity = '1';
        } else {
            submitButton.disabled = true;
            submitButton.style.opacity = '0.7';
        }

        return isFormValid;
    };

    // Initial check
    submitButton.disabled = true;
    submitButton.style.opacity = '0.7';

    // ============================================
    // FORM SUBMISSION
    // ============================================
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Revalidate all fields
        if (!checkFormValidity()) {
            alert('Please fill in all fields correctly.');
            return;
        }

        // Show loading state
        submitButton.classList.add('loading');
        submitButton.disabled = true;

        // Simulate API call
        setTimeout(() => {
            const formData = {
                email: emailInput.value,
                fullname: fullnameInput.value,
                username: usernameInput.value,
                password: passwordInput.value
            };

            console.log('Form submitted successfully:', formData);

            // Success feedback
            submitButton.classList.remove('loading');
            submitButton.textContent = '✓ Signed Up!';
            submitButton.style.backgroundColor = '#00ba7c';

            // Reset form after 2 seconds
            setTimeout(() => {
                form.reset();
                submitButton.textContent = 'Sign up';
                submitButton.style.backgroundColor = '';
                submitButton.disabled = true;
                submitButton.style.opacity = '0.7';
            }, 2000);

        }, 1500);
    });

    // ============================================
    // FOCUS GLOW EFFECTS
    // ============================================
    const inputs = document.querySelectorAll('.form-input');
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.style.setProperty('--glow-opacity', '1');
        });

        input.addEventListener('blur', () => {
            input.parentElement.style.setProperty('--glow-opacity', '0');
        });
    });

    // ============================================
    // CUSTOM VALIDATION MESSAGES
    // ============================================
    emailInput.addEventListener('invalid', (e) => {
        e.preventDefault();
        emailInput.setCustomValidity('Please enter a valid email address');
    });

    emailInput.addEventListener('input', () => {
        emailInput.setCustomValidity('');
    });

    fullnameInput.addEventListener('invalid', (e) => {
        e.preventDefault();
        fullnameInput.setCustomValidity('Full name must be at least 3 characters');
    });

    fullnameInput.addEventListener('input', () => {
        fullnameInput.setCustomValidity('');
    });

    usernameInput.addEventListener('invalid', (e) => {
        e.preventDefault();
        usernameInput.setCustomValidity('Username must be at least 3 characters (letters, numbers, dots, underscores only)');
    });

    usernameInput.addEventListener('input', () => {
        usernameInput.setCustomValidity('');
    });

    passwordInput.addEventListener('invalid', (e) => {
        e.preventDefault();
        passwordInput.setCustomValidity('Password must be at least 6 characters');
    });

    passwordInput.addEventListener('input', () => {
        passwordInput.setCustomValidity('');
    });

    // ============================================
    // PREVENT FORM SUBMISSION ON ENTER IN INPUTS
    // (only allow via button click)
    // ============================================
    inputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !submitButton.disabled) {
                e.preventDefault();
                form.dispatchEvent(new Event('submit'));
            }
        });
    });

    // ============================================
    // ANALYTICS / TRACKING (Optional)
    // ============================================
    const trackEvent = (eventName, data) => {
        console.log(`Event: ${eventName}`, data);
        // Replace with actual analytics tracking
        // e.g., gtag('event', eventName, data);
    };

    // Track input interactions
    inputs.forEach(input => {
        let interactionStartTime;

        input.addEventListener('focus', () => {
            interactionStartTime = Date.now();
            trackEvent('input_focus', { field: input.name });
        });

        input.addEventListener('blur', () => {
            const duration = Date.now() - interactionStartTime;
            trackEvent('input_blur', {
                field: input.name,
                duration: duration,
                hasValue: input.value.length > 0
            });
        });
    });

    // Track form submission
    form.addEventListener('submit', () => {
        trackEvent('form_submit', {
            timestamp: new Date().toISOString()
        });
    });

    // ============================================
    // ACCESSIBILITY ENHANCEMENTS
    // ============================================
    
    // Announce validation errors to screen readers
    const announceError = (message) => {
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'alert');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    };

    inputs.forEach(input => {
        input.addEventListener('invalid', () => {
            const errorMessage = input.nextElementSibling.nextElementSibling?.textContent;
            if (errorMessage) {
                announceError(errorMessage);
            }
        });
    });

    console.log('DAY10 Auth Page - JavaScript Initialized ✓');
});
