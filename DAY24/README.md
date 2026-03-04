# DAY24: MongoDB CRUD Operations & Queries

## 📚 Learning Objectives

- ✅ Use `insertMany()` to add 5 products with different categories
- ✅ Implement nested objects for 'specs' (e.g., color, weight)
- ✅ Perform a sort to find the most expensive products
- ✅ Limit results to the top 2 items

---

## 🎯 Project Requirements

### Bulk Population
- Insert products for 'Electronics', 'Clothing', and 'Furniture'
- Each document must have a 'price' (number) and 'stock' (number)

### Queries
- Find all products where category is 'Electronics'
- Sort products by price in descending order and limit to 2

---

## 🚀 Quick Start

### Prerequisites

1. **MongoDB installed and running** (from DAY23)
   ```powershell
   Get-Service MongoDB
   # Should show "Running"
   ```

2. **Node.js installed** (optional for scripts)
   ```powershell
   node --version
   ```

### Setup

1. **Start MongoDB** (if not running):
   ```powershell
   Start-Service MongoDB
   ```

2. **Open MongoDB Compass** and connect to `mongodb://localhost:27017`

3. **Choose your method**:
   - **GUI Method**: Use MongoDB Compass (recommended for beginners)
   - **CLI Method**: Use mongosh commands
   - **Script Method**: Run Node.js automation scripts

---

## 📦 Method 1: MongoDB Compass (GUI)

### Step 1: Create Database & Collection

1. Open MongoDB Compass
2. Click **"+ CREATE DATABASE"**
3. Database Name: `unify_labs`
4. Collection Name: `products`
5. Click **"Create Database"**

### Step 2: Insert Products Using insertMany()

1. Click on `unify_labs` → `products` collection
2. Click **"ADD DATA"** → **"Insert Document"**
3. Switch to **"{ }"** (JSON view) in the editor
4. **Delete the default content** and paste this:

```json
[
  {
    "name": "Laptop Pro 15",
    "category": "Electronics",
    "price": 1299.99,
    "stock": 25,
    "specs": {
      "color": "Silver",
      "weight": "1.8kg",
      "processor": "Intel i7",
      "ram": "16GB"
    }
  },
  {
    "name": "Wireless Mouse",
    "category": "Electronics",
    "price": 29.99,
    "stock": 150,
    "specs": {
      "color": "Black",
      "weight": "0.1kg",
      "connectivity": "Bluetooth",
      "battery": "AA x2"
    }
  },
  {
    "name": "Office Chair",
    "category": "Furniture",
    "price": 249.99,
    "stock": 40,
    "specs": {
      "color": "Black",
      "weight": "12kg",
      "material": "Leather",
      "adjustable": true
    }
  },
  {
    "name": "Cotton T-Shirt",
    "category": "Clothing",
    "price": 19.99,
    "stock": 200,
    "specs": {
      "color": "Blue",
      "weight": "0.2kg",
      "size": "M",
      "material": "100% Cotton"
    }
  },
  {
    "name": "Wooden Desk",
    "category": "Furniture",
    "price": 399.99,
    "stock": 15,
    "specs": {
      "color": "Oak",
      "weight": "25kg",
      "dimensions": "120x60x75cm",
      "material": "Solid Wood"
    }
  }
]
```

5. Click **"Insert"**

✅ **Success**: You should see 5 documents in the collection!

### Step 3: Query - Find All Electronics

1. In the **Filter** bar at the top, enter:
   ```json
   { "category": "Electronics" }
   ```

2. Press **Enter** or click **"Find"**

**Expected Result**: 2 products (Laptop Pro 15, Wireless Mouse)

### Step 4: Sort by Price (Descending) and Limit to 2

Unfortunately, MongoDB Compass doesn't have a direct "limit" option in the GUI for casual browsing, but you can:

1. Click on the **"Documents"** tab
2. Click the **"Options"** dropdown (if available)
3. Or use the **Aggregation Builder**:
   - Click the **"Aggregations"** tab
   - Add stage: **`$sort`**
     ```json
     { "price": -1 }
     ```
   - Add stage: **`$limit`**
     ```json
     2
     ```
   - Click **"Run"**

**Expected Result**: Wooden Desk ($399.99) and Laptop Pro 15 ($1299.99)

---

## 💻 Method 2: MongoDB Shell (mongosh)

### Step 1: Open MongoDB Shell

```powershell
mongosh
```

### Step 2: Switch to Database

```javascript
use unify_labs
```

### Step 3: Insert Products with insertMany()

```javascript
db.products.insertMany([
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
])
```

**Expected Output**:
```json
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId("..."),
    '1': ObjectId("..."),
    '2': ObjectId("..."),
    '3': ObjectId("..."),
    '4': ObjectId("...")
  }
}
```

### Step 4: Query - Find All Electronics

```javascript
db.products.find({ category: "Electronics" })
```

**Expected**: 2 products (Laptop Pro 15, Wireless Mouse)

To make it pretty:
```javascript
db.products.find({ category: "Electronics" }).pretty()
```

