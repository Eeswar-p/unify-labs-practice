/**
 * DAY26: Product Routes
 * 
 * Handles all CRUD operations for products
 * Routes: GET, POST, PUT, DELETE
 */

const express = require('express');
const router = express.Router();
const { getDB, isConnected, isMockDB } = require('../db');
const { ObjectId } = require('mongodb');
const { MockObjectId } = require('../mockDB');

// Get the appropriate ObjectId class
function getObjectIdClass() {
  return isMockDB() ? MockObjectId : ObjectId;
}

// Middleware to check database connection
function checkDB(req, res, next) {
  if (!isConnected()) {
    return res.status(503).json({
      success: false,
      error: 'Database not available',
      message: 'Database is not connected.',
      hint: 'Server may still be starting up'
    });
  }
  next();
}

// Apply middleware to all routes
router.use(checkDB);

/**
 * GET /api/products
 * Get all products with optional filtering
 */
router.get('/', async (req, res) => {
  try {
    const db = getDB();
    const collection = db.collection('products');
    
    // Optional query parameters for filtering
    const { category, minPrice, maxPrice, featured } = req.query;
    const filter = {};
    
    if (category) {
      filter.category = category;
    }
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }
    
    if (featured !== undefined) {
      filter.featured = featured === 'true';
    }
    
    const products = await collection.find(filter).toArray();
    
    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch products',
      message: error.message
    });
  }
});

/**
 * GET /api/products/:id
 * Get a single product by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const db = getDB();
    const collection = db.collection('products');
    const { id } = req.params;
    const ObjId = getObjectIdClass();
    
    // Validate ObjectId
    if (!ObjId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid product ID format'
      });
    }
    
    const product = await collection.findOne({ _id: new ObjId(id) });
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch product',
      message: error.message
    });
  }
});

/**
 * POST /api/products
 * Create a new product
 */
router.post('/', async (req, res) => {
  try {
    const db = getDB();
    const collection = db.collection('products');
    
    // Validate required fields
    const { name, price, category } = req.body;
    
    if (!name || !price || !category) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, price, category'
      });
    }
    
    // Create product document
    const newProduct = {
      name,
      price: parseFloat(price),
      category,
      description: req.body.description || '',
      stock: req.body.stock !== undefined ? parseInt(req.body.stock) : 0,
      featured: req.body.featured || false,
      tags: req.body.tags || [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await collection.insertOne(newProduct);
    
    // Fetch the created product
    const createdProduct = await collection.findOne({ _id: result.insertedId });
    
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: createdProduct
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
 * PUT /api/products/:id
 * Update an existing product
 */
router.put('/:id', async (req, res) => {
  try {
    const db = getDB();
    const collection = db.collection('products');
    const { id } = req.params;
    const ObjId = getObjectIdClass();
    
    // Validate ObjectId
    if (!ObjId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid product ID format'
      });
    }
    
    // Build update object (only update provided fields)
    const updateFields = {};
    const allowedFields = ['name', 'price', 'category', 'description', 'stock', 'featured', 'tags'];
    
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        if (field === 'price') {
          updateFields[field] = parseFloat(req.body[field]);
        } else if (field === 'stock') {
          updateFields[field] = parseInt(req.body[field]);
        } else {
          updateFields[field] = req.body[field];
        }
      }
    });
    
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No valid fields to update'
      });
    }
    
    // Add updatedAt timestamp
    updateFields.updatedAt = new Date();
    
    const result = await collection.findOneAndUpdate(
      { _id: new ObjId(id) },
      { $set: updateFields },
      { returnDocument: 'after' }
    );
    
    if (!result) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Product updated successfully',
      data: result
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update product',
      message: error.message
    });
  }
});

/**
 * DELETE /api/products/:id
 * Delete a product
 */
router.delete('/:id', async (req, res) => {
  try {
    const db = getDB();
    const collection = db.collection('products');
    const { id } = req.params;
    const ObjId = getObjectIdClass();
    
    // Validate ObjectId
    if (!ObjId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid product ID format'
      });
    }
    
    const result = await collection.findOneAndDelete({ _id: new ObjId(id) });
    
    if (!result) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
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

module.exports = router;
