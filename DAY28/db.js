/**
 * DAY28: MongoDB Atlas Connection Module
 * 
 * Updated to use MongoDB Atlas cloud database instead of local MongoDB
 * Uses environment variables for secure credential storage
 */

require('dotenv').config();
const { MongoClient } = require('mongodb');

// ============================================================================
// ATLAS CONNECTION CONFIGURATION
// ============================================================================

// Get connection string from environment variable
// Format: mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
const MONGO_URL = process.env.MONGO_URL || 'mongodb+srv://user:password@cluster.mongodb.net/?retryWrites=true&w=majority';

// Database name
const DB_NAME = process.env.DB_NAME || 'unify_labs';

// Connection state
let db = null;
let client = null;

/**
 * Connect to MongoDB Atlas
 * @returns {Promise<object>} Database instance
 */
async function connectDB() {
  try {
    // Reuse existing connection if available
    if (client && db) {
      console.log('ℹ️  Using existing Atlas connection');
      return db;
    }

    // Validate connection string exists
    if (!process.env.MONGO_URL) {
      throw new Error('MONGO_URL environment variable not set. Please create .env file with MongoDB Atlas connection string.');
    }

    // Create MongoClient with Atlas connection string
    client = new MongoClient(MONGO_URL, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000
    });
    
    // Connect to Atlas cluster
    console.log('🔗 Connecting to MongoDB Atlas...');
    await client.connect();
    
    // Get database instance
    db = client.db(DB_NAME);
    
    // Verify connection with ping
    await db.admin().ping();
    
    console.log('✅ MongoDB Atlas Connected Successfully');
    console.log(`   Cluster: ${MONGO_URL.split('@')[1].split('.')[0]}`);
    console.log(`   Database: ${DB_NAME}`);
    console.log(`   Connection: MongoDB Atlas (Cloud)\n`);
    
    return db;
  } catch (error) {
    console.error('❌ MongoDB Atlas Connection Error');
    console.error(`   ${error.message}`);
    
    // Helpful error messages
    if (error.message.includes('authentication failed')) {
      console.error('   💡 Fix: Check username and password in .env file');
    } else if (error.message.includes('IP address')) {
      console.error('   💡 Fix: Add your IP to Network Access in Atlas');
    } else if (error.message.includes('MONGO_URL')) {
      console.error('   💡 Fix: Create .env file with MONGO_URL from Atlas');
    }
    
    throw error;
  }
}

/**
 * Disconnect from MongoDB Atlas
 * @returns {Promise<void>}
 */
async function disconnectDB() {
  try {
    if (client) {
      await client.close();
      client = null;
      db = null;
      console.log('✅ Disconnected from MongoDB Atlas');
    }
  } catch (error) {
    console.error('❌ Error disconnecting from Atlas:', error.message);
    throw error;
  }
}

/**
 * Get database instance
 * @returns {object} Database instance
 * @throws {Error} If database not connected
 */
function getDB() {
  if (!db) {
    throw new Error(
      'Database not connected. Call connectDB() first.\n' +
      'Make sure .env file contains MONGO_URL with your Atlas connection string.'
    );
  }
  return db;
}

/**
 * Get MongoClient instance
 * @returns {object} MongoClient instance
 */
function getClient() {
  if (!client) {
    throw new Error('MongoClient not initialized. Call connectDB() first.');
  }
  return client;
}

/**
 * Check if connected to Atlas
 * @returns {boolean} Connection status
 */
function isConnected() {
  return db !== null && client !== null;
}

// ============================================================================
// EXAMPLE: Testing Your Atlas Connection
// ============================================================================

/**
 * Test Atlas connection (uncomment to run)
 */
async function testAtlasConnection() {
  try {
    console.log('🧪 Testing MongoDB Atlas Connection...\n');
    
    const testDb = await connectDB();
    console.log('✅ Connection test passed!\n');
    
    const collection = testDb.collection('test');
    
    // Test CREATE
    const insertRes = await collection.insertOne({ message: 'Hello Atlas', createdAt: new Date() });
    console.log('✅ CREATE test passed - Document ID:', insertRes.insertedId);
    
    // Test READ
    const found = await collection.findOne({ _id: insertRes.insertedId });
    console.log('✅ READ test passed - Found:', found.message);
    
    // Test DELETE
    const deleteRes = await collection.deleteOne({ _id: insertRes.insertedId });
    console.log('✅ DELETE test passed - Removed', deleteRes.deletedCount, 'document\n');
    
    await disconnectDB();
    
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
  }
}

// Uncomment to run test when this file is executed directly
// if (require.main === module) {
//   testAtlasConnection();
// }

// ============================================================================
// EXPORTS
// ============================================================================

module.exports = {
  connectDB,
  disconnectDB,
  getDB,
  getClient,
  isConnected,
  MONGO_URL,
  DB_NAME,
  testAtlasConnection
};
