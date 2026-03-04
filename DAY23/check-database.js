/**
 * DAY23: Quick Database Check Script
 * 
 * A simpler script to quickly check if your database and collection exist
 * without full verification.
 * 
 * Prerequisites:
 * - MongoDB running locally
 * - npm install mongodb
 * 
 * Usage:
 *   npm run check
 */

const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'unify_labs';
const collectionName = 'interns';

async function quickCheck() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB\n');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    
    const count = await collection.countDocuments();
    console.log(`📊 Found ${count} document(s) in '${collectionName}' collection`);

    if (count > 0) {
      console.log('\n📄 First document:');
      const first = await collection.findOne();
      console.log(JSON.stringify(first, null, 2));
    }

  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await client.close();
  }
}

quickCheck();
