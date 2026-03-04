/**
 * DAY27: In-Memory Mock Database
 * Fallback when MongoDB is not available
 */

let products = [];

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

class MockCollection {
  constructor(name) {
    this.name = name;
    this.data = products;
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
    const item = this.data.find(item => {
      if (filter._id) {
        return item._id.toString() === filter._id.toString();
      }
      return Object.keys(filter).every(key => item[key] === filter[key]);
    });

    if (!item) return null;

    // Apply $set operator
    if (update.$set) {
      Object.assign(item, update.$set);
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

  find() {
    return {
      toArray: async () => [...this.data]
    };
  }
}

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

const mockDB = new MockDB();

function initializeSampleData() {
  if (products.length === 0) {
    console.log('📦 Initializing sample products...');
    products.push(
      {
        _id: new MockObjectId(),
        name: 'Gaming Laptop',
        price: 1299.99,
        stock: 10
      },
      {
        _id: new MockObjectId(),
        name: 'Wireless Mouse',
        price: 29.99,
        stock: 50
      },
      {
        _id: new MockObjectId(),
        name: 'Mechanical Keyboard',
        price: 89.99,
        stock: 25
      }
    );
    console.log(`✅ Loaded ${products.length} sample products`);
  }
}

module.exports = {
  MockDB,
  MockObjectId,
  mockDB,
  initializeSampleData
};
