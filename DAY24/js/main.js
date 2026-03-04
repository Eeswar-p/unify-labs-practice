/**
 * DAY24: Interactive Demo JavaScript
 * 
 * Simulates MongoDB operations in the browser
 */

// Sample products data (matches MongoDB documents)
const products = [
    {
        _id: "507f1f77bcf86cd799439011",
        name: "Laptop Pro 15",
        category: "Electronics",
        price: 1299.99,
        stock: 25,
        specs: {
            color: "Silver",
            weight: "1.8kg",
            processor: "Intel i7",
            ram: "16GB"
        }
    },
    {
        _id: "507f1f77bcf86cd799439012",
        name: "Wireless Mouse",
        category: "Electronics",
        price: 29.99,
        stock: 150,
        specs: {
            color: "Black",
            weight: "0.1kg",
            connectivity: "Bluetooth",
            battery: "AA x2"
        }
    },
    {
        _id: "507f1f77bcf86cd799439013",
        name: "Office Chair",
        category: "Furniture",
        price: 249.99,
        stock: 40,
        specs: {
            color: "Black",
            weight: "12kg",
            material: "Leather",
            adjustable: true
        }
    },
    {
        _id: "507f1f77bcf86cd799439014",
        name: "Cotton T-Shirt",
        category: "Clothing",
        price: 19.99,
        stock: 200,
        specs: {
            color: "Blue",
            weight: "0.2kg",
            size: "M",
            material: "100% Cotton"
        }
    },
    {
        _id: "507f1f77bcf86cd799439015",
        name: "Wooden Desk",
        category: "Furniture",
        price: 399.99,
        stock: 15,
        specs: {
            color: "Oak",
            weight: "25kg",
            dimensions: "120x60x75cm",
            material: "Solid Wood"
        }
    }
];

// State
let currentProducts = [...products];
let currentQuery = 'db.products.find().limit(5)';

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const queryText = document.getElementById('queryText');
const resultCount = document.getElementById('resultCount');
const showAllBtn = document.getElementById('showAllBtn');
const electronicsBtn = document.getElementById('electronicsBtn');
const top2Btn = document.getElementById('top2Btn');
const resetBtn = document.getElementById('resetBtn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    updateQuery(currentQuery);
    setupEventListeners();
    setupTabs();
});

// Event Listeners
function setupEventListeners() {
    showAllBtn.addEventListener('click', showAllProducts);
    electronicsBtn.addEventListener('click', showElectronics);
    top2Btn.addEventListener('click', showTop2);
    resetBtn.addEventListener('click', resetView);
}

// Query Functions
function showAllProducts() {
    currentProducts = [...products];
    currentQuery = 'db.products.find()';
    updateQuery(currentQuery);
    renderProducts(currentProducts);
}

function showElectronics() {
    // Simulate: db.products.find({ category: "Electronics" })
    currentProducts = products.filter(p => p.category === "Electronics");
    currentQuery = 'db.products.find({ category: "Electronics" })';
    updateQuery(currentQuery);
    renderProducts(currentProducts);
}

function showTop2() {
    // Simulate: db.products.find().sort({ price: -1 }).limit(2)
    currentProducts = [...products]
        .sort((a, b) => b.price - a.price)
        .slice(0, 2);
    currentQuery = 'db.products.find().sort({ price: -1 }).limit(2)';
    updateQuery(currentQuery);
    renderProducts(currentProducts);
}

function resetView() {
    currentProducts = [...products];
    currentQuery = 'db.products.find().limit(5)';
    updateQuery(currentQuery);
    renderProducts(currentProducts);
}

// Render Functions
function renderProducts(productsToRender) {
    productsGrid.innerHTML = '';
    
    if (productsToRender.length === 0) {
        productsGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
                <h3 style="color: #6c757d;">No products found</h3>
            </div>
        `;
        resultCount.textContent = '0';
        return;
    }

    productsToRender.forEach(product => {
        const card = createProductCard(product);
        productsGrid.appendChild(card);
    });

    resultCount.textContent = productsToRender.length;
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';

    const categoryClass = product.category.toLowerCase();
    
    const specsHTML = Object.entries(product.specs)
        .map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`)
        .join('');

    card.innerHTML = `
        <span class="category-badge ${categoryClass}">${product.category}</span>
        <h3>${product.name}</h3>
        <div class="price">$${product.price.toFixed(2)}</div>
        <div class="stock">Stock: ${product.stock} units</div>
        <div class="specs">
            <h4>📋 Specifications</h4>
            <ul>
                ${specsHTML}
            </ul>
        </div>
    `;

    return card;
}

function updateQuery(query) {
    queryText.textContent = query;
}

// Tab System
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;

            // Remove active class from all
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked
            btn.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Animations
function animateCards() {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Call animation after render
const originalRenderProducts = renderProducts;
renderProducts = function(productsToRender) {
    originalRenderProducts(productsToRender);
    animateCards();
};
