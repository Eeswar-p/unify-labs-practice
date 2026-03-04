# DAY26: Testing Guide

## Server Status

✅ **DAY26 is now fully functional!**

The server is running on `http://localhost:3026` with an **in-memory database** containing sample products.

> **Note**: Since MongoDB is not installed, the server uses a mock database with sample data for testing. All CRUD operations work perfectly!

## Available Endpoints

### 1. Health Check
```powershell
Invoke-WebRequest http://localhost:3026/health
```

### 2. API Info
```powershell
Invoke-WebRequest http://localhost:3026/api/info
```

### 3. GET All Products
```powershell
Invoke-WebRequest http://localhost:3026/api/products | Select-Object -ExpandProperty Content | ConvertFrom-Json | ConvertTo-Json -Depth 5
```

**With filters:**
```powershell
# Filter by category
Invoke-WebRequest "http://localhost:3026/api/products?category=Electronics"

# Filter by price range
Invoke-WebRequest "http://localhost:3026/api/products?minPrice=20&maxPrice=100"

# Filter by featured status
Invoke-WebRequest "http://localhost:3026/api/products?featured=true"
```

### 4. GET Single Product
```powershell
# First, get all products to find an ID
$products = (Invoke-WebRequest http://localhost:3026/api/products).Content | ConvertFrom-Json
$productId = $products.data[0]._id.id

# Then get that specific product
Invoke-WebRequest "http://localhost:3026/api/products/$productId"
```

### 5. CREATE New Product
```powershell
$newProduct = @{
    name = "Gaming Keyboard"
    price = 89.99
    category = "Electronics"
    description = "Mechanical RGB keyboard"
    stock = 25
    featured = true
    tags = @("keyboard", "gaming", "rgb")
} | ConvertTo-Json

Invoke-WebRequest http://localhost:3026/api/products `
    -Method POST `
    -Body $newProduct `
    -ContentType "application/json"
```

### 6. UPDATE Product
```powershell
# Get a product ID
$products = (Invoke-WebRequest http://localhost:3026/api/products).Content | ConvertFrom-Json
$productId = $products.data[0]._id.id

# Update it
$updates = @{
    price = 1499.99
    stock = 20
    featured = true
} | ConvertTo-Json

Invoke-WebRequest "http://localhost:3026/api/products/$productId" `
    -Method PUT `
    -Body $updates `
    -ContentType "application/json"
```

### 7. DELETE Product
```powershell
# Get a product ID
$products = (Invoke-WebRequest http://localhost:3026/api/products).Content | ConvertFrom-Json
$productId = $products.data[0]._id.id

# Delete it
Invoke-WebRequest "http://localhost:3026/api/products/$productId" -Method DELETE
```

## Sample Data

The mock database includes 3 sample products:
1. **Laptop Pro** - $1299.99 (Electronics, Featured)
2. **Wireless Mouse** - $29.99 (Accessories)
3. **USB-C Hub** - $49.99 (Accessories)

## Testing All CRUD Operations

Run this complete test:

```powershell
# 1. Get all products
Write-Host "`n1. GET ALL PRODUCTS:" -ForegroundColor Cyan
$all = Invoke-WebRequest http://localhost:3026/api/products -UseBasicParsing
($all.Content | ConvertFrom-Json).data | Format-Table name, price, category

# 2. Create a new product
Write-Host "`n2. CREATE PRODUCT:" -ForegroundColor Cyan
$newProduct = @{ 
    name='Gaming Mouse'; 
    price=79.99; 
    category='Electronics'; 
    stock=15 
} | ConvertTo-Json
$created = Invoke-WebRequest http://localhost:3026/api/products -Method POST -Body $newProduct -ContentType 'application/json' -UseBasicParsing
Write-Host "Created: $(($created.Content | ConvertFrom-Json).data.name)"

# 3. Get the new product list
Write-Host "`n3. GET UPDATED LIST:" -ForegroundColor Cyan
$updated = Invoke-WebRequest http://localhost:3026/api/products -UseBasicParsing
($updated.Content | ConvertFrom-Json).data | Format-Table name, price, category

# 4. Update a product
Write-Host "`n4. UPDATE PRODUCT:" -ForegroundColor Cyan
$products = ($updated.Content | ConvertFrom-Json).data
$productId = $products[0]._id.id
$update = @{ price=1599.99; featured=$true } | ConvertTo-Json
Invoke-WebRequest "http://localhost:3026/api/products/$productId" -Method PUT -Body $update -ContentType 'application/json' -UseBasicParsing | Out-Null
Write-Host "Updated product price to 1599.99"

# 5. Delete a product
Write-Host "`n5. DELETE PRODUCT:" -ForegroundColor Cyan
$lastProduct = $products[-1]
$deleteId = $lastProduct._id.id
Invoke-WebRequest "http://localhost:3026/api/products/$deleteId" -Method DELETE -UseBasicParsing | Out-Null
Write-Host "Deleted: $($lastProduct.name)"

# 6. Final product list
Write-Host "`n6. FINAL PRODUCT LIST:" -ForegroundColor Cyan
$final = Invoke-WebRequest http://localhost:3026/api/products -UseBasicParsing
($final.Content | ConvertFrom-Json).data | Format-Table name, price, category
```

## Common Response Formats

### Success Response (GET/POST/PUT/DELETE)
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": { /* product object */ }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Product not found",
  "message": "Additional details..."
}
```

## Using Tools Like Postman or Insomnia

You can also test with GUI tools:

**Base URL**: `http://localhost:3026`

**Headers**:
- Content-Type: `application/json`

**Endpoints**:
- GET `/api/products` - List all products
- GET `/api/products/:id` - Get one product  
- POST `/api/products` - Create product
- PUT `/api/products/:id` - Update product
- DELETE `/api/products/:id` - Delete product

## Stopping the Server

Press `Ctrl+C` in the terminal where the server is running, or:

```powershell
Get-Process node | Where-Object { 
    (Get-NetTCPConnection -OwningProcess $_.Id -ErrorAction SilentlyContinue | 
     Where-Object LocalPort -eq 3026) 
} | Stop-Process -Force
```

## Installing MongoDB (Optional)

  If you want to use real MongoDB instead of the mock database:

1. Download MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Install with default settings
3. Create data directory: `New-Item -Path "c:\data\db" -ItemType Directory -Force`
4. Start MongoDB: `mongod --dbpath "c:\data\db"`
5. Restart DAY26 server - it will automatically detect and connect to MongoDB

---

**DAY26 is working properly!** 🎉
