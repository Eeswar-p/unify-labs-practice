// ============================================
// DAY18 - Virtual Pet Simulator
// JavaScript Classes, Getters & Setters
// ============================================

// ============================================
// Pet Class Definition
// ============================================
class Pet {
    // Constructor: Initialize pet with name, type, and health
    constructor(name, type) {
        this.name = name;
        this.type = type;
        this._health = 100; // Private property (by convention)
        this.id = Date.now(); // Unique identifier
    }

    // Getter: Access health value
    get health() {
        return this._health;
    }

    // Setter: Validate and set health (0-100 range)
    set health(value) {
        if (value > 100) {
            this._health = 100;
        } else if (value < 0) {
            this._health = 0;
        } else {
            this._health = value;
        }
    }

    // Method: Feed the pet (increases health by 10)
    feed() {
        const oldHealth = this.health;
        this.health += 10; // Uses setter for validation
        const newHealth = this.health;
        
        if (oldHealth === 100) {
            return `${this.name} is already at full health!`;
        } else if (newHealth === 100) {
            return `${this.name} has been fed and is now at full health! 🍖`;
        } else {
            return `${this.name} has been fed! Health increased from ${oldHealth} to ${newHealth} 🍖`;
        }
    }

    // Method: Play with the pet (decreases health by 15)
    play() {
        const oldHealth = this.health;
        this.health -= 15; // Uses setter for validation
        const newHealth = this.health;
        
        if (newHealth === 0) {
            return `${this.name} is exhausted and needs rest! Health dropped to 0 😴`;
        } else if (newHealth <= 20) {
            return `${this.name} is tired! Health decreased from ${oldHealth} to ${newHealth} ⚠️`;
        } else {
            return `${this.name} had fun playing! Health decreased from ${oldHealth} to ${newHealth} 🎾`;
        }
    }

    // Method: Get status string
    getStatus() {
        const healthStatus = this._getHealthStatus();
        return `${this.name} (${this.type})\nHealth: ${this.health}/100 ${healthStatus}`;
    }

    // Private helper method to get health status emoji
    _getHealthStatus() {
        if (this.health >= 80) return '💚 Excellent';
        if (this.health >= 50) return '💛 Good';
        if (this.health >= 20) return '🧡 Fair';
        return '❤️ Critical';
    }

    // Get health level for UI styling
    getHealthLevel() {
        if (this.health >= 70) return 'high';
        if (this.health >= 40) return 'medium';
        if (this.health >= 20) return 'low';
        return 'critical';
    }
}

// ============================================
// Global State
// ============================================
const pets = [];
let activityLog = [];

// ============================================
// DOM Elements
// ============================================
const petNameInput = document.getElementById('petName');
const petTypeSelect = document.getElementById('petType');
const createPetBtn = document.getElementById('createPetBtn');
const petsContainer = document.getElementById('petsContainer');
const noPetsMessage = document.getElementById('noPetsMessage');
const activityLogContainer = document.getElementById('activityLog');
const clearLogBtn = document.getElementById('clearLogBtn');

// ============================================
// Logging Functions
// ============================================
function logActivity(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = {
        time: timestamp,
        message: message,
        type: type
    };
    
    activityLog.unshift(logEntry); // Add to beginning
    
    // Keep only last 50 entries
    if (activityLog.length > 50) {
        activityLog = activityLog.slice(0, 50);
    }
    
    renderActivityLog();
}

function renderActivityLog() {
    activityLogContainer.innerHTML = activityLog.map(entry => `
        <div class="log-entry log-${entry.type}">
            <span class="log-time">[${entry.time}]</span>
            <span class="log-message">${entry.message}</span>
        </div>
    `).join('');
}

