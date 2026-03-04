// ============================================
// DAY14 - Number Guessing Game JavaScript
// While Loops & Game Logic
// ============================================

// Game Difficulty Settings
const DIFFICULTY_SETTINGS = {
    easy: { attempts: 15, color: '#86efac' },
    medium: { attempts: 10, color: '#fbbf24' },
    hard: { attempts: 5, color: '#f87171' }
};

// Global Game State
let gameState = {
    secretNumber: 0,
    currentAttempts: 0,
    maxAttempts: 10,
    guesses: [],
    isGameOver: false,
    hasWon: false,
    difficulty: 'medium'
};

// ============================================
// RandomNumberGenerator Module
// ============================================

const RandomNumberGenerator = (function() {
    /**
     * Generate a random number between min and max (inclusive)
     * Uses: Math.random() * (max - min + 1) + min
     */
    function generateNumber(min = 1, max = 100) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return {
        generate: generateNumber
    };
})();

// ============================================
// GameLogic Module
// Simulates while loop: while (guess !== secret && attempts > 0)
// ============================================

const GameLogic = (function() {
    /**
     * Initialize a new game
     * This represents: while (gameRunning) { game loop }
     */
    function initializeGame(difficulty = 'medium') {
        const maxAttempts = DIFFICULTY_SETTINGS[difficulty].attempts;
        
        gameState = {
            secretNumber: RandomNumberGenerator.generate(1, 100),
            currentAttempts: maxAttempts,
            maxAttempts: maxAttempts,
            guesses: [],
            isGameOver: false,
            hasWon: false,
            difficulty: difficulty
        };

        console.log('%cGame Started!', 'color: #76ef4f; font-weight: bold; font-size: 14px;');
        console.log(`%cSecret Number: ${gameState.secretNumber}`, 'color: #fbbf24;');
        console.log(`%cDifficulty: ${difficulty} | Attempts: ${maxAttempts}`, 'color: #60a5fa;');
        
        return gameState;
    }

    /**
     * Process a guess
     * Core loop: while (guess !== secret && attempts > 0) { check guess }
     */
    function processGuess(guess) {
        // Validate input
        guess = parseInt(guess);
        
        if (isNaN(guess) || guess < 1 || guess > 100) {
            return {
                valid: false,
                message: 'Please enter a number between 1 and 100!'
            };
        }

        // Check if already guessed
        if (gameState.guesses.includes(guess)) {
            return {
                valid: false,
                message: `You already guessed ${guess}. Try a different number!`
            };
        }

        // Add to guesses list
        gameState.guesses.push(guess);
        gameState.currentAttempts--;

        // Check if correct
        if (guess === gameState.secretNumber) {
            gameState.hasWon = true;
            gameState.isGameOver = true;
            
            console.log(`%c✅ CORRECT! The number was ${gameState.secretNumber}!`, 
                'color: #34d399; font-weight: bold; font-size: 14px;');
            console.log(`%cGuesses: ${gameState.guesses.join(', ')}`, 
                'color: #cbd5e1;');
            
            return {
                valid: true,
                correct: true,
                attempts: gameState.currentAttempts,
                totalAttempts: gameState.maxAttempts,
                guessesCount: gameState.guesses.length
            };
        }

        // Check if out of attempts
        if (gameState.currentAttempts <= 0) {
            gameState.isGameOver = true;
            
            console.log(`%c❌ GAME OVER! The number was ${gameState.secretNumber}!`, 
                'color: #f87171; font-weight: bold; font-size: 14px;');
            console.log(`%cYour Guesses: ${gameState.guesses.join(', ')}`, 
                'color: #cbd5e1;');
            
            return {
                valid: true,
                correct: false,
                gameOver: true,
                secret: gameState.secretNumber,
                attempts: gameState.currentAttempts,
                guessesCount: gameState.guesses.length
            };
        }

        // Valid guess but not correct and still have attempts
        return {
            valid: true,
            correct: false,
            attempts: gameState.currentAttempts,
            guess: guess,
            guessesCount: gameState.guesses.length
        };
    }

    /**
     * Get current game state
     */
    function getState() {
        return { ...gameState };
    }

    return {
        initialize: initializeGame,
        processGuess: processGuess,
        getState: getState
    };
})();

