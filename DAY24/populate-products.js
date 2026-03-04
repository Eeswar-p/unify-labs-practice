/**
 * DAY24: Product Population Script
 * 
 * This script connects to MongoDB and populates the products collection
 * using insertMany() with 5 sample products across different categories.
 * 
 * Prerequisites:
 * - MongoDB running on localhost:27017
 * - npm install mongodb
 * 
 * Usage:
 *   node populate-products.js
 *   or
 *   npm run populate
 */

const { MongoClient } = require('mongodb');

// Connection configuration
const url = 'mongodb://localhost:27017';
const dbName = 'unify_labs';
const collectionName = 'products';

// Sample products data
const products = [
  {
    name: "Laptop Pro 15",
    category: "Electronics",
    price: 1299.99,
    stock: 25,
    specs: {
      color: "Silver",
      weight: "1.8kg",
      processor: "Intel i7",
      ram: "16GB"
    }
  },
  {
    name: "Wireless Mouse",
    category: "Electronics",
    price: 29.99,
    stock: 150,
    specs: {
      color: "Black",
      weight: "0.1kg",
      connectivity: "Bluetooth",
      battery: "AA x2"
    }
  },
  {
    name: "Office Chair",
    category: "Furniture",
    price: 249.99,
    stock: 40,
    specs: {
      color: "Black",
      weight: "12kg",
      material: "Leather",
      adjustable: true
    }
  },
  {
    name: "Cotton T-Shirt",
    category: "Clothing",
    price: 19.99,
    stock: 200,
    specs: {
      color: "Blue",
      weight: "0.2kg",
      size: "M",
      material: "100% Cotton"
    }
  },
  {
    name: "Wooden Desk",
    category: "Furniture",
    price: 399.99,
    stock: 15,
    specs: {
      color: "Oak",
      weight: "25kg",
      dimensions: "120x60x75cm",
      material: "Solid Wood"
    }
  }
];

async function populateProducts() {
  const client = new MongoClient(url);

  try {
    console.log('🔌 Connecting to MongoDB...');
    await client.connect();
    console.log('✅ Connected successfully\n');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Drop existing collection for fresh start
    console.log('🗑️  Dropping existing collection (if any)...');
    try {
      await collection.drop();
      console.log('✅ Collection dropped\n');
    } catch (err) {
      // Collection doesn't exist, that's fine
      console.log('ℹ️  Collection does not exist yet (fresh start)\n');
    }

    // Insert all products using insertMany()
    console.log('📦 Inserting 5 products using insertMany()...');
    const result = await collection.insertMany(products);
    
    console.log('✅ Products inserted successfully!\n');
    console.log('📊 Insert Result:');
    console.log(`   - Acknowledged: ${result.acknowledged}`);
    console.log(`   - Inserted Count: ${Object.keys(result.insertedIds).length}`);
    console.log(`   - Inserted IDs: ${Object.keys(result.insertedIds).length} documents\n`);

    // Verify insertion
    const count = await collection.countDocuments();
    console.log(`✅ Verification: ${count} documents in collection\n`);

    // Display inserted products
    console.log('📄 Inserted Products:');
    console.log('─'.repeat(70));
    
    const allProducts = await collection.find({}).toArray();
    allProducts.forEach((product, index) => {
      console.log(`\n${index + 1}. ${product.name}`);
      console.log(`   Category: ${product.category}`);
      console.log(`   Price: $${product.price}`);
      console.log(`   Stock: ${product.stock}`);
      console.log(`   Specs: ${JSON.stringify(product.specs, null, 2).replace(/\n/g, '\n   ')}`);
    });
    
    console.log('\n' + '─'.repeat(70));
    console.log('\n✅ Population complete! Ready for queries.\n');

  } catch (error) {
    console.error('\n❌ Error during population:');
    console.error(error.message);
    console.error('\n💡 Troubleshooting:');
    console.error('   1. Ensure MongoDB service is running');
    console.error('   2. Check connection URL: mongodb://localhost:27017');
    console.error('   3. Install mongodb package: npm install mongodb\n');
  } finally {
    await client.close();
    console.log('🔌 Connection closed\n');
  }
}

// Run the population
populateProducts();
