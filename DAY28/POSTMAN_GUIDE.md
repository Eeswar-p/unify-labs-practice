# DAY28 Postman Guide

Test MongoDB Atlas API using Postman

## 📥 Import Collection

### Option 1: Manual Setup (5 minutes)

1. **Create New Collection**: Name it "DAY28 Atlas API"
2. **Create Environment Variable**:
   - New Environment → "DAY28 Atlas"
   - Add variable: `base_url` = `http://localhost:3028`
   - Add variable: `product_id` = (blank - will fill during tests)
   - Save

### Option 2: Import Collection File

Create `DAY28_Atlas_Collection.postman_collection.json`:
```json
{
  "info": {
    "name": "DAY28 MongoDB Atlas",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "1. Health Check",
      "request": {
        "method": "GET",
        "url": "{{base_url}}/health"
      }
    },
    {
      "name": "2. Server Info",
      "request": {
        "method": "GET",
        "url": "{{base_url}}/info"
      }
    },
    {
      "name": "3. List Products",
      "request": {
        "method": "GET",
        "url": "{{base_url}}/products"
      }
    },
    {
      "name": "4. Create Product",
      "request": {
        "method": "POST",
        "url": "{{base_url}}/products",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\"name\": \"Laptop\", \"price\": 999.99, \"stock\": 15}"
        }
      }
    },
    {
      "name": "5. Update Product Stock",
      "request": {
        "method": "PATCH",
        "url": "{{base_url}}/products/{{product_id}}",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\"stock\": 100}"
        }
      }
    },
    {
      "name": "6. Delete Product",
      "request": {
        "method": "DELETE",
        "url": "{{base_url}}/products/{{product_id}}"
      }
    }
  ]
}
```

Then import into Postman: File → Import → (paste above)

---

## 🧪 Test Sequence

### Test 1: Health Check
**Verify server is running and connected to Atlas**

```http
GET http://localhost:3028/health
```

**Expected Response** (200 OK):
```json
{
  "status": "up",
  "timestamp": "2024-11-14T10:30:00.000Z",
  "database": {
    "connected": true,
    "type": "MongoDB Atlas (Cloud)",
    "database": "unify_labs"
  },
  "server": {
    "port": 3028,
    "environment": "development"
  }
}
```

---

### Test 2: Server Info
**Get API details and available routes**

```http
GET http://localhost:3028/info
```

**Expected Response** (200 OK):
```json
{
  "project": "DAY28: MongoDB Atlas Cloud Migration",
  "version": "1.0.0",
  "database": {
    "type": "MongoDB Atlas",
    "connection": "SRV (mongodb+srv://)",
    "tier": "M0 - Shared (Free)",
    "status": "Connected"
  },
  "endpoints": {
    "GET /products": "List all products from Atlas",
    "GET /products/:id": "Get specific product by ID",
    "POST /products": "Create new product in Atlas",
    "PATCH /products/:id": "Update product stock in Atlas",
    "DELETE /products/:id": "Delete product from Atlas"
  }
}
```

---

### Test 3: List All Products
**See all products currently in Atlas**

```http
GET http://localhost:3028/products
```

**Expected Response** (200 OK):
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Laptop",
      "price": 999.99,
      "stock": 15,
      "createdAt": "2024-11-14T10:00:00.000Z",
      "updatedAt": "2024-11-14T10:00:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Mouse",
      "price": 29.99,
      "stock": 50,
      "createdAt": "2024-11-14T10:05:00.000Z",
      "updatedAt": "2024-11-14T10:05:00.000Z"
    }
  ],
  "message": "Retrieved 2 products from Atlas"
}
```

---

### Test 4: Create Product
**Add new product to Atlas**

**Request** (POST):
```http
POST http://localhost:3028/products
Content-Type: application/json

{
  "name": "Laptop",
  "price": 999.99,
  "stock": 15
}
```

**Expected Response** (201 Created):
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Laptop",
    "price": 999.99,
    "stock": 15,
    "createdAt": "2024-11-14T10:30:00.000Z",
    "updatedAt": "2024-11-14T10:30:00.000Z"
  }
}
```

**Copy the `_id` value to use in next tests!**

---

### Test 5: Update Product Stock
**Modify product information in Atlas**

**Request** (PATCH):
```http
PATCH http://localhost:3028/products/507f1f77bcf86cd799439011
Content-Type: application/json

{
  "stock": 100
}
```

**Expected Response** (200 OK):
```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Laptop",
    "price": 999.99,
    "stock": 100,
    "createdAt": "2024-11-14T10:30:00.000Z",
    "updatedAt": "2024-11-14T10:31:00.000Z"
  }
}
```

