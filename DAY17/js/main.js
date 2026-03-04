// ============================================
// DAY17 - Array Methods: map(), filter(), reduce()
// JavaScript Implementation
// ============================================

// ============================================
// Global Data Arrays
// ============================================
const tasks = [];
const products = [];
const expenses = [];

// ============================================
// Task Manager - filter() Method
// ============================================

// Add task
document.getElementById('addTaskBtn').addEventListener('click', () => {
    const taskNameInput = document.getElementById('taskName');
    const taskStatusSelect = document.getElementById('taskStatus');
    
    const taskName = taskNameInput.value.trim();
    const taskStatus = taskStatusSelect.value;
    
    if (taskName === '') {
        alert('Please enter a task name');
        return;
    }
    
    const task = {
        id: Date.now(),
        name: taskName,
        status: taskStatus
    };
    
    tasks.push(task);
    taskNameInput.value = '';
    
    displayAllTasks();
    updateTaskStats();
});

// Display all tasks
function displayAllTasks() {
    const taskList = document.getElementById('taskList');
    
    if (tasks.length === 0) {
        taskList.innerHTML = '<div class="empty-state">No tasks added yet. Add a task to get started!</div>';
        return;
    }
    
    taskList.innerHTML = tasks.map(task => `
        <div class="data-item">
            <span class="item-label">${task.name}</span>
            <span class="item-status status-${task.status}">${task.status}</span>
        </div>
    `).join('');
}

// Filter completed tasks - Using filter()
document.getElementById('filterCompletedBtn').addEventListener('click', () => {
    const completedTasks = tasks.filter(task => task.status === 'completed');
    displayFilteredTasks(completedTasks, 'Completed');
});

// Filter pending tasks - Using filter()
document.getElementById('filterPendingBtn').addEventListener('click', () => {
    const pendingTasks = tasks.filter(task => task.status === 'pending');
    displayFilteredTasks(pendingTasks, 'Pending');
});

// Show all tasks
document.getElementById('showAllTasksBtn').addEventListener('click', () => {
    displayAllTasks();
    document.getElementById('taskFilterResults').style.display = 'none';
});

// Display filtered tasks
function displayFilteredTasks(filteredTasks, filterType) {
    const resultBox = document.getElementById('taskFilterResults');
    
    resultBox.style.display = 'block';
    resultBox.innerHTML = `
        <div class="result-header">
            <span class="result-icon">🎯</span>
            <strong>${filterType} Tasks</strong>
        </div>
        <div class="result-output">
            ${filteredTasks.length === 0 
                ? `No ${filterType.toLowerCase()} tasks found.` 
                : filteredTasks.map(task => `• ${task.name}`).join('<br>')}
        </div>
        <div class="stats-grid">
            <div class="stat-item">
                <div class="stat-label">Found</div>
                <div class="stat-value filter-value">${filteredTasks.length}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Total</div>
                <div class="stat-value">${tasks.length}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Percentage</div>
                <div class="stat-value filter-value">${tasks.length > 0 ? ((filteredTasks.length / tasks.length) * 100).toFixed(1) : 0}%</div>
            </div>
        </div>
    `;
}

// Clear all tasks
document.getElementById('clearTasksBtn').addEventListener('click', () => {
    if (tasks.length === 0) {
        alert('No tasks to clear');
        return;
    }
    
    if (confirm('Are you sure you want to clear all tasks?')) {
        tasks.length = 0;
        displayAllTasks();
        updateTaskStats();
        document.getElementById('taskFilterResults').style.display = 'none';
    }
});

// Update task statistics
function updateTaskStats() {
    const completedTasks = tasks.filter(task => task.status === 'completed');
    const pendingTasks = tasks.filter(task => task.status === 'pending');
    
    console.log(`Total Tasks: ${tasks.length}`);
    console.log(`Completed: ${completedTasks.length}, Pending: ${pendingTasks.length}`);
}

// ============================================
// Price Calculator - map() Method
// ============================================

// Tax rate slider
const taxRateSlider = document.getElementById('taxRate');
const taxRateDisplay = document.getElementById('taxRateDisplay');

taxRateSlider.addEventListener('input', (e) => {
    taxRateDisplay.textContent = `${e.target.value}%`;
});