// ============================================
// HintSystem Module
// Uses: if (guess > secret) hint = "Too High"
// ============================================

const HintSystem = (function() {
    const TEMPERATURE_SCALE = [
        { min: 1, max: 5, emoji: '❄️', label: 'Freezing' },
        { min: 6, max: 20, emoji: '🧊', label: 'Cold' },
        { min: 21, max: 35, emoji: '😐', label: 'Warm' },
        { min: 36, max: 48, emoji: '🔥', label: 'Hot' },
        { min: 49, max: 50, emoji: '🌋', label: 'Burning!' }
    ];

    /**
     * Get hint based on guess vs secret
     */
    function getHint(guess) {
        const secret = gameState.secretNumber;
        let hint = '';
        let type = '';

        if (guess > secret) {
            hint = `🔴 Too High! Try a lower number.`;
            type = 'too-high';
        } else if (guess < secret) {
            hint = `🔵 Too Low! Try a higher number.`;
            type = 'too-low';
        } else {
            hint = `🟢 Correct! You found it!`;
            type = 'correct';
        }

        return {
            text: hint,
            type: type,
            guess: guess,
            secret: secret
        };
    }

    /**
     * Get "temperature" indicator
     * Shows how close the guess is to secret (1-100)
     */
    function getTemperature(guess) {
        const secret = gameState.secretNumber;
        const difference = Math.abs(guess - secret);

        for (let range of TEMPERATURE_SCALE) {
            if (difference >= range.min && difference <= range.max) {
                return {
                    emoji: range.emoji,
                    label: range.label,
                    distance: difference
                };
            }
        }

        return { emoji: '❄️', label: 'Freezing', distance: difference };
    }

    /**
     * Get remaining range hint
     */
    function getRangeHint(guess) {
        const secret = gameState.secretNumber;
        let low = 1;
        let high = 100;

        // Sort guesses to find bounds
        gameState.guesses.forEach(g => {
            if (g < secret && g > low) low = g;
            if (g > secret && g < high) high = g;
        });

        return {
            minBound: low,
            maxBound: high,
            range: high - low
        };
    }

    return {
        getHint: getHint,
        getTemperature: getTemperature,
        getRangeHint: getRangeHint
    };
})();

// ============================================
// AttemptsTracker Module
// Tracks: while (attempts > 0)
// ============================================

const AttemptsTracker = (function() {
    /**
     * Get attempts information
     */
    function getAttempts() {
        return {
            remaining: gameState.currentAttempts,
            total: gameState.maxAttempts,
            used: gameState.maxAttempts - gameState.currentAttempts,
            percentage: Math.round(
                (gameState.currentAttempts / gameState.maxAttempts) * 100
            )
        };
    }

    /**
     * Get attempts warning status
     */
    function getWarningLevel() {
        const { remaining, total } = getAttempts();
        const percentage = (remaining / total) * 100;

        if (percentage <= 20) return 'critical'; // Red
        if (percentage <= 50) return 'warning'; // Orange
        return 'info'; // Blue
    }

    return {
        getAttempts: getAttempts,
        getWarningLevel: getWarningLevel
    };
})();

// ============================================
// UIManager Module
// Handles all DOM updates
// ============================================

