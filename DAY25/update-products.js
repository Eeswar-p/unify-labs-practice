/**
 * DAY25: Update Products Script
 * 
 * Demonstrates all update operations:
 * 1. $inc - increase electronics price by 10
 * 2. $set - set featured: true for expensive items
 * 3. $push - add tags to specific products
 * 
 * Prerequisites:
 * - MongoDB running with populated products collection (DAY24)
 * - npm install mongodb
 * 
 * Usage:
 *   node update-products.js
 *   or
 *   npm run updates
 */

const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'unify_labs';
const collectionName = 'products';

async function updateProducts() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log('\n' + '═'.repeat(70));
    console.log('  DAY25: Update Operations');
    console.log('═'.repeat(70) + '\n');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Step 1: Show initial state
    console.log('STEP 1: Initial State');
    console.log('─'.repeat(70));
    const initialCount = await collection.countDocuments();
    const electronicsCount = await collection.countDocuments({ category: "Electronics" });
    console.log(`Total products: ${initialCount}`);
    console.log(`Electronics: ${electronicsCount}\n`);

    const initialElectronics = await collection.find({ category: "Electronics" }).toArray();
    console.log('Electronics before update:');
    initialElectronics.forEach(p => {
      console.log(`  ${p.name}: $${p.price}`);
    });
    console.log();

    // Step 2: Update #1 - $inc (Increase Electronics price by 10)
    console.log('STEP 2: Update #1 - $inc (Increase Electronics price by +10)');
    console.log('─'.repeat(70));
    console.log('Query: { category: "Electronics" }');
    console.log('Update: { $inc: { price: 10 } }\n');

    const updateResult1 = await collection.updateMany(
      { category: "Electronics" },
      { $inc: { price: 10 } }
    );

    console.log(`✅ Matched: ${updateResult1.matchedCount} documents`);
    console.log(`✅ Modified: ${updateResult1.modifiedCount} documents\n`);

    const updatedElectronics = await collection.find({ category: "Electronics" }).toArray();
    console.log('Electronics after $inc:');
    updatedElectronics.forEach(p => {
      console.log(`  ${p.name}: $${p.price}`);
    });
    console.log();

    // Step 3: Update #2 - $set (Feature expensive items)
    console.log('STEP 3: Update #2 - $set (Feature items priced > 500)');
    console.log('─'.repeat(70));
    console.log('Query: { price: { $gt: 500 } }');
    console.log('Update: { $set: { featured: true } }\n');

    const updateResult2 = await collection.updateMany(
      { price: { $gt: 500 } },
      { $set: { featured: true } }
    );

    console.log(`✅ Matched: ${updateResult2.matchedCount} documents`);
    console.log(`✅ Modified: ${updateResult2.modifiedCount} documents\n`);

    const featuredItems = await collection.find({ featured: true }).toArray();
    console.log('Featured items:');
    featuredItems.forEach(p => {
      console.log(`  ${p.name}: $${p.price} (featured: ${p.featured})`);
    });
    console.log();

    // Step 4: Update #3 - $push (Add tags)
    console.log('STEP 4: Update #3 - $push (Add tags to specific items)');
    console.log('─'.repeat(70));
    
    // Add single tag to Mouse
    console.log('Adding "new-arrival" tag to Wireless Mouse...');
    const updateResult3a = await collection.updateOne(
      { name: "Wireless Mouse" },
      { $push: { tags: "new-arrival" } }
    );
    console.log(`✅ Modified: ${updateResult3a.modifiedCount} document\n`);

    // Add multiple tags to Laptop
    console.log('Adding multiple tags to Laptop Pro 15...');
    const updateResult3b = await collection.updateOne(
      { name: "Laptop Pro 15" },
      { $push: { tags: { $each: ["hot-deal", "premium", "best-seller"] } } }
    );
    console.log(`✅ Modified: ${updateResult3b.modifiedCount} document\n`);

    // Show items with tags
    const itemsWithTags = await collection.find({ tags: { $exists: true } }).toArray();
    console.log('Items with tags:');
    itemsWithTags.forEach(p => {
      console.log(`  ${p.name}: ${JSON.stringify(p.tags)}`);
    });
    console.log();

    // Step 5: Final verification
    console.log('STEP 5: Final Verification');
    console.log('─'.repeat(70));
    const finalCount = await collection.countDocuments();
    const featuredCount = await collection.countDocuments({ featured: true });
    const taggedCount = await collection.countDocuments({ tags: { $exists: true } });

    console.log(`Total products: ${finalCount}`);
    console.log(`Featured items: ${featuredCount}`);
    console.log(`Items with tags: ${taggedCount}\n`);

    console.log('═'.repeat(70));
    console.log('✅ All update operations completed successfully!\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
  } finally {
    await client.close();
  }
}

updateProducts();
