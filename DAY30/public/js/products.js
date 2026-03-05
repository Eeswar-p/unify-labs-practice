/**
 * Products Page JavaScript
 * Handles product fetching, filtering, search, and add to cart
 */

const API_URL = '/api/products';

// State
let allProducts = [];
let filteredProducts = [];

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const loadingState = document.getElementById('loadingState');
const errorState = document.getElementById('errorState');
const emptyState = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const categoryFilter = document.getElementById('categoryFilter');
const retryBtn = document.getElementById('retryBtn');
const cartBadge = document.getElementById('cartBadge');
const toast = document.getElementById('toast');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  fetchProducts();
  updateCartBadge();
  setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
  searchBtn.addEventListener('click', handleSearch);
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
  });
  categoryFilter.addEventListener('change', handleFilter);
  retryBtn.addEventListener('click', fetchProducts);
}

// Fetch Products
async function fetchProducts() {
  showLoading();
  
  try {
    const response = await fetch(API_URL);
    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message);
    }

    allProducts = result.data;
    filteredProducts = allProducts;
    renderProducts();
    
  } catch (error) {
    console.error('Fetch error:', error);
    showError();
  }
}

// Search Handler
function handleSearch() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  
  if (!searchTerm) {
    filteredProducts = allProducts;
  } else {
    filteredProducts = allProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    );
  }
  
  renderProducts();
}

// Filter Handler
function handleFilter() {
  const category = categoryFilter.value;
  
  if (category === 'all') {
    filteredProducts = allProducts;
  } else {
    filteredProducts = allProducts.filter(product => 
      product.category === category
    );
  }
  
  // Clear search input
  searchInput.value = '';
  renderProducts();
}

// Render Products
function renderProducts() {
  hideAllStates();

  if (filteredProducts.length === 0) {
    emptyState.style.display = 'block';
    return;
  }

  productsGrid.innerHTML = filteredProducts
    .map(product => createProductCard(product))
    .join('');

  // Add event listeners to all add-to-cart buttons
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const productId = e.target.dataset.productId;
      const product = filteredProducts.find(p => p._id === productId);
      addToCart(product);
    });
  });
}

// Create Product Card HTML
function createProductCard(product) {
  const emoji = getCategoryEmoji(product.category);
  
  return `
    <div class="product-card">
      <div class="product-image">${emoji}</div>
      <div class="product-info">
        <div class="product-category">${product.category}</div>
        <h3 class="product-name">${escapeHtml(product.name)}</h3>
        <p class="product-description">${escapeHtml(product.description)}</p>
        <div class="product-footer">
          <div>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <div class="product-stock">Stock: ${product.stock}</div>
          </div>
        </div>
        <button 
          class="btn btn-primary add-to-cart-btn" 
          data-product-id="${product._id}"
          ${product.stock === 0 ? 'disabled' : ''}
        >
          ${product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  `;
}

// Get Category Emoji
function getCategoryEmoji(category) {
  const emojis = {
    electronics: '💻',
    clothing: '👕',
    books: '📚',
    home: '🏠',
    sports: '⚽'
  };
  return emojis[category] || '🛍️';
}

// Add to Cart
function addToCart(product) {
  let cart = getCart();
  
  const existingItem = cart.find(item => item.productId === product._id);
  
  if (existingItem) {
    existingItem.quantity++;
    existingItem.subtotal = existingItem.price * existingItem.quantity;
  } else {
    cart.push({
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      subtotal: product.price,
      category: product.category
    });
  }
  
  saveCart(cart);
  updateCartBadge();
  showToast(`${product.name} added to cart!`);
}

// Cart Utilities
function getCart() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartBadge() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartBadge.textContent = totalItems;
}

// Show States
function showLoading() {
  hideAllStates();
  loadingState.style.display = 'block';
}

function showError() {
  hideAllStates();
  errorState.style.display = 'block';
}

function hideAllStates() {
  loadingState.style.display = 'none';
  errorState.style.display = 'none';
  emptyState.style.display = 'none';
  productsGrid.innerHTML = '';
}

// Toast Notification
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// XSS Prevention
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