### Step 5: Sort by Price (Descending) and Limit to 2

```javascript
db.products.find().sort({ price: -1 }).limit(2)
```

**Expected Result**:
```javascript
[
  {
    _id: ObjectId("..."),
    name: "Laptop Pro 15",
    category: "Electronics",
    price: 1299.99,
    // ... rest of document
  },
  {
    _id: ObjectId("..."),
    name: "Wooden Desk",
    category: "Furniture",
    price: 399.99,
    // ... rest of document
  }
]
```

### Step 6: Verify All Documents

```javascript
// Count total products
db.products.countDocuments()
// Expected: 5

// View all products
db.products.find()
```

---

## 🤖 Method 3: Node.js Automation Script

### Step 1: Install Dependencies

```powershell
cd d:\Projects\unify-labs-practice\DAY24
npm install
```

### Step 2: Run the Population Script

```powershell
npm run populate
```

This will:
- ✅ Drop existing products collection (fresh start)
- ✅ Insert 5 products using `insertMany()`
- ✅ Display confirmation

### Step 3: Run Query Examples

```powershell
npm run queries
```

This will demonstrate:
- ✅ Find all Electronics
- ✅ Find top 2 most expensive products
- ✅ Additional query examples

### Step 4: Run Full Demo

```powershell
npm start
```

Runs both populate and queries in sequence.

---

## 📊 Understanding the Data Structure

### Product Document Schema

```javascript
{
  _id: ObjectId("..."),           // Auto-generated unique ID
  name: String,                    // Product name
  category: String,                // "Electronics", "Clothing", "Furniture"
  price: Number,                   // Decimal price
  stock: Number,                   // Integer quantity
  specs: {                         // Nested object (specifications)
    color: String,
    weight: String,
    // ... other spec fields vary by product
  }
}
```

### Why Nested Objects?

MongoDB supports **embedded documents** (nested objects), which is useful for:
- **Grouping related data**: All specs together
- **Performance**: Single query retrieves everything
- **Flexibility**: Different products can have different spec fields

---

## 🔍 Query Operations Explained

### 1. insertMany() - Bulk Insert

```javascript
db.products.insertMany([doc1, doc2, doc3, ...])
```

**Benefits**:
- ✅ Faster than multiple `insertOne()` calls
- ✅ Single database round-trip
- ✅ Atomic operation (all or nothing)

**Return Value**:
```javascript
{
  acknowledged: true,
  insertedIds: { '0': ObjectId(...), '1': ObjectId(...), ... }
}
```

### 2. find() - Query Documents

```javascript
db.products.find({ category: "Electronics" })
```

**Syntax**: `find(filter, projection)`
- **filter**: Match criteria (like WHERE in SQL)
- **projection**: Which fields to return (optional)

**Examples**:
```javascript
// Find all
db.products.find()

// Find with condition
db.products.find({ category: "Electronics" })

// Find with multiple conditions
db.products.find({ category: "Electronics", price: { $lt: 100 } })

// Find with projection (only show name and price)
db.products.find({}, { name: 1, price: 1 })
```

### 3. sort() - Order Results

```javascript
db.products.find().sort({ price: -1 })
```

**Syntax**: `sort({ field: order })`
- **1**: Ascending (lowest to highest)
- **-1**: Descending (highest to lowest)

**Examples**:
```javascript
// Sort by price ascending
db.products.find().sort({ price: 1 })

// Sort by price descending
db.products.find().sort({ price: -1 })

// Sort by multiple fields
db.products.find().sort({ category: 1, price: -1 })
```

### 4. limit() - Restrict Results

```javascript
db.products.find().limit(2)
```

**Usage**: Get only the first N results

**Combining Operations**:
```javascript
// Get top 2 most expensive products
db.products.find().sort({ price: -1 }).limit(2)

// Order matters! This is the chain:
// 1. find() - get all documents
// 2. sort() - order by price descending
// 3. limit() - take first 2
```

---

## 🎓 Advanced Query Examples

### Query Nested Objects

```javascript
// Find products with specific color
db.products.find({ "specs.color": "Black" })

// Find products with weight less than 1kg
db.products.find({ "specs.weight": { $regex: "^0\\." } })
```

### Range Queries

```javascript
// Products between $20 and $300
db.products.find({ price: { $gte: 20, $lte: 300 } })

// Products with low stock (less than 50)
db.products.find({ stock: { $lt: 50 } })
```

### Multiple Categories

```javascript
// Electronics OR Furniture
db.products.find({ category: { $in: ["Electronics", "Furniture"] } })

// NOT Clothing
db.products.find({ category: { $ne: "Clothing" } })
```

### Counting & Aggregation

```javascript
// Count products by category
db.products.aggregate([
  { $group: { _id: "$category", count: { $sum: 1 } } }
])

// Average price per category
db.products.aggregate([
  { $group: { _id: "$category", avgPrice: { $avg: "$price" } } }
])

// Total inventory value
db.products.aggregate([
  { $group: { _id: null, totalValue: { $sum: { $multiply: ["$price", "$stock"] } } } }
])
```

