/* ============================================================================
   DAY13 - JavaScript Variables & Math
   Main JavaScript File
   ============================================================================ */

/**
 * Module: Math Calculator
 * Demonstrates arithmetic operations with variables
 */
const MathCalculator = (() => {
    const form = document.getElementById('math-form');
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultsDiv = document.getElementById('math-results');

    /**
     * Perform all arithmetic operations on two numbers
     */
    const performCalculations = () => {
        // Parse input values as numbers
        const num1 = parseFloat(num1Input.value) || 0;
        const num2 = parseFloat(num2Input.value) || 0;

        // Perform arithmetic operations
        const sum = num1 + num2;
        const difference = num1 - num2;
        const product = num1 * num2;
        const quotient = num2 !== 0 ? (num1 / num2).toFixed(2) : 'undefined';
        const remainder = num2 !== 0 ? num1 % num2 : 'undefined';
        const exponent = Math.pow(num1, 2);

        // Display results
        displayResults({
            sum,
            difference,
            product,
            quotient,
            remainder,
            exponent
        });
    };

    /**
     * Display results in formatted grid
     */
    const displayResults = (results) => {
        const html = `
            <div class="result-item">
                <div class="result-item__label">Sum (+)</div>
                <div class="result-item__value">${results.sum}</div>
            </div>
            <div class="result-item">
                <div class="result-item__label">Difference (-)</div>
                <div class="result-item__value">${results.difference}</div>
            </div>
            <div class="result-item">
                <div class="result-item__label">Product (*)</div>
                <div class="result-item__value">${results.product}</div>
            </div>
            <div class="result-item">
                <div class="result-item__label">Division (/)</div>
                <div class="result-item__value">${results.quotient}</div>
            </div>
            <div class="result-item">
                <div class="result-item__label">Remainder (%)</div>
                <div class="result-item__value">${results.remainder}</div>
            </div>
            <div class="result-item">
                <div class="result-item__label">Square (**2)</div>
                <div class="result-item__value">${results.exponent}</div>
            </div>
        `;

        resultsDiv.innerHTML = html;
        resultsDiv.style.display = 'grid';
    };

    /**
     * Handle calculation on button click
     */
    const handleCalculate = () => {
        performCalculations();
    };

    /**
     * Live calculation as user types
     */
    const handleInputChange = () => {
        if (num1Input.value !== '' && num2Input.value !== '') {
            performCalculations();
        }
    };

    const init = () => {
        calculateBtn.addEventListener('click', handleCalculate);
        num1Input.addEventListener('input', handleInputChange);
        num2Input.addEventListener('input', handleInputChange);
        
        // Show initial results
        performCalculations();
    };

    return { init };
})();

/**
 * Module: String Concatenation Demo
 * Demonstrates different string concatenation methods
 */
