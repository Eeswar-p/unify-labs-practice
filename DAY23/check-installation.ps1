# MongoDB Installation Check Script for Windows
# DAY23: Run this script to verify MongoDB is properly installed

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  MongoDB Installation Verification" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Check 1: MongoDB Shell (mongosh)
Write-Host "🔍 Checking MongoDB Shell (mongosh)..." -ForegroundColor Yellow
try {
    $mongoshVersion = mongosh --version 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ MongoDB Shell installed: $mongoshVersion" -ForegroundColor Green
    } else {
        Write-Host "❌ MongoDB Shell not found" -ForegroundColor Red
        Write-Host "   Install from: https://www.mongodb.com/try/download/shell" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ MongoDB Shell not found in PATH" -ForegroundColor Red
    Write-Host "   Add to PATH: C:\Program Files\MongoDB\Server\7.0\bin" -ForegroundColor Yellow
}

# Check 2: MongoDB Service
Write-Host "`n🔍 Checking MongoDB Service..." -ForegroundColor Yellow
try {
    $mongoService = Get-Service -Name "MongoDB" -ErrorAction SilentlyContinue
    if ($mongoService) {
        if ($mongoService.Status -eq "Running") {
            Write-Host "✅ MongoDB Service is running" -ForegroundColor Green
        } else {
            Write-Host "⚠️  MongoDB Service exists but is $($mongoService.Status)" -ForegroundColor Yellow
            Write-Host "   Start it with: Start-Service MongoDB" -ForegroundColor Cyan
        }
    } else {
        Write-Host "❌ MongoDB Service not found" -ForegroundColor Red
        Write-Host "   Install MongoDB Community Server" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ Could not check MongoDB Service" -ForegroundColor Red
}

# Check 3: MongoDB Compass
Write-Host "`n🔍 Checking MongoDB Compass..." -ForegroundColor Yellow
$compassPaths = @(
    "$env:LOCALAPPDATA\Programs\mongosh\MongoDBCompass.exe",
    "C:\Program Files\MongoDB Compass\MongoDBCompass.exe"
)

$compassFound = $false
foreach ($path in $compassPaths) {
    if (Test-Path $path) {
        Write-Host "✅ MongoDB Compass installed at: $path" -ForegroundColor Green
        $compassFound = $true
        break
    }
}

if (-not $compassFound) {
    Write-Host "⚠️  MongoDB Compass not found" -ForegroundColor Yellow
    Write-Host "   Install from: https://www.mongodb.com/try/download/compass" -ForegroundColor Yellow
}

# Check 4: Test Connection
Write-Host "`n🔍 Testing MongoDB Connection..." -ForegroundColor Yellow
try {
    $testConnection = mongosh "mongodb://localhost:27017/test" --eval "db.runCommand({ ping: 1 })" --quiet 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Successfully connected to MongoDB at localhost:27017" -ForegroundColor Green
    } else {
        Write-Host "❌ Could not connect to MongoDB" -ForegroundColor Red
        Write-Host "   Ensure MongoDB service is running" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ Connection test failed" -ForegroundColor Red
}

# Check 5: Node.js (for verification script)
Write-Host "`n🔍 Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Node.js installed: $nodeVersion" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Node.js not found (optional for verification script)" -ForegroundColor Yellow
        Write-Host "   Install from: https://nodejs.org/" -ForegroundColor Yellow
    }
} catch {
    Write-Host "⚠️  Node.js not found (optional for verification script)" -ForegroundColor Yellow
}

# Summary
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  Installation Status Summary" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "Next Steps:" -ForegroundColor Green
Write-Host "1. If MongoDB service is not running:" -ForegroundColor White
Write-Host "   Start-Service MongoDB" -ForegroundColor Cyan
Write-Host "`n2. Open MongoDB Compass and connect to:" -ForegroundColor White
Write-Host "   mongodb://localhost:27017" -ForegroundColor Cyan
Write-Host "`n3. Follow README.md to create database and collection`n" -ForegroundColor White

Write-Host "========================================`n" -ForegroundColor Cyan
