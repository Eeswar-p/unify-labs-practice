/* ============================================================================
   DAY8 - PORTFOLIO JAVASCRIPT
   Theme Toggle • Form Validation • Smooth Interactions
   ============================================================================ */

// ============================================================================
// 1. THEME TOGGLE - DARK/LIGHT MODE
// ============================================================================

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const html = document.documentElement;

// Check for saved theme preference or default to 'light'
const savedTheme = localStorage.getItem('theme') || 'light';
html.style.colorScheme = savedTheme;

// Apply saved theme on page load
if (savedTheme === 'dark') {
  body.classList.add('dark-mode');
  themeToggle.checked = true;
}

// Listen for theme toggle changes
themeToggle.addEventListener('change', function() {
  if (this.checked) {
    body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
    html.style.colorScheme = 'dark';
  } else {
    body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
    html.style.colorScheme = 'light';
  }
});

// ============================================================================
// 2. MOBILE MENU - AUTO CLOSE ON LINK CLICK
// ============================================================================

const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    // Close mobile menu when a link is clicked
    menuToggle.checked = false;
  });
});

// ============================================================================
// 3. SMOOTH SCROLL - ACTIVE LINK HIGHLIGHTING
// ============================================================================

// Highlight active section in navigation
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLink?.classList.add('active');
    } else {
      navLink?.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', highlightNavigation);

// ============================================================================
// 4. FORM VALIDATION - CONTACT FORM
// ============================================================================

const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validation functions
function validateName() {
  const nameError = document.getElementById('name-error');
  const name = nameInput.value.trim();

  if (name.length === 0) {
    showError(nameInput, nameError, 'Name is required');
    return false;
  } else if (name.length < 2) {
    showError(nameInput, nameError, 'Name must be at least 2 characters');
    return false;
  } else {
    clearError(nameInput, nameError);
    return true;
  }
}

function validateEmail() {
  const emailError = document.getElementById('email-error');
  const email = emailInput.value.trim();

  if (email.length === 0) {
    showError(emailInput, emailError, 'Email is required');
    return false;
  } else if (!emailRegex.test(email)) {
    showError(emailInput, emailError, 'Please enter a valid email address');
    return false;
  } else {
    clearError(emailInput, emailError);
    return true;
  }
}

function validateMessage() {
  const messageError = document.getElementById('message-error');
  const message = messageInput.value.trim();

  if (message.length === 0) {
    showError(messageInput, messageError, 'Message is required');
    return false;
  } else if (message.length < 10) {
    showError(messageInput, messageError, 'Message must be at least 10 characters');
    return false;
  } else {
    clearError(messageInput, messageError);
    return true;
  }
}

function showError(input, errorElement, message) {
  input.parentElement.classList.add('error');
  errorElement.textContent = message;
  errorElement.style.display = 'block';
}

function clearError(input, errorElement) {
  input.parentElement.classList.remove('error');
  errorElement.textContent = '';
  errorElement.style.display = 'none';
}

// Real-time validation on input
nameInput.addEventListener('blur', validateName);
emailInput.addEventListener('blur', validateEmail);
messageInput.addEventListener('blur', validateMessage);

// Form submission
contactForm.addEventListener('submit', function(e) {
  e.preventDefault();

  // Validate all fields
  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isMessageValid = validateMessage();

  // If all fields are valid
  if (isNameValid && isEmailValid && isMessageValid) {
    // Show success message
    const successMessage = document.getElementById('form-success');
    successMessage.hidden = false;

    // Reset form
    contactForm.reset();

    // Hide success message after 5 seconds
    setTimeout(() => {
      successMessage.hidden = true;
    }, 5000);

    // In a real application, you would send the form data to a server here
    console.log('Form submitted successfully!');
    console.log({
      name: nameInput.value,
      email: emailInput.value,
      message: messageInput.value
    });
  } else {
    // Scroll to first error
    const firstError = contactForm.querySelector('.error');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
});

// ============================================================================
// 5. SKILL BARS ANIMATION - ANIMATE ON SCROLL
// ============================================================================

const skillBars = document.querySelectorAll('.skill-bar');

function animateSkillBars() {
  skillBars.forEach(bar => {
    const rect = bar.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    // Check if element is in viewport
    if (rect.top <= windowHeight * 0.75) {
      bar.style.width = bar.style.getPropertyValue('--skill-width') || '0%';
    }
  });
}

// Trigger animation on scroll
window.addEventListener('scroll', animateSkillBars);
// Trigger animation on page load
window.addEventListener('load', animateSkillBars);

// ============================================================================
// 6. INTERSECTION OBSERVER - FADE IN ANIMATIONS
// ============================================================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

// Elements to observe
const fadeElements = document.querySelectorAll(
  '.skill-card, .project-card, .about-stats, .contact-form-wrapper, .contact-info'
);

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Apply initial styles and observe
fadeElements.forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(30px)';
  element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(element);
});

// ============================================================================
// 7. PROJECT LINKS - ONLY ALERT FOR PLACEHOLDER LINKS
// ============================================================================

const projectLinks = document.querySelectorAll('.project-link');

projectLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');

    if (href === '#') {
      e.preventDefault();

      const projectTitle = this.closest('.project-card').querySelector('.project-title').textContent;
      const linkType = this.textContent.trim();

      alert(`Live URL for ${linkType} is not added yet for "${projectTitle}".`);
    }
  });
});

// ============================================================================
// 8. SCROLL TO TOP - SHOW/HIDE BUTTON (Optional Enhancement)
// ============================================================================

// You can add a scroll-to-top button by adding this HTML:
// <button id="scroll-to-top" class="scroll-to-top" aria-label="Scroll to top">↑</button>

const scrollToTopBtn = document.getElementById('scroll-to-top');

if (scrollToTopBtn) {
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  });

  scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ============================================================================
// 9. PERFORMANCE - DEBOUNCE SCROLL EVENTS
// ============================================================================

function debounce(func, wait = 10, immediate = true) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Optimize scroll events with debounce
window.addEventListener('scroll', debounce(highlightNavigation, 10));
window.addEventListener('scroll', debounce(animateSkillBars, 10));

// ============================================================================
// 10. CONSOLE MESSAGE - DEVELOPER INFO
// ============================================================================

console.log('%c👨‍💻 Portfolio Website', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cBuilt with:', 'font-size: 14px; font-weight: bold;');
console.log('✓ Semantic HTML5');
console.log('✓ Vanilla CSS3 (No frameworks)');
console.log('✓ Pure JavaScript (No libraries)');
console.log('✓ Responsive Design');
console.log('✓ Dark Mode Toggle');
console.log('✓ Accessibility Features');
console.log('\n%cInterested in the code? Check out the GitHub repository!', 'font-style: italic; color: #8b5cf6;');
