/**
 * DAY26: Express.js + MongoDB REST API
 * 
 * Main entry point for the REST API application
 * Sets up server and database connection
 */

const express = require('express');
const { connectDB } = require('./db');
const productRoutes = require('./routes/products');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3026;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Mount API routes
app.use('/api/products', productRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'API is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API Info endpoint
app.get('/api/info', (req, res) => {
  res.json({
    name: 'DAY26: Express + MongoDB API',
    version: '1.0.0',
    description: 'REST API for Product Management',
    endpoints: {
      health: 'GET /health',
      apiInfo: 'GET /api/info',
      products: 'GET /api/products',
      productById: 'GET /api/products/:id',
      createProduct: 'POST /api/products',
      updateProduct: 'PUT /api/products/:id',
      deleteProduct: 'DELETE /api/products/:id'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.path,
    method: req.method
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

/**
 * Start the server
 */
async function startServer() {
  // Connect to database (falls back to mock DB if MongoDB unavailable)
  await connectDB();
  
  // Start listening
  app.listen(PORT, () => {
    console.log(`\n${'═'.repeat(60)}`);
    console.log(`🚀 DAY26: Express + MongoDB API`);
    console.log(`${'═'.repeat(60)}`);
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`✅ API Info: http://localhost:${PORT}/api/info`);
    console.log(`✅ Health Check: http://localhost:${PORT}/health`);
    console.log(`${'═'.repeat(60)}\n`);
  });
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n\n⏹️  Shutting down gracefully...');
  try {
    const { disconnectDB } = require('./db');
    await disconnectDB();
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
});

// Start the server
startServer();
