# 📖 Quick Start: MongoDB Update & Delete Operations

## ⏱️ 15-Minute Express Track

### Prerequisites (2 min)
- MongoDB running (from DAY23)
- Products collection populated (from DAY24)
- Choose your method: Compass GUI, mongosh, or Node.js

---

## 🎯 Method 1: MongoDB Compass (Easiest)

### The 5-Step Process

**Step 1: Open Compass & Connect (1 min)**
```
Connection: mongodb://localhost:27017
Click Connect → Find unify_labs → products
```

**Step 2: Increase Electronics Price by 10 (2 min)**
```
Add Update operation:
Filter: { "category": "Electronics" }
Update: { "$inc": { "price": 10 } }
Click UPDATE
```
✅ Expect: Laptop now $1309.99, Mouse now $39.99

**Step 3: Feature Expensive Items (2 min)**
```
Add Update operation:
Filter: { "price": { "$gt": 500 } }
Update: { "$set": { "featured": true } }
Click UPDATE
```
✅ Expect: Only Laptop marked featured

**Step 4: Add Tags (2 min)**
```
Add Update operation:
Filter: { "name": "Wireless Mouse" }
Update: { "$push": { "tags": "new-arrival" } }
Click UPDATE
```
✅ Expect: Mouse has tags array with "new-arrival"

**Step 5: Delete Zero Stock (2 min)**
```
Insert test item with stock: 0
Then Update operation:
Filter: { "stock": 0 }
Delete this item
```
✅ Expect: Item deleted, count decreased

**Total Time: ~10 minutes** ✅

---

## 🖥️ Method 2: MongoDB Shell (mongosh)

### Copy & Paste These Commands (5 min)

```javascript
// Step 1: Connect
mongosh
use unify_labs

// Step 2: Increase Electronics by 10
db.products.updateMany(
  { category: "Electronics" },
  { $inc: { price: 10 } }
)

// Step 3: Feature expensive items
db.products.updateMany(
  { price: { $gt: 500 } },
  { $set: { featured: true } }
)

// Step 4: Add tag to Mouse
db.products.updateOne(
  { name: "Wireless Mouse" },
  { $push: { tags: "new-arrival" } }
)

// Step 5: Add multiple tags to Laptop
db.products.updateOne(
  { name: "Laptop Pro 15" },
  { $push: { tags: { $each: ["hot-deal", "premium"] } } }
)

// Step 6: Delete zero stock
db.products.deleteMany({ stock: 0 })

// Step 7: Verify
db.products.countDocuments()
db.products.find()
```

**Total Time: ~5 minutes** ✅

---

## ⚡ Method 3: Node.js Scripts (Automated)

### Run Everything (2 min)

```powershell
cd d:\Projects\unify-labs-practice\DAY25

# Install once
npm install

# Run all operations
npm run all

# Or run individually
npm run updates    # Just the updates
npm run cleanup    # Just the deletes
npm run demo        # Step-by-step with output
```

**Output**: Clean, formatted results showing before/after for each operation

**Total Time: ~2 minutes** ✅

---

## 🔑 Key Operations (Copy These!)

### Operation 1: Increment Price
```javascript
db.products.updateMany(
  { category: "Electronics" },
  { $inc: { price: 10 } }
)
```

### Operation 2: Set Flag
```javascript
db.products.updateMany(
  { price: { $gt: 500 } },
  { $set: { featured: true } }
)
```

### Operation 3: Add to Array
```javascript
db.products.updateOne(
  { name: "Wireless Mouse" },
  { $push: { tags: "new-arrival" } }
)
```

### Operation 4: Bulk Delete
```javascript
db.products.deleteMany({ stock: 0 })
```

### Verification
```javascript
db.products.countDocuments()              // Total count
db.products.countDocuments({ featured: true })  // Featured count
db.products.find({ stock: 0 })            // All zero stock (should be empty)
```

---

## ❓ Common Questions

**Q: What's the difference between updateOne and updateMany?**
- `updateOne()` - Updates FIRST matching document
- `updateMany()` - Updates ALL matching documents

**Q: What if I update the wrong thing?**
- Always `find()` first to preview
- This project doesn't have transactions, so be cautious

**Q: Can I combine multiple updates?**
- Yes! Use multiple operators in one command:
```javascript
db.products.updateOne(
  { name: "Laptop" },
  {
    $inc: { price: 100 },
    $set: { featured: true },
    $push: { tags: "sale" }
  }
)
```

---

## ✅ Success Criteria

You'll know you're done when:

- [ ] Electronics products increased by 10
- [ ] Only Laptop marked featured (price > 500)
- [ ] Mouse has "new-arrival" tag
- [ ] Zero stock items deleted
- [ ] Total count decreased by deleted items

---

## 🚀 Next Steps

Once complete, move to DAY26 for:
- Building REST APIs with Express
- Automating these operations
- Error handling & validation

---

**Time to Complete: 10-15 minutes** ⏱️

Good luck! 🎉
