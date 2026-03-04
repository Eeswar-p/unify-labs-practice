# DAY14 - Number Guessing Game | While Loops & Game Logic

## 📚 Project Overview

Create an interactive number guessing game to master **while loops**, **game logic**, and **conditional statements**. The computer picks a random number between 1-100, and you must guess it with hints and limited attempts!

**Learning Focus:**
- ✅ Generate random numbers using Math.random() and Math.floor()
- ✅ Use while loops to repeat until a condition is met
- ✅ Compare values with if/else statements
- ✅ Track game state (attempts, guesses, win/loss)
- ✅ Provide user feedback through hints and temperature indicators

---

## 🎯 Learning Objectives

### 1. While Loops
- Understand the while loop structure
- Know when to use while loops (vs for loops)
- Control loop execution with proper conditions
- Prevent infinite loops by updating condition variables

### 2. Game Logic
- Generate random numbers
- Compare user input with target value
- Track game state (attempts, guesses, win/loss)
- Manage game flow (setup, playing, game over)

### 3. Conditional Statements
- Use if/else for different outcomes
- Compare numbers (>, <, ===, !==)
- Combine conditions with logical operators (&&, ||)
- Create decision trees for game logic

### 4. User Feedback
- Provide helpful hints ("Too High", "Too Low")
- Show temperature indicator (how close the guess is)
- Display guess history
- Show game statistics (attempts used, remaining)

---

## 🎮 How to Play

### Setup
1. **Choose Difficulty** - Select Easy (15), Medium (10), or Hard (5) attempts
2. **Game Initializes** - Computer picks a secret number 1-100

### Gameplay Loop (While Loop Pattern)
```
while (guess !== secret && attempts > 0):
    1. You enter a guess
    2. Computer checks if correct
    3. If wrong, gives hint (Too High/Too Low)
    4. Shows attempts remaining
    5. Continues until success or out of attempts
```

### Win/Lose
- **Win:** Find the secret number before running out of attempts
- **Lose:** Run out of attempts before finding the number
- **Play Again:** Reset and try a new game

---

## 🔑 Key Concepts

### While Loop Pattern

The core of the game uses a while loop pattern:

```javascript
let numGuesses = 0;

while (guess !== secret && attempts > 0) {
    // Get user input
    guess = getUserGuess();
    numGuesses++;
    
    // Check if correct
    if (guess === secret) {
        console.log("You won!");
        break; // Exit loop
    }
    
    // Give hint
    if (guess > secret) {
        console.log("Too High!");
    } else {
        console.log("Too Low!");
    }
    
    // Decrease attempts
    attempts--;
}

// Loop exits when:
// - guess === secret (found the number)
// - attempts <= 0 (ran out of tries)
```

**Why use while loops?**
- ✅ Perfect for "keep doing this until X happens"
- ✅ Flexible condition checking
- ✅ Great for game loops
- ✅ Useful for input validation

---

### Random Number Generation

Generate a number between min and max:

```javascript
// Random decimal: 0 (inclusive) to 1 (exclusive)
Math.random() // 0.742591...

// Scale to 1-100:
Math.random() * 100 // 0 to 99.999...

// Add 1 to get 1-100:
Math.random() * 100 + 1 // 1 to 100.999...

// Round down to integer:
Math.floor(Math.random() * 100 + 1) // 1 to 100

// General formula:
Math.floor(Math.random() * (max - min + 1)) + min
```

---

### Comparison & Hints

Compare to determine feedback:

```javascript
const guess = 42;
const secret = 65;

if (guess === secret) {
    hint = "Correct! You found it!";
} else if (guess > secret) {
    hint = "Too High!";
} else if (guess < secret) {
    hint = "Too Low!";
}
```

**Comparison Operators:**
- `===` Exactly equal
- `!==` Not exactly equal
- `>` Greater than
- `<` Less than
- `>=` Greater or equal
- `<=` Less or equal

---

### Game State Management

Track important game information:

```javascript
let gameState = {
    secretNumber: 42,      // The number to guess
    currentAttempts: 10,   // Attempts remaining
    maxAttempts: 10,       // Total attempts given
    guesses: [30, 50, 45], // All guesses made
    isGameOver: false,     // Is game finished?
    hasWon: false          // Did player win?
};
```

**Why track state?**
- ✅ Know what's happening in the game
- ✅ Make decisions based on current status
- ✅ Display info to the player
- ✅ Prevent invalid actions

---

### Temperature Indicator

Show how close the guess is:

```javascript
const difference = Math.abs(guess - secret);

if (difference <= 5) {
    emoji = "🌋"; // Burning - super close!
} else if (difference <= 20) {
    emoji = "🔥"; // Hot - very close
} else if (difference <= 35) {
    emoji = "😐"; // Warm - getting there
} else if (difference <= 50) {
    emoji = "🧊"; // Cold - far away
} else {
    emoji = "❄️"; // Freezing - very far
}
```

