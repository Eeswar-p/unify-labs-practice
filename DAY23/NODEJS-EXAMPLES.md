# MongoDB Node.js Examples
# DAY23: Using MongoDB with Node.js

This directory contains Node.js scripts to interact with MongoDB programmatically.

## Setup

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Ensure MongoDB is Running:**
   ```powershell
   Get-Service MongoDB
   # Should show "Running"
   ```

## Scripts

### 1. verify-setup.js
Full verification script that checks:
- MongoDB connection
- Database existence
- Collection existence
- Document count
- Field validation

**Run:**
```bash
npm run verify
```

### 2. check-database.js
Quick check script for rapid validation.

**Run:**
```bash
npm run check
```

## MongoDB Driver Usage Examples

### Connect to MongoDB

```javascript
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

async function main() {
  await client.connect();
  console.log('Connected to MongoDB');
  
  const db = client.db('unify_labs');
  // ... your code here
  
  await client.close();
}

main();
```

### Insert Documents

```javascript
// Insert one
await collection.insertOne({
  name: "Alice",
  role: "Developer"
});

// Insert many
await collection.insertMany([
  { name: "Bob", role: "Designer" },
  { name: "Carol", role: "Manager" }
]);
```

### Query Documents

```javascript
// Find all
const all = await collection.find({}).toArray();

// Find with filter
const developers = await collection.find({ 
  role: "Developer" 
}).toArray();

// Find one
const alice = await collection.findOne({ 
  name: "Alice" 
});
```

### Update Documents

```javascript
// Update one
await collection.updateOne(
  { name: "Alice" },
  { $set: { role: "Senior Developer" } }
);

// Update many
await collection.updateMany(
  { role: "Developer" },
  { $set: { department: "Engineering" } }
);
```

### Delete Documents

```javascript
// Delete one
await collection.deleteOne({ name: "Alice" });

// Delete many
await collection.deleteMany({ role: "Intern" });
```

## Error Handling

Always use try-catch blocks:

```javascript
try {
  await client.connect();
  // operations...
} catch (error) {
  console.error('Error:', error.message);
} finally {
  await client.close();
}
```

## Resources

- [MongoDB Node.js Driver Documentation](https://mongodb.github.io/node-mongodb-native/)
- [MongoDB CRUD Operations](https://www.mongodb.com/docs/drivers/node/current/usage-examples/)
