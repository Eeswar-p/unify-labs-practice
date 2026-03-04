# DAY25: MongoDB Update & Delete Operations

## 📚 Learning Objectives

- ✅ Use `$inc` to update stock levels for all products
- ✅ Update category names using `$set` and `updateMany()`
- ✅ Use `$push` to add a 'new-arrival' tag to specific items
- ✅ Use `deleteMany()` to clear items with zero stock

---

## 🎯 Project Requirements

### Mass Updates
- Increase the price of all 'Electronics' by +10 using `$inc`
- Set `featured: true` for all items priced > 500

### Cleanup
- Delete all documents where 'stock' is 0
- Verify the count using `countDocuments()` after deletion

---

## 📋 Setup Requirements

This project requires:
1. MongoDB running (from DAY23)
2. Products collection populated (from DAY24)
3. Node.js (optional for automation scripts)

---

## 🚀 Quick Start (Choose Your Method)

### Method 1: MongoDB Compass (GUI) - 10 minutes

#### Step 1: Start MongoDB & Open Compass
```powershell
# Verify MongoDB is running
Get-Service MongoDB

# Open MongoDB Compass from Start Menu
```

#### Step 2: Connect & Navigate
1. Connection: `mongodb://localhost:27017`
2. Click Connect
3. Open `unify_labs` → `products` collection

#### Step 3: Perform Update #1 - $inc (Increase Electronics Price by +10)

1. Click **Aggregations** tab
2. Add stage: **`$match`**
   ```json
   { "category": "Electronics" }
   ```
