/**
 * DAY27: Express + MongoDB CRUD Operations
 * Focus: POST, PATCH (stock updates), DELETE
 */

const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const { mockDB, MockObjectId, initializeSampleData } = require('./mockDB');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3027;

// ============================================================================
// MIDDLEWARE SETUP
// ============================================================================

// JSON middleware for parsing request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// ============================================================================
// MONGODB CONNECTION (Defined inside the app)
// ============================================================================

const MONGO_URL = 'mongodb://localhost:27017';
const DB_NAME = 'day27_products';

let db = null;
let client = null;
let usingMockDB = false;

/**
 * Connect to MongoDB or fallback to mock database
 */
async function connectDatabase() {
  try {
    // Attempt MongoDB connection
    client = new MongoClient(MONGO_URL, {
      serverSelectionTimeoutMS: 3000
    });
    
    await client.connect();
    db = client.db(DB_NAME);
    
    // Verify connection
    await db.admin().ping();
    
    console.log('✅ MongoDB connected successfully');
    console.log(`   Database: ${DB_NAME}`);
    usingMockDB = false;
    
  } catch (error) {
    console.warn('⚠️  MongoDB not available - using in-memory database');
    console.warn(`   Reason: ${error.message}`);
    
    // Fallback to mock DB
    db = mockDB;
    usingMockDB = true;
    initializeSampleData();
  }
}

/**
 * Get appropriate ObjectId class based on DB type
 */
function getObjectIdClass() {
  return usingMockDB ? MockObjectId : ObjectId;
}

// ============================================================================
// CRUD ROUTES
// ============================================================================

/**
 * POST /products
 * Create a new product with {name, price, stock}
 */
app.post('/products', async (req, res) => {
  try {
    const { name, price, stock } = req.body;
    
    // Validate required fields
    if (!name || price === undefined || stock === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        required: ['name', 'price', 'stock']
      });
    }
    
    // Validate data types
    if (typeof name !== 'string' || isNaN(price) || isNaN(stock)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid data types',
        expected: 'name: string, price: number, stock: number'
      });
    }
    
    // Create product document
    const newProduct = {
      name: name.trim(),
      price: parseFloat(price),
      stock: parseInt(stock),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Insert into database
    const collection = db.collection('products');
    const result = await collection.insertOne(newProduct);
    
    // Return created product
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: {
        _id: result.insertedId,
        ...newProduct
      }
    });
    
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create product',
      message: error.message
    });
  }
});

/**
 * PATCH /products/:id
 * Update only the 'stock' field of a product
 */
app.patch('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;
    const ObjId = getObjectIdClass();
    
    // Validate ID format
    if (!ObjId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid product ID format'
      });
    }
    
    // Validate stock value
    if (stock === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Missing stock field',
        message: 'PATCH /products/:id requires "stock" in request body'
      });
    }
    
    if (isNaN(stock) || parseInt(stock) < 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid stock value',
        message: 'Stock must be a non-negative number'
      });
    }
    
    // Update only stock field
    const collection = db.collection('products');
    const result = await collection.findOneAndUpdate(
      { _id: new ObjId(id) },
      { 
        $set: { 
          stock: parseInt(stock),
          updatedAt: new Date()
        }
      },
      { returnDocument: 'after' }
    );
    
    if (!result) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
        id: id
      });
    }
    
    res.json({
      success: true,
      message: 'Stock updated successfully',
      data: result
    });
    
  } catch (error) {
    console.error('Error updating stock:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update stock',
      message: error.message
    });
  }
});

/**
 * DELETE /products/:id
 * Remove a product by ID
 */
app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const ObjId = getObjectIdClass();
    
    // Validate ID format
    if (!ObjId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid product ID format'
      });
    }
    
    // Delete product
    const collection = db.collection('products');
    const result = await collection.findOneAndDelete({ _id: new ObjId(id) });
    
    if (!result) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
        id: id
      });
    }
    
    res.json({
      success: true,
      message: 'Product deleted successfully',
      data: result
    });
    
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete product',
      message: error.message
    });
  }
});

// ============================================================================
// HELPER ROUTES
// ============================================================================

/**
 * GET /products (Helper - not required but useful for testing)
 */
app.get('/products', async (req, res) => {
  try {
    const collection = db.collection('products');
    const products = await collection.find().toArray();
    
    res.json({
      success: true,
      count: products.length,
      data: products,
      mode: usingMockDB ? 'mock-database' : 'mongodb'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /health (Health check)
 */
app.get('/health', (req, res) => {
  res.json({
    status: 'running',
    database: usingMockDB ? 'mock' : 'mongodb',
    timestamp: new Date().toISOString()
  });
});

// ============================================================================
// ERROR HANDLERS
// ============================================================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.path,
    method: req.method
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
    message: err.message
  });
});

// ============================================================================
// SERVER STARTUP
// ============================================================================

async function startServer() {
  // Connect to database first
  await connectDatabase();
  
  // Start Express server
  app.listen(PORT, () => {
    console.log(`\n${'═'.repeat(60)}`);
    console.log(`🚀 DAY27: Express + MongoDB CRUD`);
    console.log(`${'═'.repeat(60)}`);
    console.log(`✅ Server: http://localhost:${PORT}`);
    console.log(`✅ Database: ${usingMockDB ? 'In-Memory Mock' : 'MongoDB'}`);
    console.log(`\n📋 Available Routes:`);
    console.log(`   POST   /products         - Create product`);
    console.log(`   PATCH  /products/:id     - Update stock`);
    console.log(`   DELETE /products/:id     - Delete product`);
    console.log(`   GET    /products         - List all (helper)`);
    console.log(`   GET    /health           - Health check`);
    console.log(`${'═'.repeat(60)}\n`);
  });
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n\n⏹️  Shutting down gracefully...');
  if (client) {
    await client.close();
    console.log('✅ Database connection closed');
  }
  process.exit(0);
});

// Start the application
startServer().catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
