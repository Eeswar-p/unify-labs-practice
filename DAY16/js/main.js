// ============================================
// DAY16 - String Utilities & Arrow Functions
// JavaScript Implementation
// ============================================

// ============================================
// CORE UTILITY FUNCTIONS (Arrow Functions)
// ============================================

/**
 * 1️⃣ TITLE CASE CONVERTER
 * Trims whitespace and capitalizes the first letter of every word
 * @param {string} str - Input string to convert
 * @returns {string} - Title cased string
 */
const toTitleCase = (str) => {
    return str
        .trim()                                    // Remove leading/trailing whitespace
        .split(' ')                                 // Split into array of words
        .filter(word => word.length > 0)           // Remove empty strings
        .map(word =>                               // Transform each word
            word[0].toUpperCase() +                // Capitalize first letter
            word.slice(1).toLowerCase()            // Lowercase the rest
        )
        .join(' ');                                // Join back into string
};

/**
 * 2️⃣ VOWEL COUNTER
 * Counts how many vowels (a, e, i, o, u) are in a string
 * @param {string} str - Input string to analyze
 * @returns {number} - Total count of vowels
 */
const countVowels = (str) => {
    const vowels = 'aeiouAEIOU';
    return str
        .split('')                                 // Split into array of characters
        .filter(char => vowels.includes(char))     // Keep only vowels
        .length;                                   // Return count
};

/**
 * 2️⃣ VOWEL COUNTER - WITH BREAKDOWN
 * Counts vowels and returns breakdown by each vowel
 * @param {string} str - Input string to analyze
 * @returns {object} - Object with total and breakdown
 */
const countVowelsDetailed = (str) => {
    const vowelCounts = {
        a: 0,
        e: 0,
        i: 0,
        o: 0,
        u: 0
    };
    
    str.toLowerCase()
        .split('')
        .forEach(char => {
            if (vowelCounts.hasOwnProperty(char)) {
                vowelCounts[char]++;
            }
        });
    
    const total = Object.values(vowelCounts).reduce((sum, count) => sum + count, 0);
    
    return {
        total: total,
        breakdown: vowelCounts
    };
};

/**
 * 3️⃣ SECRET MESSAGE GENERATOR
 * Replaces specific words with '***' to create censored text
 * @param {string} str - Input message
 * @param {array} wordsToReplace - Array of words to censor
 * @returns {string} - Censored message
 */
const censorWords = (str, wordsToReplace) => {
    let result = str;
    
    wordsToReplace.forEach(word => {
        // Create regex with word boundaries for exact word matching
        // 'gi' flags = global (all occurrences) + case-insensitive
        const regex = new RegExp(`\\b${word.trim()}\\b`, 'gi');
        result = result.replace(regex, '***');
    });
    
    return result;
};

// ============================================
// MATH OBJECT - TEXT STATISTICS FUNCTIONS
// ============================================

/**
 * Calculate comprehensive text statistics using Math object
 * @param {string} str - Input string to analyze
 * @returns {object} - Statistics object
 */
const calculateTextStats = (str) => {
    const trimmed = str.trim();
    const words = trimmed.split(/\s+/).filter(word => word.length > 0);
    const chars = trimmed.length;
    const wordCount = words.length;
    
    // Calculate word lengths
    const wordLengths = words.map(word => word.length);
    
    // Use Math object for statistics
    const longestWord = wordCount > 0 ? Math.max(...wordLengths) : 0;
    const shortestWord = wordCount > 0 ? Math.min(...wordLengths) : 0;
    const avgWordLength = wordCount > 0 
        ? Math.round((wordLengths.reduce((sum, len) => sum + len, 0) / wordCount) * 10) / 10
        : 0;
    
    // Vowel percentage
    const vowelCount = countVowels(trimmed);
    const vowelPercentage = chars > 0 
        ? Math.round((vowelCount / chars) * 100)
        : 0;
    
    return {
        characters: chars,
        words: wordCount,
        vowels: vowelCount,
        vowelPercentage: vowelPercentage,
        longestWord: longestWord,
        shortestWord: shortestWord,
        avgWordLength: avgWordLength
    };
};

