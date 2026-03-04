# DAY27: Postman Testing Guide

## 🚀 Quick Setup

1. **Start the server:**
   ```powershell
   cd DAY27
   npm install
   npm start
   ```

2. **Import collection to Postman:**
   - Open Postman
   - Click "Import"
   - Drag and drop `DAY27-Postman-Collection.json` (created below)
   - Or manually create requests following this guide

## 📋 Postman Collection Setup

### Collection Variables

Create a collection called **"DAY27 - Product CRUD"** with these variables:

| Variable | Value |
|----------|-------|
| baseUrl  | http://localhost:3027 |
| productId | (will be set dynamically) |

## 🧪 Testing Sequence

Follow this order to test all functionality:

### 1️⃣ Health Check
**Verify server is running**

- **Method:** GET
- **URL:** `{{baseUrl}}/health`
- **Expected Status:** 200 OK
- **Response Example:**
```json
{
  "status": "running",
  "database": "mock",
  "timestamp": "2026-03-05T10:00:00.000Z"
}
```

---

### 2️⃣ Get All Products (Initial)
**See what products exist**

- **Method:** GET
- **URL:** `{{baseUrl}}/products`
- **Expected Status:** 200 OK
- **Note:** Remember one of the product IDs for later tests

---

### 3️⃣ Create Product (POST) ✅ REQUIRED
**Test POST route requirement**

- **Method:** POST
- **URL:** `{{baseUrl}}/products`
- **Headers:**
  ```
  Content-Type: application/json
  ```
- **Body (raw JSON):**
  ```json
  {
    "name": "Gaming Headset",
    "price": 99.99,
    "stock": 20
  }
  ```
- **Expected Status:** 201 Created
- **Verification:**
  - ✓ Product created with correct name, price, stock
  - ✓ Response includes `_id` field
  - ✓ Response includes `createdAt` and `updatedAt`

**Test (Save product ID):**
- Go to "Tests" tab in Postman
- Add this script:
  ```javascript
  // Save product ID for future requests
  pm.collectionVariables.set("productId", pm.response.json().data._id.id || pm.response.json().data._id);
  ```

---

### 4️⃣ Create Product - Missing Fields (Error Test)
**Verify validation works**

- **Method:** POST
- **URL:** `{{baseUrl}}/products`
- **Headers:** `Content-Type: application/json`
- **Body:**
  ```json
  {
    "name": "Incomplete Product"
  }
  ```
- **Expected Status:** 400 Bad Request
- **Expected Response:**
  ```json
  {
    "success": false,
    "error": "Missing required fields",
    "required": ["name", "price", "stock"]
  }
  ```

---

### 5️⃣ Update Stock (PATCH) ✅ REQUIRED
**Test PATCH route requirement**

- **Method:** PATCH
- **URL:** `{{baseUrl}}/products/{{productId}}`
- **Headers:** `Content-Type: application/json`
- **Body:**
  ```json
  {
    "stock": 50
  }
  ```
- **Expected Status:** 200 OK
- **Verification:**
  - ✓ Only stock field is updated
  - ✓ Name and price remain unchanged
  - ✓ `updatedAt` timestamp is refreshed

---

### 6️⃣ Update Stock - Invalid ID (Error Test)
**Verify error handling**

- **Method:** PATCH
- **URL:** `{{baseUrl}}/products/invalid_id_12345`
- **Body:** `{ "stock": 25 }`
- **Expected Status:** 400 or 404
- **Expected:** Error message about invalid ID

---

### 7️⃣ Update Stock - Missing Stock Field (Error Test)
**Ensure stock field is required**

- **Method:** PATCH
- **URL:** `{{baseUrl}}/products/{{productId}}`
- **Body:** `{}`
- **Expected Status:** 400 Bad Request
- **Expected Response:**
  ```json
  {
    "success": false,
    "error": "Missing stock field"
  }
  ```

---

### 8️⃣ Delete Product (DELETE) ✅ REQUIRED
**Test DELETE route requirement**

- **Method:** DELETE
- **URL:** `{{baseUrl}}/products/{{productId}}`
- **Expected Status:** 200 OK
- **Verification:**
  - ✓ Product is removed from database
  - ✓ Response includes deleted product data
  - ✓ Success message confirms deletion

---

### 9️⃣ Delete Product - Already Deleted (Error Test)
**Try deleting same product again**

