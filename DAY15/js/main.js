// ============================================
// DAY15 - Virtual Core v1.0 System
// State Machine & Advanced Logic
// ============================================

// ============================================
// Global State Machine
// ============================================

const SYSTEM = {
    MASTER_PIN: '9999',
    UNIT_PRICE: 50,
    VAULT_SECRET: 'password',
    VAULT_HINT: 'Think of something you use for security',
    VAULT_MESSAGE: `
        ╔════════════════════════════════════════╗
        ║     🔓 VAULT UNLOCKED 🔓              ║
        ║                                        ║
        ║  SECRET MESSAGE REVEALED:              ║
        ║  "Success! You've infiltrated the      ║
        ║   core systems. Hidden data found:     ║
        ║   https://secret-archive.virtual/      ║
        ║   PIN: 4829 | User: alpha-7"           ║
        ║                                        ║
        ║  Easter Egg: You are now a system      ║
        ║  administrator. Proceed with caution!  ║
        ╚════════════════════════════════════════╝
    `
};

// Global Game State
let gameState = {
    authenticated: false,
    pinAttempts: 3,
    systemRunning: false,
    currentModule: null,
    balance: 1000,
    bankCommand: null,
    bankAmount: null,
    shopQuantity: null,
    shopCalculated: false,
    shopTotal: null
};

// ============================================
// Utility Functions
// ============================================

function log(message, type = 'info') {
    const terminal = document.getElementById('terminalOutput');
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    
    const timestamp = new Date().toLocaleTimeString();
    entry.innerHTML = `<span class="log-timestamp">[${timestamp}]</span>${message}`;
    
    terminal.appendChild(entry);
    terminal.scrollTop = terminal.scrollHeight;
}

function clearTerminal() {
    const terminal = document.getElementById('terminalOutput');
    terminal.innerHTML = '';
}

function updateBalance() {
    const balanceDisplay = document.getElementById('balanceDisplay');
    const bankBalance = document.getElementById('bankBalance');
    const formatted = `$${gameState.balance.toFixed(2)}`;
    
    if (balanceDisplay) balanceDisplay.textContent = formatted;
    if (bankBalance) bankBalance.textContent = formatted;
}

function parseInput(input) {
    return input.trim().toLowerCase();
}

// ============================================
// Boot Sequence Module
// ============================================

const BootSequence = (function() {
    function displayBoot() {
        const banner = `
  ╔═══════════════════════════════════════╗
  ║    VIRTUAL CORE v1.0 - INITIALIZING  ║
  ║    System Locked - Authorization      ║
  ║    Required                           ║
  ╚═══════════════════════════════════════╝
        `;
        
        document.getElementById('welcomeBanner').textContent = banner;
    }

    function checkPin(pin) {
        if (pin === SYSTEM.MASTER_PIN) {
            return { success: true };
        } else {
            gameState.pinAttempts--;
            return { 
                success: false, 
                attemptsLeft: gameState.pinAttempts 
            };
        }
    }

    function onAuthSuccess() {
        gameState.authenticated = true;
        gameState.systemRunning = true;
        
        const bootScreen = document.getElementById('bootScreen');
        const mainSystem = document.getElementById('mainSystem');
        
        bootScreen.classList.remove('active');
        mainSystem.style.display = 'flex';
        document.querySelector('.footer').style.display = 'block';
        
        displayWelcomeBanner();
        initializeMainLoop();
        
        document.getElementById('commandInput').disabled = false;
        document.getElementById('executeBtn').disabled = false;
        document.getElementById('commandInput').focus();
        
        log('System initialized and ready for commands', 'success');
    }

    function onAuthFail() {
        if (gameState.pinAttempts <= 0) {
            const errorBox = document.getElementById('pinError');
            errorBox.textContent = `
                ⚠️ SYSTEM SELF-DESTRUCT INITIATED ⚠️
                3 failed authentication attempts detected.
                Terminating all processes...
            `;
            errorBox.style.display = 'block';
            errorBox.style.color = '#ff0000';
            
            log('SYSTEM SELF-DESTRUCT: 3 failed PIN attempts', 'error');
            log('All processes terminated. System offline.', 'error');
            
            // Disable everything
            document.getElementById('submitPinBtn').disabled = true;
            document.getElementById('pinInput').disabled = true;
            
            return false;
        }
        return true;
    }

    return {
        checkPin: checkPin,
        onAuthSuccess: onAuthSuccess,
        onAuthFail: onAuthFail,
        displayBoot: displayBoot
    };
})();