---

## 📊 Difficulty Levels

### 😊 Easy (15 Attempts)
- Perfect for learning
- Plenty of guesses
- Low pressure
- Strategy: Random guessing works fine

### 🤔 Medium (10 Attempts)
- Balanced challenge
- Encourages thinking
- Recommended for learning
- Strategy: Binary search helps

### 😤 Hard (5 Attempts)
- Expert level
- Requires strategy
- Must be smart
- Strategy: Binary search is essential

**Binary Search Strategy:**
```javascript
// Always guess the middle of the remaining range
let low = 1;
let high = 100;

while (low <= high && guess !== secret) {
    guess = Math.floor((low + high) / 2);
    
    if (guess === secret) {
        // Found it!
    } else if (guess > secret) {
        high = guess - 1; // Search lower half
    } else {
        low = guess + 1; // Search upper half
    }
}
```

This strategy **guarantees success** on Hard (5 attempts is enough)!

---

## 🌍 Real-World Applications

### 1. **Binary Search Algorithm**
```javascript
// Used in databases, sorted arrays, APIs
// Find an item in a sorted list efficiently
while (low <= high) {
    mid = (low + high) / 2;
    if (arr[mid] === target) found!
    else if (arr[mid] > target) high = mid - 1;
    else low = mid + 1;
}
```

### 2. **Login Attempts**
```javascript
let attempts = 3;
while (attempts > 0 && password !== correct) {
    password = getPasswordInput();
    if (password !== correct) {
        attempts--;
    }
}
if (attempts === 0) lockAccount();
```

### 3. **Data Validation**
```javascript
let input = null;
while (!isValid(input)) {
    input = getUserInput();
    if (!isValid(input)) {
        showError("Invalid input");
    }
}
```

### 4. **Game Loops**
```javascript
while (gameRunning) {
    handleInput();
    updateState();
    render();
}
```

### 5. **Download Progress**
```javascript
let downloaded = 0;
while (downloaded < totalSize) {
    downloaded += downloadChunk();
    showProgress(downloaded);
}
```

### 6. **Menu Navigation**
```javascript
let choosing = true;
while (choosing) {
    showMenu();
    choice = getUserChoice();
    if (choice === "quit") {
        choosing = false;
    } else {
        handleChoice(choice);
    }
}
```

---

## 💻 Code Patterns

### Pattern 1: Count-Controlled Loop
```javascript
let i = 0;
while (i < 10) {
    console.log(i);
    i++;
}
// Prints 0 to 9
```

### Pattern 2: Condition-Controlled Loop
```javascript
while (guess !== secret && attempts > 0) {
    guess = parseInt(prompt("Guess?"));
    if (guess === secret) {
        console.log("Win!");
    } else {
        attempts--;
    }
}
```

### Pattern 3: Sentinel-Controlled Loop
```javascript
let sum = 0;
let num = 0;
while (num !== -1) {
    num = parseInt(prompt("Enter number (-1 to quit):"));
    if (num !== -1) {
        sum += num;
    }
}
```

### Pattern 4: Flag-Controlled Loop
```javascript
let found = false;
let i = 0;
while (!found && i < arr.length) {
    if (arr[i] === target) {
        found = true;
    }
    i++;
}
```

---

## ⚠️ Common Mistakes

### ❌ Infinite Loop
```javascript
// WRONG - Never updates condition
while (true) {
    console.log("This runs forever!");
}

// WRONG - Condition never becomes false
let i = 0;
while (i < 10) {
    console.log(i);
    // Missing i++!
}
```

**Fix:** Always update the condition variable!

```javascript
// CORRECT
let i = 0;
while (i < 10) {
    console.log(i);
    i++; // Update the variable
}
```

### ❌ Wrong Operator
```javascript
// WRONG - Uses OR instead of AND
while (guess !== secret || attempts > 0) {
    // Keeps running even when out of attempts!
}

// CORRECT - Uses AND
while (guess !== secret && attempts > 0) {
    // Stops when either condition is false
}
```

### ❌ Type Confusion
```javascript
// WRONG - String vs Number
let guess = "50"; // From input (string)
let secret = 50;  // Number
if (guess === secret) {
    // Never true! "50" !== 50
}

// CORRECT - Convert to number
guess = parseInt("50");
if (guess === secret) {
    // Now true! 50 === 50
}
```

### ❌ Off-by-One Error
```javascript
// WRONG - Allows 11 entries (0-10) instead of 10
let i = 0;
while (i <= 10) {
    i++;
}

// CORRECT - Exactly 10 iterations (0-9)
let i = 0;
while (i < 10) {
    i++;
}
```

