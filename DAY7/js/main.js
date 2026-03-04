/* ============================================================================
   DAY7 - MAIN JAVASCRIPT
   Theme Toggle & Smooth Interactions
   ============================================================================ */

// Enable theme toggle with checkbox
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.style.colorScheme = savedTheme;

if (savedTheme === 'dark') {
  body.classList.add('dark-mode');
  themeToggle.checked = true;
}

// Listen for theme toggle changes
themeToggle.addEventListener('change', function() {
  if (this.checked) {
    body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
    htmlElement.style.colorScheme = 'dark';
  } else {
    body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
    htmlElement.style.colorScheme = 'light';
  }
});

// Close mobile menu when a link is clicked
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.checked = false;
  });
});
