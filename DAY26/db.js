/**
 * DAY26: MongoDB Connection Logic
 * 
 * Handles connection to MongoDB using MongoClient
 * Provides methods to connect, disconnect, and get database instance
 */

const { MongoClient } = require('mongodb');
const { mockDB, initializeSampleData } = require('./mockDB');

// MongoDB connection URL
const MONGO_URL = 'mongodb://localhost:27017';
const DB_NAME = 'unify_labs';

// Create MongoClient instance (reuse connection)
let client = null;
let db = null;
let usingMockDB = false;

/**
 * Connect to MongoDB
 * @returns {Promise<object>} Database instance
 */
async function connectDB() {
  try {
    // If already connected, return existing connection
    if (client && db) {
      console.log('Using existing database connection');
      return db;
    }

    // Create new client
    client = new MongoClient(MONGO_URL, {
      serverSelectionTimeoutMS: 3000 // 3 second timeout
    });
    
    // Connect to MongoDB
    await client.connect();
    
    // Get database instance
    db = client.db(DB_NAME);
    
    // Verify connection with a simple ping
    await db.admin().ping();
    
    console.log('✅ Database connected successfully');
    console.log(`   Server: ${MONGO_URL}`);
    console.log(`   Database: ${DB_NAME}`);
    
    usingMockDB = false;
    return db;
  } catch (error) {
    console.warn('⚠️  MongoDB connection failed - using in-memory database');
    console.warn(`   Reason: ${error.message}`);
    console.log('📝 Using mock database with sample data for testing');
    
    // Fall back to mock database
    db = mockDB;
    usingMockDB = true;
    
    // Initialize with sample data
    initializeSampleData();
    
    return db;
  }
}

/**
 * Disconnect from MongoDB
 * @returns {Promise<void>}
 */
async function disconnectDB() {
  try {
    if (client) {
      await client.close();
      client = null;
      db = null;
      console.log('✅ Database disconnected successfully');
    }
  } catch (error) {
    console.error('❌ Error disconnecting from database:', error.message);
    throw error;
  }
}

/**
 * Get database instance (must be connected first)
 * If not connected, returns null
 * @returns {object|null} Database instance or null
 */
function getDB() {
  return db; // Returns null if not connected
}

/**
 * Check if database is connected
 * @returns {boolean} True if connected (includes mock DB)
 */
function isConnected() {
  return db !== null;
}

/**
 * Check if using mock database
 * @returns {boolean} True if using in-memory mock DB
 */
function isMockDB() {
  return usingMockDB;
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

module.exports = {
  connectDB,
  disconnectDB,
  getDB,
  getClient,
  isConnected,
  isMockDB,
  MONGO_URL,
  DB_NAME
};