const StringConcatenation = (() => {
    const form = document.getElementById('name-form');
    const nameInput = document.getElementById('user-name');
    const roleInput = document.getElementById('user-role');
    const generateBtn = document.getElementById('generate-btn');
    const resultsDiv = document.getElementById('string-results');

    /**
     * Generate different concatenation methods
     */
    const generateMessages = () => {
        const name = nameInput.value || 'Developer';
        const role = roleInput.value || 'JavaScript Learner';

        // Method 1: Concatenation with +
        const method1 = 'Welcome, ' + name + '!';

        // Method 2: Template literals
        const method2 = `Hi ${name}!`;

        // Method 3: Multiple variables
        const method3 = `${name} is a ${role}.`;

        // Method 4: With expressions
        const year = new Date().getFullYear();
        const method4 = `It's ${year}. Welcome to JavaScript!`;

        // Method 5: concat()
        const method5 = 'Welcome '.concat(name, ' - ', role);

        // Method 6: Multi-line template
        const method6 = `
Hello ${name},

Welcome to our platform!
You are a ${role} and we're excited to have you here.

Happy coding! 🚀
        `.trim();

        displayMessages({
            method1,
            method2,
            method3,
            method4,
            method5,
            method6,
            name,
            role
        });
    };

    /**
     * Display messages
     */
    const displayMessages = (messages) => {
        const html = `
            <div class="string-result-item">
                <div class="string-result-item__method">Method 1: Concatenation (+)</div>
                <div class="string-result-item__output">"${messages.method1}"</div>
                <p style="color: var(--color-text-lighter); margin-top: 8px; font-size: 0.9rem;">
                    Uses + operator to join strings
                </p>
            </div>

            <div class="string-result-item">
                <div class="string-result-item__method">Method 2: Template Literals</div>
                <div class="string-result-item__output">"${messages.method2}"</div>
                <p style="color: var(--color-text-lighter); margin-top: 8px; font-size: 0.9rem;">
                    Uses backticks and \${} for interpolation
                </p>
            </div>

            <div class="string-result-item">
                <div class="string-result-item__method">Method 3: Multiple Variables</div>
                <div class="string-result-item__output">"${messages.method3}"</div>
                <p style="color: var(--color-text-lighter); margin-top: 8px; font-size: 0.9rem;">
                    Insert multiple variables into template
                </p>
            </div>

            <div class="string-result-item">
                <div class="string-result-item__method">Method 4: With Expressions</div>
                <div class="string-result-item__output">"${messages.method4}"</div>
                <p style="color: var(--color-text-lighter); margin-top: 8px; font-size: 0.9rem;">
                    Execute code inside template literals
                </p>
            </div>

            <div class="string-result-item">
                <div class="string-result-item__method">Method 5: concat() Method</div>
                <div class="string-result-item__output">"${messages.method5}"</div>
                <p style="color: var(--color-text-lighter); margin-top: 8px; font-size: 0.9rem;">
                    Use string .concat() method
                </p>
            </div>

            <div class="string-result-item">
                <div class="string-result-item__method">Method 6: Multi-line Template</div>
                <pre style="background: var(--color-bg); color: var(--code-string); padding: 12px; border-radius: 4px; overflow-x: auto; margin-top: 8px; font-size: 0.85rem;">"${messages.method6}"</pre>
                <p style="color: var(--color-text-lighter); margin-top: 8px; font-size: 0.9rem;">
                    Template literals preserve line breaks
                </p>
            </div>
        `;

        resultsDiv.innerHTML = html;
        resultsDiv.style.display = 'flex';
    };

    /**
     * Handle generation on button click
     */
    const handleGenerate = () => {
        generateMessages();
    };

    /**
     * Live generation as user types
     */
    const handleInputChange = () => {
        generateMessages();
    };

    const init = () => {
        generateBtn.addEventListener('click', handleGenerate);
        nameInput.addEventListener('input', handleInputChange);
        roleInput.addEventListener('input', handleInputChange);
        
        // Show initial messages
        generateMessages();
    };

    return { init };
})();

/**
 * Module: Quiz Handler
 * Interactive quiz about variables and math
 */
const QuizHandler = (() => {
    const quizOptions = document.querySelectorAll('.quiz-option');
    const quizResults = document.getElementById('quiz-results');
    let score = 0;
    let answered = 0;

    /**
     * Handle quiz option click
     */
    const handleOptionClick = (e) => {
        const option = e.target;
        const card = option.closest('.quiz-card');
        const options = card.querySelectorAll('.quiz-option');

        // Prevent multiple answers per question
        if (card.classList.contains('answered')) return;

        const isCorrect = option.getAttribute('data-answer') === 'correct';

        // Mark all options
        options.forEach(opt => {
            if (opt.getAttribute('data-answer') === 'correct') {
                opt.classList.add('correct');
            } else if (opt === option && !isCorrect) {
                opt.classList.add('incorrect');
            }
        });

        // Update score
        if (isCorrect) score++;
        answered++;

        card.classList.add('answered');

        // Show results if all answered
        if (answered === quizOptions.length / 4) {
            showResults();
        }
    };

    /**
     * Display quiz results
     */
    const showResults = () => {
        const percentage = Math.round((score / (quizOptions.length / 4)) * 100);
        let message = '';

        if (percentage === 100) {
            message = '🎉 Perfect Score! You\'re a JavaScript pro!';
        } else if (percentage >= 75) {
            message = '✅ Great job! Keep practicing!';
        } else if (percentage >= 50) {
            message = '👍 Good effort! Review the concepts.';
        } else {
            message = '📚 Keep learning! Read the guide again.';
        }

        const html = `
            <div class="quiz-results__score">${score}/${quizOptions.length / 4}</div>
            <p class="quiz-results__message">${message}</p>
            <p style="color: var(--color-text-lighter); margin-top: 12px; font-size: 0.9rem;">
                ${percentage}% Correct
            </p>
        `;

        quizResults.innerHTML = html;
        quizResults.style.display = 'block';
    };

    const init = () => {
        quizOptions.forEach(option => {
            option.addEventListener('click', handleOptionClick);
        });
    };

    return { init };
})();

