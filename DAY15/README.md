# DAY15 - Virtual Core v1.0: State Machine System

## 🎮 Project Overview

**Virtual Core v1.0** is an advanced state machine system demonstrating secure authentication, modular architecture, and complex business logic for banking, shopping, and vault operations. This project showcases JavaScript fundamentals at an advanced level: state management, conditional logic, input validation, and event-driven programming.

### Learning Objectives
- ✅ Implement a complete state machine with multiple states and transitions
- ✅ Secure authentication system with attempt limiting and self-destruct mechanism
- ✅ Modular design patterns (IIFE - Immediately Invoked Function Expressions)
- ✅ Advanced conditional logic (if/else chains, switch statements, nested conditions)
- ✅ Input validation and error handling
- ✅ DOM manipulation and dynamic UI updates
- ✅ Event listener management and keyboard input handling
- ✅ Complex calculations (discounts, balances, pricing)

---

## 🏗️ System Architecture

### State Machine Flow

```
┌─────────────────────────────────────────────────┐
│  BOOT SEQUENCE                                   │
│  ├─ PIN Input (Master PIN: 9999)               │
│  ├─ 3 Attempt Limit                            │
│  └─ SYSTEM SELF-DESTRUCT on Failure            │
└──────────────────┬──────────────────────────────┘
                   │ (Authentication Success)
                   ▼
┌─────────────────────────────────────────────────┐
│  MAIN COMMAND KERNEL                            │
│  ├─ while(true) Loop (Conceptual)              │
│  ├─ Command Router (switch statement)           │
│  └─ Help System                                 │
└──────────────────┬──────────────────────────────┘
                   │
        ┌──────────┼──────────┬──────────┐
        ▼          ▼          ▼          ▼
    ┌────────┐ ┌──────┐ ┌────────┐ ┌─────────┐
    │ BANK   │ │SHOP  │ │ VAULT  │ │ SYSTEM  │
    │MODULE  │ │MODULE│ │MODULE  │ │SHUTDOWN │
    └────────┘ └──────┘ └────────┘ └─────────┘
```

---

## 📋 System Modules

### 1️⃣ Boot Sequence Module
**File**: `js/main.js` (Lines: BootSequence function)

**Features**:
- Master PIN validation: `9999`
- 3 authentication attempts maximum
- SYSTEM SELF-DESTRUCT message on failure
- ASCII welcome banner on success
- Attempt counter display

**Code Pattern**:
```javascript
const BootSequence = (function() {
    // Private variables, public methods
    return {
        checkPin: checkPin,
        onAuthSuccess: onAuthSuccess,
        onAuthFail: onAuthFail
    };
})();
```

### 2️⃣ Banking Kernel Module
**File**: `js/main.js` (Lines: BankModule function)

**Features**:
- Initial Balance: **$1,000.00**
- 4 Commands: `deposit`, `withdraw`, `balance`, `back`
- **Insufficient Funds Validation**: Cannot withdraw more than available balance
- **parseFloat() Support**: Handles decimal amounts (e.g., $50.25)
- Real-time balance updates

**Business Logic**:
```
Deposit:   balance += amount
Withdraw:  if (amount <= balance) { balance -= amount }
Balance:   Display current balance
Back:      Return to main menu
```

**Validation**:
```javascript
if (floatAmount > gameState.balance) {
    log('INSUFFICIENT FUNDS ERROR', 'error');
}
```

### 3️⃣ Smart Shop Module
**File**: `js/main.js` (Lines: ShopModule function)

**Features**:
- Unit Price: **$50 per item**
- Dynamic Discount Tiers (Nested if/else):
  - **0-5 items**: 0% discount
  - **6-10 items**: 10% discount
  - **11+ items**: 20% discount
- Automatic balance deduction on purchase
- Price calculation preview before checkout
- Insufficient funds validation

**Pricing Algorithm**:
```javascript
if (qty >= 0 && qty <= 5) {
    discount = 0;      // 0%
} else if (qty >= 6 && qty <= 10) {
    discount = 0.10;   // 10%
} else if (qty >= 11) {
    discount = 0.20;   // 20%
}

total = (qty * unitPrice) * (1 - discount);
```

**Purchase Flow**:
1. Enter quantity
2. Click "Calculate Price"
3. Review discount tier and total
4. Click "Purchase" to deduct from balance

### 4️⃣ Secure Vault Module
**File**: `js/main.js` (Lines: VaultModule function)

**Features**:
- Secret Word: `"password"` (case-insensitive)
- 1 Hint: "Think of something you use for security"
- Easter Egg Message revealed on correct guess
- Auto-return to main menu on wrong guess (3 second delay)
- Permanent unlock on success

