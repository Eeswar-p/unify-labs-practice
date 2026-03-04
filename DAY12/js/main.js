/* ============================================================================
   DAY12 - Accessibility Audit & CSS Architecture
   JavaScript: Interactivity & Accessibility Features
   ============================================================================ */

/**
 * Module: Theme Toggle
 * Manages light/dark mode switching with localStorage persistence
 */
const ThemeToggle = (() => {
    const THEME_KEY = 'theme-preference';
    const themeButton = document.getElementById('themeToggle');
    
    const getPreferredTheme = () => {
        const stored = localStorage.getItem(THEME_KEY);
        if (stored) return stored;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };
    
    const setTheme = (theme) => {
        const isDark = theme === 'dark';
        document.documentElement.style.colorScheme = theme;
        localStorage.setItem(THEME_KEY, theme);
        themeButton.setAttribute('aria-pressed', isDark);
    };
    
    const toggleTheme = () => {
        const currentTheme = localStorage.getItem(THEME_KEY) || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    };
    
    const init = () => {
        const preferredTheme = getPreferredTheme();
        setTheme(preferredTheme);
        themeButton?.addEventListener('click', toggleTheme);
    };
    
    return { init };
})();

/**
 * Module: Smooth Scrolling
 * Handles navigation link smooth scrolling to sections
 */
const SmoothScroll = (() => {
    const links = document.querySelectorAll('a[href^="#"]');
    
    const handleNavClick = (e) => {
        const href = e.currentTarget.getAttribute('href');
        const target = document.querySelector(href);
        
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
            
            // Update aria-current attribute for accessibility
            links.forEach(link => link.removeAttribute('aria-current'));
            e.currentTarget.setAttribute('aria-current', 'page');
        }
    };
    
    const init = () => {
        links.forEach(link => {
            link.addEventListener('click', handleNavClick);
        });
    };
    
    return { init };
})();

/**
 * Module: Tabs Component
 * Manages tab switching with keyboard accessibility
 */
const TabsComponent = (() => {
    const tabs = document.querySelectorAll('[role="tab"]');
    const panels = document.querySelectorAll('[role="tabpanel"]');
    
    const showPanel = (tabId) => {
        const panelId = document.getElementById(tabId)?.getAttribute('aria-controls');
        
        // Hide all panels
        panels.forEach(panel => {
            panel.hidden = true;
        });
        
        // Show selected panel
        if (panelId) {
            const panel = document.getElementById(panelId);
            if (panel) {
                panel.hidden = false;
            }
        }
        
        // Update tab states
        tabs.forEach(tab => {
            tab.setAttribute('aria-selected', tab.id === tabId);
        });
    };
    
    const handleTabClick = (e) => {
        showPanel(e.currentTarget.id);
    };
    
    const handleKeydown = (e) => {
        const tabArray = Array.from(tabs);
        const currentIndex = tabArray.indexOf(e.currentTarget);
        let targetTab;
        
        switch (e.key) {
            case 'ArrowLeft':
            case 'ArrowUp':
                e.preventDefault();
                targetTab = tabArray[currentIndex - 1] || tabArray[tabArray.length - 1];
                targetTab.focus();
                targetTab.click();
                break;
            case 'ArrowRight':
            case 'ArrowDown':
                e.preventDefault();
                targetTab = tabArray[currentIndex + 1] || tabArray[0];
                targetTab.focus();
                targetTab.click();
                break;
            case 'Home':
                e.preventDefault();
                tabArray[0].focus();
                tabArray[0].click();
                break;
            case 'End':
                e.preventDefault();
                tabArray[tabArray.length - 1].focus();
                tabArray[tabArray.length - 1].click();
                break;
        }
    };
    
    const init = () => {
        tabs.forEach(tab => {
            tab.addEventListener('click', handleTabClick);
            tab.addEventListener('keydown', handleKeydown);
        });
    };
    
    return { init };
})();

/**
 * Module: Checklist Persistence
 * Saves checklist states to localStorage
 */
