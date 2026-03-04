/**
 * DAY24: Complete Demo Script
 * 
 * Runs all operations in sequence:
 * 1. Populate products
 * 2. Run queries
 * 3. Demonstrate additional CRUD operations
 * 
 * Usage:
 *   npm run demo
 */

const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'unify_labs';
const collectionName = 'products';

const products = [
  {
    name: "Laptop Pro 15",
    category: "Electronics",
    price: 1299.99,
    stock: 25,
    specs: { color: "Silver", weight: "1.8kg", processor: "Intel i7", ram: "16GB" }
  },
  {
    name: "Wireless Mouse",
    category: "Electronics",
    price: 29.99,
    stock: 150,
    specs: { color: "Black", weight: "0.1kg", connectivity: "Bluetooth", battery: "AA x2" }
  },
  {
    name: "Office Chair",
    category: "Furniture",
    price: 249.99,
    stock: 40,
    specs: { color: "Black", weight: "12kg", material: "Leather", adjustable: true }
  },
  {
    name: "Cotton T-Shirt",
    category: "Clothing",
    price: 19.99,
    stock: 200,
    specs: { color: "Blue", weight: "0.2kg", size: "M", material: "100% Cotton" }
  },
  {
    name: "Wooden Desk",
    category: "Furniture",
    price: 399.99,
    stock: 15,
    specs: { color: "Oak", weight: "25kg", dimensions: "120x60x75cm", material: "Solid Wood" }
  }
];

async function demo() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log('\n' + '═'.repeat(70));
    console.log('  DAY24: MongoDB CRUD Operations Demo');
    console.log('═'.repeat(70) + '\n');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // STEP 1: Insert Products
    console.log('STEP 1: insertMany() - Bulk Insert Products');
    console.log('─'.repeat(70));
    
    try {
      await collection.drop();
    } catch (e) {
      // Collection doesn't exist
    }

    const insertResult = await collection.insertMany(products);
    console.log(`✅ Inserted ${Object.keys(insertResult.insertedIds).length} products\n`);

    // STEP 2: Find Electronics
    console.log('STEP 2: find() - Query Electronics');
    console.log('─'.repeat(70));
    console.log('Query: { category: "Electronics" }\n');
    
    const electronics = await collection.find({ category: "Electronics" }).toArray();
    console.log(`✅ Found ${electronics.length} Electronics:`);
    electronics.forEach(p => console.log(`   - ${p.name} ($${p.price})`));
    console.log();

    // STEP 3: Sort and Limit
    console.log('STEP 3: sort() & limit() - Top 2 Most Expensive');
    console.log('─'.repeat(70));
    console.log('Query: find().sort({ price: -1 }).limit(2)\n');
    
    const topExpensive = await collection.find().sort({ price: -1 }).limit(2).toArray();
    console.log(`✅ Top 2 Most Expensive Products:`);
    topExpensive.forEach((p, i) => console.log(`   ${i + 1}. ${p.name} - $${p.price}`));
    console.log();

    // STEP 4: Nested Object Query
    console.log('STEP 4: Nested Object Query - Black Products');
    console.log('─'.repeat(70));
    console.log('Query: { "specs.color": "Black" }\n');
    
    const blackProducts = await collection.find({ "specs.color": "Black" }).toArray();
    console.log(`✅ Found ${blackProducts.length} Black products:`);
    blackProducts.forEach(p => console.log(`   - ${p.name} (${p.category})`));
    console.log();

    // STEP 5: Update Operation
    console.log('STEP 5: updateOne() - Reduce Stock');
    console.log('─'.repeat(70));
    console.log('Update: { name: "Wireless Mouse" }, { $inc: { stock: -5 } }\n');
    
    const updateResult = await collection.updateOne(
      { name: "Wireless Mouse" },
      { $inc: { stock: -5 } }
    );
    console.log(`✅ Modified ${updateResult.modifiedCount} document`);
    
    const updatedMouse = await collection.findOne({ name: "Wireless Mouse" });
    console.log(`   New stock: ${updatedMouse.stock}\n`);

    // STEP 6: Aggregation
    console.log('STEP 6: aggregate() - Products per Category');
    console.log('─'.repeat(70));
    
    const categoryCounts = await collection.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 }, avgPrice: { $avg: "$price" } } },
      { $sort: { count: -1 } }
    ]).toArray();
    
    console.log('✅ Category Statistics:');
    categoryCounts.forEach(cat => {
      console.log(`   ${cat._id}: ${cat.count} products, Avg Price: $${cat.avgPrice.toFixed(2)}`);
    });
    console.log();

    console.log('═'.repeat(70));
    console.log('✅ Demo Complete! All operations successful.');
    console.log('═'.repeat(70) + '\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
  } finally {
    await client.close();
  }
}

demo();