// ============================================
// Bank Module
// ============================================

const BankModule = (function() {
    function handleCommand(command) {
        const cmd = parseInput(command);
        
        if (cmd === 'balance') {
            const balance = gameState.balance.toFixed(2);
            log(`💰 Current Balance: $${balance}`, 'success');
            return;
        }
        
        if (cmd === 'deposit') {
            gameState.bankCommand = 'deposit';
            showBankInput();
            log('💵 Enter amount to deposit:', 'info');
            return;
        }
        
        if (cmd === 'withdraw') {
            gameState.bankCommand = 'withdraw';
            showBankInput();
            log('🏧 Enter amount to withdraw:', 'info');
            return;
        }
        
        if (cmd === 'back') {
            closeBankModule();
            return;
        }
        
        log(`Unknown banking command: ${command}`, 'error');
    }

    function processTransaction(amount) {
        if (isNaN(amount) || amount <= 0) {
            log('❌ Invalid amount. Must be a positive number', 'error');
            return;
        }

        const floatAmount = parseFloat(amount);

        if (gameState.bankCommand === 'deposit') {
            gameState.balance += floatAmount;
            updateBalance();
            log(`✅ Deposit successful: +$${floatAmount.toFixed(2)}`, 'success');
            log(`📊 New Balance: $${gameState.balance.toFixed(2)}`, 'success');
        } 
        else if (gameState.bankCommand === 'withdraw') {
            // Check: cannot withdraw more than balance
            if (floatAmount > gameState.balance) {
                log(`❌ INSUFFICIENT FUNDS ERROR`, 'error');
                log(`Available: $${gameState.balance.toFixed(2)} | Requested: $${floatAmount.toFixed(2)}`, 'error');
                return;
            }
            
            gameState.balance -= floatAmount;
            updateBalance();
            log(`✅ Withdrawal successful: -$${floatAmount.toFixed(2)}`, 'success');
            log(`📊 New Balance: $${gameState.balance.toFixed(2)}`, 'success');
        }

        hideBankInput();
        gameState.bankAmount = null;
        gameState.bankCommand = null;
    }

    function showBankInput() {
        document.getElementById('bankInput').style.display = 'block';
        document.getElementById('bankAmount').focus();
    }

    function hideBankInput() {
        document.getElementById('bankInput').style.display = 'none';
        document.getElementById('bankAmount').value = '';
    }

    return {
        handleCommand: handleCommand,
        processTransaction: processTransaction
    };
})();

// ============================================
// Shop Module
// ============================================