const UIManager = (function() {
    /**
     * Update hint display
     */
    function displayHint(guess) {
        const hint = HintSystem.getHint(guess);
        const feedbackSection = document.getElementById('feedbackSection');
        const hintBox = document.getElementById('hintBox');
        const hintText = document.getElementById('hintText');

        // Show feedback section
        feedbackSection.style.display = 'block';

        // Update hint
        hintText.textContent = hint.text;
        hintBox.className = 'hint-box ' + hint.type;

        // Update temperature
        const temp = HintSystem.getTemperature(guess);
        document.getElementById('temperature').textContent = 
            `${temp.emoji} ${temp.distance} away`;
    }

    /**
     * Display current guess and attempts
     */
    function updateStats() {
        const attempts = AttemptsTracker.getAttempts();
        document.getElementById('attemptsLeft').textContent = 
            attempts.remaining;
        
        if (gameState.guesses.length > 0) {
            document.getElementById('currentGuess').textContent = 
                gameState.guesses[gameState.guesses.length - 1];
        }
    }

    /**
     * Display guesses history
     */
    function displayGuessesHistory() {
        const guessesList = document.getElementById('guessesList');
        guessesList.innerHTML = '';

        gameState.guesses.forEach((guess, index) => {
            const item = document.createElement('div');
            item.className = 'guess-item';
            
            if (guess === gameState.secretNumber) {
                item.classList.add('correct');
            }
            
            item.textContent = `#${index + 1}: ${guess}`;
            guessesList.appendChild(item);
        });
    }

    /**
     * Show game won
     */
    function showWon() {
        const resultSection = document.getElementById('resultSection');
        const resultBox = document.getElementById('resultBox');
        const resultTitle = document.getElementById('resultTitle');
        const resultMessage = document.getElementById('resultMessage');
        const resultStat1 = document.getElementById('resultStat1');
        const resultStat2 = document.getElementById('resultStat2');

        // Hide instructions and feedback
        document.getElementById('instructionsBox').style.display = 'none';
        document.getElementById('feedbackSection').style.display = 'none';

        // Show result
        resultSection.style.display = 'block';
        resultBox.className = 'result-box won';
        resultTitle.textContent = '🎉 You Won!';
        resultMessage.textContent = 
            `You found the secret number: ${gameState.secretNumber}`;
        resultStat1.textContent = 
            `Guesses: ${gameState.guesses.length}`;
        resultStat2.textContent = 
            `Attempts Left: ${gameState.currentAttempts} / ${gameState.maxAttempts}`;
    }

    /**
     * Show game over (lost)
     */
    function showGameOver() {
        const resultSection = document.getElementById('resultSection');
        const resultBox = document.getElementById('resultBox');
        const resultTitle = document.getElementById('resultTitle');
        const resultMessage = document.getElementById('resultMessage');
        const resultStat1 = document.getElementById('resultStat1');
        const resultStat2 = document.getElementById('resultStat2');

        // Hide instructions and feedback
        document.getElementById('instructionsBox').style.display = 'none';
        document.getElementById('feedbackSection').style.display = 'none';

        // Show result
        resultSection.style.display = 'block';
        resultBox.className = 'result-box lost';
        resultTitle.textContent = '😢 Game Over!';
        resultMessage.textContent = 
            `The secret number was: ${gameState.secretNumber}`;
        resultStat1.textContent = 
            `Your Guesses: ${gameState.guesses.join(', ')}`;
        resultStat2.textContent = 
            `Total Attempts: ${gameState.guesses.length}`;
    }

    /**
     * Reset UI for new game
     */
    function resetUI() {
        document.getElementById('guessInput').value = '';
        document.getElementById('feedbackSection').style.display = 'none';
        document.getElementById('resultSection').style.display = 'none';
        document.getElementById('instructionsBox').style.display = 'block';
        document.getElementById('guessesList').innerHTML = '';
        document.getElementById('temperature').textContent = '❄️';
        document.getElementById('currentGuess').textContent = '-';
        document.getElementById('hintText').textContent = '';
    }

    /**
     * Update difficulty button states
     */
    function updateDifficultyButtons(selectedDifficulty) {
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            if (btn.dataset.difficulty === selectedDifficulty) {
                btn.setAttribute('data-selected', 'true');
            } else {
                btn.removeAttribute('data-selected');
            }
        });
    }

    /**
     * Focus input field
     */
    function focusInput() {
        document.getElementById('guessInput').focus();
    }

    return {
        displayHint: displayHint,
        updateStats: updateStats,
        displayGuessesHistory: displayGuessesHistory,
        showWon: showWon,
        showGameOver: showGameOver,
        resetUI: resetUI,
        updateDifficultyButtons: updateDifficultyButtons,
        focusInput: focusInput
    };
})();

// ============================================
// Game Controller
// Orchestrates all modules
// ============================================

