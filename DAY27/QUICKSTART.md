# DAY27: Quick Start Guide

## 🚀 Start Server

```powershell
cd d:\Projects\unify-labs-practice\DAY27
npm start
```

Server runs on: **http://localhost:3027**

## 📡 Quick API Reference

### Required Routes (Project Requirements)

#### 1. POST /products - Create Product ✅
```powershell
$product = @{ name="Gaming Mouse"; price=49.99; stock=25 } | ConvertTo-Json
Invoke-WebRequest http://localhost:3027/products -Method POST -Body $product -ContentType "application/json"
```

#### 2. PATCH /products/:id - Update Stock ✅
```powershell
# Get product ID first
$id = ((Invoke-WebRequest http://localhost:3027/products).Content | ConvertFrom-Json).data[0]._id.id

# Update stock
$update = @{ stock=50 } | ConvertTo-Json
Invoke-WebRequest "http://localhost:3027/products/$id" -Method PATCH -Body $update -ContentType "application/json"
```

#### 3. DELETE /products/:id - Delete Product ✅
```powershell
# Get product ID first
$id = ((Invoke-WebRequest http://localhost:3027/products).Content | ConvertFrom-Json).data[0]._id.id

# Delete product
Invoke-WebRequest "http://localhost:3027/products/$id" -Method DELETE
```

### Helper Routes

#### GET /products - List All
```powershell
Invoke-WebRequest http://localhost:3027/products
```

#### GET /health - Health Check
```powershell
Invoke-WebRequest http://localhost:3027/health
```

## ✅ Requirements Checklist

### Route Foundation
- [x] Express middleware for JSON configured
- [x] MongoDB connection defined inside the app
- [x] Fallback to mock DB when MongoDB unavailable

### POST /products
- [x] Takes `{name, price, stock}` from body
- [x] Saves to database
- [x] Returns 201 Created status
- [x] Validates required fields

### PATCH /products/:id
- [x] Updates only 'stock' field
- [x] Does not modify name or price
- [x] Returns 200 OK status
- [x] Validates stock is required

### DELETE /products/:id
- [x] Successfully removes product by ID
- [x] Returns 200 OK status
- [x] Returns 404 for non-existent product

## 🧪 Complete Test Script

Copy and run this entire script:

```powershell
Write-Host "`n=== DAY27 COMPLETE TEST ===" -ForegroundColor Yellow

# 1. Initial products
Write-Host "`n[1/5] GET Initial Products" -ForegroundColor Cyan
$all = Invoke-WebRequest http://localhost:3027/products -UseBasicParsing
($all.Content | ConvertFrom-Json).data | Format-Table name, price, stock

# 2. Create product
Write-Host "`n[2/5] POST Create Product" -ForegroundColor Cyan
$newProduct = @{ name="Test Product"; price=99.99; stock=50 } | ConvertTo-Json
$created = Invoke-WebRequest http://localhost:3027/products -Method POST -Body $newProduct -ContentType "application/json" -UseBasicParsing
Write-Host "✅ Created: $(($created.Content | ConvertFrom-Json).data.name)" -ForegroundColor Green

# 3. Update stock
Write-Host "`n[3/5] PATCH Update Stock" -ForegroundColor Cyan
$products = (Invoke-WebRequest http://localhost:3027/products -UseBasicParsing).Content | ConvertFrom-Json
$id = $products.data[0]._id.id
$update = @{ stock=25 } | ConvertTo-Json
$updated = Invoke-WebRequest "http://localhost:3027/products/$id" -Method PATCH -Body $update -ContentType "application/json" -UseBasicParsing
Write-Host "✅ Updated stock to: $(($updated.Content | ConvertFrom-Json).data.stock)" -ForegroundColor Green

# 4. Delete product
Write-Host "`n[4/5] DELETE Product" -ForegroundColor Cyan
$products = (Invoke-WebRequest http://localhost:3027/products -UseBasicParsing).Content | ConvertFrom-Json
$deleteId = $products.data[-1]._id.id
$deleted = Invoke-WebRequest "http://localhost:3027/products/$deleteId" -Method DELETE -UseBasicParsing
Write-Host "✅ Deleted: $(($deleted.Content | ConvertFrom-Json).data.name)" -ForegroundColor Green

# 5. Final list
Write-Host "`n[5/5] GET Final Products" -ForegroundColor Cyan
$final = Invoke-WebRequest http://localhost:3027/products -UseBasicParsing
($final.Content | ConvertFrom-Json).data | Format-Table name, price, stock

Write-Host "`n✅ ALL TESTS COMPLETED!" -ForegroundColor Green
```

## 📮 Postman Setup

1. **Base URL**: `http://localhost:3027`
2. **Content-Type Header**: `application/json`
3. **Test Requests**:
   - POST /products with body: `{"name":"Product","price":99.99,"stock":10}`
   - PATCH /products/:id with body: `{"stock":20}`
   - DELETE /products/:id

See [POSTMAN_GUIDE.md](POSTMAN_GUIDE.md) for detailed Postman testing instructions.

## 📁 Files

- **index.js** - Main Express server with all routes
- **mockDB.js** - In-memory database fallback
- **package.json** - Dependencies
- **README.md** - Full documentation
- **POSTMAN_GUIDE.md** - Postman testing guide

## 🎯 Learning Objectives Status

✅ Setup Express server with MongoDB connection  
✅ Implement POST /products to add new items  
✅ Implement DELETE /products/:id to remove items  
✅ Implement PATCH /products/:id to update stock  
✅ Verify all routes using Postman  

## 🔧 Common Commands

```powershell
# Start server
npm start

# Test health
Invoke-WebRequest http://localhost:3027/health

# Get all products
Invoke-WebRequest http://localhost:3027/products

# Stop server
Get-Process node | Where-Object { 
    (Get-NetTCPConnection -OwningProcess $_.Id -ErrorAction SilentlyContinue | 
     Where-Object LocalPort -eq 3027) 
} | Stop-Process -Force
```

---

**DAY27 Complete!** 🎉 All requirements implemented and tested.