**Vault Message**:
```
🔓 VAULT UNLOCKED
Secret message with classified data, admin PIN, and congratulations message
```

### 5️⃣ Command Kernel (Main Loop)
**File**: `js/main.js` (Lines: processCommand function)

**Commands**:
| Command | Action |
|---------|--------|
| `bank` | Open Banking Kernel module |
| `shop` | Open Smart Shop module |
| `vault` | Open Secure Vault module |
| `help` | Display command reference |
| `exit` / `quit` / `shutdown` | Graceful system shutdown |

**Routing Logic**:
```javascript
switch(cmd) {
    case 'bank': openModule('bank'); break;
    case 'shop': openModule('shop'); break;
    case 'vault': openModule('vault'); break;
    case 'help': displayHelp(); break;
    case 'exit': shutdownSystem(); break;
}
```

---

## 🎨 User Interface

### Visual Design
- **Theme**: Retro Terminal (Cyberpunk aesthetic)
- **Primary Color**: Neon Green `#00ff41`
- **Secondary Color**: Magenta `#ff00ff`
- **Accent Color**: Gold `#ffd700`
- **Error Color**: Red `#ff0000`
- **Font**: JetBrains Mono (monospace/retro)
- **Background**: Black with glow effects

### Layout Sections

1. **Boot Screen** (`#bootScreen`)
   - ASCII welcome banner
   - PIN input field
   - Attempt counter display (3/3)
   - Submit button with submit state tracking

2. **Main System** (`#mainSystem`)
   - Terminal Output Display: Shows all commands, responses, and logs
   - Command Input Section: `[V-CORE]>` prompt with input/execute button
   - Available Commands List: Quick reference guide
   - Module Containers: Hidden until activated

3. **Banking Module** (`#bankModule`)
   - Account Balance Display (large gold text)
   - 4 Command Buttons: Deposit, Withdraw, Balance, Back
   - Transaction Input Section: Hidden until command selected

4. **Shopping Module** (`#shopModule`)
   - Product Info Card: Unit price ($50 displayed)
   - Quantity Input: Number field for item count
   - Discount Tier Table: 3 rows showing ranges and discounts
   - Calculate/Purchase Buttons: For pricing and checkout

5. **Vault Module** (`#vaultModule`)
   - Lock Animation: Bouncing icon during locked state
   - Secret Word Input: Text field for guess
   - Hint Display: Visible to help users
   - Guess/Back Buttons: For interaction

### Responsive Design
- **Desktop** (1024px+): Full 3-column layout
- **Tablet** (768px-1023px): 2-column with stacked modules
- **Mobile** (below 768px): Single column, responsive font sizes

---

## 💾 File Structure

```
DAY15/
├── index.html          (500+ lines) - UI Structure
├── css/
│   └── styles.css      (800+ lines) - Styling & Animations
├── js/
│   └── main.js         (550+ lines) - State Machine Logic
├── README.md           (This file)
└── COMPLETION_SUMMARY.md
```

---

## 🚀 Quick Start Guide

### Step 1: Open the System
```bash
Open index.html in a web browser
```

### Step 2: Boot the System
```
Enter Master PIN: 9999
Press [Submit PIN] button or Enter key
Attempts: 3
```

### Step 3: Execute Commands
After successful authentication:
```
> bank        # Open banking module
> shop        # Open shopping module
> vault       # Open secure vault
> help        # Show all commands
> exit        # Shutdown system
```

### Step 4: Bank Module Example
```
> bank
[Bank module opens]
[Balance Display: $1000.00]

Click [Deposit]: Enter amount → $500 → [Confirm]
New Balance: $1500.00

Click [Withdraw]: Enter amount → $200 → [Confirm]
New Balance: $1300.00

Click [Balance]: Shows $1300.00
Click [Back]: Returns to main menu
```

### Step 5: Shop Module Example
```
> shop
[Shop module opens]
[Unit Price: $50]

Enter Quantity: 8
Click [Calculate Price]
[Discount Tier: 10%]
[Total: $360.00]

Click [Purchase]
[Auto-deducts $360.00 from balance]
New Balance: $940.00
```

### Step 6: Vault Module Example
```
> vault
[Vault module opens]
[Hint: Think of something you use for security]

Guess: password
[Unlocks! Shows secret message]
```

---

## 🔐 Security Features

### PIN Authentication
- Master PIN: `9999` (hardcoded for learning purposes)
- Attempt Limit: 3 failed attempts
- Self-Destruct: System becomes unusable after 3 failures
- Input Clearing: PIN field clears on each attempt