### ❌ Missing Break/Exit
```javascript
// WRONG - Doesn't exit when goal is met
while (true) {
    guess = prompt("Guess?");
    if (guess === secret) {
        console.log("Won!");
        // Missing break!
    }
}

// CORRECT - Breaks when condition met
while (guess !== secret) {
    guess = prompt("Guess?");
}
```

---

## 🧪 Testing Checklist

### Game Initialization
- [x] Game starts with random number
- [x] Difficulty selection works
- [x] Correct attempts for difficulty
- [x] Input field is ready for guesses

### Gameplay
- [x] Accepts numeric input 1-100
- [x] Shows "Too High" hint correctly
- [x] Shows "Too Low" hint correctly
- [x] Shows temperature indicator
- [x] Displays guess history
- [x] Updates attempts remaining
- [x] Prevents duplicate guesses

### Win Condition
- [x] Shows "You Won!" message
- [x] Displays secret number
- [x] Shows statistics (guesses, attempts used)
- [x] Hides input (game ends)

### Lose Condition
- [x] Shows "Game Over!" message
- [x] Reveals secret number
- [x] Shows all guesses
- [x] Shows total attempts used

### Features
- [x] "Play Again" button resets
- [x] Temperature accuracy
- [x] Responsive design works
- [x] Console logs game events
- [x] Enter key submits guess

---

## 🔄 Loop Alternatives

### For Loop vs While Loop

```javascript
// For loop - when you know iterations
for (let i = 0; i < 10; i++) {
    console.log(i);
}

// While loop - when you don't know when to stop
while (guess !== secret) {
    guess = getUserGuess();
}
```

### Do-While Loop - Execute at least once

```javascript
let guess;
do {
    guess = prompt("Guess a number:");
} while (guess < 1 || guess > 100); // Re-asks if invalid
```

---

## 📝 Practice Exercises

### Exercise 1: Sum Until Limit
```javascript
// Create a while loop that sums numbers until total >= 100
let sum = 0;
let num = 1;
while (sum < 100) {
    sum += num;
    num++;
}
console.log(`Sum is ${sum} after adding numbers 1-${num-1}`);
```

### Exercise 2: Count Down
```javascript
// Count from 10 to 1
let count = 10;
while (count > 0) {
    console.log(count);
    count--;
}
console.log("Blastoff!");
```

### Exercise 3: Validate Input
```javascript
let password = "";
while (password !== "secret123") {
    password = prompt("Enter password:");
}
console.log("Access granted!");
```

### Exercise 4: Find Average Grade
```javascript
// Keep asking for grades until user enters 0
let grade;
let sum = 0;
let count = 0;
while (true) {
    grade = parseInt(prompt("Enter grade (0 to quit):"));
    if (grade === 0) break;
    sum += grade;
    count++;
}
let average = sum / count;
console.log(`Average: ${average}`);
```

---

## 🎯 Key Takeaways

✅ **While loops repeat while a condition is true**
- Perfect for "keep doing until X happens"
- Used in games, validation, searching

✅ **Always update your condition variables**
- Prevents infinite loops
- Makes code predictable

✅ **Use meaningful condition names**
- `while (attempts > 0)` is clearer than `while (a > 0)`
- Makes code self-documenting

✅ **Track game state carefully**
- Know what's happening
- Make better decisions
- Display useful info

✅ **Provide user feedback**
- Hints help player improve
- Temperature shows progress
- Statistics show performance

✅ **Choose the right loop type**
- While: unknown iterations
- For: known iterations
- Do-While: execute at least once

---

## 📚 Resources

### MDN Documentation
- [While Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while)
- [Math Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math)
- [Conditional Statements](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)

### Related Concepts
- For loops (for known iterations)
- Do-While loops (execute first)
- Break/Continue statements
- Nested loops

---

## 💡 Next Steps

1. **Play the Game** - Get a feel for the mechanics
2. **Try Binary Search** - Implement the optimal strategy on Hard
3. **Modify the Game** - Change the range (1-50, 1-1000)
4. **Add Features** - Add sound effects, animations, scoring
5. **Create Similar Game** - Build Rock Paper Scissors using loops

---

## ✅ Learning Checklist

- [ ] Understand while loop structure
- [ ] Can write while loops without infinite loops
- [ ] Know when to use while vs for loops
- [ ] Understand random number generation
- [ ] Can use if/else for game logic
- [ ] Implement game state tracking
- [ ] Provide user feedback
- [ ] Handle game win/loss conditions
- [ ] Test code thoroughly
- [ ] Optimize with binary search

---

**Keep practicing! While loops are essential for every programmer! 🚀**
