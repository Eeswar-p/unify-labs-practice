/**
 * DAY25: Interactive Demo - Tab Navigation
 */

document.addEventListener('DOMContentLoaded', function() {
  // Get all tab buttons and content sections
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  // Add click event listener to each tab button
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tabName = this.getAttribute('data-tab');
      
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked button and corresponding content
      this.classList.add('active');
      document.getElementById(tabName).classList.add('active');
      
      // Scroll to top of content
      document.querySelector('.tab-content.active').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Add interactivity to checklist items
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    // Restore state from localStorage
    const checklistKey = `day25_${checkbox.parentElement.textContent.trim()}`;
    if (localStorage.getItem(checklistKey) === 'true') {
      checkbox.checked = true;
    }

    // Save state to localStorage on change
    checkbox.addEventListener('change', function() {
      localStorage.setItem(checklistKey, this.checked);
      updateProgressBar();
    });
  });

  // Update progress on page load
  updateProgressBar();

  // Function to update progress bar (if you want to add it)
  function updateProgressBar() {
    const totalCheckboxes = checkboxes.length;
    const checkedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked').length;
    const progress = (checkedCheckboxes / totalCheckboxes) * 100;
    
    console.log(`Progress: ${checkedCheckboxes}/${totalCheckboxes} (${Math.round(progress)}%)`);
  }

  // Copy code to clipboard on double-click
  const codeBlocks = document.querySelectorAll('pre code');
  codeBlocks.forEach(codeBlock => {
    codeBlock.style.cursor = 'pointer';
    codeBlock.title = 'Double-click to copy';
    
    codeBlock.addEventListener('dblclick', function() {
      const text = this.textContent;
      navigator.clipboard.writeText(text).then(() => {
        // Show copy confirmation
        const originalText = this.textContent;
        this.textContent = '✓ Copied!';
        setTimeout(() => {
          this.textContent = originalText;
        }, 1500);
      });
    });
  });

  // Log welcome message
  console.log('%cDAY25: MongoDB Update & Delete Operations', 'color: #3498db; font-size: 16px; font-weight: bold;');
  console.log('%cWelcome! Use the tabs above to learn:', 'color: #2ecc71; font-size: 12px;');
  console.log('1. Overview - What you\'ll learn');
  console.log('2. Operators - How they work');
  console.log('3. Code Examples - Real code you can copy');
  console.log('4. Step-by-Step Guide - How to complete DAY25');
  console.log('5. Checklist - Track your progress');
});
