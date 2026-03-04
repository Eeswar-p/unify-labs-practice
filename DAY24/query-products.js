/**
 * DAY24: Query Examples Script
 * 
 * Demonstrates the required queries:
 * 1. Find all products where category is 'Electronics'
 * 2. Sort products by price descending and limit to 2
 * 
 * Prerequisites:
 * - MongoDB running with populated products collection
 * - Run populate-products.js first
 * 
 * Usage:
 *   node query-products.js
 *   or
 *   npm run queries
 */

const { MongoClient } = require('mongodb');

// Connection configuration
const url = 'mongodb://localhost:27017';
const dbName = 'unify_labs';
const collectionName = 'products';

async function runQueries() {
  const client = new MongoClient(url);

  try {
    console.log('🔌 Connecting to MongoDB...');
    await client.connect();
    console.log('✅ Connected successfully\n');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Verify collection has data
    const totalCount = await collection.countDocuments();
    console.log(`📊 Total products in collection: ${totalCount}\n`);

    if (totalCount === 0) {
      console.log('⚠️  No products found. Run populate-products.js first!\n');
      return;
    }

    console.log('═'.repeat(70));
    console.log('QUERY 1: Find all Electronics');
    console.log('═'.repeat(70));
    console.log('Query: db.products.find({ category: "Electronics" })\n');

    const electronics = await collection.find({ category: "Electronics" }).toArray();
    
    console.log(`✅ Found ${electronics.length} Electronics product(s):\n`);
    electronics.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}`);
      console.log(`   Price: $${product.price}`);
      console.log(`   Stock: ${product.stock}`);
      console.log(`   Specs: ${JSON.stringify(product.specs)}\n`);
    });

    console.log('═'.repeat(70));
    console.log('QUERY 2: Top 2 Most Expensive Products');
    console.log('═'.repeat(70));
    console.log('Query: db.products.find().sort({ price: -1 }).limit(2)\n');

    const topExpensive = await collection.find()
      .sort({ price: -1 })
      .limit(2)
      .toArray();
    
    console.log(`✅ Top 2 most expensive products:\n`);
    topExpensive.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}`);
      console.log(`   Category: ${product.category}`);
      console.log(`   Price: $${product.price} 💰`);
      console.log(`   Stock: ${product.stock}`);
      console.log(`   Specs: ${JSON.stringify(product.specs)}\n`);
    });

    console.log('═'.repeat(70));
    console.log('BONUS QUERIES');
    console.log('═'.repeat(70));

    // Bonus Query 1: All categories
    console.log('\n📂 Products by Category:\n');
    const categories = await collection.distinct('category');
    for (const category of categories) {
      const count = await collection.countDocuments({ category });
      console.log(`   ${category}: ${count} product(s)`);
    }

    // Bonus Query 2: Price range
    console.log('\n💵 Price Range:\n');
    const priceStats = await collection.aggregate([
      {
        $group: {
          _id: null,
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
          avgPrice: { $avg: "$price" }
        }
      }
    ]).toArray();
    
    if (priceStats.length > 0) {
      console.log(`   Minimum: $${priceStats[0].minPrice.toFixed(2)}`);
      console.log(`   Maximum: $${priceStats[0].maxPrice.toFixed(2)}`);
      console.log(`   Average: $${priceStats[0].avgPrice.toFixed(2)}`);
    }

    // Bonus Query 3: Total inventory value
    console.log('\n📦 Inventory Statistics:\n');
    const inventoryStats = await collection.aggregate([
      {
        $group: {
          _id: null,
          totalItems: { $sum: "$stock" },
          totalValue: { $sum: { $multiply: ["$price", "$stock"] } }
        }
      }
    ]).toArray();
    
    if (inventoryStats.length > 0) {
      console.log(`   Total Items in Stock: ${inventoryStats[0].totalItems}`);
      console.log(`   Total Inventory Value: $${inventoryStats[0].totalValue.toFixed(2)}`);
    }

    console.log('\n' + '═'.repeat(70));
    console.log('✅ All queries completed successfully!\n');

  } catch (error) {
    console.error('\n❌ Error during queries:');
    console.error(error.message);
    console.error('\n💡 Troubleshooting:');
    console.error('   1. Ensure MongoDB service is running');
    console.error('   2. Run populate-products.js first');
    console.error('   3. Check collection name is correct\n');
  } finally {
    await client.close();
    console.log('🔌 Connection closed\n');
  }
}

// Run the queries
runQueries();
