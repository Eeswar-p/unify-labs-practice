/**
 * DAY28: Express Backend with MongoDB Atlas
 * 
 * A Node.js Express server that connects to MongoDB Atlas cloud database
 * and provides REST API endpoints for product management
 * 
 * Features:
 * - POST /products - Create new product in Atlas
 * - PATCH /products/:id - Update product stock in Atlas
 * - DELETE /products/:id - Delete product from Atlas
 * - GET /products - List all products from Atlas
 * - GET /health - Server health status
 * - GET /info - Server information
 */

const express = require('express');
const { connectDB, disconnectDB, getDB } = require('./db');

const app = express();
const PORT = process.env.PORT || 3028;

// ============================================================================
// MIDDLEWARE
// ============================================================================

// Parse JSON request bodies
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// ============================================================================
// INITIALIZE DATABASE ON STARTUP
// ============================================================================

let dbConnected = false;

async function initializeDatabase() {
  try {
    await connectDB();
    dbConnected = true;
    console.log('✅ Database initialized\n');
  } catch (error) {
    console.error('⚠️  Database initialization failed:', error.message);
    console.error('   Server will still run, but requests requiring DB will fail\n');
  }
}

// ============================================================================
// ROUTE HELPER: Check Database Connection
// ============================================================================

function ensureDBConnected(req, res, next) {
  if (!dbConnected) {
    return res.status(503).json({
      error: 'Database not connected',
      message: 'MongoDB Atlas connection failed. Check .env file and Atlas configuration.',
      help: 'Verify MONGO_URL in .env file and check Atlas Network Access settings'
    });
  }
  next();
}

// ============================================================================
// HEALTH CHECK ROUTES
// ============================================================================

/**
 * GET /health
 * Server health status and database connection info
 */
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'up',
    timestamp: new Date().toISOString(),
    database: {
      connected: dbConnected,
      type: 'MongoDB Atlas (Cloud)',
      database: process.env.DB_NAME || 'unify_labs'
    },
    server: {
      port: PORT,
      environment: process.env.NODE_ENV || 'development'
    }
  });
});

/**
 * GET /info
 * Detailed server information
 */
app.get('/info', (req, res) => {
  res.status(200).json({
    project: 'DAY28: MongoDB Atlas Cloud Migration',
    version: '1.0.0',
    description: 'Express API connected to MongoDB Atlas',
    database: {
      type: 'MongoDB Atlas',
      connection: 'SRV (mongodb+srv://)',
      tier: 'M0 - Shared (Free)',
      status: dbConnected ? 'Connected' : 'Disconnected'
    },
    endpoints: {
      'GET /products': 'List all products from Atlas',
      'GET /products/:id': 'Get specific product by ID',
      'POST /products': 'Create new product in Atlas',
      'PATCH /products/:id': 'Update product stock in Atlas',
      'DELETE /products/:id': 'Delete product from Atlas'
    },
    created: 'November 2024',
    author: 'Unify Labs'
  });
});

// ============================================================================
// PRODUCT ROUTES
// ============================================================================

/**
 * GET /products
 * List all products from MongoDB Atlas
 */
app.get('/products', ensureDBConnected, async (req, res) => {
  try {
    const db = getDB();
    const products = await db.collection('products').find({}).toArray();
    
    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
      message: `Retrieved ${products.length} products from Atlas`
    });
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({
      error: 'Failed to fetch products',
      message: error.message
    });
  }
});

/**
 * GET /products/:id
 * Get specific product by ID from MongoDB Atlas
 */
app.get('/products/:id', ensureDBConnected, async (req, res) => {
  try {
    const db = getDB();
    const { ObjectId } = require('mongodb');
    
    // Validate ObjectId
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        error: 'Invalid product ID',
        message: 'Product ID must be a valid MongoDB ObjectId'
      });
    }
    
    const product = await db.collection('products').findOne({
      _id: new ObjectId(req.params.id)
    });
    
    if (!product) {
      return res.status(404).json({
        error: 'Product not found',
        message: `No product found with ID: ${req.params.id}`
      });
    }
    
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error fetching product:', error.message);
    res.status(500).json({
      error: 'Failed to fetch product',
      message: error.message
    });
  }
});

/**
 * POST /products
 * Create new product in MongoDB Atlas
 * 
 * Body: { name, price, stock }
 */