// ============================================
// Pet Creation
// ============================================
createPetBtn.addEventListener('click', () => {
    const name = petNameInput.value.trim();
    const type = petTypeSelect.value;
    
    // Validation
    if (name === '') {
        alert('Please enter a pet name');
        logActivity('Failed to create pet: No name provided', 'error');
        return;
    }
    
    if (type === '') {
        alert('Please select a pet type');
        logActivity('Failed to create pet: No type selected', 'error');
        return;
    }
    
    // Create new pet using Pet class
    const newPet = new Pet(name, type);
    pets.push(newPet);
    
    // Clear inputs
    petNameInput.value = '';
    petTypeSelect.value = '';
    
    // Log activity
    logActivity(`Created new pet: ${name} (${type})`, 'create');
    logActivity(`${name} starts with ${newPet.health}/100 health`, 'success');
    
    // Render
    renderPets();
});

// ============================================
// Pet Rendering
// ============================================
function renderPets() {
    // Toggle empty message
    if (pets.length === 0) {
        noPetsMessage.style.display = 'block';
        petsContainer.innerHTML = '';
        return;
    }
    
    noPetsMessage.style.display = 'none';
    
    petsContainer.innerHTML = pets.map(pet => {
        const healthLevel = pet.getHealthLevel();
        const emoji = pet.type.split(' ')[0]; // Extract emoji from type
        
        return `
            <div class="pet-card" data-pet-id="${pet.id}">
                <div class="pet-header">
                    <div class="pet-avatar">${emoji}</div>
                    <div class="pet-info">
                        <h3 class="pet-name">${pet.name}</h3>
                        <p class="pet-type">${pet.type}</p>
                    </div>
                </div>
                
                <div class="pet-health">
                    <div class="health-label">
                        <span>Health</span>
                        <span class="health-value">${pet.health}/100</span>
                    </div>
                    <div class="health-bar">
                        <div class="health-fill health-${healthLevel}" style="width: ${pet.health}%">
                            ${pet.health}%
                        </div>
                    </div>
                </div>
                
                <div class="pet-actions">
                    <button class="btn btn-feed" onclick="feedPet(${pet.id})">
                        <span class="btn-icon">🍖</span>
                        Feed
                    </button>
                    <button class="btn btn-play" onclick="playWithPet(${pet.id})">
                        <span class="btn-icon">🎾</span>
                        Play
                    </button>
                    <button class="btn btn-status" onclick="showPetStatus(${pet.id})">
                        <span class="btn-icon">📊</span>
                        Status
                    </button>
                    <button class="btn btn-remove" onclick="removePet(${pet.id})">
                        <span class="btn-icon">❌</span>
                        Remove
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// ============================================
// Pet Interactions
// ============================================

// Feed pet
window.feedPet = function(petId) {
    const pet = pets.find(p => p.id === petId);
    if (!pet) return;
    
    const message = pet.feed();
    logActivity(message, 'success');
    
    renderPets();
};

// Play with pet
window.playWithPet = function(petId) {
    const pet = pets.find(p => p.id === petId);
    if (!pet) return;
    
    const message = pet.play();
    
    if (pet.health === 0) {
        logActivity(message, 'error');
    } else if (pet.health <= 20) {
        logActivity(message, 'warning');
    } else {
        logActivity(message, 'info');
    }
    
    renderPets();
};

// Show pet status
window.showPetStatus = function(petId) {
    const pet = pets.find(p => p.id === petId);
    if (!pet) return;
    
    const status = pet.getStatus();
    logActivity(`Status check: ${status.replace('\n', ' | ')}`, 'info');
    
    // Show in alert as well
    alert(status);
};

// Remove pet
window.removePet = function(petId) {
    const pet = pets.find(p => p.id === petId);
    if (!pet) return;
    
    if (!confirm(`Are you sure you want to remove ${pet.name}?`)) {
        return;
    }
    
    const index = pets.findIndex(p => p.id === petId);
    pets.splice(index, 1);
    
    logActivity(`${pet.name} has been removed`, 'warning');
    
    renderPets();
};

// ============================================
// Clear Activity Log
// ============================================
clearLogBtn.addEventListener('click', () => {
    if (!confirm('Are you sure you want to clear the activity log?')) {
        return;
    }
    
    activityLog = [];
    activityLogContainer.innerHTML = `
        <div class="log-entry log-info">
            <span class="log-time">[SYSTEM]</span>
            <span class="log-message">Activity log cleared.</span>
        </div>
    `;
    
    logActivity('Activity log cleared', 'info');
});

// ============================================
// Keyboard Shortcuts
// ============================================
petNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        createPetBtn.click();
    }
});

// ============================================
// Demo: Create sample pets
// ============================================
function createDemoPets() {
    const demoPets = [
        { name: 'Buddy', type: '🐶 Dog' },
        { name: 'Whiskers', type: '🐱 Cat' },
        { name: 'Fluffy', type: '🐰 Rabbit' }
    ];
    
    demoPets.forEach(petData => {
        const pet = new Pet(petData.name, petData.type);
        pet.health = Math.floor(Math.random() * 70) + 30; // Random health 30-100
        pets.push(pet);
        logActivity(`Demo pet created: ${petData.name} (${petData.type}) with ${pet.health}/100 health`, 'create');
    });
    
    renderPets();
}

// ============================================
// Console Examples
// ============================================
function showConsoleExamples() {
    console.log('%c=== Pet Class Examples ===', 'color: #ec4899; font-size: 16px; font-weight: bold;');
    
    // Create a pet
    const examplePet = new Pet('Example', '🐶 Dog');
    console.log('\n%c1. Create a pet:', 'color: #10b981; font-weight: bold;');
    console.log('const pet = new Pet("Example", "🐶 Dog");');
    console.log('Pet created:', examplePet);
    
    // Use getter
    console.log('\n%c2. Get health (using getter):', 'color: #3b82f6; font-weight: bold;');
    console.log('console.log(pet.health); // No parentheses!');
    console.log('Health:', examplePet.health);
    
    // Use setter
    console.log('\n%c3. Set health (using setter):', 'color: #10b981; font-weight: bold;');
    console.log('pet.health = 150; // Will be clamped to 100');
    examplePet.health = 150;
    console.log('Health after setting to 150:', examplePet.health);
    
    console.log('pet.health = -20; // Will be clamped to 0');
    examplePet.health = -20;
    console.log('Health after setting to -20:', examplePet.health);
    
    // Reset for next examples
    examplePet.health = 50;
    
    // Feed method
    console.log('\n%c4. Feed the pet:', 'color: #10b981; font-weight: bold;');
    console.log('pet.feed();');
    console.log('Result:', examplePet.feed());
    console.log('New health:', examplePet.health);
    
    // Play method
    console.log('\n%c5. Play with pet:', 'color: #f97316; font-weight: bold;');
    console.log('pet.play();');
    console.log('Result:', examplePet.play());
    console.log('New health:', examplePet.health);
    
    // Get status
    console.log('\n%c6. Get status:', 'color: #3b82f6; font-weight: bold;');
    console.log('pet.getStatus();');
    console.log(examplePet.getStatus());
    
    console.log('\n%c=== Try it yourself! ===', 'color: #ec4899; font-size: 14px; font-weight: bold;');
    console.log('Create your own pet: const myPet = new Pet("Name", "🐶 Dog");');
    console.log('Then try: myPet.feed(), myPet.play(), myPet.getStatus()');
}

// ============================================
// Initialize
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🐾 Virtual Pet Simulator Initialized');
    console.log('📚 Learning: JavaScript Classes, Getters & Setters');
    
    // Show examples in console
    showConsoleExamples();
    
    // Initial render
    renderPets();
    
    // Add demo button info
    console.log('\n%cDemo Function Available:', 'color: #8b5cf6; font-weight: bold;');
    console.log('Type: createDemoPets() to create 3 sample pets');
    
    // Make Pet class available globally for testing
    window.Pet = Pet;
    console.log('\n%cPet class is available globally!', 'color: #10b981; font-weight: bold;');
    console.log('Try: const myPet = new Pet("Buddy", "🐶 Dog");');
});