/**
 * Count how many words were censored
 * @param {string} original - Original text
 * @param {string} censored - Censored text
 * @returns {number} - Number of censored words
 */
const countCensoredWords = (original, censored) => {
    const censoredCount = (censored.match(/\*\*\*/g) || []).length;
    return censoredCount;
};

// ============================================
// UI UPDATE FUNCTIONS
// ============================================

/**
 * Display statistics in a grid format
 * @param {object} stats - Statistics object
 * @param {string} containerId - ID of container element
 */
const displayStats = (stats, containerId) => {
    const container = document.getElementById(containerId);
    
    const statsHTML = `
        <div class="stat-item">
            <div class="stat-label">Characters</div>
            <div class="stat-value">${stats.characters}</div>
        </div>
        <div class="stat-item">
            <div class="stat-label">Words</div>
            <div class="stat-value">${stats.words}</div>
        </div>
        <div class="stat-item">
            <div class="stat-label">Vowels</div>
            <div class="stat-value">${stats.vowels}</div>
        </div>
        <div class="stat-item">
            <div class="stat-label">Vowel %</div>
            <div class="stat-value">${stats.vowelPercentage}%</div>
        </div>
        <div class="stat-item">
            <div class="stat-label">Avg Word Len</div>
            <div class="stat-value">${stats.avgWordLength}</div>
        </div>
        <div class="stat-item">
            <div class="stat-label">Longest Word</div>
            <div class="stat-value">${stats.longestWord}</div>
        </div>
    `;
    
    container.innerHTML = statsHTML;
};

/**
 * Display vowel breakdown chart
 * @param {object} breakdown - Vowel counts object
 * @param {string} containerId - ID of container element
 */
const displayVowelBreakdown = (breakdown, containerId) => {
    const container = document.getElementById(containerId);
    
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    const breakdownHTML = vowels.map(vowel => `
        <div class="vowel-item">
            <div class="vowel-char">${vowel.toUpperCase()}</div>
            <div class="vowel-count">${breakdown[vowel]}</div>
        </div>
    `).join('');
    
    container.innerHTML = breakdownHTML;
};

/**
 * Show result container with animation
 * @param {string} containerId - ID of result container
 */
const showResult = (containerId) => {
    const container = document.getElementById(containerId);
    container.style.display = 'block';
};

/**
 * Hide result container
 * @param {string} containerId - ID of result container
 */
const hideResult = (containerId) => {
    const container = document.getElementById(containerId);
    container.style.display = 'none';
};

// ============================================
// EVENT HANDLERS - TITLE CASE CONVERTER
// ============================================

const handleTitleCase = () => {
    const input = document.getElementById('titleInput').value;
    
    if (!input.trim()) {
        alert('⚠️ Please enter some text to convert!');
        return;
    }
    
    // Apply title case function
    const result = toTitleCase(input);
    
    // Calculate statistics
    const stats = calculateTextStats(result);
    
    // Display results
    document.getElementById('titleOutput').textContent = result;
    displayStats(stats, 'titleStats');
    showResult('titleResult');
};

const handleClearTitle = () => {
    document.getElementById('titleInput').value = '';
    hideResult('titleResult');
};

// ============================================
// EVENT HANDLERS - VOWEL COUNTER
// ============================================

const handleCountVowels = () => {
    const input = document.getElementById('vowelInput').value;
    
    if (!input.trim()) {
        alert('⚠️ Please enter some text to analyze!');
        return;
    }
    
    // Count vowels with detailed breakdown
    const vowelData = countVowelsDetailed(input);
    const stats = calculateTextStats(input);
    
    // Display results
    document.getElementById('vowelOutput').textContent = 
        `Total Vowels: ${vowelData.total} out of ${stats.characters} characters`;
    
    displayStats(stats, 'vowelStats');
    displayVowelBreakdown(vowelData.breakdown, 'vowelBreakdown');
    showResult('vowelResult');
};

