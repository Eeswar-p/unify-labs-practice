# DAY24: Quick Start Guide

**⏱️ Estimated Time:** 15-20 minutes

---

## 🚀 Fastest Path to Completion

### Method 1: MongoDB Compass (GUI) - Recommended for Beginners

#### Step 1: Open MongoDB Compass (2 mins)
1. Launch MongoDB Compass
2. Connect to: `mongodb://localhost:27017`
3. You should see existing databases

#### Step 2: Create Collection (1 min)
1. Click on `unify_labs` database (or create it if it doesn't exist)
2. Click **"Create Collection"**
3. Name: `products`
4. Click **"Create"**

#### Step 3: Insert Products (3 mins)
1. Click on `products` collection
2. Click **"ADD DATA"** → **"Insert Document"**
3. Switch to JSON view  **"{ }"**
4. **Delete** all content and paste:

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

✅ **Success**: You should see **"Documents: 5"** in Compass!

#### Step 4: Query Electronics (30 seconds)
1. In the **Filter** bar, type:
   ```json
   { "category": "Electronics" }
   ```
2. Press **Enter**

✅ **Expected**: 2 products (Laptop, Mouse)

#### Step 5: Test Sort & Limit (1 min)
1. Click **"Aggregations"** tab
2. Add stage: **`$sort`**
   ```json
   { "price": -1 }
   ```
3. Add stage: **`$limit`**
   ```json
   2
   ```
4. Click **"Run"**

✅ **Expected**: Laptop ($1299.99) and Desk ($399.99)

---

### Method 2: MongoDB Shell (CLI) - Fastest for Developers

#### Step 1: Open mongosh (1 min)
```powershell
mongosh
```

#### Step 2: Switch to Database
```javascript
use unify_labs
```

#### Step 3: Insert Products (Copy-Paste)
```javascript
db.products.insertMany([
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
])
```

✅ **Expected Output**: `acknowledged: true, insertedIds: {...}`

#### Step 4: Query Electronics
```javascript
db.products.find({ category: "Electronics" })
```

✅ **Expected**: 2 products

#### Step 5: Top 2 Expensive
```javascript
db.products.find().sort({ price: -1 }).limit(2)
```

✅ **Expected**: Laptop and Desk

---

### Method 3: Node.js Scripts - Full Automation

#### Step 1: Install Dependencies (2 mins)
```powershell
cd d:\Projects\unify-labs-practice\DAY24
npm install
```

#### Step 2: Run Population Script (30 seconds)
```powershell
npm run populate
```

✅ **Output**: "✅ Products inserted successfully!"

#### Step 3: Run Queries (30 seconds)
```powershell
npm run queries
```

✅ **Output**: Shows Electronics query and Top 2 expensive products

#### Step 4: Full Demo (1 min)
```powershell
npm run demo
```

✅ Shows complete CRUD operations workflow

---

## ✅ Verification Checklist

- [ ] 5 products inserted in `products` collection
- [ ] Each has: `name`, `category`, `price`, `stock`, `specs`
- [ ] Query `{ category: "Electronics" }` returns 2 items
- [ ] Sort by `price: -1` and limit 2 returns Laptop and Desk
- [ ] Nested `specs` object contains color and weight

---

## 🎯 Quick Tests

### Test 1: Count Documents
```javascript
db.products.countDocuments()
// Expected: 5
```

### Test 2: Verify Categories
```javascript
db.products.distinct("category")
// Expected: ["Electronics", "Furniture", "Clothing"]
```

### Test 3: Check Nested Objects
```javascript
db.products.findOne({ "specs.color": "Black" })
// Expected: Returns a product (Mouse or Chair)
```

---

## 📊 View Interactive Demo

```powershell
cd d:\Projects\unify-labs-practice\DAY24
python -m http.server 8024
```

Open browser: **http://localhost:8024**

- Click buttons to see different queries
- View code examples
- Interactive product cards

---

## 💡 Common Issues

| Problem | Solution |
|---------|----------|
| MongoDB not running | `Start-Service MongoDB` |
| Can't connect to Compass | Check URI: `mongodb://localhost:27017` |
| insertMany() fails | Drop collection first: `db.products.drop()` |
| No results from query | Check exact spelling of category names |

---

## 🎉 You're Done When...

- ✅ 5 products in collection
- ✅ Electronics query works (2 results)
- ✅ Top 2 expensive query works (Laptop, Desk)
- ✅ All documents have nested `specs` object

**Time to complete**: 15-20 minutes

**Next**: Build a REST API with Express + MongoDB! 🚀
