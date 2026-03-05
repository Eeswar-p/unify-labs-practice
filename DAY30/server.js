/**
 * Local Development Server
 * Express server for running the e-commerce app locally
 */

require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/products', require('./api/products'));
app.use('/api/orders', require('./api/orders'));

// Serve HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/cart.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cart.html'));
});

app.get('/checkout.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'checkout.html'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   🛍️  E-Commerce Store Server         ║
╚════════════════════════════════════════╝

Server running on: http://localhost:${PORT}

📍 Available pages:
   • Products:  http://localhost:${PORT}/
   • Cart:      http://localhost:${PORT}/cart.html
   • Checkout:  http://localhost:${PORT}/checkout.html

🔌 API endpoints:
   • GET  /api/products
   • POST /api/orders

Press Ctrl+C to stop the server
  `);
});