3. Add stage: **`$project`** (see what you're updating)
   ```json
   { "name": 1, "price": 1, "category": 1 }
   ```
4. Click **"Run"** to preview

5. Now perform the actual update:
   - Click **"add"** next to collection name
   - Select **"UPDATE"**
   - Filter: `{ "category": "Electronics" }`
   - Update:
     ```json
     { "$inc": { "price": 10 } }
     ```
   - Click **"Update"**

✅ **Verify**: Your 2 Electronics should now be:
- Laptop Pro 15: $1309.99 (was 1299.99)
- Wireless Mouse: $39.99 (was 29.99)

#### Step 4: Perform Update #2 - $set (Feature Expensive Items)

1. Add new Update operation:
   - Filter: `{ "price": { "$gt": 500 } }`
   - Update:
     ```json
     { "$set": { "featured": true } }
     ```
   - Click **"Update"**

✅ **Verify**: Only Laptop Pro 15 should have `featured: true`

#### Step 5: Add Tags with $push (Optional Enhancement)

1. Add another Update:
   - Filter: `{ "name": "Wireless Mouse" }`
   - Update:
     ```json
     { "$push": { "tags": "new-arrival" } }
     ```
   - Click **"Update"**

✅ **Verify**: Mouse should now have a `tags` array with "new-arrival"

#### Step 6: Delete Zero Stock Items

First, let's add a product with zero stock to demonstrate:

1. Click **"ADD DATA"** → **"Insert Document"**
2. Insert:
   ```json
   {
     "name": "Out of Stock Item",
     "category": "Electronics",
     "price": 49.99,
     "stock": 0,
     "specs": { "color": "Gray" }
   }
   ```

3. Now delete it:
   - Click **"Delete"** button on the out-of-stock item
   - Or use aggregation:
     - Add stage: **`$match`**: `{ "stock": 0 }`
     - Check what will be deleted
     - Then perform DELETE operation

✅ **Verify**: Count remaining documents

---

## 💻 Method 2: MongoDB Shell (mongosh)

### Step 1: Open mongosh
```powershell
mongosh
use unify_labs
```

### Step 2: Update #1 - $inc (Increase Electronics Price)

```javascript
// Increase price of all Electronics by $10
db.products.updateMany(
  { category: "Electronics" },
  { $inc: { price: 10 } }
)
```

**Expected Output**:
```javascript
{
  acknowledged: true,
  matchedCount: 2,
  modifiedCount: 2
}
```

**Verify**:
```javascript
db.products.find({ category: "Electronics" })
// Laptop Pro 15 should be $1309.99 (was 1299.99)
// Wireless Mouse should be $39.99 (was 29.99)
```

### Step 3: Update #2 - $set (Feature Expensive Items)

```javascript
// Set featured: true for all items priced > 500
db.products.updateMany(
  { price: { $gt: 500 } },
  { $set: { featured: true } }
)
```

**Expected Output**:
```javascript
{
  acknowledged: true,
  matchedCount: 1,
  modifiedCount: 1
}
```

**Verify**:
```javascript
db.products.find({ featured: true })
// Should return only Laptop Pro 15
```

### Step 4: $push - Add Tags (Optional)

```javascript
// Add 'new-arrival' tag to the Mouse
db.products.updateOne(
  { name: "Wireless Mouse" },
  { $push: { tags: "new-arrival" } }
)
```

**Verify**:
```javascript
db.products.findOne({ name: "Wireless Mouse" })
// Should have: "tags": ["new-arrival"]
```

Add more tags to different items:

```javascript
// Add multiple tags to Laptop (as array)
db.products.updateOne(
  { name: "Laptop Pro 15" },
  { $push: { tags: { $each: ["hot-deal", "premium", "best-seller"] } } }
)
```

### Step 5: Delete Zero Stock Items

#### 5a: First, insert a test item with zero stock

```javascript
db.products.insertOne({
  name: "Test Out of Stock",
  category: "Electronics",
  price: 49.99,
  stock: 0,
  specs: { color: "Gray" }
})
```

#### 5b: Count before deletion

```javascript
db.products.countDocuments()
// Should show current total (e.g., 6 if you added the test item)

db.products.countDocuments({ stock: 0 })
// Should show 1 (the test item)
```

#### 5c: Delete all zero stock items

```javascript
// Delete all products with stock: 0
db.products.deleteMany({ stock: 0 })
```

**Expected Output**:
```javascript
{
  acknowledged: true,
  deletedCount: 1
}
```

#### 5d: Verify deletion

```javascript
// Count total documents
db.products.countDocuments()
// Should decrease by 1

// Verify no zero stock items exist
db.products.find({ stock: 0 })
// Should return empty
```

---

## 🤖 Method 3: Node.js Scripts

### Step 1: Install Dependencies
```powershell
cd d:\Projects\unify-labs-practice\DAY25
npm install
```

### Step 2: Run All Updates & Deletes
```powershell
npm run all
```

This runs:
1. Update #1: Increase Electronics price by 10
2. Update #2: Feature expensive items
3. Add tags to selected products
4. Delete zero stock items
5. Display final state

### Step 3: Run Individual Operations
```powershell
npm run updates      # Just the updates ($inc, $set, $push)
npm run cleanup      # Just the deletes (deleteMany)
npm run demo         # Step-by-step with explanations
```

---

## 📊 Update Operators Explained

### 1. $inc - Increment Numeric Fields

```javascript
// Increase field by value
{ $inc: { field: number } }

// Example: Increase price by 10
{ $inc: { price: 10 } }

// Decrease stock by 5
{ $inc: { stock: -5 } }

// Increment multiple fields
{ $inc: { price: 10, stock: -5 } }
```

**Use Cases**:
- Adjust prices
- Update stock levels
- Increment counters
- Adjust ratings

---

### 2. $set - Set Field Values

```javascript
// Set field to value (creates if not exists)
{ $set: { field: value } }

// Example: Add featured flag
{ $set: { featured: true } }

// Set multiple fields
{
  $set: {
    featured: true,
    discount: 0.1,
    lastUpdated: new Date()
  }
}

// Set nested fields
{ $set: { "specs.warranty": "2 years" } }
```

**Use Cases**:
- Add/update flags
- Change category
- Set descriptions
- Update metadata

---

### 3. $push - Add Items to Array

```javascript
// Add single item to array (creates if not exists)
{ $push: { arrayField: value } }

// Add tag
{ $push: { tags: "new-arrival" } }

// Add multiple items to array
{
  $push: {
    tags: { $each: ["tag1", "tag2", "tag3"] }
  }
}

// Add item with position (insert at index)
{
  $push: {
    tags: { $each: ["tag"], $position: 0 }
  }
}

// Add with limit (keep only last 5)
{
  $push: {
    tags: { $each: [...], $slice: -5 }
  }
}
```

**Use Cases**:
- Add review/ratings
- Track history
- Manage tags
- Append comments

---

### 4. updateOne() vs updateMany()

```javascript
// Update only first matching document
db.collection.updateOne(
  { filter },
  { $operator: { field: value } }
)

// Update ALL matching documents
db.collection.updateMany(
  { filter },
  { $operator: { field: value } }
)
```

---

### 5. deleteMany() - Bulk Delete

```javascript
// Delete all documents matching filter
db.collection.deleteMany({ filter })

// Example: Delete all zero stock
db.products.deleteMany({ stock: 0 })

// Delete multiple conditions
db.products.deleteMany({
  $and: [
    { stock: 0 },
    { featured: false }
  ]
})

// Delete everything (be careful!)
db.collection.deleteMany({})
```

---

## 🧪 Practice Exercises

### Exercise 1: Bulk Price Adjustment
```javascript
// Reduce all Furniture items by 5%
db.products.updateMany(
  { category: "Furniture" },
  { $inc: { price: -50 } }  // Manual since % is complex
)

// Or more accurately with multiplier:
db.products.updateMany(
  { category: "Furniture" },
  [
    { $set: { price: { $multiply: ["$price", 0.95] } } }
  ]
)
```

### Exercise 2: Conditional Updates
```javascript
// Add 'lowstock' tag to items with stock < 50
db.products.updateMany(
  { stock: { $lt: 50 } },
  { $push: { tags: "lowstock" } }
)
```

### Exercise 3: Remove Tag
```javascript
// Remove a tag from an item
db.products.updateOne(
  { name: "Wireless Mouse" },
  { $pull: { tags: "new-arrival" } }
)

// Remove all items with specific tag
db.products.updateMany(
  { tags: "obsolete" },
  { $set: { status: "discontinued" } }
)
```

### Exercise 4: Rename Field
```javascript
// Rename field across all documents
db.products.updateMany(
  {},
  { $rename: { "old_field": "new_field" } }
)
```

### Exercise 5: Complex Update with $cond
```javascript
// Update price based on condition
db.products.updateMany(
  {},
  [
    {
      $set: {
        discount: {
          $cond: [
            { $gt: ["$price", 500] },
            0.15,    // 15% discount if > 500
            0.05     // 5% discount otherwise
          ]
        }
      }
    }
  ]
)
```

---

## 🔄 Combining Multiple Operations

```javascript
// Single update with multiple operators
db.products.updateOne(
  { name: "Laptop Pro 15" },
  {
    $inc: { price: 50, stock: -2 },
    $set: { featured: true, lastSold: new Date() },
    $push: { tags: "discount-ready" }
  }
)
```

---

## ✅ Verification Commands

```javascript
// Count all documents
db.products.countDocuments()

// Count by filter
db.products.countDocuments({ category: "Electronics" })

// Count featured items
db.products.countDocuments({ featured: true })

// Check for zero stock
db.products.countDocuments({ stock: 0 })

// Find items with tags
db.products.find({ tags: { $exists: true } })

// Count items with specific tag
db.products.countDocuments({ tags: "new-arrival" })
```

---

## 🚨 Important Notes

### Be Careful With deleteMany()!

```javascript
// This deletes EVERYTHING (don't run!)
db.products.deleteMany({})

// Always filter carefully
db.products.deleteMany({ stock: 0 })  // Good - specific

// Test with find() first
db.products.find({ stock: 0 })  // See what will be deleted
db.products.deleteMany({ stock: 0 })  // Then delete
```

### Transactions for Multiple Operations

For data consistency across multiple operations:

```javascript
const session = client.startSession();
session.startTransaction();

try {
  await db.products.updateMany({...}, {...}, { session });
  await db.products.deleteMany({...}, { session });
  await session.commitTransaction();
} catch (error) {
  await session.abortTransaction();
}
```

---

## 📊 Real-World Scenarios

### Scenario 1: Flash Sale
```javascript
// Mark all Electronics on sale
db.products.updateMany(
  { category: "Electronics" },
  {
    $set: { onSale: true, discount: 0.20 },
    $push: { tags: "flash-sale" }
  }
)

// Increase impressions counter
db.products.updateMany(
  { tags: "flash-sale" },
  { $inc: { impressions: 1 } }
)
```

### Scenario 2: Inventory Cleanup
```javascript
// Find items that haven't sold in 6 months
const sixMonthsAgo = new Date(Date.now() - 180 * 24 * 60 * 60 * 1000);

// Mark as discontinued
db.products.updateMany(
  { lastSold: { $lt: sixMonthsAgo }, stock: { $gt: 0 } },
  { $set: { status: "discontinued" }, $push: { tags: "clearance" } }
)

// Then delete discontinued items with zero stock
db.products.deleteMany({ status: "discontinued", stock: 0 })
```

### Scenario 3: Bulk Price Increase
```javascript
// Increase all prices by 10% due to inflation
db.products.updateMany(
  {},
  [
    {
      $set: {
        originalPrice: "$price",
        price: { $multiply: ["$price", 1.10] },
        priceIncreaseDate: new Date()
      }
    }
  ]
)
```

### Scenario 4: Review System
```javascript
// Add a new review
db.products.updateOne(
  { _id: ObjectId("...") },
  {
    $push: {
      reviews: {
        userId: "user123",
        rating: 5,
        comment: "Great product!",
        date: new Date()
      }
    },
    $inc: { reviewCount: 1, totalRating: 5 }
  }
)

// Calculate average rating
db.products.updateMany(
  { reviewCount: { $gt: 0 } },
  [
    {
      $set: {
        avgRating: {
          $divide: ["$totalRating", "$reviewCount"]
        }
      }
    }
  ]
)
```

---

## 🎓 Common Mistakes to Avoid

### ❌ Mistake 1: Using $set Without updateMany()
```javascript
// WRONG - only updates one document
db.products.updateOne(
  { category: "Electronics" },
  { $set: { featured: true } }
)

// RIGHT - updates all matching
db.products.updateMany(
  { category: "Electronics" },
  { $set: { featured: true } }
)
```

### ❌ Mistake 2: Forgetting the Operator
```javascript
// WRONG - replaces entire document!
db.products.updateOne(
  { name: "Laptop" },
  { price: 1500 }  // This REPLACES the document!
)

// RIGHT - uses operator
db.products.updateOne(
  { name: "Laptop" },
  { $set: { price: 1500 } }
)
```

### ❌ Mistake 3: Wrong Filter Syntax
```javascript
// WRONG
db.products.updateMany(
  { price > 500 },  // Invalid syntax
  { $set: { featured: true } }
)

// RIGHT
db.products.updateMany(
  { price: { $gt: 500 } },
  { $set: { featured: true } }
)
```

### ❌ Mistake 4: Deleting Without Verification
```javascript
// WRONG - delete immediately
db.products.deleteMany({ stock: 0 })

// RIGHT - verify first
db.products.find({ stock: 0 })
// Review results, then:
db.products.deleteMany({ stock: 0 })
```

---

## 📚 Resources

- [MongoDB Update Operators](https://www.mongodb.com/docs/manual/reference/operator/update/)
- [MongoDB updateMany()](https://www.mongodb.com/docs/manual/reference/method/db.collection.updateMany/)
- [MongoDB deleteMany()](https://www.mongodb.com/docs/manual/reference/method/db.collection.deleteMany/)
- [Aggregation Pipeline Updates](https://www.mongodb.com/docs/manual/tutorial/update-documents-with-aggregation-pipeline/)

---

## ✅ Completion Checklist

- [ ] Increased Electronics price by +10 using $inc
- [ ] Set featured: true for items > $500
- [ ] Added tags using $push
- [ ] Deleted zero stock items using deleteMany()
- [ ] Verified counts using countDocuments()
- [ ] Understand difference between updateOne() and updateMany()
- [ ] Can explain $inc, $set, $push operators
- [ ] Practiced with all 3 methods (Compass, mongosh, Node.js)

---

## 🎉 Congratulations!

You've mastered:
- ✅ Bulk updates with updateMany()
- ✅ Field updates with $set
- ✅ Incrementing with $inc
- ✅ Array operations with $push
- ✅ Bulk deletes with deleteMany()
- ✅ Data verification with countDocuments()

**Next Steps**: Build a full REST API with Express + MongoDB to automate these operations!

---

**DAY25 Complete** | MongoDB Update & Delete Operations Mastered 🚀
