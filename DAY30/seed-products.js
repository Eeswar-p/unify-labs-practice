/**
 * Product Seed Script
 * Populates the database with sample products
 */

require('dotenv').config();
const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;

const products = [
  // Electronics
  {
    name: 'Wireless Headphones',
    category: 'electronics',
    price: 79.99,
    description: 'Premium wireless headphones with noise cancellation and 30-hour battery life.',
    stock: 25,
    createdAt: new Date()
  },
  {
    name: 'Smart Watch',
    category: 'electronics',
    price: 199.99,
    description: 'Fitness tracker with heart rate monitor, GPS, and waterproof design.',
    stock: 15,
    createdAt: new Date()
  },
  {
    name: 'Laptop Stand',
    category: 'electronics',
    price: 34.99,
    description: 'Ergonomic aluminum laptop stand with adjustable height and angle.',
    stock: 40,
    createdAt: new Date()
  },
  {
    name: 'Mechanical Keyboard',
    category: 'electronics',
    price: 89.99,
    description: 'RGB backlit mechanical keyboard with customizable keys and wrist rest.',
    stock: 18,
    createdAt: new Date()
  },
  {
    name: 'Wireless Mouse',
    category: 'electronics',
    price: 29.99,
    description: 'Precision wireless mouse with ergonomic design and long battery life.',
    stock: 50,
    createdAt: new Date()
  },

  // Clothing
  {
    name: 'Cotton T-Shirt',
    category: 'clothing',
    price: 19.99,
    description: 'Comfortable 100% cotton t-shirt available in multiple colors and sizes.',
    stock: 100,
    createdAt: new Date()
  },
  {
    name: 'Denim Jeans',
    category: 'clothing',
    price: 49.99,
    description: 'Classic fit denim jeans with stretch fabric for ultimate comfort.',
    stock: 60,
    createdAt: new Date()
  },
  {
    name: 'Running Shoes',
    category: 'clothing',
    price: 89.99,
    description: 'Lightweight running shoes with cushioned sole and breathable mesh.',
    stock: 35,
    createdAt: new Date()
  },
  {
    name: 'Winter Jacket',
    category: 'clothing',
    price: 129.99,
    description: 'Insulated winter jacket with waterproof outer shell and multiple pockets.',
    stock: 20,
    createdAt: new Date()
  },
  {
    name: 'Baseball Cap',
    category: 'clothing',
    price: 14.99,
    description: 'Adjustable baseball cap with embroidered logo and curved brim.',
    stock: 75,
    createdAt: new Date()
  },

  // Books
  {
    name: 'JavaScript: The Complete Guide',
    category: 'books',
    price: 39.99,
    description: 'Comprehensive guide to modern JavaScript programming with practical examples.',
    stock: 30,
    createdAt: new Date()
  },
  {
    name: 'Design Patterns',
    category: 'books',
    price: 44.99,
    description: 'Essential software design patterns every developer should know.',
    stock: 25,
    createdAt: new Date()
  },
  {
    name: 'The Art of API Design',
    category: 'books',
    price: 34.99,
    description: 'Best practices for designing clean, maintainable, and scalable APIs.',
    stock: 20,
    createdAt: new Date()
  },
  {
    name: 'Clean Code',
    category: 'books',
    price: 42.99,
    description: 'A handbook of agile software craftsmanship and best coding practices.',
    stock: 28,
    createdAt: new Date()
  },

  // Home & Garden
  {
    name: 'Coffee Maker',
    category: 'home',
    price: 79.99,
    description: 'Programmable coffee maker with thermal carafe and auto-brew timer.',
    stock: 22,
    createdAt: new Date()
  },
  {
    name: 'Indoor Plant Set',
    category: 'home',
    price: 29.99,
    description: 'Set of 3 low-maintenance indoor plants with decorative pots.',
    stock: 45,
    createdAt: new Date()
  },
  {
    name: 'Throw Pillows (Set of 2)',
    category: 'home',
    price: 24.99,
    description: 'Soft decorative throw pillows with removable covers in various colors.',
    stock: 55,
    createdAt: new Date()
  },
  {
    name: 'LED Desk Lamp',
    category: 'home',
    price: 39.99,
    description: 'Adjustable LED desk lamp with touch controls and USB charging port.',
    stock: 32,
    createdAt: new Date()
  },

  // Sports
  {
    name: 'Yoga Mat',
    category: 'sports',
    price: 29.99,
    description: 'Non-slip yoga mat with extra cushioning and carrying strap.',
    stock: 40,
    createdAt: new Date()
  },
  {
    name: 'Resistance Bands Set',
    category: 'sports',
    price: 19.99,
    description: 'Set of 5 resistance bands with different tension levels and carrying bag.',
    stock: 50,
    createdAt: new Date()
  },
  {
    name: 'Water Bottle',
    category: 'sports',
    price: 14.99,
    description: 'Insulated stainless steel water bottle keeps drinks cold for 24 hours.',
    stock: 80,
    createdAt: new Date()
  },
  {
    name: 'Dumbbell Set',
    category: 'sports',
    price: 59.99,
    description: 'Adjustable dumbbell set with multiple weight plates and storage rack.',
    stock: 15,
    createdAt: new Date()
  },
  {
    name: 'Jump Rope',
    category: 'sports',
    price: 12.99,
    description: 'Speed jump rope with comfortable handles and adjustable length.',
    stock: 65,
    createdAt: new Date()
  }
];

async function seedProducts() {
  let client;
  
  try {
    console.log('🔗 Connecting to MongoDB...');
    client = await MongoClient.connect(MONGODB_URI);
    
    const db = client.db('ecommerce');
    const productsCollection = db.collection('products');
    
    // Clear existing products
    console.log('🗑️  Clearing existing products...');
    await productsCollection.deleteMany({});
    
    // Insert new products
    console.log('📦 Inserting products...');
    const result = await productsCollection.insertMany(products);
    
    console.log(`✅ Successfully seeded ${result.insertedCount} products!`);
    console.log('\nProducts by category:');
    console.log(`  Electronics: 5`);
    console.log(`  Clothing: 5`);
    console.log(`  Books: 4`);
    console.log(`  Home & Garden: 4`);
    console.log(`  Sports: 5`);
    
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log('\n👋 Database connection closed');
    }
  }
}

// Run seed
seedProducts();
