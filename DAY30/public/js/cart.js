/**
 * Cart Page JavaScript
 * Handles cart display, quantity updates, and removal
 */

// DOM Elements
const emptyCart = document.getElementById('emptyCart');
const cartContainer = document.getElementById('cartContainer');
const cartItems = document.getElementById('cartItems');
const subtotalEl = document.getElementById('subtotal');
const shippingEl = document.getElementById('shipping');
const totalEl = document.getElementById('total');
const clearCartBtn = document.getElementById('clearCartBtn');
const cartBadge = document.getElementById('cartBadge');

// Constants
const SHIPPING_COST = 10.00;
const FREE_SHIPPING_THRESHOLD = 100.00;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  updateCartBadge();
  setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
  clearCartBtn.addEventListener('click', handleClearCart);
}

// Render Cart
function renderCart() {
  const cart = getCart();
  
  if (cart.length === 0) {
    emptyCart.style.display = 'block';
    cartContainer.style.display = 'none';
    return;
  }

  emptyCart.style.display = 'none';
  cartContainer.style.display = 'block';

  cartItems.innerHTML = cart
    .map((item, index) => createCartItemHTML(item, index))
    .join('');

  // Add event listeners
  attachCartEventListeners();
  
  // Update totals
  updateTotals();
}

// Create Cart Item HTML
function createCartItemHTML(item, index) {
  const emoji = getCategoryEmoji(item.category);
  
  return `
    <div class="cart-item">
      <div class="cart-item-image">${emoji}</div>
      <div class="cart-item-info">
        <h3 class="cart-item-name">${escapeHtml(item.name)}</h3>
        <div class="cart-item-price">$${item.price.toFixed(2)} each</div>
        <div class="cart-item-controls">
          <div class="quantity-control">
            <button class="quantity-btn decrease-btn" data-index="${index}">-</button>
            <span class="quantity-value">${item.quantity}</span>
            <button class="quantity-btn increase-btn" data-index="${index}">+</button>
          </div>
          <button class="remove-btn" data-index="${index}">Remove</button>
        </div>
        <div class="cart-item-subtotal">
          Subtotal: <strong>$${item.subtotal.toFixed(2)}</strong>
        </div>
      </div>
    </div>
  `;
}

// Attach Event Listeners
function attachCartEventListeners() {
  // Increase quantity buttons
  document.querySelectorAll('.increase-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = parseInt(e.target.dataset.index);
      updateQuantity(index, 1);
    });
  });

  // Decrease quantity buttons
  document.querySelectorAll('.decrease-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = parseInt(e.target.dataset.index);
      updateQuantity(index, -1);
    });
  });

  // Remove buttons
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = parseInt(e.target.dataset.index);
      removeItem(index);
    });
  });
}

// Update Quantity
function updateQuantity(index, change) {
  const cart = getCart();
  
  cart[index].quantity += change;
  
  if (cart[index].quantity < 1) {
    cart[index].quantity = 1;
    return;
  }
  
  if (cart[index].quantity > 99) {
    cart[index].quantity = 99;
    return;
  }
  
  cart[index].subtotal = cart[index].price * cart[index].quantity;
  
  saveCart(cart);
  renderCart();
  updateCartBadge();
}

// Remove Item
function removeItem(index) {
  if (!confirm('Remove this item from cart?')) {
    return;
  }
  
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
  updateCartBadge();
}

// Clear Cart
function handleClearCart() {
  if (!confirm('Are you sure you want to clear your cart?')) {
    return;
  }
  
  localStorage.removeItem('cart');
  renderCart();
  updateCartBadge();
}

// Update Totals
function updateTotals() {
  const cart = getCart();
  
  const subtotal = cart.reduce((sum, item) => sum + item.subtotal, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;
  
  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  shippingEl.textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
  totalEl.textContent = `$${total.toFixed(2)}`;
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

// XSS Prevention
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