const GameController = (function() {
    /**
     * Start a new game
     */
    function startNewGame(difficulty = 'medium') {
        GameLogic.initialize(difficulty);
        UIManager.resetUI();
        UIManager.updateDifficultyButtons(difficulty);
        UIManager.focusInput();

        console.log('%c🎮 New game started!', 'color: #818cf8; font-weight: bold;');
    }

    /**
     * Handle guess submission
     */
    function submitGuess() {
        const input = document.getElementById('guessInput');
        const guess = input.value.trim();

        if (!guess) {
            alert('Please enter a number!');
            UIManager.focusInput();
            return;
        }

        // Process the guess
        const result = GameLogic.processGuess(guess);

        if (!result.valid) {
            alert(result.message);
            input.value = '';
            UIManager.focusInput();
            return;
        }

        // Update UI
        UIManager.displayHint(guess);
        UIManager.updateStats();
        UIManager.displayGuessesHistory();

        // Check game state
        if (result.correct) {
            UIManager.showWon();
        } else if (result.gameOver) {
            UIManager.showGameOver();
        }

        // Clear input
        input.value = '';
        if (!gameState.isGameOver) {
            UIManager.focusInput();
        }
    }

    /**
     * Play again
     */
    function playAgain() {
        const difficulty = gameState.difficulty;
        startNewGame(difficulty);
    }

    return {
        startNewGame: startNewGame,
        submitGuess: submitGuess,
        playAgain: playAgain
    };
})();

// ============================================
// Event Listeners
// Initialize everything
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('%c==========================================', 'color: #818cf8;');
    console.log('%cDAY14 - Number Guessing Game Loaded!', 
        'color: #818cf8; font-weight: bold; font-size: 16px;');
    console.log('%c==========================================', 'color: #818cf8;');
    console.log('%cThe game uses a while loop pattern:', 'color: #86efac; font-weight: bold;');
    console.log('%c  while (guess !== secret && attempts > 0) {', 'color: #fbbf24;');
    console.log('%c    // Ask for guess, check, update', 'color: #64748b;');
    console.log('%c  }', 'color: #fbbf24;');

    // Difficulty buttons
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const difficulty = this.dataset.difficulty;
            GameController.startNewGame(difficulty);
        });
    });

    // Guess button
    document.getElementById('guessBtn').addEventListener('click', function() {
        if (!gameState.isGameOver) {
            GameController.submitGuess();
        }
    });

    // Guess input - Enter key
    document.getElementById('guessInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !gameState.isGameOver) {
            GameController.submitGuess();
        }
    });

    // Play again button
    document.getElementById('playAgainBtn').addEventListener('click', function() {
        GameController.playAgain();
    });

    // Start with medium difficulty by default
    GameController.startNewGame('medium');

    // Log tips
    console.log('%c💡 Pro Tips:', 'color: #60a5fa; font-weight: bold;');
    console.log('%c  1. Use binary search (always guess the middle)', 'color: #cbd5e1;');
    console.log('%c  2. Listen to the "too high" / "too low" hints', 'color: #cbd5e1;');
    console.log('%c  3. Watch the temperature indicator for distance', 'color: #cbd5e1;');
    console.log('%c  4. Easy = 15 attempts, Medium = 10, Hard = 5', 'color: #cbd5e1;');
});

// ============================================
// Educational Console Examples
// Demonstrates While Loop Patterns
// ============================================

setTimeout(function() {
    console.log('%c\n📚 WHILE LOOP EXAMPLES:', 'color: #fbbf24; font-weight: bold; font-size: 14px;');
    
    console.log('%cExample 1: Countdown Loop', 'color: #818cf8; font-weight: bold;');
    let countdown = 5;
    let countdownOutput = 'Counting down: ';
    while (countdown > 0) {
        countdownOutput += countdown + ' ';
        countdown--;
    }
    console.log(countdownOutput + '🚀 Blastoff!');
    
    console.log('%cExample 2: Sum Until Limit', 'color: #818cf8; font-weight: bold;');
    let sum = 0;
    let i = 1;
    while (sum < 100) {
        sum += i;
        i++;
    }
    console.log(`Sum reached 100 at i=${i-1}, total=${sum}`);
    
    console.log('%cExample 3: Input Validation Loop', 'color: #818cf8; font-weight: bold;');
    console.log('Simulating: while (input < 1 || input > 100) { ask again }');
    console.log('In the game, we keep asking until you guess correctly!');
    
    console.log('%cExample 4: List Iteration', 'color: #818cf8; font-weight: bold;');
    let items = ['guess1', 'guess2', 'guess3'];
    let index = 0;
    let details = 'Your guesses: ';
    while (index < items.length) {
        details += items[index] + ' ';
        index++;
    }
    console.log(details);
    
}, 1000);