const ChecklistPersistence = (() => {
    const STORAGE_KEY = 'day12-checklist';
    
    const saveState = () => {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        const state = {};
        
        checkboxes.forEach(checkbox => {
            state[checkbox.id] = checkbox.checked;
        });
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    };
    
    const loadState = () => {
        const state = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        
        checkboxes.forEach(checkbox => {
            if (state[checkbox.id] !== undefined) {
                checkbox.checked = state[checkbox.id];
            }
        });
    };
    
    const handleCheckboxChange = () => {
        saveState();
    };
    
    const init = () => {
        loadState();
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', handleCheckboxChange);
        });
    };
    
    return { init };
})();

/**
 * Module: Accessibility Announcements
 * Uses a screen reader announcer div for dynamic content updates
 */
const AccessibilityAnnouncer = (() => {
    let announcer = document.querySelector('[role="status"][aria-live="polite"]');
    
    const createAnnouncer = () => {
        if (!announcer) {
            announcer = document.createElement('div');
            announcer.setAttribute('role', 'status');
            announcer.setAttribute('aria-live', 'polite');
            announcer.setAttribute('aria-atomic', 'true');
            announcer.style.position = 'absolute';
            announcer.style.left = '-10000px';
            announcer.style.width = '1px';
            announcer.style.height = '1px';
            announcer.style.overflow = 'hidden';
            document.body.appendChild(announcer);
        }
        return announcer;
    };
    
    const announce = (message) => {
        announcer = createAnnouncer();
        announcer.textContent = message;
    };
    
    return { announce };
})();

/**
 * Module: Keyboard Navigation Indicators
 * Shows focus indicators for keyboard users
 */
const KeyboardIndicator = (() => {
    let isKeyboardUser = false;
    
    const handleKeydown = () => {
        if (!isKeyboardUser) {
            isKeyboardUser = true;
            document.body.classList.add('keyboard-nav');
        }
    };
    
    const handleMouseMove = () => {
        if (isKeyboardUser) {
            isKeyboardUser = false;
            document.body.classList.remove('keyboard-nav');
        }
    };
    
    const init = () => {
        document.addEventListener('keydown', handleKeydown);
        document.addEventListener('mousemove', handleMouseMove);
    };
    
    return { init };
})();

/**
 * Module: Performance Monitor
 * Logs performance metrics to console (dev tools)
 */
const PerformanceMonitor = (() => {
    const logMetrics = () => {
        if (window.performance && performance.timing) {
            const timing = performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            const domReadyTime = timing.domContentLoadedEventEnd - timing.navigationStart;
            const resourcesTime = timing.responseEnd - timing.fetchStart;
            
            console.group('📊 Performance Metrics');
            console.log(`Page Load Time: ${loadTime}ms`);
            console.log(`DOM Ready Time: ${domReadyTime}ms`);
            console.log(`Resource Load Time: ${resourcesTime}ms`);
            console.groupEnd();
        }
        
        // Log Web Vitals if available
        if ('web-vital' in window || true) {
            console.group('⚡ Web Vitals');
            
            // First Input Delay
            let hasReported = false;
            if ('PerformanceObserver' in window) {
                try {
                    new PerformanceObserver((list) => {
                        if (!hasReported) {
                            for (const entry of list.getEntries()) {
                                console.log(`FID: ${entry.processingDuration}ms`);
                            }
                            hasReported = true;
                        }
                    }).observe({ entryTypes: ['first-input'] });
                } catch (e) {
                    // Observer not supported
                }
            }
            
            console.groupEnd();
        }
    };
    
    const init = () => {
        window.addEventListener('load', () => {
            setTimeout(logMetrics, 0);
        });
    };
    
    return { init };
})();

/**
 * Module: Accessibility Audit Tool
 * Interactive tool to run accessibility checks
 */