const ShopModule = (function() {
    function calculatePrice(quantity) {
        const qty = parseInt(quantity);

        // Validate quantity
        if (isNaN(qty) || qty <= 0) {
            log('❌ Invalid quantity. Must be a positive integer', 'error');
            return null;
        }

        const unitPrice = SYSTEM.UNIT_PRICE;
        let discount = 0;
        let discountPercent = 0;

        // Nested if/else if for discount tiers
        if (qty >= 0 && qty <= 5) {
            discount = 0;
            discountPercent = '0%';
        } 
        else if (qty >= 6 && qty <= 10) {
            discount = 0.10;
            discountPercent = '10%';
        } 
        else if (qty >= 11) {
            discount = 0.20;
            discountPercent = '20%';
        }

        const subtotal = qty * unitPrice;
        const discountAmount = subtotal * discount;
        const total = subtotal - discountAmount;

        const result = {
            quantity: qty,
            unitPrice: unitPrice,
            subtotal: subtotal,
            discount: discountAmount,
            discountPercent: discountPercent,
            total: total
        };

        return result;
    }

    function displayPrice(priceData) {
        const resultDiv = document.getElementById('shopResult');
        
        const html = `
            <div class="result-title">✅ Price Calculated</div>
            <div class="result-content">
                <p><strong>Quantity:</strong> ${priceData.quantity} items</p>
                <p><strong>Unit Price:</strong> $${priceData.unitPrice.toFixed(2)}</p>
                <p><strong>Subtotal:</strong> $${priceData.subtotal.toFixed(2)}</p>
                <p><strong>Discount Tier:</strong> ${priceData.discountPercent}</p>
                <p><strong>Discount Amount:</strong> -$${priceData.discount.toFixed(2)}</p>
                <p style="border-top: 1px solid #00ff41; margin-top: 0.5rem; padding-top: 0.5rem;">
                    <strong style="font-size: 1.1rem; color: #ffd700;">TOTAL: $${priceData.total.toFixed(2)}</strong>
                </p>
            </div>
        `;
        
        resultDiv.innerHTML = html;
        resultDiv.style.display = 'block';

        // Show purchase button
        document.getElementById('purchaseBtn').style.display = 'inline-block';
        
        gameState.shopCalculated = true;
        gameState.shopTotal = priceData.total;
        gameState.shopQuantity = priceData.quantity;

        log(`📊 Price calculated: ${priceData.quantity} items @ $${priceData.total.toFixed(2)}`, 'info');
    }

    function processPurchase() {
        if (!gameState.shopCalculated || gameState.shopTotal === null) {
            log('❌ Please calculate price first', 'error');
            return;
        }

        const totalCost = gameState.shopTotal;

        // Check: cannot buy if insufficient balance
        if (totalCost > gameState.balance) {
            log(`❌ INSUFFICIENT FUNDS ERROR`, 'error');
            log(`Balance: $${gameState.balance.toFixed(2)} | Total Cost: $${totalCost.toFixed(2)}`, 'error');
            return;
        }

        gameState.balance -= totalCost;
        updateBalance();

        log(`✅ Purchase successful!`, 'success');
        log(`📦 Purchased ${gameState.shopQuantity} items for $${totalCost.toFixed(2)}`, 'success');
        log(`💰 Remaining Balance: $${gameState.balance.toFixed(2)}`, 'success');

        resetShop();
    }

    function resetShop() {
        document.getElementById('quantityInput').value = '';
        document.getElementById('shopResult').style.display = 'none';
        document.getElementById('purchaseBtn').style.display = 'none';
        gameState.shopCalculated = false;
        gameState.shopTotal = null;
        gameState.shopQuantity = null;
    }

    return {
        calculatePrice: calculatePrice,
        displayPrice: displayPrice,
        processPurchase: processPurchase,
        resetShop: resetShop
    };
})();

// ============================================
// Vault Module
// ============================================

const VaultModule = (function() {
    function checkGuess(guess) {
        const userGuess = parseInput(guess);
        const secretWord = parseInput(SYSTEM.VAULT_SECRET);

        const resultDiv = document.getElementById('vaultResult');

        if (userGuess === secretWord) {
            const html = `
                ${SYSTEM.VAULT_MESSAGE}
                <div class="secret-revealed">
                    <h4>🎉 You've unlocked the vault!</h4>
                    <p>Congratulations! You've successfully infiltrated the secure vault and accessed classified information.</p>
                </div>
            `;
            
            resultDiv.innerHTML = html;
            resultDiv.style.display = 'block';

            log(`🔓 VAULT UNLOCKED! Secret word guessed correctly: "${secretWord}"`, 'success');
            log('📜 Secret message revealed!', 'success');

            document.getElementById('vaultGuess').disabled = true;
            document.getElementById('vaultGuessBtn').disabled = true;

            return true;
        } else {
            const html = `
                <div class="result-title" style="color: #ff0000;">❌ Incorrect Guess</div>
                <div class="result-content">
                    <p>That's not the secret word. Vault remains locked.</p>
                    <p>Hint: ${SYSTEM.VAULT_HINT}</p>
                </div>
            `;
            
            resultDiv.innerHTML = html;
            resultDiv.style.display = 'block';

            log(`❌ Incorrect vault guess: "${userGuess}"`, 'error');
            log(`Returning to main menu...`, 'info');

            setTimeout(() => {
                closeVaultModule();
            }, 3000);

            return false;
        }
    }

    function resetVault() {
        document.getElementById('vaultGuess').value = '';
        document.getElementById('vaultGuess').disabled = false;
        document.getElementById('vaultGuessBtn').disabled = false;
        document.getElementById('vaultResult').style.display = 'none';
    }

    return {
        checkGuess: checkGuess,
        resetVault: resetVault
    };
})();

// ============================================
// Module Management
// ============================================

function openModule(moduleName) {
    const moduleId = `${moduleName}Module`;
    
    // Hide other modules
    document.getElementById('bankModule').style.display = 'none';
    document.getElementById('shopModule').style.display = 'none';
    document.getElementById('vaultModule').style.display = 'none';

    // Show selected module
    document.getElementById(moduleId).style.display = 'block';
    gameState.currentModule = moduleName;

    log(`▶️ Opened ${moduleName.toUpperCase()} module`, 'info');
}

