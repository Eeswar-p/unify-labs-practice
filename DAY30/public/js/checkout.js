/**
 * Checkout Page JavaScript
 * Handles order summary display and form submission
 */

const API_URL = '/api/orders';

// Constants
const SHIPPING_COST = 10.00;
const FREE_SHIPPING_THRESHOLD = 100.00;

// DOM Elements
const checkoutForm = document.getElementById('checkoutForm');
const orderItems = document.getElementById('orderItems');
const orderSubtotal = document.getElementById('orderSubtotal');
const orderShipping = document.getElementById('orderShipping');
const orderTotal = document.getElementById('orderTotal');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');
const orderIdSpan = document.getElementById('orderId');
const cartBadge = document.getElementById('cartBadge');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const cart = getCart();
  
  if (cart.length === 0) {
    window.location.href = '/cart.html';
    return;
  }
  
  renderOrderSummary();
  updateCartBadge();
  setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
  checkoutForm.addEventListener('submit', handleSubmit);
}

// Render Order Summary
function renderOrderSummary() {
  const cart = getCart();
  
  orderItems.innerHTML = cart
    .map(item => createOrderItemHTML(item))
    .join('');
  
  updateOrderTotals();
}

// Create Order Item HTML
function createOrderItemHTML(item) {
  return `
    <div class="order-item">
      <div>
        <div class="order-item-name">${escapeHtml(item.name)}</div>
        <div class="order-item-quantity">Qty: ${item.quantity} × $${item.price.toFixed(2)}</div>
      </div>
      <div class="order-item-price">$${item.subtotal.toFixed(2)}</div>
    </div>
  `;
}

// Update Order Totals
function updateOrderTotals() {
  const cart = getCart();
  
  const subtotal = cart.reduce((sum, item) => sum + item.subtotal, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;
  
  orderSubtotal.textContent = `$${subtotal.toFixed(2)}`;
  orderShipping.textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
  orderTotal.textContent = `$${total.toFixed(2)}`;
}

// Handle Form Submit
async function handleSubmit(e) {
  e.preventDefault();
  
  const cart = getCart();
  const subtotal = cart.reduce((sum, item) => sum + item.subtotal, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;
  
  const formData = new FormData(checkoutForm);
  
  const orderData = {
    customer: {
      name: formData.get('name').trim(),
      email: formData.get('email').trim(),
      phone: formData.get('phone').trim(),
      address: formData.get('address').trim()
    },
    items: cart,
    total: total
  };
  
  // Validation
  if (!orderData.customer.name || orderData.customer.name.length < 3) {
    showError('Please enter a valid name (minimum 3 characters)');
    return;
  }
  
  if (!orderData.customer.email || !isValidEmail(orderData.customer.email)) {
    showError('Please enter a valid email address');
    return;
  }
  
  if (!orderData.customer.address || orderData.customer.address.length < 10) {
    showError('Please enter a complete shipping address');
    return;
  }
  
  // Submit order
  submitBtn.disabled = true;
  submitBtn.textContent = 'Processing...';
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    });
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.message);
    }
    
    // Success - Clear cart and show confirmation
    localStorage.removeItem('cart');
    updateCartBadge();
    
    checkoutForm.style.display = 'none';
    successMessage.style.display = 'block';
    orderIdSpan.textContent = result.data.orderId;
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
  } catch (error) {
    console.error('Order submission error:', error);
    showError(error.message || 'Failed to place order. Please try again.');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Place Order';
  }
}

// Show Error
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = 'block';
  
  setTimeout(() => {
    errorMessage.style.display = 'none';
  }, 5000);
  
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Email Validation
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Cart Utilities
function getCart() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

function updateCartBadge() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartBadge.textContent = totalItems;
}

// XSS Prevention
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
