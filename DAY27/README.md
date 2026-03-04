# DAY27: Express + MongoDB CRUD Operations

**Learning Project**: Building a REST API with POST, PATCH, and DELETE operations

## 📚 Learning Objectives

✓ Setup an Express server with MongoDB connection  
✓ Implement POST /products to add new items  
✓ Implement DELETE /products/:id to remove items  
✓ Implement PATCH /products/:id to update stock  
✓ Verify all routes using Postman  

## 📋 Project Requirements

### Route Foundation
- ✅ Setup Express middleware for JSON
- ✅ Define MongoDB connection inside the app

### CRUD Routes
- ✅ POST route takes `{name, price, stock}` and saves to DB
- ✅ PATCH route only updates 'stock' field
- ✅ DELETE route successfully removes by ID

## 🚀 Quick Start

### 1. Install Dependencies

```powershell
cd DAY27
npm install
```

This installs:
- `express` - Web framework
- `mongodb` - Database driver

### 2. Start the Server

```powershell
npm start
```

The server will start on `http://localhost:3027`

> **Note**: If MongoDB is not installed, the app automatically uses an in-memory database with sample products for testing!

## 📡 API Routes

### Base URL
```
http://localhost:3027
```

### Required Routes

#### 1. POST /products - Create Product
Create a new product with name, price, and stock.

**Request:**
```http
POST /products
Content-Type: application/json

{
  "name": "Gaming Mouse",
  "price": 49.99,
  "stock": 25
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Gaming Mouse",
    "price": 49.99,
    "stock": 25,
    "createdAt": "2026-03-05T10:30:00.000Z",
    "updatedAt": "2026-03-05T10:30:00.000Z"
  }
}
```

#### 2. PATCH /products/:id - Update Stock
Update only the stock quantity of a product.

**Request:**
```http
PATCH /products/507f1f77bcf86cd799439011
Content-Type: application/json

{
  "stock": 15
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Stock updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Gaming Mouse",
    "price": 49.99,
    "stock": 15,
    "updatedAt": "2026-03-05T10:35:00.000Z"
  }
}
```

#### 3. DELETE /products/:id - Delete Product
Remove a product from the database.

**Request:**
```http
DELETE /products/507f1f77bcf86cd799439011
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Product deleted successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Gaming Mouse",
    "price": 49.99,
    "stock": 15
  }
}
```

### Helper Routes

#### GET /products - List All Products
View all products (useful for testing).

**Response:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "...",
      "name": "Gaming Laptop",
      "price": 1299.99,
      "stock": 10
    }
  ],
  "mode": "mock-database"
}
```

#### GET /health - Health Check
Check if the server is running.

**Response:**
```json
{
  "status": "running",
  "database": "mock",
  "timestamp": "2026-03-05T10:00:00.000Z"
}
```

## 🧪 Testing with PowerShell

### Test POST - Create Product
```powershell
$product = @{
    name = "Wireless Keyboard"
    price = 79.99
    stock = 30
} | ConvertTo-Json

Invoke-WebRequest http://localhost:3027/products `
    -Method POST `
    -Body $product `
    -ContentType "application/json" `
    -UseBasicParsing | Select-Object -ExpandProperty Content
```

### Test PATCH - Update Stock
```powershell
# Get products to find an ID
$products = (Invoke-WebRequest http://localhost:3027/products -UseBasicParsing).Content | ConvertFrom-Json
$productId = $products.data[0]._id.id

# Update stock
$update = @{ stock = 50 } | ConvertTo-Json
Invoke-WebRequest "http://localhost:3027/products/$productId" `
    -Method PATCH `
    -Body $update `
    -ContentType "application/json" `
    -UseBasicParsing | Select-Object -ExpandProperty Content
```

### Test DELETE - Remove Product
```powershell
# Get products to find an ID
$products = (Invoke-WebRequest http://localhost:3027/products -UseBasicParsing).Content | ConvertFrom-Json
$productId = $products.data[-1]._id.id

# Delete product
Invoke-WebRequest "http://localhost:3027/products/$productId" `
    -Method DELETE `
    -UseBasicParsing | Select-Object -ExpandProperty Content
```

