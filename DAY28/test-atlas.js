/**
 * DAY28: Test MongoDB Atlas Connection
 * 
 * Run this script to verify your Atlas connection is working correctly
 * Before running: Create .env file with MONGO_URL from your Atlas cluster
 * 
 * Usage:
 *   npm test
 *   or
 *   node test-atlas.js
 */

require('dotenv').config();
const { connectDB, disconnectDB, testAtlasConnection } = require('./db');
const { ObjectId } = require('mongodb');

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Test 1: Connection Test
 * Verify we can connect to Atlas cluster
 */
async function testConnection() {
  log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
  log('TEST 1: MongoDB Atlas Connection', 'cyan');
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
  
  try {
    const db = await connectDB();
    log('✅ Connected to MongoDB Atlas', 'green');
    return db;
  } catch (error) {
    log('❌ Connection failed: ' + error.message, 'red');
    log('Troubleshooting:', 'yellow');
    log('  1. Create .env file in project root', 'yellow');
    log('  2. Add MONGO_URL from Atlas Dashboard → Connect → Drivers', 'yellow');
    log('  3. Replace <username> and <password> with database user credentials', 'yellow');
    log('  4. Check Network Access in Atlas allows your IP', 'yellow');
    process.exit(1);
  }
}

/**
 * Test 2: Create Test Data
 * Insert sample products into Atlas
 */
async function testCreate(db) {
  log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
  log('TEST 2: CREATE - Insert Products into Atlas', 'cyan');
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
  
  try {
    const collection = db.collection('products');
    
    // Clear existing test data
    await collection.deleteMany({ name: { $regex: 'Test Product' } });
    log('Cleared previous test data', 'yellow');
    
    // Insert test products
    const testProducts = [
      { name: 'Test Product 1', price: 29.99, stock: 100, createdAt: new Date() },
      { name: 'Test Product 2', price: 49.99, stock: 50, createdAt: new Date() },
      { name: 'Test Product 3', price: 99.99, stock: 25, createdAt: new Date() }
    ];
    
    const result = await collection.insertMany(testProducts);
    
    log(`✅ Created ${result.insertedIds.length} products in Atlas`, 'green');
    log(`   Product IDs: ${Object.values(result.insertedIds).slice(0, 2).join(', ')}...`, 'green');
    
    return result.insertedIds;
  } catch (error) {
    log('❌ CREATE test failed: ' + error.message, 'red');
    process.exit(1);
  }
}

/**
 * Test 3: Read Test Data
 * Fetch products from Atlas
 */
async function testRead(db) {
  log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
  log('TEST 3: READ - Fetch Products from Atlas', 'cyan');
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
  
  try {
    const collection = db.collection('products');
    
    // Find all test products
    const products = await collection.find({ name: { $regex: 'Test Product' } }).toArray();
    
    log(`✅ Retrieved ${products.length} products from Atlas`, 'green');
    
    // Display first product details
    if (products.length > 0) {
      const product = products[0];
      log(`   Sample: ${product.name} - $${product.price} (Stock: ${product.stock})`, 'green');
    }
    
    return products;
  } catch (error) {
    log('❌ READ test failed: ' + error.message, 'red');
    process.exit(1);
  }
}

/**
 * Test 4: Update Test Data
 * Modify product in Atlas
 */
async function testUpdate(db, productIds) {
  log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
  log('TEST 4: UPDATE - Modify Product in Atlas', 'cyan');
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
  
  try {
    const collection = db.collection('products');
    const firstId = productIds[Object.keys(productIds)[0]];
    
    // Update stock of first product
    const result = await collection.findOneAndUpdate(
      { _id: firstId },
      {
        $set: {
          stock: 200,
          updatedAt: new Date()
        }
      },
      { returnDocument: 'after' }
    );
    
    log(`✅ Updated product in Atlas`, 'green');
    log(`   Product: ${result.value.name}`, 'green');
    log(`   New Stock: ${result.value.stock}`, 'green');
    
  } catch (error) {
    log('❌ UPDATE test failed: ' + error.message, 'red');
    process.exit(1);
  }
}

/**
 * Test 5: Delete Test Data
 * Remove products from Atlas
 */
async function testDelete(db) {
  log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
  log('TEST 5: DELETE - Remove Products from Atlas', 'cyan');
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
  
  try {
    const collection = db.collection('products');
    
    // Delete all test products
    const result = await collection.deleteMany({ name: { $regex: 'Test Product' } });
    
    log(`✅ Deleted ${result.deletedCount} products from Atlas`, 'green');
    
  } catch (error) {
    log('❌ DELETE test failed: ' + error.message, 'red');
    process.exit(1);
  }
}

/**
 * Test 6: Collection Stats
 * Check database statistics
 */
async function testStats(db) {
  log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
  log('TEST 6: Database Statistics', 'cyan');
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
  
  try {
    const collection = db.collection('products');
    const count = await collection.countDocuments();
    
    log(`✅ Products in collection: ${count}`, 'green');
    
    // List sample documents if any exist
    if (count > 0) {
      const sample = await collection.findOne();
      if (sample) {
        log(`   Sample document: ${JSON.stringify(sample, null, 2).split('\n')[0]}...`, 'green');
      }
    }
    
  } catch (error) {
    log('❌ Stats test failed: ' + error.message, 'red');
  }
}

/**
 * Main Test Runner
 */
async function runAllTests() {
  log(`
╔═══════════════════════════════════════════╗
║   MongoDB Atlas Connection Test Suite    ║
╚═══════════════════════════════════════════╝
  `, 'blue');
  
  let db;
  
  try {
    // Run tests in sequence
    db = await testConnection();
    const insertedIds = await testCreate(db);
    await testRead(db);
    await testUpdate(db, insertedIds);
    await testDelete(db);
    await testStats(db);
    
    // Success summary
    log('\n' + '═'.repeat(45), 'green');
    log('✅ ALL TESTS PASSED!', 'green');
    log('═'.repeat(45), 'green');
    log('\n🎉 Your MongoDB Atlas connection is working!', 'green');
    log('\nNext steps:', 'blue');
    log('  1. npm install', 'blue');
    log('  2. Create .env file with MONGO_URL', 'blue');
    log('  3. npm start', 'blue');
    log('  4. Test endpoints with curl or Postman\n', 'blue');
    
  } catch (error) {
    log('\n' + '═'.repeat(45), 'red');
    log('❌ TEST SUITE FAILED!', 'red');
    log('═'.repeat(45), 'red');
    log('\nError: ' + error.message, 'red');
  } finally {
    // Always disconnect
    if (db) {
      try {
        await disconnectDB();
        log('\n✅ Disconnected from Atlas', 'green');
      } catch (error) {
        log('Warning: Could not disconnect cleanly', 'yellow');
      }
    }
    process.exit(0);
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  runAllTests();
}

module.exports = {
  testConnection,
  testCreate,
  testRead,
  testUpdate,
  testDelete,
  testStats,
  runAllTests
};