const handleClearVowel = () => {
    document.getElementById('vowelInput').value = '';
    hideResult('vowelResult');
};

// ============================================
// EVENT HANDLERS - SECRET MESSAGE GENERATOR
// ============================================

const handleGenerateSecret = () => {
    const input = document.getElementById('secretInput').value;
    const censorWordsInput = document.getElementById('censorWords').value;
    
    if (!input.trim()) {
        alert('⚠️ Please enter a message!');
        return;
    }
    
    if (!censorWordsInput.trim()) {
        alert('⚠️ Please enter words to censor!');
        return;
    }
    
    // Parse words to censor (comma-separated)
    const wordsArray = censorWordsInput.split(',').map(word => word.trim());
    
    // Apply censoring
    const secretMessage = censorWords(input, wordsArray);
    
    // Calculate statistics
    const originalStats = calculateTextStats(input);
    const censoredCount = countCensoredWords(input, secretMessage);
    
    // Display results
    document.getElementById('secretOutput').textContent = secretMessage;
    
    const statsHTML = `
        <div class="stat-item">
            <div class="stat-label">Original Words</div>
            <div class="stat-value">${originalStats.words}</div>
        </div>
        <div class="stat-item">
            <div class="stat-label">Censored Words</div>
            <div class="stat-value">${censoredCount}</div>
        </div>
        <div class="stat-item">
            <div class="stat-label">Characters</div>
            <div class="stat-value">${originalStats.characters}</div>
        </div>
        <div class="stat-item">
            <div class="stat-label">Censor Rate</div>
            <div class="stat-value">${Math.round((censoredCount / originalStats.words) * 100)}%</div>
        </div>
    `;
    
    document.getElementById('secretStats').innerHTML = statsHTML;
    showResult('secretResult');
};

const handleClearSecret = () => {
    document.getElementById('secretInput').value = '';
    document.getElementById('censorWords').value = '';
    hideResult('secretResult');
};

// ============================================
// EVENT HANDLERS - COMBINED DEMO
// ============================================

