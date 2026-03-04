/**
 * DAY25: Complete Demo Script
 * 
 * Runs everything:
 * 1. Updates (inc, set, push)
 * 2. Cleanup (delete)
 * 3. Final verification
 * 
 * Usage:
 *   npm run all
 *   or
 *   npm run demo
 */

const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'unify_labs';
const collectionName = 'products';

async function runDemo() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log('\n' + '═'.repeat(70));
    console.log('  DAY25: Complete Update & Delete Operations Demo');
    console.log('═'.repeat(70) + '\n');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Phase 1: Show initial state
    console.log('PHASE 1: Initial State');
    console.log('═'.repeat(70));
    
    const initialCount = await collection.countDocuments();
    const electronicsInitial = await collection.find({category: "Electronics"}).toArray();
    
    console.log(`Total products: ${initialCount}`);
    console.log('Electronics products:');
    electronicsInitial.forEach(p => {
      console.log(`  ${p.name}: $${p.price}, Stock: ${p.stock}`);
    });
    console.log();

    // Phase 2: $inc - Increase Electronics price
    console.log('PHASE 2: $inc - Increase Electronics Price by +10');
    console.log('═'.repeat(70));
    
    const incResult = await collection.updateMany(
      { category: "Electronics" },
      { $inc: { price: 10 } }
    );
    
    console.log(`✅ Modified ${incResult.modifiedCount} documents`);
    
    const electronicsAfterInc = await collection.find({category: "Electronics"}).toArray();
    console.log('Updated Electronics:');
    electronicsAfterInc.forEach(p => {
      console.log(`  ${p.name}: $${p.price}`);
    });
    console.log();

    // Phase 3: $set - Feature expensive items
    console.log('PHASE 3: $set - Feature Items Priced > 500');
    console.log('═'.repeat(70));
    
    const setResult = await collection.updateMany(
      { price: { $gt: 500 } },
      { $set: { featured: true } }
    );
    
    console.log(`✅ Modified ${setResult.modifiedCount} documents`);
    
    const featured = await collection.find({ featured: true }).toArray();
    console.log('Featured items:');
    featured.forEach(p => {
      console.log(`  ${p.name}: $${p.price}`);
    });
    console.log();

    // Phase 4: $push - Add tags
    console.log('PHASE 4: $push - Add Tags to Products');
    console.log('═'.repeat(70));
    
    const pushResult1 = await collection.updateOne(
      { name: "Wireless Mouse" },
      { $push: { tags: "new-arrival" } }
    );
    console.log(`✅ Added "new-arrival" tag to Wireless Mouse`);
    
    const pushResult2 = await collection.updateOne(
      { name: "Laptop Pro 15" },
      { $push: { tags: { $each: ["hot-deal", "premium"] } } }
    );
    console.log(`✅ Added ["hot-deal", "premium"] tags to Laptop Pro 15`);
    
    const tagged = await collection.find({ tags: { $exists: true } }).toArray();
    console.log('\nItems with tags:');
    tagged.forEach(p => {
      console.log(`  ${p.name}: ${JSON.stringify(p.tags)}`);
    });
    console.log();

    // Phase 5: Insert test item with zero stock
    console.log('PHASE 5: Insert Test Item with Zero Stock');
    console.log('═'.repeat(70));
    
    const testItem = {
      name: "Test Discontinued Product",
      category: "Electronics",
      price: 99.99,
      stock: 0,
      specs: { color: "Black" }
    };
    
    const insertResult = await collection.insertOne(testItem);
    console.log(`✅ Inserted test product: ${testItem.name} (stock: 0)\n`);

    // Phase 6: Show items before deletion
    console.log('PHASE 6: Items Before Deletion');
    console.log('═'.repeat(70));
    
    const beforeDelete = await collection.countDocuments();
    const zeroStockBefore = await collection.countDocuments({ stock: 0 });
    
    console.log(`Total products: ${beforeDelete}`);
    console.log(`Products with zero stock: ${zeroStockBefore}`);
    
    const zeroStockItems = await collection.find({ stock: 0 }).toArray();
    console.log('\nZero stock items:');
    zeroStockItems.forEach(p => {
      console.log(`  ${p.name} (stock: ${p.stock})`);
    });
    console.log();

    // Phase 7: Delete zero stock items
    console.log('PHASE 7: Delete Zero Stock Items');
    console.log('═'.repeat(70));
    
    const deleteResult = await collection.deleteMany({ stock: 0 });
    console.log(`✅ Deleted ${deleteResult.deletedCount} item(s) with zero stock\n`);

    // Phase 8: Final verification
    console.log('PHASE 8: Final Verification');
    console.log('═'.repeat(70));
    
    const afterDelete = await collection.countDocuments();
    const zeroStockAfter = await collection.countDocuments({ stock: 0 });
    const featuredCount = await collection.countDocuments({ featured: true });
    const taggedCount = await collection.countDocuments({ tags: { $exists: true } });

    console.log('Final Counts:');
    console.log(`  Total products: ${afterDelete}`);
    console.log(`  Featured items: ${featuredCount}`);
    console.log(`  Items with tags: ${taggedCount}`);
    console.log(`  Zero stock items: ${zeroStockAfter}`);
    console.log();

    // Show final state
    console.log('All Products (Final State):');
    console.log('─'.repeat(70));
    const allProducts = await collection.find({}).toArray();
    allProducts.forEach((p, i) => {
      console.log(`\n${i + 1}. ${p.name}`);
      console.log(`   Category: ${p.category}`);
      console.log(`   Price: $${p.price}`);
      console.log(`   Stock: ${p.stock}`);
      if (p.featured) console.log(`   Featured: ${p.featured}`);
      if (p.tags) console.log(`   Tags: ${JSON.stringify(p.tags)}`);
    });

    console.log('\n' + '═'.repeat(70));
    console.log('✅ Demo Complete! All operations successful!\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
  } finally {
    await client.close();
  }
}

runDemo();