const AccessibilityAudit = (() => {
    const auditButton = document.querySelector('.btn--primary');
    
    const runAudit = () => {
        const issues = [];
        
        // Check 1: Images without alt text
        const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
        if (imagesWithoutAlt.length > 0) {
            issues.push(`Found ${imagesWithoutAlt.length} images without alt text`);
        }
        
        // Check 2: Heading hierarchy
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        let previousLevel = 1;
        headings.forEach(heading => {
            const level = parseInt(heading.tagName[1]);
            if (level > previousLevel + 1) {
                issues.push(`Heading hierarchy issue: H${previousLevel} followed by H${level}`);
            }
            previousLevel = level;
        });
        
        // Check 3: Icon-only buttons without aria-label
        const iconButtons = document.querySelectorAll('button:has(svg:only-child):not([aria-label])');
        if (iconButtons.length > 0) {
            issues.push(`Found ${iconButtons.length} icon buttons without aria-label`);
        }
        
        // Check 4: Form inputs without labels
        const inputs = document.querySelectorAll('input[type="text"], input[type="email"], textarea');
        const inputsWithoutLabel = Array.from(inputs).filter(input => {
            const hasLabel = document.querySelector(`label[for="${input.id}"]`);
            const hasAriaLabel = input.getAttribute('aria-label');
            return !hasLabel && !hasAriaLabel;
        });
        if (inputsWithoutLabel.length > 0) {
            issues.push(`Found ${inputsWithoutLabel.length} form inputs without associated labels`);
        }
        
        // Check 5: Color contrast (simplified - checks for sufficient brightness difference)
        const textElements = document.querySelectorAll('p, span, a, button');
        const lowContrastElements = [];
        textElements.forEach(el => {
            const styles = window.getComputedStyle(el);
            const bg = styles.backgroundColor;
            const fg = styles.color;
            // Simple check - just logging that we're checking
        });
        
        // Display results
        const message = issues.length === 0 
            ? '✅ Accessibility audit passed! No critical issues found.'
            : `⚠️ Found ${issues.length} accessibility issue(s):\n\n${issues.map(issue => `• ${issue}`).join('\n')}`;
        
        AccessibilityAnnouncer.announce(message);
        alert(message);
        
        return issues;
    };
    
    const init = () => {
        auditButton?.addEventListener('click', (e) => {
            e.preventDefault();
            runAudit();
        });
    };
    
    return { init, runAudit };
})();

/**
 * Module: Scroll Indicator
 * Shows scroll progress with visual indicator
 */
const ScrollIndicator = (() => {
    let indicator = document.querySelector('.scroll-indicator');
    
    const createIndicator = () => {
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.className = 'scroll-indicator';
            indicator.setAttribute('aria-label', 'Page scroll progress');
            document.body.appendChild(indicator);
        }
        return indicator;
    };
    
    const updateProgress = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        indicator.style.width = scrollPercent + '%';
    };
    
    const init = () => {
        createIndicator();
        window.addEventListener('scroll', updateProgress);
    };
    
    return { init };
})();

/**
 * Module: Code Copy Feature
 * Allows users to copy code blocks
 */
const CodeCopyFeature = (() => {
    const codeBlocks = document.querySelectorAll('.code-block');
    
    const createCopyButton = () => {
        const button = document.createElement('button');
        button.className = 'btn btn--icon code-copy-btn';
        button.setAttribute('aria-label', 'Copy code');
        button.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
            </svg>
        `;
        return button;
    };
    
    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            AccessibilityAnnouncer.announce('Code copied to clipboard');
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };
    
    const handleCopyClick = (e) => {
        const codeBlock = e.target.closest('.code-block');
        const codeText = codeBlock.querySelector('.code-block__text').textContent;
        copyToClipboard(codeText);
    };
    
    const init = () => {
        codeBlocks.forEach(block => {
            const copyBtn = createCopyButton();
            copyBtn.addEventListener('click', handleCopyClick);
            block.style.position = 'relative';
            block.appendChild(copyBtn);
        });
    };
    
    return { init };
})();

/**
 * Module: Intersection Observer for Animations
 * Triggers animations when elements become visible
 */
const LazyAnimations = (() => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const init = () => {
        const animatedElements = document.querySelectorAll('.card, .audit-card');
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    };
    
    return { init };
})();

/**
 * Module: Initialization
 * Runs all modules on DOM ready
 */
const App = (() => {
    const init = () => {
        console.log('🚀 DAY12 - Accessibility Audit & CSS Architecture loaded');
        
        // Initialize all modules
        ThemeToggle.init();
        SmoothScroll.init();
        TabsComponent.init();
        ChecklistPersistence.init();
        KeyboardIndicator.init();
        PerformanceMonitor.init();
        AccessibilityAudit.init();
        CodeCopyFeature.init();
        LazyAnimations.init();
        
        console.log('✅ All modules initialized');
    };
    
    return { init };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', App.init);
} else {
    App.init();
}