const handleRunAll = () => {
    const input = document.getElementById('demoInput').value;
    const censorWordsInput = document.getElementById('demoCensorWords').value;
    
    if (!input.trim()) {
        alert('⚠️ Please enter some text for the demo!');
        return;
    }
    
    // 1. Title Case
    const titleCased = toTitleCase(input);
    
    // 2. Vowel Count
    const vowelData = countVowelsDetailed(input);
    
    // 3. Secret Message
    const wordsArray = censorWordsInput.trim() 
        ? censorWordsInput.split(',').map(word => word.trim())
        : [];
    const secretMessage = wordsArray.length > 0 
        ? censorWords(input, wordsArray)
        : 'No words to censor - please provide words in the field above';
    
    // Calculate stats
    const stats = calculateTextStats(input);
    
    // Display all results
    const resultsHTML = `
        <div class="demo-result-section">
            <div class="demo-result-title">
                <span>1️⃣</span> Title Case Result
            </div>
            <div class="demo-result-content">${titleCased}</div>
        </div>
        
        <div class="demo-result-section">
            <div class="demo-result-title">
                <span>2️⃣</span> Vowel Analysis
            </div>
            <div class="demo-result-content">
                Total Vowels: <strong>${vowelData.total}</strong> (${stats.vowelPercentage}% of text)
                <br>
                Breakdown: A=${vowelData.breakdown.a}, E=${vowelData.breakdown.e}, 
                I=${vowelData.breakdown.i}, O=${vowelData.breakdown.o}, U=${vowelData.breakdown.u}
            </div>
        </div>
        
        <div class="demo-result-section">
            <div class="demo-result-title">
                <span>3️⃣</span> Secret Message
            </div>
            <div class="demo-result-content">${secretMessage}</div>
        </div>
        
        <div class="demo-result-section">
            <div class="demo-result-title">
                <span>📊</span> Complete Text Statistics
            </div>
            <div class="stats-grid">
                <div class="stat-item">
                    <div class="stat-label">Characters</div>
                    <div class="stat-value">${stats.characters}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Words</div>
                    <div class="stat-value">${stats.words}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Vowels</div>
                    <div class="stat-value">${stats.vowels}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Vowel %</div>
                    <div class="stat-value">${stats.vowelPercentage}%</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Avg Word</div>
                    <div class="stat-value">${stats.avgWordLength}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Longest</div>
                    <div class="stat-value">${stats.longestWord}</div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('demoResults').innerHTML = resultsHTML;
    showResult('demoResults');
};

const handleClearDemo = () => {
    document.getElementById('demoInput').value = '  hello world! this is javascript with amazing arrow functions and secret passwords  ';
    document.getElementById('demoCensorWords').value = 'secret, password, javascript';
    hideResult('demoResults');
};

// ============================================
// INITIALIZE EVENT LISTENERS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('%c🔧 DAY16 - String Utilities Loaded!', 'color: #3b82f6; font-weight: bold; font-size: 16px;');
    console.log('%c📚 Arrow Functions Active', 'color: #10b981; font-weight: bold;');
    
    // Title Case Converter
    document.getElementById('convertTitleBtn').addEventListener('click', handleTitleCase);
    document.getElementById('clearTitleBtn').addEventListener('click', handleClearTitle);
    
    // Vowel Counter
    document.getElementById('countVowelsBtn').addEventListener('click', handleCountVowels);
    document.getElementById('clearVowelBtn').addEventListener('click', handleClearVowel);
    
    // Secret Message Generator
    document.getElementById('generateSecretBtn').addEventListener('click', handleGenerateSecret);
    document.getElementById('clearSecretBtn').addEventListener('click', handleClearSecret);
    
    // Combined Demo
    document.getElementById('runAllBtn').addEventListener('click', handleRunAll);
    document.getElementById('clearDemoBtn').addEventListener('click', handleClearDemo);
    
    // Add Enter key support for textareas
    const addEnterKeyHandler = (inputId, buttonId) => {
        document.getElementById(inputId).addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                document.getElementById(buttonId).click();
            }
        });
    };
    
    addEnterKeyHandler('titleInput', 'convertTitleBtn');
    addEnterKeyHandler('vowelInput', 'countVowelsBtn');
    addEnterKeyHandler('secretInput', 'generateSecretBtn');
    addEnterKeyHandler('demoInput', 'runAllBtn');
    
    // Log function examples to console
    console.log('%c═══════════════════════════════════════', 'color: #3b82f6;');
    console.log('%c📖 FUNCTION EXAMPLES:', 'color: #3b82f6; font-weight: bold;');
    console.log('%c═══════════════════════════════════════', 'color: #3b82f6;');
    
    console.log('%c1️⃣ Title Case:', 'color: #10b981; font-weight: bold;');
    console.log('toTitleCase("  hello world  ") =>', toTitleCase("  hello world  "));
    
    console.log('%c2️⃣ Vowel Count:', 'color: #10b981; font-weight: bold;');
    console.log('countVowels("JavaScript") =>', countVowels("JavaScript"));
    
    console.log('%c3️⃣ Censor Words:', 'color: #10b981; font-weight: bold;');
    console.log('censorWords("secret code", ["secret"]) =>', censorWords("secret code", ["secret"]));
    
    console.log('%c═══════════════════════════════════════', 'color: #3b82f6;');
    console.log('%c💡 Tip: Press Ctrl+Enter in text fields for quick execution', 'color: #fbbf24;');
});

// ============================================
// EXPORT FUNCTIONS (for testing/reuse)
// ============================================

// Make functions available globally for testing in console
window.stringUtils = {
    toTitleCase,
    countVowels,
    countVowelsDetailed,
    censorWords,
    calculateTextStats
};

console.log('%c✨ String utilities available at: window.stringUtils', 'color: #e879f9; font-style: italic;');