### Session Management
- `gameState.authenticated`: Boolean flag for auth status
- `gameState.systemRunning`: Boolean flag for active session
- Module Isolation: Only one module active at a time
- State Persistence: Balance tracked in global state object

### Input Validation
- PIN: Required, exact match only
- Bank Amount: Must be positive number, parsed with parseFloat()
- Shop Quantity: Must be positive integer
- Vault Guess: Case-insensitive comparison

### Error Handling
- Insufficient Funds: Cannot withdraw/purchase more than balance
- Invalid Input: User-friendly error messages
- Graceful Degradation: Invalid commands just show help

---

## 🧮 Advanced Concepts Demonstrated

### 1. State Machine Pattern
The system cycles through distinct states:
- Boot (PIN entry)
- Authenticated (Main menu)
- Module-Active (Bank/Shop/Vault)
- Shutdown

### 2. Module Pattern (IIFE)
Each major component uses Immediately Invoked Function Expressions:
```javascript
const BankModule = (function() {
    // Private scope - variables not accessible outside
    function privateHelper() { }
    
    // Public API
    return {
        handleCommand: handleCommand,
        processTransaction: processTransaction
    };
})();
```

### 3. Event-Driven Architecture
- Button Click Events: Commands, transactions, guesses
- Keyboard Events: Enter key for quick submission
- State Change Events: Module transitions, authentication

### 4. Conditional Logic Chains
```javascript
// if/else if chain (Discount tiers)
if (qty <= 5) { discount = 0; }
else if (qty <= 10) { discount = 0.10; }
else { discount = 0.20; }

// Switch statement (Command routing)
switch(cmd) {
    case 'bank': ... break;
    case 'shop': ... break;
    default: ...
}
```

### 5. DOM Manipulation
- `.style.display` for show/hide
- `.textContent`/`.innerHTML` for updates
- `.addEventListener()` for interactions
- `.focus()` for user experience

---

## 🎓 Learning Outcomes

After completing this project, students should understand:

✅ **State Management**: How systems transition between distinct states
✅ **Modular JavaScript**: Using IIFEs to create encapsulated modules
✅ **Form Handling**: Processing user input safely and validating data
✅ **Calculations**: Complex nested conditional logic and math operations
✅ **Visual Feedback**: Updating UI based on program state changes
✅ **Keyboard Navigation**: Handling Enter key for better UX
✅ **Error Messages**: Providing clear, color-coded feedback to users
✅ **Terminal Theme**: CSS variables, animations, and responsive design

---

## 🐛 Debugging Tips

### PIN Not Working?
- Check: Master PIN is exactly `9999`
- Try: Click in PIN field, clear, re-enter

### Balance Not Updating?
- Check: Transaction validation (console for errors)
- Try: Refresh browser (F5) and re-authenticate

### Discount Not Applied?
- Check: Quantity entered as number (not text)
- Verify: Correct tier (0-5: 0%, 6-10: 10%, 11+: 20%)

### Vault Won't Unlock?
- Hint: The secret word is common security term
- Try: "password" (case-insensitive, so PASSWORD works too)

### Commands Not Responding?
- Check: System is authenticated (boot screen closed)
- Try: Type 'help' to verify commands are working

---

## 📊 Project Statistics

| Metric | Count |
|--------|-------|
| HTML Lines | 500+ |
| CSS Lines | 800+ |
| JavaScript Lines | 550+ |
| Total Project Size | 1,850+ lines |
| Modules | 6 (Boot, Bank, Shop, Vault, Kernel, UI) |
| Commands | 5 main, 4 bank, 1 vault |
| CSS Animations | 8+ |
| Event Listeners | 15+ |
| Validation Rules | 10+ |

---

## 🎯 Success Criteria Met

✅ STEP 1: Boot sequence with Master PIN 9999, 3 attempts, SYSTEM SELF-DESTRUCT, ASCII banner
✅ STEP 2: Command Kernel with while(true) conceptual loop, switch routing, bank/shop/vault/exit commands
✅ STEP 3: Banking Kernel with $1000 balance, deposit/withdraw/balance/back, insufficient funds validation
✅ STEP 4: Smart Shop with quantity input, nested if/else discount tiers, $50 unit price, auto-deduct
✅ STEP 5: Secure Vault with secret word guess, 1 hint, reveal message on success

---

## 🎉 Conclusion

Virtual Core v1.0 represents a significant milestone in JavaScript proficiency. This project combines HTML/CSS knowledge with advanced JavaScript patterns, demonstrating professional-level state management and user interaction design. The system is fully functional, secure (for educational purposes), and extensible for future enhancements.

**Happy Coding! 💻**