### Complete Test Script
```powershell
# 1. Get initial products
Write-Host "`n=== INITIAL PRODUCTS ===" -ForegroundColor Cyan
$products = (Invoke-WebRequest http://localhost:3027/products -UseBasicParsing).Content | ConvertFrom-Json
$products.data | Format-Table name, price, stock

# 2. CREATE a new product
Write-Host "`n=== CREATE PRODUCT ===" -ForegroundColor Cyan
$newProduct = @{ name="USB Hub"; price=24.99; stock=100 } | ConvertTo-Json
$created = Invoke-WebRequest http://localhost:3027/products -Method POST -Body $newProduct -ContentType "application/json" -UseBasicParsing
Write-Host "Created: $(($created.Content | ConvertFrom-Json).data.name)"

# 3. UPDATE stock
Write-Host "`n=== UPDATE STOCK ===" -ForegroundColor Cyan
$products = (Invoke-WebRequest http://localhost:3027/products -UseBasicParsing).Content | ConvertFrom-Json
$productId = $products.data[0]._id.id
$update = @{ stock=75 } | ConvertTo-Json
$updated = Invoke-WebRequest "http://localhost:3027/products/$productId" -Method PATCH -Body $update -ContentType "application/json" -UseBasicParsing
Write-Host "Updated stock to: $(($updated.Content | ConvertFrom-Json).data.stock)"

# 4. DELETE a product
Write-Host "`n=== DELETE PRODUCT ===" -ForegroundColor Cyan
$products = (Invoke-WebRequest http://localhost:3027/products -UseBasicParsing).Content | ConvertFrom-Json
$deleteId = $products.data[-1]._id.id
$deleted = Invoke-WebRequest "http://localhost:3027/products/$deleteId" -Method DELETE -UseBasicParsing
Write-Host "Deleted: $(($deleted.Content | ConvertFrom-Json).data.name)"

# 5. Final product list
Write-Host "`n=== FINAL PRODUCTS ===" -ForegroundColor Cyan
$final = (Invoke-WebRequest http://localhost:3027/products -UseBasicParsing).Content | ConvertFrom-Json
$final.data | Format-Table name, price, stock
```

## 📮 Testing with Postman

### Setup Postman Collection

1. **Open Postman** and create a new collection called "DAY27 - Product API"

2. **Set Base URL** as a collection variable:
   - Variable: `baseUrl`
   - Value: `http://localhost:3027`

### Request 1: CREATE Product (POST)

**Name:** Create Product  
**Method:** POST  
**URL:** `{{baseUrl}}/products`  
**Headers:** 
```
Content-Type: application/json
```
**Body (raw JSON):**
```json
{
  "name": "Gaming Headset",
  "price": 99.99,
  "stock": 20
}
```

**Expected Response:** 201 Created with product data

### Request 2: UPDATE Stock (PATCH)

**Name:** Update Stock  
**Method:** PATCH  
**URL:** `{{baseUrl}}/products/<PRODUCT_ID>`  
**Headers:**
```
Content-Type: application/json
```
**Body (raw JSON):**
```json
{
  "stock": 35
}
```

**Expected Response:** 200 OK with updated product

> **Tip:** First run GET /products to get a valid product ID, then replace `<PRODUCT_ID>` with the actual ID.

### Request 3: DELETE Product (DELETE)

**Name:** Delete Product  
**Method:** DELETE  
**URL:** `{{baseUrl}}/products/<PRODUCT_ID>`  

**Expected Response:** 200 OK with deleted product data

### Request 4: GET All Products (Helper)

**Name:** Get All Products  
**Method:** GET  
**URL:** `{{baseUrl}}/products`  

**Expected Response:** 200 OK with array of products

### Request 5: Health Check

**Name:** Health Check  
**Method:** GET  
**URL:** `{{baseUrl}}/health`  

**Expected Response:** 200 OK with server status

## ✅ Verification Checklist

Use this checklist to verify all requirements:

- [ ] Express server starts successfully on port 3027
- [ ] JSON middleware is configured (`express.json()`)
- [ ] MongoDB connection defined inside the app
- [ ] POST /products creates product with name, price, stock
- [ ] POST /products validates required fields
- [ ] POST /products returns 201 status code
- [ ] PATCH /products/:id updates only stock field
- [ ] PATCH /products/:id validates stock is a number
- [ ] PATCH /products/:id returns 404 for invalid ID
- [ ] DELETE /products/:id removes product from database
- [ ] DELETE /products/:id returns deleted product data
- [ ] DELETE /products/:id returns 404 for non-existent product
- [ ] All routes tested successfully in Postman

## 🐛 Error Handling

The API returns appropriate error codes:

### 400 Bad Request
```json
{
  "success": false,
  "error": "Missing required fields",
  "required": ["name", "price", "stock"]
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Product not found",
  "id": "507f1f77bcf86cd799439011"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Failed to create product",
  "message": "Connection timeout"
}
```

## 📁 Project Structure

```
DAY27/
├── index.js          # Main Express server with all routes
├── mockDB.js         # In-memory database fallback
├── package.json      # Dependencies and scripts
└── README.md         # This file
```

## 🎯 Key Concepts Demonstrated

1. **Express Middleware**: JSON parsing with `express.json()`
2. **MongoDB Connection**: Defined inside the app with error handling
3. **RESTful Routes**:
   - POST for creation
   - PATCH for partial updates
   - DELETE for removal
4. **Validation**: Required fields and data types
5. **Error Handling**: Appropriate HTTP status codes
6. **Fallback Database**: Mock DB when MongoDB unavailable

## 🔧 Installing MongoDB (Optional)

The app works without MongoDB using an in-memory database. To use real MongoDB:

1. Download from https://www.mongodb.com/try/download/community
2. Install with default settings
3. Create data directory: `New-Item -Path "c:\data\db" -ItemType Directory -Force`
4. Start MongoDB: `mongod --dbpath "c:\data\db"`
5. Restart the DAY27 server

## 🎓 Learning Outcomes

After completing this project, you will understand:

- ✅ How to set up Express.js with middleware
- ✅ How to connect to MongoDB from Express
- ✅ How to implement POST, PATCH, DELETE routes
- ✅ How to validate request data
- ✅ How to handle errors properly
- ✅ How to test REST APIs with Postman

## 📝 Assignment Extension Ideas

1. Add input validation for price (must be positive)
2. Add GET /products/:id to retrieve single product
3. Add query parameters to GET /products (filter by price range)
4. Implement PUT /products/:id to replace entire product
5. Add timestamps tracking (createdAt, updatedAt)
6. Implement stock alerts when stock < 10

---

**DAY27 Complete!** 🎉  
Practice creating, updating, and deleting products using Postman or PowerShell commands above.