// Add product
document.getElementById('addProductBtn').addEventListener('click', () => {
    const productNameInput = document.getElementById('productName');
    const productPriceInput = document.getElementById('productPrice');
    
    const productName = productNameInput.value.trim();
    const productPrice = parseFloat(productPriceInput.value);
    
    if (productName === '') {
        alert('Please enter a product name');
        return;
    }
    
    if (isNaN(productPrice) || productPrice <= 0) {
        alert('Please enter a valid price');
        return;
    }
    
    const product = {
        id: Date.now(),
        name: productName,
        price: productPrice
    };
    
    products.push(product);
    productNameInput.value = '';
    productPriceInput.value = '';
    
    displayProducts();
});

// Display products
function displayProducts() {
    const productList = document.getElementById('productList');
    
    if (products.length === 0) {
        productList.innerHTML = '<div class="empty-state">No products added yet. Add a product to get started!</div>';
        return;
    }
    
    productList.innerHTML = products.map(product => `
        <div class="data-item">
            <span class="item-label">${product.name}</span>
            <span class="item-value map-value">$${product.price.toFixed(2)}</span>
        </div>
    `).join('');
}

// Calculate prices with tax - Using map()
document.getElementById('calculateTaxBtn').addEventListener('click', () => {
    if (products.length === 0) {
        alert('Please add products first');
        return;
    }
    
    const taxRate = parseFloat(taxRateSlider.value) / 100;
    
    // Using map() to transform prices
    const pricesWithTax = products.map(product => {
        return {
            name: product.name,
            originalPrice: product.price,
            taxAmount: product.price * taxRate,
            finalPrice: product.price * (1 + taxRate)
        };
    });
    
    displayPricesWithTax(pricesWithTax, taxRate);
});

// Display prices with tax
function displayPricesWithTax(pricesWithTax, taxRate) {
    const resultBox = document.getElementById('priceResults');
    
    const totalOriginal = pricesWithTax.reduce((sum, item) => sum + item.originalPrice, 0);
    const totalTax = pricesWithTax.reduce((sum, item) => sum + item.taxAmount, 0);
    const totalFinal = pricesWithTax.reduce((sum, item) => sum + item.finalPrice, 0);
    
    resultBox.style.display = 'block';
    resultBox.innerHTML = `
        <div class="result-header">
            <span class="result-icon">💰</span>
            <strong>Prices with ${(taxRate * 100).toFixed(1)}% Tax</strong>
        </div>
        <div class="result-output">
            ${pricesWithTax.map(item => `
                <div style="margin-bottom: 0.5rem; padding-bottom: 0.5rem; border-bottom: 1px solid rgba(255,255,255,0.1);">
                    <strong>${item.name}</strong><br>
                    Original: $${item.originalPrice.toFixed(2)} | 
                    Tax: $${item.taxAmount.toFixed(2)} | 
                    <span style="color: var(--map-light);">Final: $${item.finalPrice.toFixed(2)}</span>
                </div>
            `).join('')}
        </div>
        <div class="stats-grid">
            <div class="stat-item">
                <div class="stat-label">Products</div>
                <div class="stat-value map-value">${pricesWithTax.length}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Total Original</div>
                <div class="stat-value">$${totalOriginal.toFixed(2)}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Total Tax</div>
                <div class="stat-value map-value">$${totalTax.toFixed(2)}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Total Final</div>
                <div class="stat-value map-value">$${totalFinal.toFixed(2)}</div>
            </div>
        </div>
    `;
}

// Clear products
document.getElementById('clearProductsBtn').addEventListener('click', () => {
    if (products.length === 0) {
        alert('No products to clear');
        return;
    }
    
    if (confirm('Are you sure you want to clear all products?')) {
        products.length = 0;
        displayProducts();
        document.getElementById('priceResults').style.display = 'none';
    }
});

// ============================================
// Budget Calculator - reduce() Method
// ============================================

// Add expense
document.getElementById('addExpenseBtn').addEventListener('click', () => {
    const expenseCategoryInput = document.getElementById('expenseCategory');
    const expenseAmountInput = document.getElementById('expenseAmount');
    
    const category = expenseCategoryInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value);
    
    if (category === '') {
        alert('Please enter an expense category');
        return;
    }
    
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    
    const expense = {
        id: Date.now(),
        category: category,
        amount: amount
    };
    
    expenses.push(expense);
    expenseCategoryInput.value = '';
    expenseAmountInput.value = '';
    
    displayExpenses();
});

