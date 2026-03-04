/**
 * DAY26: In-Memory Data Store (Fallback for testing without MongoDB)
 * 
 * Provides an in-memory implementation of MongoDB-like operations
 * Use this when MongoDB is not available for testing
 */

// In-memory data storage
let products = [];
let nextId = 1;

/**
 * Generate a MongoDB-like ObjectId
 */
class MockObjectId {
  constructor(id) {
    this.id = id || `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  toString() {
    return this.id;
  }

  static isValid(id) {
    return typeof id === 'string' && id.length > 0;
  }
}

/**
 * Mock MongoDB collection
 */
class MockCollection {
  constructor(name) {
    this.name = name;
    this.data = products; // Reference to shared products array
  }

  find(filter = {}) {
    let results = [...this.data];
    
    // Apply filters
    if (Object.keys(filter).length > 0) {
      results = results.filter(item => {
        return Object.keys(filter).every(key => {
          const filterValue = filter[key];
          const itemValue = item[key];

          // Handle $gte, $lte operators
          if (typeof filterValue === 'object' && filterValue !== null) {
            if (filterValue.$gte !== undefined && itemValue < filterValue.$gte) return false;
            if (filterValue.$lte !== undefined && itemValue > filterValue.$lte) return false;
            return true;
          }

          return itemValue === filterValue;
        });
      });
    }

    // Return cursor-like object (like MongoDB)
    return {
      toArray: async () => results
    };
  }

  async findOne(filter) {
    if (filter._id) {
      const idString = filter._id.toString();
      return this.data.find(item => item._id.toString() === idString) || null;
    }

    // Find by other fields
    return this.data.find(item => {
      return Object.keys(filter).every(key => item[key] === filter[key]);
    }) || null;
  }

  async insertOne(doc) {
    const newDoc = {
      _id: new MockObjectId(),
      ...doc
    };
    this.data.push(newDoc);

    return {
      insertedId: newDoc._id,
      acknowledged: true
    };
  }

  async findOneAndUpdate(filter, update, options = {}) {
    const item = await this.findOne(filter);
    if (!item) return null;

    // Apply $set operator
    if (update.$set) {
      Object.assign(item, update.$set);
    }

    // Apply $inc operator
    if (update.$inc) {
      Object.keys(update.$inc).forEach(key => {
        item[key] = (item[key] || 0) + update.$inc[key];
      });
    }

    // Apply $push operator
    if (update.$push) {
      Object.keys(update.$push).forEach(key => {
        if (!Array.isArray(item[key])) item[key] = [];
        item[key].push(update.$push[key]);
      });
    }

    return item;
  }

  async findOneAndDelete(filter) {
    const index = this.data.findIndex(item => {
      if (filter._id) {
        return item._id.toString() === filter._id.toString();
      }
      return Object.keys(filter).every(key => item[key] === filter[key]);
    });

    if (index === -1) return null;

    const deleted = this.data.splice(index, 1)[0];
    return deleted;
  }

  async deleteMany(filter) {
    const initialLength = this.data.length;
    
    if (Object.keys(filter).length === 0) {
      // Delete all
      products.length = 0;
    } else {
      // Delete matching
      for (let i = this.data.length - 1; i >= 0; i--) {
        const item = this.data[i];
        const matches = Object.keys(filter).every(key => item[key] === filter[key]);
        if (matches) {
          this.data.splice(i, 1);
        }
      }
    }

    return {
      deletedCount: initialLength - this.data.length,
      acknowledged: true
    };
  }
}

/**
 * Mock MongoDB database
 */
class MockDB {
  collection(name) {
    return new MockCollection(name);
  }
  
  admin() {
    return {
      ping: async () => ({ ok: 1 })
    };
  }
}

// Create mock database instance
const mockDB = new MockDB();

// Initialize with sample data
function initializeSampleData() {
  if (products.length === 0) {
    const sampleProducts = [
      {
        _id: new MockObjectId(),
        name: 'Laptop Pro',
        price: 1299.99,
        category: 'Electronics',
        description: 'High-performance laptop for professionals',
        stock: 15,
        featured: true,
        tags: ['laptop', 'professional', 'high-end'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new MockObjectId(),
        name: 'Wireless Mouse',
        price: 29.99,
        category: 'Accessories',
        description: 'Ergonomic wireless mouse',
        stock: 50,
        featured: false,
        tags: ['mouse', 'wireless', 'ergonomic'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new MockObjectId(),
        name: 'USB-C Hub',
        price: 49.99,
        category: 'Accessories',
        description: '7-in-1 USB-C multiport adapter',
        stock: 30,
        featured: false,
        tags: ['usb-c', 'hub', 'adapter'],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    products.push(...sampleProducts);
    console.log(`📦 Initialized ${sampleProducts.length} sample products`);
  }
}

module.exports = {
  MockDB,
  MockObjectId,
  mockDB,
  initializeSampleData
};