---

### Test 6: Get Specific Product
**Fetch individual product details from Atlas**

**Request** (GET):
```http
GET http://localhost:3028/products/507f1f77bcf86cd799439011
```

**Expected Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Laptop",
    "price": 999.99,
    "stock": 100,
    "createdAt": "2024-11-14T10:30:00.000Z",
    "updatedAt": "2024-11-14T10:31:00.000Z"
  }
}
```

---

### Test 7: Delete Product
**Remove product from Atlas**

**Request** (DELETE):
```http
DELETE http://localhost:3028/products/507f1f77bcf86cd799439011
```

**Expected Response** (200 OK):
```json
{
  "success": true,
  "message": "Product deleted successfully",
  "deletedCount": 1
}
```

---

## ❌ Error Case Testing

### Test: Invalid Product ID (400 Bad Request)

**Request**:
```http
GET http://localhost:3028/products/invalid-id
```

**Expected Response** (400):
```json
{
  "error": "Invalid product ID",
  "message": "Product ID must be a valid MongoDB ObjectId"
}
```

---

### Test: Missing Required Field (400 Bad Request)

**Request**:
```http
POST http://localhost:3028/products
Content-Type: application/json

{
  "name": "Phone"
}
```

**Expected Response** (400):
```json
{
  "error": "Validation failed",
  "message": "Missing required fields",
  "fields": [
    "price is required",
    "stock is required"
  ]
}
```

---

### Test: Product Not Found (404 Not Found)

**Request**:
```http
GET http://localhost:3028/products/507f1f77bcf86cd799439999
```

**Expected Response** (404):
```json
{
  "error": "Product not found",
  "message": "No product found with ID: 507f1f77bcf86cd799439999"
}
```

---

### Test: Invalid Route (404 Not Found)

**Request**:
```http
GET http://localhost:3028/invalid
```

**Expected Response** (404):
```json
{
  "error": "Not Found",
  "message": "No route found for GET /invalid",
  "availableRoutes": [
    "GET /health",
    "GET /info",
    "GET /products",
    "GET /products/:id",
    "POST /products",
    "PATCH /products/:id",
    "DELETE /products/:id"
  ]
}
```

---

## 🔧 Postman Setup Tips

### Set Environment Variables

1. Click "Environments" in Postman
2. Create "DAY28 Atlas"
3. Add variables:
   - `base_url`: http://localhost:3028
   - `product_id`: (blank initially)

Use in requests: `{{base_url}}` and `{{product_id}}`

### Auto-Update product_id

In Test 4 (Create Product), add script to auto-save ID:

1. Click "Tests" tab
2. Add:
```javascript
var jsonData = pm.response.json();
pm.environment.set("product_id", jsonData.data._id);
```

Now next requests will automatically use created product's ID!

---

## ✅ Complete Test Sequence

Follow this order to verify everything works:

1. ✅ **Test 1**: Health Check → Verify Atlas connected
2. ✅ **Test 2**: Server Info → See all available routes
3. ✅ **Test 3**: List Products → See current data
4. ✅ **Test 4**: Create Product → Save new product to Atlas
5. ✅ **Test 5**: Update Product → Modify stock
6. ✅ **Test 6**: Get Specific Product → Fetch updated product
7. ✅ **Test 7**: Delete Product → Remove from Atlas
8. ✅ **Error Test**: Invalid ID → Verify error handling
9. ✅ **Error Test**: Missing Field → Verify validation
10. ✅ **Final**: List Products → Confirm deletion

All 10 tests passing = **Cloud API working perfectly!** 🎉

---

## 📊 Expected Outcomes

### Success Indicators
- ✅ All responses have `200`, `201`, or expected status codes
- ✅ Created products have MongoDB `_id` values
- ✅ Data persists when you list products
- ✅ Updates show in get requests
- ✅ Deleted products no longer appear in list
- ✅ Error responses have helpful messages

### Database Verification

To verify data is in Atlas:
1. Go to MongoDB Atlas Dashboard
2. Click "Collections"
3. Select "unify_labs" database
4. Select "products" collection
5. See all your created products!

---

## 🎯 Learning Outcomes

By completing this testing:
- ✅ Understand REST API endpoints
- ✅ Test CRUD operations against cloud database
- ✅ Work with MongoDB ObjectId values
- ✅ Handle JSON requests/responses
- ✅ Verify data persistence in Atlas
- ✅ Debug API errors
- ✅ Use environment variables in Postman

---

**Happy Testing!** 🚀