// Display expenses
function displayExpenses() {
    const expenseList = document.getElementById('expenseList');
    
    if (expenses.length === 0) {
        expenseList.innerHTML = '<div class="empty-state">No expenses added yet. Add an expense to get started!</div>';
        return;
    }
    
    expenseList.innerHTML = expenses.map(expense => `
        <div class="data-item">
            <span class="item-label">${expense.category}</span>
            <span class="item-value reduce-value">$${expense.amount.toFixed(2)}</span>
        </div>
    `).join('');
}

// Calculate total - Using reduce()
document.getElementById('calculateTotalBtn').addEventListener('click', () => {
    if (expenses.length === 0) {
        alert('Please add expenses first');
        return;
    }
    
    // Using reduce() to calculate total
    const total = expenses.reduce((accumulator, expense) => {
        return accumulator + expense.amount;
    }, 0);
    
    displayBudgetResult('Total Budget', total, expenses.length);
});

// Calculate average - Using reduce()
document.getElementById('calculateAverageBtn').addEventListener('click', () => {
    if (expenses.length === 0) {
        alert('Please add expenses first');
        return;
    }
    
    // Using reduce() to calculate average
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const average = total / expenses.length;
    
    displayAverageResult(average, total, expenses.length);
});

// Display budget result
function displayBudgetResult(title, total, count) {
    const resultBox = document.getElementById('budgetResults');
    
    // Find highest and lowest expenses
    const highest = expenses.reduce((max, expense) => 
        expense.amount > max.amount ? expense : max
    , expenses[0]);
    
    const lowest = expenses.reduce((min, expense) => 
        expense.amount < min.amount ? expense : min
    , expenses[0]);
    
    resultBox.style.display = 'block';
    resultBox.innerHTML = `
        <div class="result-header">
            <span class="result-icon">💵</span>
            <strong>${title}</strong>
        </div>
        <div class="result-output">
            Total of all ${count} expenses: <span style="color: var(--reduce-light); font-size: 1.5rem; font-weight: 700;">$${total.toFixed(2)}</span>
        </div>
        <div class="stats-grid">
            <div class="stat-item">
                <div class="stat-label">Total Expenses</div>
                <div class="stat-value reduce-value">$${total.toFixed(2)}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Count</div>
                <div class="stat-value">${count}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Highest</div>
                <div class="stat-value reduce-value">$${highest.amount.toFixed(2)}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Lowest</div>
                <div class="stat-value">$${lowest.amount.toFixed(2)}</div>
            </div>
        </div>
    `;
}

// Display average result
function displayAverageResult(average, total, count) {
    const resultBox = document.getElementById('budgetResults');
    
    resultBox.style.display = 'block';
    resultBox.innerHTML = `
        <div class="result-header">
            <span class="result-icon">📊</span>
            <strong>Average Expense</strong>
        </div>
        <div class="result-output">
            Average of ${count} expenses: <span style="color: var(--reduce-light); font-size: 1.5rem; font-weight: 700;">$${average.toFixed(2)}</span>
        </div>
        <div class="stats-grid">
            <div class="stat-item">
                <div class="stat-label">Average</div>
                <div class="stat-value reduce-value">$${average.toFixed(2)}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Total</div>
                <div class="stat-value">$${total.toFixed(2)}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Count</div>
                <div class="stat-value">${count}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Per Item</div>
                <div class="stat-value reduce-value">$${average.toFixed(2)}</div>
            </div>
        </div>
    `;
}

// Clear expenses
document.getElementById('clearExpensesBtn').addEventListener('click', () => {
    if (expenses.length === 0) {
        alert('No expenses to clear');
        return;
    }
    
    if (confirm('Are you sure you want to clear all expenses?')) {
        expenses.length = 0;
        displayExpenses();
        document.getElementById('budgetResults').style.display = 'none';
    }
});

// ============================================
// Combined Demo - All Methods Chained
// ============================================

