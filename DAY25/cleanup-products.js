/**
 * DAY25: Delete/Cleanup Script
 * 
 * Demonstrates:
 * 1. Insert a test product with stock: 0
 * 2. Delete all zero stock items using deleteMany()
 * 3. Verify deletion with countDocuments()
 * 
 * Prerequisites:
 * - MongoDB running with populated products collection
 * - npm install mongodb
 * 
 * Usage:
 *   node cleanup-products.js
 *   or
 *   npm run cleanup
 */

const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'unify_labs';
const collectionName = 'products';

async function cleanupProducts() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log('\n' + '═'.repeat(70));
    console.log('  DAY25: Cleanup Operations (deleteMany)');
    console.log('═'.repeat(70) + '\n');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Step 1: Count before
    console.log('STEP 1: Initial Count');
    console.log('─'.repeat(70));
    const countBefore = await collection.countDocuments();
    const zeroStockBefore = await collection.countDocuments({ stock: 0 });
    
    console.log(`Total products: ${countBefore}`);
    console.log(`Products with stock: 0: ${zeroStockBefore}\n`);

    // Step 2: Insert test item with zero stock
    console.log('STEP 2: Insert Test Item (stock: 0)');
    console.log('─'.repeat(70));
    const testProduct = {
      name: "Test Out of Stock Item",
      category: "Electronics",
      price: 49.99,
      stock: 0,
      specs: { color: "Gray", weight: "0.5kg" }
    };

    const insertResult = await collection.insertOne(testProduct);
    console.log(`✅ Inserted test product with _id: ${insertResult.insertedId}`);
    console.log(`   Name: ${testProduct.name}`);
    console.log(`   Stock: ${testProduct.stock}\n`);

    // Step 3: Count after insertion
    console.log('STEP 3: Count After Insertion');
    console.log('─'.repeat(70));
    const countAfterInsert = await collection.countDocuments();
    const zeroStockAfterInsert = await collection.countDocuments({ stock: 0 });
    
    console.log(`Total products: ${countAfterInsert}`);
    console.log(`Products with stock: 0: ${zeroStockAfterInsert}\n`);

    // Step 4: Show items to be deleted
    console.log('STEP 4: Items to be Deleted');
    console.log('─'.repeat(70));
    const itemsToDelete = await collection.find({ stock: 0 }).toArray();
    
    console.log(`Found ${itemsToDelete.length} item(s) with zero stock:\n`);
    itemsToDelete.forEach((item, index) => {
      console.log(`  ${index + 1}. ${item.name}`);
      console.log(`     Category: ${item.category}`);
      console.log(`     Stock: ${item.stock}`);
      console.log(`     Price: $${item.price}\n`);
    });

    // Step 5: Delete all zero stock items
    console.log('STEP 5: Delete Zero Stock Items');
    console.log('─'.repeat(70));
    console.log('Query: { stock: 0 }');
    console.log('Operation: deleteMany()\n');

    const deleteResult = await collection.deleteMany({ stock: 0 });
    
    console.log(`✅ Acknowledged: ${deleteResult.acknowledged}`);
    console.log(`✅ Deleted Count: ${deleteResult.deletedCount} document(s)\n`);

    // Step 6: Verify deletion
    console.log('STEP 6: Verification');
    console.log('─'.repeat(70));
    const countAfterDelete = await collection.countDocuments();
    const zeroStockAfterDelete = await collection.countDocuments({ stock: 0 });
    
    console.log(`Total products now: ${countAfterDelete}`);
    console.log(`Products with stock: 0: ${zeroStockAfterDelete}`);
    console.log(`Difference: ${countBefore - countAfterDelete} items deleted\n`);

    // Step 7: Summary
    console.log('STEP 7: Summary');
    console.log('═'.repeat(70));
    console.log(`Started with: ${countBefore} products`);
    console.log(`Inserted: 1 test product (stock: 0)`);
    console.log(`Deleted: ${deleteResult.deletedCount} product(s)`);
    console.log(`Ended with: ${countAfterDelete} products`);
    console.log('\n✅ Cleanup operations completed successfully!\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
  } finally {
    await client.close();
  }
}

cleanupProducts();