function closeBankModule() {
    document.getElementById('bankModule').style.display = 'none';
    document.getElementById('bankInput').style.display = 'none';
    document.getElementById('bankResult').style.display = 'none';
    gameState.currentModule = null;
    
    log(`⏹️ Closed BANK module`, 'info');
}

function closeShopModule() {
    ShopModule.resetShop();
    document.getElementById('shopModule').style.display = 'none';
    gameState.currentModule = null;
    
    log(`⏹️ Closed SHOP module`, 'info');
}

function closeVaultModule() {
    VaultModule.resetVault();
    document.getElementById('vaultModule').style.display = 'none';
    gameState.currentModule = null;
    
    log(`⏹️ Closed VAULT module`, 'info');
}

// ============================================
// Command Kernel (Main Loop)
// ============================================

function displayWelcomeBanner() {
    const banner = `
  ╔═══════════════════════════════════════╗
  ║     WELCOME TO VIRTUAL CORE v1.0     ║
  ║     System Boot Complete              ║
  ║     Ready for Commands                ║
  ║     Type 'help' for assistance        ║
  ╚═══════════════════════════════════════╝
    `;
    
    document.getElementById('welcomeBanner').textContent = banner;
    log('✅ VIRTUAL CORE v1.0 System Online', 'success');
    log('System ready - Awaiting commands', 'info');
}

function processCommand(command) {
    const cmd = parseInput(command);

    // Route commands based on current module
    if (gameState.currentModule === 'bank') {
        BankModule.handleCommand(cmd);
        return;
    }

    if (gameState.currentModule === 'shop') {
        // Shop doesn't have text commands, uses buttons
        log('Use the interface buttons to purchase', 'info');
        return;
    }

    if (gameState.currentModule === 'vault') {
        // Vault uses guess button
        log('Use the input field to guess the secret word', 'info');
        return;
    }

    // Main menu commands
    switch(cmd) {
        case 'bank':
            openModule('bank');
            log('💰 BANKING KERNEL: deposit, withdraw, balance, back', 'info');
            break;

        case 'shop':
            openModule('shop');
            log('🛍️ SMART SHOP: Enter quantity and calculate price', 'info');
            break;

        case 'vault':
            openModule('vault');
            log('🔐 SECURE VAULT: Guess the secret word', 'info');
            break;

        case 'help':
            displayHelp();
            break;

        case 'exit':
        case 'quit':
        case 'shutdown':
            shutdownSystem();
            break;

        case '':
            // Empty command - ignore
            break;

        default:
            log(`❓ Unknown command: "${command}" | Type 'help' for available commands`, 'warning');
    }
}

function displayHelp() {
    log('═══════════════════════════════════════════════', 'info');
    log('📖 VIRTUAL CORE COMMAND REFERENCE', 'info');
    log('═══════════════════════════════════════════════', 'info');
    log('▸ bank   - Access banking module', 'info');
    log('▸ shop   - Access shopping module', 'info');
    log('▸ vault  - Access secure vault', 'info');
    log('▸ help   - Show this help menu', 'info');
    log('▸ exit   - Shutdown system', 'info');
    log('═══════════════════════════════════════════════', 'info');
}

function shutdownSystem() {
    log('🔴 SYSTEM SHUTDOWN INITIATED', 'warning');
    log('▸ Closing all connections...', 'warning');
    log('▸ Clearing memory...', 'warning');
    log('▸ Powering down...', 'warning');
    
    setTimeout(() => {
        log('⚫ SYSTEM OFFLINE', 'error');
        document.getElementById('commandInput').disabled = true;
        document.getElementById('executeBtn').disabled = true;
        document.getElementById('commandInput').value = '';
        document.getElementById('statusIndicator').textContent = '● OFFLINE';
        gameState.systemRunning = false;
    }, 1000);
}

function initializeMainLoop() {
    // Event listeners are set up separately
}