### Update Operations

```javascript
// Increase stock for a product
db.products.updateOne(
  { name: "Laptop Pro 15" },
  { $inc: { stock: 10 } }
)

// Add new field to all products
db.products.updateMany(
  {},
  { $set: { featured: false } }
)

// Update nested field
db.products.updateOne(
  { name: "Wireless Mouse" },
  { $set: { "specs.warranty": "2 years" } }
)
```

### Delete Operations

```javascript
// Delete out-of-stock products
db.products.deleteMany({ stock: 0 })

// Delete specific product
db.products.deleteOne({ name: "Cotton T-Shirt" })
```

---

## ✅ Verification Checklist

Run through these steps to confirm your setup:

- [ ] MongoDB service is running
- [ ] Connected to `mongodb://localhost:27017`
- [ ] Database `unify_labs` exists
- [ ] Collection `products` exists
- [ ] 5 documents inserted successfully
- [ ] Each document has: `name`, `category`, `price`, `stock`, `specs`
- [ ] Query for Electronics returns 2 products
- [ ] Sorting by price works correctly
- [ ] Limit to 2 returns only 2 documents

---

## 🎯 Practice Exercises

### Exercise 1: Add More Products

Insert 3 more products in new categories:
```javascript
db.products.insertMany([
  {
    name: "Running Shoes",
    category: "Clothing",
    price: 89.99,
    stock: 75,
    specs: { color: "Red", weight: "0.4kg", size: "10" }
  },
  {
    name: "Coffee Table",
    category: "Furniture",
    price: 149.99,
    stock: 30,
    specs: { color: "Walnut", weight: "15kg", dimensions: "90x60x45cm" }
  },
  {
    name: "Smartphone",
    category: "Electronics",
    price: 699.99,
    stock: 50,
    specs: { color: "Black", weight: "0.18kg", storage: "128GB" }
  }
])
```

### Exercise 2: Complex Queries

Try these queries:
```javascript
// 1. Find all products under $100
db.products.find({ price: { $lt: 100 } })

// 2. Find Furniture sorted by price ascending
db.products.find({ category: "Furniture" }).sort({ price: 1 })

// 3. Find 3 cheapest products overall
db.products.find().sort({ price: 1 }).limit(3)

// 4. Count products in each category
db.products.aggregate([
  { $group: { _id: "$category", count: { $sum: 1 } } }
])
```

### Exercise 3: Update Practice

```javascript
// 1. Mark expensive items (price > $500) as premium
db.products.updateMany(
  { price: { $gt: 500 } },
  { $set: { premium: true } }
)

// 2. Add discount field to all Clothing
db.products.updateMany(
  { category: "Clothing" },
  { $set: { discount: 10 } }
)

// 3. Reduce stock for sold item
db.products.updateOne(
  { name: "Wireless Mouse" },
  { $inc: { stock: -5 } }
)
```

### Exercise 4: Aggregation Challenge

```javascript
// Find the most expensive product in each category
db.products.aggregate([
  { $sort: { price: -1 } },
  { $group: {
      _id: "$category",
      mostExpensive: { $first: "$name" },
      price: { $first: "$price" }
    }
  }
])
```

---

## 🛠️ Troubleshooting

### Issue: insertMany() fails

**Error**: `WriteError: E11000 duplicate key error`

**Solution**: Clear the collection first
```javascript
db.products.drop()
// Then try insertMany() again
```

### Issue: No documents returned

**Problem**: Query returns empty array

**Check**:
1. Confirm collection name is correct
2. Verify you're in the right database (`db` command)
3. Check filter syntax (use double quotes in JSON)
4. Count all documents: `db.products.countDocuments()`

### Issue: Sort not working

**Problem**: Results not in expected order

**Remember**:
- `1` = ascending (A→Z, 1→10)
- `-1` = descending (Z→A, 10→1)

```javascript
// Wrong
db.products.find().sort({ price: "desc" })

// Correct
db.products.find().sort({ price: -1 })
```

---

## 📚 Resources

- [MongoDB CRUD Operations](https://www.mongodb.com/docs/manual/crud/)
- [insertMany() Documentation](https://www.mongodb.com/docs/manual/reference/method/db.collection.insertMany/)
- [Query Documents](https://www.mongodb.com/docs/manual/tutorial/query-documents/)
- [Sort & Limit](https://www.mongodb.com/docs/manual/reference/method/cursor.sort/)
- [Aggregation Pipeline](https://www.mongodb.com/docs/manual/aggregation/)

---

## 🎉 Congratulations!

You've successfully:
- ✅ Inserted 5 products using `insertMany()`
- ✅ Created nested objects with `specs`
- ✅ Queried by category (Electronics)
- ✅ Sorted by price in descending order
- ✅ Limited results to top 2 items

**Next Steps**: Learn about MongoDB indexing, aggregation pipelines, and connecting to Node.js Express applications!

---

**DAY24 Complete** | Next: Build a REST API with MongoDB + Express 🚀
