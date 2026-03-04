/**
 * DAY23: MongoDB Setup Verification Script
 * 
 * This script connects to your local MongoDB instance and verifies:
 * 1. Connection to localhost:27017
 * 2. Existence of 'unify_labs' database
 * 3. Existence of 'interns' collection
 * 4. Presence of at least 3 documents
 * 
 * Prerequisites:
 * - MongoDB Community Server installed and running
 * - Node.js installed
 * - mongodb package installed: npm install mongodb
 * 
 * Usage:
 *   node verify-setup.js
 */

const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'unify_labs';
const collectionName = 'interns';

async function verifySetup() {
  try {
    console.log('🔍 Starting MongoDB Setup Verification...\n');

    // Step 1: Connect to MongoDB
    console.log('📡 Connecting to MongoDB at localhost:27017...');
    await client.connect();
    console.log('✅ Successfully connected to MongoDB\n');

    // Step 2: Verify Database
    const db = client.db(dbName);
    const adminDb = client.db().admin();
    const databases = await adminDb.listDatabases();
    
    const dbExists = databases.databases.some(d => d.name === dbName);
    
    if (dbExists) {
      console.log(`✅ Database '${dbName}' exists`);
    } else {
      console.log(`❌ Database '${dbName}' not found`);
      return;
    }

    // Step 3: Verify Collection
    const collections = await db.listCollections().toArray();
    const collectionExists = collections.some(c => c.name === collectionName);
    
    if (collectionExists) {
      console.log(`✅ Collection '${collectionName}' exists`);
    } else {
      console.log(`❌ Collection '${collectionName}' not found`);
      return;
    }

    // Step 4: Count Documents
    const collection = db.collection(collectionName);
    const count = await collection.countDocuments();
    
    console.log(`✅ Found ${count} document(s) in '${collectionName}' collection\n`);

    if (count >= 3) {
      console.log('✅ Minimum 3 documents requirement met!\n');
    } else {
      console.log(`⚠️  Only ${count} document(s) found. Please insert at least 3 documents.\n`);
    }

    // Step 5: Display Sample Documents
    console.log('📄 Sample Documents:');
    console.log('─'.repeat(60));
    
    const documents = await collection.find({}).limit(5).toArray();
    documents.forEach((doc, index) => {
      console.log(`\nDocument #${index + 1}:`);
      console.log(JSON.stringify(doc, null, 2));
    });
    
    console.log('\n' + '─'.repeat(60));

    // Step 6: Verify Required Fields
    console.log('\n🔍 Verifying required fields (name, role, joinedDate)...');
    
    const invalidDocs = documents.filter(doc => 
      !doc.name || !doc.role || !doc.joinedDate
    );

    if (invalidDocs.length === 0) {
      console.log('✅ All documents have required fields: name, role, joinedDate');
    } else {
      console.log(`⚠️  ${invalidDocs.length} document(s) missing required fields`);
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 VERIFICATION SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ MongoDB Connection: Success`);
    console.log(`✅ Database '${dbName}': Exists`);
    console.log(`✅ Collection '${collectionName}': Exists`);
    console.log(`✅ Document Count: ${count}`);
    console.log(`✅ All Tests: ${count >= 3 && invalidDocs.length === 0 ? 'PASSED ✅' : 'INCOMPLETE ⚠️'}`);
    console.log('='.repeat(60));

    if (count >= 3 && invalidDocs.length === 0) {
      console.log('\n🎉 Congratulations! Your MongoDB setup is complete!\n');
    } else {
      console.log('\n⚠️  Please complete the setup according to README.md\n');
    }

  } catch (error) {
    console.error('\n❌ Error during verification:');
    console.error(error.message);
    console.error('\n💡 Troubleshooting Tips:');
    console.error('   1. Ensure MongoDB service is running');
    console.error('   2. Check if MongoDB is installed correctly');
    console.error('   3. Verify connection URL: mongodb://localhost:27017');
    console.error('   4. Install mongodb package: npm install mongodb\n');
  } finally {
    // Close connection
    await client.close();
    console.log('🔌 Connection closed\n');
  }
}

// Run verification
verifySetup();