document.getElementById('runDemoBtn').addEventListener('click', () => {
    // Sample e-commerce orders data
    const orders = [
        { id: 1, product: 'Laptop', price: 1200, status: 'completed', quantity: 1 },
        { id: 2, product: 'Mouse', price: 25, status: 'completed', quantity: 2 },
        { id: 3, product: 'Keyboard', price: 75, status: 'pending', quantity: 1 },
        { id: 4, product: 'Monitor', price: 300, status: 'completed', quantity: 1 },
        { id: 5, product: 'USB Cable', price: 10, status: 'cancelled', quantity: 3 },
        { id: 6, product: 'Headphones', price: 150, status: 'completed', quantity: 1 },
        { id: 7, product: 'Webcam', price: 80, status: 'pending', quantity: 1 },
        { id: 8, product: 'Desk Lamp', price: 45, status: 'completed', quantity: 2 }
    ];
    
    // STEP 1: filter() - Get only completed orders
    const completedOrders = orders.filter(order => order.status === 'completed');
    
    // STEP 2: map() - Calculate total price for each order (price * quantity)
    const ordersWithTotals = completedOrders.map(order => ({
        product: order.product,
        totalPrice: order.price * order.quantity
    }));
    
    // STEP 3: reduce() - Calculate total revenue
    const totalRevenue = ordersWithTotals.reduce((total, order) => {
        return total + order.totalPrice;
    }, 0);
    
    // Display results
    displayDemoResults(orders, completedOrders, ordersWithTotals, totalRevenue);
});

// Display demo results
function displayDemoResults(allOrders, completedOrders, ordersWithTotals, totalRevenue) {
    const resultsContainer = document.getElementById('demoResults');
    
    resultsContainer.style.display = 'block';
    resultsContainer.innerHTML = `
        <div class="demo-result-section">
            <div class="demo-result-title">
                <span>🛒</span> Step 1: filter() - Extract Completed Orders
            </div>
            <div class="demo-result-content">
                Original orders: ${allOrders.length}<br>
                Completed orders: ${completedOrders.length}<br><br>
                <strong>Code:</strong><br>
                <code>const completedOrders = orders.filter(order => order.status === 'completed');</code>
            </div>
        </div>
        
        <div class="demo-result-section">
            <div class="demo-result-title">
                <span>🔄</span> Step 2: map() - Calculate Order Totals
            </div>
            <div class="demo-result-content">
                ${ordersWithTotals.map(order => 
                    `${order.product}: $${order.totalPrice.toFixed(2)}`
                ).join('<br>')}<br><br>
                <strong>Code:</strong><br>
                <code>const ordersWithTotals = completedOrders.map(order => ({
    product: order.product,
    totalPrice: order.price * order.quantity
}));</code>
            </div>
        </div>
        
        <div class="demo-result-section">
            <div class="demo-result-title">
                <span>📊</span> Step 3: reduce() - Calculate Total Revenue
            </div>
            <div class="demo-result-content">
                <span style="color: var(--reduce-light); font-size: 1.5rem; font-weight: 700;">
                    Total Revenue: $${totalRevenue.toFixed(2)}
                </span><br><br>
                <strong>Code:</strong><br>
                <code>const totalRevenue = ordersWithTotals.reduce((total, order) => {
    return total + order.totalPrice;
}, 0);</code>
            </div>
        </div>
        
        <div class="demo-result-section" style="background: var(--gradient-demo); padding: 1.5rem; border: none;">
            <div class="demo-result-title" style="color: white;">
                <span>⚡</span> Chained Together
            </div>
            <div class="demo-result-content" style="background: rgba(0,0,0,0.3); color: white;">
                <code style="color: white;">const totalRevenue = orders
    .filter(order => order.status === 'completed')
    .map(order => order.price * order.quantity)
    .reduce((total, price) => total + price, 0);</code>
            </div>
        </div>
        
        <div class="stats-grid">
            <div class="stat-item">
                <div class="stat-label">Total Orders</div>
                <div class="stat-value">${allOrders.length}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Completed</div>
                <div class="stat-value filter-value">${completedOrders.length}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Revenue</div>
                <div class="stat-value reduce-value">$${totalRevenue.toFixed(2)}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Avg Order</div>
                <div class="stat-value map-value">$${(totalRevenue / completedOrders.length).toFixed(2)}</div>
            </div>
        </div>
    `;
}

// ============================================
// Initialize on page load
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Array Methods Lab Initialized');
    console.log('📚 Learn map(), filter(), and reduce()');
    
    // Initialize displays
    displayAllTasks();
    displayProducts();
    displayExpenses();
});