/**
 * Module: Variable Examples Demonstrator
 * Shows real-world variable usage in console
 */
const VariableExamples = (() => {
    /**
     * Log all example calculations to console
     */
    const runExamples = () => {
        console.group('📚 DAY13 - Variable Examples');

        // Example 1: Shopping Cart
        console.group('🛒 Shopping Cart Example');
        {
            const itemPrice = 100;
            const quantity = 3;
            const taxRate = 0.08;
            
            const subtotal = itemPrice * quantity;
            const tax = subtotal * taxRate;
            const total = subtotal + tax;

            console.log(`Item Price: $${itemPrice}`);
            console.log(`Quantity: ${quantity}`);
            console.log(`Subtotal: $${subtotal}`);
            console.log(`Tax (8%): $${tax.toFixed(2)}`);
            console.log(`Total: $${total.toFixed(2)}`);
        }
        console.groupEnd();

        // Example 2: Age Calculation
        console.group('🎂 Age Calculation');
        {
            const birthYear = 2000;
            const currentYear = 2024;
            const age = currentYear - birthYear;

            console.log(`Birth Year: ${birthYear}`);
            console.log(`Current Year: ${currentYear}`);
            console.log(`Age: ${age} years old`);
        }
        console.groupEnd();

        // Example 3: Temperature Conversion
        console.group('🌡️ Temperature Conversion');
        {
            const celsius = 25;
            const fahrenheit = (celsius * 9 / 5) + 32;

            console.log(`Celsius: ${celsius}°C`);
            console.log(`Fahrenheit: ${fahrenheit.toFixed(2)}°F`);
        }
        console.groupEnd();

        // Example 4: Grade Average
        console.group('📊 Grade Average');
        {
            const score1 = 85;
            const score2 = 92;
            const score3 = 78;

            const average = (score1 + score2 + score3) / 3;

            console.log(`Score 1: ${score1}`);
            console.log(`Score 2: ${score2}`);
            console.log(`Score 3: ${score3}`);
            console.log(`Average: ${average.toFixed(2)}`);
        }
        console.groupEnd();

        // Example 5: Distance Calculation
        console.group('📏 Distance Calculation');
        {
            const speed = 60; // km/h
            const time = 2.5; // hours

            const distance = speed * time;

            console.log(`Speed: ${speed} km/h`);
            console.log(`Time: ${time} hours`);
            console.log(`Distance: ${distance} km`);
        }
        console.groupEnd();

        console.groupEnd();
    };

    const init = () => {
        runExamples();
    };

    return { init };
})();

/**
 * Module: Variable Declarations Demo
 * Show different variable declaration methods
 */
const VariableDeclarations = (() => {
    const demonstrateVariables = () => {
        console.group('📝 Variable Declaration Methods');

        // const - Most Common
        console.log('%c✅ const - Recommended', 'color: #10b981; font-weight: bold;');
        {
            const name = 'Alice';
            const age = 25;
            console.log(`Name: ${name}, Age: ${age}`);
            console.log('Cannot be reassigned: const age = 26; will error');
        }

        // let - For Changing Values
        console.log('%c✅ let - For Loops and Changes', 'color: #0ea5e9; font-weight: bold;');
        {
            let counter = 0;
            counter = 1;
            counter = 2;
            console.log(`Counter can be reassigned: ${counter}`);
            console.log('Block-scoped: only available in { } block');
        }

        // var - Legacy
        console.log('%c⚠️ var - Avoid in Modern Code', 'color: #ef4444; font-weight: bold;');
        {
            var legacy = 'old style';
            console.log('var is function-scoped, not block-scoped');
            console.log('Can cause unpredictable behavior');
        }

        console.groupEnd();
    };

    const init = () => {
        demonstrateVariables();
    };

    return { init };
})();

/**
 * Module: Initialization
 * Initialize all modules on page load
 */
const App = (() => {
    const init = () => {
        console.log('🚀 DAY13 - Variables & Math loaded');
        
        // Initialize modules
        MathCalculator.init();
        StringConcatenation.init();
        QuizHandler.init();
        VariableExamples.init();
        VariableDeclarations.init();
        
        console.log('✅ All modules initialized. Check console for examples!');
    };

    return { init };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', App.init);
} else {
    App.init();
}