- **Method:** DELETE
- **URL:** `{{baseUrl}}/products/{{productId}}`
- **Expected Status:** 404 Not Found
- **Expected Response:**
  ```json
  {
    "success": false,
    "error": "Product not found"
  }
  ```

---

### 🔟 Get All Products (Final)
**Verify product was deleted**

- **Method:** GET
- **URL:** `{{baseUrl}}/products`
- **Expected Status:** 200 OK
- **Verification:**
  - ✓ Product count decreased by 1
  - ✓ Deleted product no longer in list

---

## ✅ Requirements Verification Checklist

After running all tests, verify:

### Route Foundation
- [x] Express middleware for JSON configured
- [x] MongoDB connection defined inside the app
- [x] Server starts successfully

### POST /products
- [x] Takes `{name, price, stock}` from request body
- [x] Saves to database
- [x] Returns created product with ID
- [x] Validates required fields
- [x] Returns 400 for missing data

### PATCH /products/:id
- [x] Updates only stock field
- [x] Does NOT modify name or price
- [x] Validates stock is a number
- [x] Returns 404 for invalid ID
- [x] Returns updated product

### DELETE /products/:id
- [x] Successfully removes product by ID
- [x] Returns deleted product data
- [x] Returns 404 for non-existent product

## 📊 Expected Test Results

| Test | Method | Expected Status | Pass/Fail |
|------|--------|----------------|-----------|
| Health Check | GET | 200 | ☐ |
| Get All Products | GET | 200 | ☐ |
| Create Product | POST | 201 | ☐ |
| Create - Missing Fields | POST | 400 | ☐ |
| Update Stock | PATCH | 200 | ☐ |
| Update - Invalid ID | PATCH | 400/404 | ☐ |
| Update - Missing Stock | PATCH | 400 | ☐ |
| Delete Product | DELETE | 200 | ☐ |
| Delete - Not Found | DELETE | 404 | ☐ |
| Get All (Final) | GET | 200 | ☐ |

## 🎯 Bonus Tests

### Test 1: Create Multiple Products
Create 3 different products to test batch operations.

### Test 2: Update Stock to Zero
```json
{ "stock": 0 }
```
Should succeed (out of stock scenario).

### Test 3: Update Stock to Negative
```json
{ "stock": -5 }
```
Should fail with validation error.

### Test 4: Stress Test
Create 10 products rapidly to test concurrency.

## 💡 Postman Pro Tips

### 1. Use Environment Variables
Set `baseUrl` as environment variable instead of collection variable to easily switch between dev/prod.

### 2. Create Tests Automatically
Add to "Tests" tab of each request:
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response has success field", function () {
    pm.expect(pm.response.json()).to.have.property('success');
});
```

### 3. Chain Requests
Use "Set a collection variable" in Tests:
```javascript
// Save product ID from POST response
const response = pm.response.json();
pm.collectionVariables.set("productId", response.data._id.id || response.data._id);
```

### 4. Use Pre-request Scripts
Generate random data:
```javascript
pm.collectionVariables.set("randomName", "Product " + Math.floor(Math.random() * 1000));
pm.collectionVariables.set("randomPrice", (Math.random() * 100).toFixed(2));
```

## 📸 Screenshot Checklist for Submission

If submitting this project, capture:
1. ✅ Postman collection showing all requests
2. ✅ Successful POST request creating a product (201 status)
3. ✅ Successful PATCH request updating stock (200 status)
4. ✅ Successful DELETE request removing product (200 status)
5. ✅ Error response for invalid request (400/404 status)
6. ✅ Server console showing request logs

## 🔄 Reset Database

To reset the in-memory database:
1. Stop the server (Ctrl+C)
2. Restart with `npm start`
3. Sample products will reload

## 📞 Need Help?

**Common Issues:**

**Q: Getting "Cannot POST /products"**
- A: Check that server is running on port 3027
- A: Verify Content-Type header is set to application/json

**Q: Getting "Product not found" on PATCH**
- A: Copy the exact `_id` from GET /products response
- A: Mock DB IDs look like: `mock_1234567890_abc123`

**Q: Body is empty in POST**
- A: Select "raw" in Body tab
- A: Select "JSON" from dropdown (not Text)
- A: Verify JSON is valid (check quotes)

---

**Complete all tests above to verify DAY27 requirements!** ✅