// ============================================
// Event Listeners
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('%c🎮 DAY15 - Virtual Core v1.0 Loaded!', 'color: #00ff41; font-weight: bold; font-size: 14px;');
    
    BootSequence.displayBoot();

    // PIN Login
    document.getElementById('submitPinBtn').addEventListener('click', function() {
        const pin = document.getElementById('pinInput').value;
        
        if (!pin) {
            alert('Please enter PIN');
            return;
        }

        const result = BootSequence.checkPin(pin);

        if (result.success) {
            BootSequence.onAuthSuccess();
        } else {
            if (!BootSequence.onAuthFail()) {
                return; // System self-destruct
            }
            
            document.getElementById('pinInput').value = '';
            document.getElementById('attemptsLeft').textContent = gameState.pinAttempts;
            log(`❌ Invalid PIN. Attempts remaining: ${gameState.pinAttempts}`, 'error');
        }
    });

    // PIN input - Enter key
    document.getElementById('pinInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('submitPinBtn').click();
        }
    });

    // Command Input
    document.getElementById('executeBtn').addEventListener('click', function() {
        const command = document.getElementById('commandInput').value;
        
        if (!command.trim()) {
            return;
        }

        log(`> ${command}`, 'info');
        processCommand(command);
        document.getElementById('commandInput').value = '';
    });

    // Command input - Enter key
    document.getElementById('commandInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('executeBtn').click();
        }
    });

    // Clear Terminal
    document.getElementById('clearTerminal').addEventListener('click', function() {
        clearTerminal();
        log('Terminal cleared', 'info');
    });

    // Bank Module - Commands
    document.querySelectorAll('.bank-cmd').forEach(btn => {
        btn.addEventListener('click', function() {
            const cmd = this.dataset.cmd;
            processCommand(cmd);
        });
    });

    // Bank Module - Transaction
    document.getElementById('bankActionBtn').addEventListener('click', function() {
        const amount = document.getElementById('bankAmount').value;
        BankModule.processTransaction(amount);
    });

    document.getElementById('bankCancelBtn').addEventListener('click', function() {
        BankModule.hideBankInput();
    });

    // Bank Module - Close
    document.querySelector('[data-module="bank"]').addEventListener('click', function() {
        closeBankModule();
    });

    // Shop Module - Calculate
    document.getElementById('calculateBtn').addEventListener('click', function() {
        const quantity = document.getElementById('quantityInput').value;
        const priceData = ShopModule.calculatePrice(quantity);
        
        if (priceData) {
            ShopModule.displayPrice(priceData);
        }
    });

    // Shop Module - Purchase
    document.getElementById('purchaseBtn').addEventListener('click', function() {
        ShopModule.processPurchase();
    });

    // Shop Module - Close
    document.getElementById('shopCancelBtn').addEventListener('click', function() {
        closeShopModule();
    });

    document.querySelector('[data-module="shop"]').addEventListener('click', function() {
        closeShopModule();
    });

    // Vault Module - Guess
    document.getElementById('vaultGuessBtn').addEventListener('click', function() {
        const guess = document.getElementById('vaultGuess').value;
        
        if (!guess) {
            log('❌ Please enter a guess', 'error');
            return;
        }

        VaultModule.checkGuess(guess);
    });

    document.getElementById('vaultGuess').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('vaultGuessBtn').click();
        }
    });

    // Vault Module - Back
    document.getElementById('vaultBackBtn').addEventListener('click', function() {
        closeVaultModule();
    });

    document.querySelector('[data-module="vault"]').addEventListener('click', function() {
        closeVaultModule();
    });

    // Initial message
    log('🔐 System In Boot Mode - Awaiting Authorization', 'warning');
    log('💡 Hint: Enter PIN 9999 to start the system', 'info');

    console.log('%c📚 State Machine Concepts:', 'color: #00ff41; font-weight: bold;');
    console.log('%cBoot → Authenticated → Menu → Module → Boot', 'color: #ffd700;');
    console.log('%c🔒 Security Layers:', 'color: #00ff41; font-weight: bold;');
    console.log('%cPIN auth (3 attempts) → Session state → Module validation', 'color: #ffd700;');
});

// Log educational content after delay
setTimeout(() => {
    console.log('%c═══════════════════════════════════════', 'color: #00ff41;');
    console.log('%c🏗️ SYSTEM ARCHITECTURE:', 'color: #00ff41; font-weight: bold;');
    console.log('%c═══════════════════════════════════════', 'color: #00ff41;');
    console.log('%cState Machine Pattern:', 'color: #ffd700; font-weight: bold;');
    console.log('├─ Boot State: PIN verification', 'color: #cbd5e1;');
    console.log('├─ Menu State: Command input', 'color: #cbd5e1;');
    console.log('├─ Bank Module: Transactions', 'color: #cbd5e1;');
    console.log('├─ Shop Module: Purchases', 'color: #cbd5e1;');
    console.log('├─ Vault Module: Secret word', 'color: #cbd5e1;');
    console.log('└─ Shutdown State: System offline', 'color: #cbd5e1;');
}, 2000);