app.post('/products', ensureDBConnected, async (req, res) => {
  try {
    const { name, price, stock } = req.body;
    
    // Validation
    const errors = [];
    if (!name) errors.push('name is required');
    if (price === undefined) errors.push('price is required');
    if (stock === undefined) errors.push('stock is required');
    
    if (errors.length > 0) {
      return res.status(400).json({
        error: 'Validation failed',
        message: 'Missing required fields',
        fields: errors
      });
    }
    
    // Type validation
    if (typeof price !== 'number' || price < 0) {
      return res.status(400).json({
        error: 'Invalid price',
        message: 'Price must be a positive number'
      });
    }
    
    if (typeof stock !== 'number' || stock < 0) {
      return res.status(400).json({
        error: 'Invalid stock',
        message: 'Stock must be a positive number'
      });
    }
    
    // Create product object
    const product = {
      name: name.trim(),
      price: parseFloat(price),
      stock: parseInt(stock),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Insert into Atlas
    const db = getDB();
    const result = await db.collection('products').insertOne(product);
    
    const createdProduct = { _id: result.insertedId, ...product };
    
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: createdProduct
    });
  } catch (error) {
    console.error('Error creating product:', error.message);
    res.status(500).json({
      error: 'Failed to create product',
      message: error.message
    });
  }
});

/**
 * PATCH /products/:id
 * Update product stock in MongoDB Atlas
 * 
 * Body: { stock } - Only stock can be updated
 */
app.patch('/products/:id', ensureDBConnected, async (req, res) => {
  try {
    const { ObjectId } = require('mongodb');
    const { stock } = req.body;
    
    // Validate ObjectId
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        error: 'Invalid product ID',
        message: 'Product ID must be a valid MongoDB ObjectId'
      });
    }
    
    // Validate stock
    if (stock === undefined) {
      return res.status(400).json({
        error: 'Missing stock field',
        message: 'stock field is required for update'
      });
    }
    
    if (typeof stock !== 'number' || stock < 0) {
      return res.status(400).json({
        error: 'Invalid stock value',
        message: 'stock must be a non-negative number'
      });
    }
    
    // Update in Atlas
    const db = getDB();
    const result = await db.collection('products').findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          stock: parseInt(stock),
          updatedAt: new Date()
        }
      },
      { returnDocument: 'after' }
    );
    
    if (!result.value) {
      return res.status(404).json({
        error: 'Product not found',
        message: `No product found with ID: ${req.params.id}`
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: result.value
    });
  } catch (error) {
    console.error('Error updating product:', error.message);
    res.status(500).json({
      error: 'Failed to update product',
      message: error.message
    });
  }
});

/**
 * DELETE /products/:id
 * Delete product from MongoDB Atlas
 */
app.delete('/products/:id', ensureDBConnected, async (req, res) => {
  try {
    const { ObjectId } = require('mongodb');
    
    // Validate ObjectId
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        error: 'Invalid product ID',
        message: 'Product ID must be a valid MongoDB ObjectId'
      });
    }
    
    // Delete from Atlas
    const db = getDB();
    const result = await db.collection('products').deleteOne({
      _id: new ObjectId(req.params.id)
    });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({
        error: 'Product not found',
        message: `No product found with ID: ${req.params.id}`
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error('Error deleting product:', error.message);
    res.status(500).json({
      error: 'Failed to delete product',
      message: error.message
    });
  }
});

// ============================================================================
// ERROR HANDLING
// ============================================================================

/**
 * 404 - Not Found
 */
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `No route found for ${req.method} ${req.path}`,
    availableRoutes: [
      'GET /health',
      'GET /info',
      'GET /products',
      'GET /products/:id',
      'POST /products',
      'PATCH /products/:id',
      'DELETE /products/:id'
    ]
  });
});

/**
 * Error handler
 */
app.use((error, req, res, next) => {
  console.error('Server error:', error.message);
  res.status(500).json({
    error: 'Internal Server Error',
    message: error.message
  });
});

// ============================================================================
// SERVER STARTUP
// ============================================================================

async function startServer() {
  try {
    // Initialize MongoDB Atlas connection
    await initializeDatabase();
    
    // Start Express server
    app.listen(PORT, () => {
      console.log(`
╔═══════════════════════════════════════════╗
║   DAY28: MongoDB Atlas Cloud Backend     ║
╚═══════════════════════════════════════════╝

📍 Server:    http://localhost:${PORT}
🌐 Database:  MongoDB Atlas (Cloud)
💾 Data:      Persisted in Atlas cluster

📚 Documentation:
   - GET /health  → Server health
   - GET /info    → API information
   - GET /products → List all products
   - POST /products → Create product
   - PATCH /products/:id → Update product
   - DELETE /products/:id → Delete product

✅ Ready to accept requests from Atlas!
      `);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down server...');
  try {
    await disconnectDB();
    console.log('✅ Server closed gracefully');
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
});

// Start the server
startServer();

module.exports = app;
