# DAY28 Detailed Walkthrough - Full Setup Guide

**Time Required**: 15-20 minutes  
**Difficulty**: Beginner-friendly  
**Outcome**: Working Express app connected to MongoDB Atlas cloud  

---

## Table of Contents
1. [MongoDB Atlas Account Setup](#1-mongodb-atlas-account-setup)
2. [Creating Your First Cluster](#2-creating-your-first-cluster)
3. [Creating Database User](#3-creating-database-user)
4. [Network Access Configuration](#4-network-access-configuration)
5. [Getting Connection String](#5-getting-connection-string)
6. [Local Setup](#6-local-setup)
7. [Running Tests](#7-running-tests)
8. [Starting Server](#8-starting-server)
9. [Testing Endpoints](#9-testing-endpoints)

---

## 1. MongoDB Atlas Account Setup

### Step 1.1: Visit MongoDB Atlas

1. Open your browser and go to: **https://www.mongodb.com/cloud/atlas**
2. You'll see the MongoDB Atlas homepage
3. Click the **"Try Free"** or **"Sign Up"** button

### Step 1.2: Create Your Account

You'll be presented with a signup form:

```
┌─────────────────────────────────────┐
│  Sign Up Form                       │
├─────────────────────────────────────┤
│  Email:        [_________________]  │
│  Password:     [_________________]  │
│  Confirm:      [_________________]  │
│  □ I agree to Terms of Service      │
│                                     │
│         [Sign Up with Google]       │
│         [Create Account]            │
└─────────────────────────────────────┘
```

1. Enter your email address
2. Create a strong password (8+ characters, uppercase, number recommended)
3. Confirm the password
4. Check "I agree to the Terms of Service"
5. Click **"Create Account"**

### Step 1.3: Verify Your Email

1. Check your email for verification message
2. Click the verification link
3. You'll be directed back to MongoDB Atlas
4. Set up your organization (you can skip or use defaults)

---

## 2. Creating Your First Cluster

### Step 2.1: Access Cluster Creation

After verification, you'll see the MongoDB dashboard. 

Click **"Create a Deployment"** or **"Build a Cluster"**

### Step 2.2: Choose Cluster Type

```
┌──────────────────────────────────────────────┐
│  Choose Your Cluster Type                    │
├──────────────────────────────────────────────┤
│                                              │
│  ┌─────────────────────────┐                │
│  │   SHARED CLUSTER (M0)   │                │
│  │   ✓ Free                │                │
│  │   ✓ 512 MB Storage      │                │
│  │   ✓ 100 Connections    │                │
│  │   [SELECT THIS ONE]     │                │
│  └─────────────────────────┘                │
│                                              │
│  ┌──────────────────────────┐               │
│  │  DEDICATED CLUSTER       │               │
│  │  ✗ Paid                  │               │
│  │                          │               │
│  └──────────────────────────┘               │
│                                              │
└──────────────────────────────────────────────┘
```

**Click on "Shared Cluster (M0)" - it's free!**

### Step 2.3: Choose Cloud Provider & Region

You'll see options like:

```
┌────────────────────────────────────┐
│  Cloud Provider                    │
├────────────────────────────────────┤
│  ○ AWS     (Amazon Web Services)   │
│  ○ Azure   (Microsoft)             │
│  ○ GCP     (Google Cloud)          │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│  Region (for AWS)                  │
├────────────────────────────────────┤
│  ○ us-east-1 (N. Virginia)         │
│  ○ us-west-2 (Oregon)              │
│  ○ eu-west-1 (Ireland)             │
│  [Select closest to you]           │
└────────────────────────────────────┘
```

1. **Select AWS** (or your preferred provider)
2. **Select the region closest to you** (e.g., us-east-1)
3. **Cluster Tier**: Should show **M0 (Free)**
4. Click **"Create Cluster"**

### Step 2.4: Wait for Cluster Creation

```
⏳ Your cluster is being created...
   (This takes 1-2 minutes)

   ███████░░░░░░░░░░░ 50%

Once complete:
✓ Cluster status shows "Ready"
✓ You'll see your cluster name (e.g., "Cluster0")
```

---

## 3. Creating Database User

### Step 3.1: Access Database Access

Once your cluster is ready:

1. In left sidebar, find **"Security"** section
2. Click **"Database Access"**

You'll see:
```
┌────────────────────────────────┐
│  Database Access               │
├────────────────────────────────┤
│  Users  │ API Keys             │
│─────────────────────────────────│
│  [Add New Database User]        │
│                                │
│  Current Users:                │
│  • (none yet)                  │
└────────────────────────────────┘
```

### Step 3.2: Add New Database User

Click **"Add New Database User"**

Fill out the form:

```
┌─────────────────────────────────────┐
│  Add Database User                  │
├─────────────────────────────────────┤
│                                     │
│  Username:                          │
│  ┌──────────────────────────────┐   │
│  │ day28_user                   │   │
│  └──────────────────────────────┘   │
│                                     │
│  Password:                          │
│  ┌──────────────────────────────┐   │
│  │ ●●●●●●●●●●●● [Regenerate]   │   │
│  └──────────────────────────────┘   │
│  (Or enter your own password)        │
│                                     │
│  Built-in Role:                     │
│  ┌──────────────────────────────┐   │
│  │ Read and write to any... ▼   │   │
│  └──────────────────────────────┘   │
│                                     │
│        [Add User]                   │
└─────────────────────────────────────┘
```

**Important:** 
1. **Username**: Type `day28_user` (or your choice)
2. **Password**: Click "Regenerate" button to create strong password
   - MongoDB will generate something like: `aBc12XyZ!@#`
   - **COPY THIS PASSWORD AND SAVE IT** (you'll need it!)
3. **Built-in Role**: Select **"Read and write to any database"**
4. Click **"Add User"**

### Step 3.3: Save Your Credentials

```
⚠️  IMPORTANT! Save these now:
    Username: day28_user
    Password: [Your generated password]
    
    🔐 Store in:
    - Password manager (recommended)
    - Local .env file (for development)
    - NEVER commit to GitHub!
```

---

## 4. Network Access Configuration

### Step 4.1: Access Network Access Settings

1. In left sidebar, click **"Network Access"** (under "Security")

You'll see:
```
┌────────────────────────────────────┐
│  Network Access                    │
├────────────────────────────────────┤
│  [Add IP Address]  [Add IP Range]  │
│                                    │
│  Current IP Addresses:             │
│  • (none yet)                      │
└────────────────────────────────────┘
```

### Step 4.2: Add IP Address

Click **"Add IP Address"**

You'll see:
```
┌──────────────────────────────────────┐
│  Add IP Address to Access List      │
├──────────────────────────────────────┤
│                                      │
│  My Current IP Address:              │
│  ┌────────────────────────────────┐  │
│  │ 192.168.1.100                  │  │
│  └────────────────────────────────┘  │
│                                      │
│  [Add My Current IP]                │
│                                      │
│  ────── OR ──────                   │
│                                      │
│  Enter a different IP:               │
│  ┌────────────────────────────────┐  │
│  │ 0.0.0.0/0                      │  │
│  └────────────────────────────────┘  │
│  (Allows access from anywhere)       │
│                                      │
│        [Confirm]                     │
└──────────────────────────────────────┘
```

### Step 4.3: Choose Access Option

**For Development (Learning):**
- Type `0.0.0.0/0` in the input field
- This allows access from anywhere (not secure for production)
- Click **"Confirm"**

**For Production:**
- Use "Add My Current IP"
- Or add specific IP ranges
- More secure approach

For DAY28, use **0.0.0.0/0** to keep it simple.

---

## 5. Getting Connection String

### Step 5.1: Connect to Cluster

Click **"Clusters"** in the left sidebar, then click **"Connect"** on your cluster

```
┌────────────────────────────────────┐
│  Connect to your cluster           │
├────────────────────────────────────┤
│                                    │
│  How do you want to connect?       │
│                                    │
│  ○ Drivers                         │
│  ○ Connect with Compass            │
│  ○ Connect with MongoDB Shell      │
│                                    │
│  [Select "Drivers"]                │
└────────────────────────────────────┘
```

Click **"Drivers"**

### Step 5.2: View Connection String

You'll see platform options:

```
┌─────────────────────────────────────┐
│  Driver Setup                       │
├─────────────────────────────────────┤
│  Select your language:              │
│  • Node.js (✓ Select this)          │
│  • Python                           │
│  • Java                             │
│  • C#                               │
│  • Ruby                             │
│  ...more                            │
│                                     │
│  Version: 4.0 or later             │
│  [Shown below: your connection]     │
└─────────────────────────────────────┘
```

Select **Node.js**

### Step 5.3: Copy Connection String

You'll see something like:

```
mongodb+srv://<username>:<password>@cluster0.abcd1234.mongodb.net/?retryWrites=true&w=majority
```

**IMPORTANT STEPS:**
1. Copy the entire connection string (don't include the code block markers)
2. Replace `<username>` with `day28_user`
3. Replace `<password>` with your database user password
4. Keep everything else the same

**Example Result:**
```
mongodb+srv://day28_user:aBc12XyZ!@#@cluster0.abcd1234.mongodb.net/?retryWrites=true&w=majority
```

---

## 6. Local Setup

### Step 6.1: Install Node.js (if needed)

Check if you have Node.js:
```powershell
node --version
```

If not installed, download from: https://nodejs.org/ (LTS version)

### Step 6.2: Navigate to DAY28 Folder

```powershell
cd d:\Projects\unify-labs-practice\DAY28
```

### Step 6.3: Create .env File

In the DAY28 folder, create a file named `.env` (NOT `.env.txt`):

**Windows File Explorer Method:**
1. Right-click in folder
2. New → Text Document
3. Name it `.env` (warning about file extension - ignore it)
4. Right-click → Edit with Notepad

**PowerShell Method:**
```powershell
New-Item -ItemType File -Name ".env"
notepad .env
```

### Step 6.4: Add Configuration to .env

Paste this into your `.env` file:

```
MONGO_URL=mongodb+srv://day28_user:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/?retryWrites=true&w=majority
DB_NAME=unify_labs
PORT=3028
NODE_ENV=development
```

**Replace:**
- `YOUR_PASSWORD` → Your database user password (from Step 3)
- `YOUR_CLUSTER` → Your cluster name (from connection string)

**Example:**
```
MONGO_URL=mongodb+srv://day28_user:aBc12XyZ!@#@cluster0.abcd1234.mongodb.net/?retryWrites=true&w=majority
DB_NAME=unify_labs
PORT=3028
NODE_ENV=development
```

**Save the file** (Ctrl+S or File → Save)

### Step 6.5: Install npm Dependencies

```powershell
npm install
```

This installs:
- express (web framework)
- mongodb (database driver)
- dotenv (environment variables)

Expected output:
```
added 80 packages in 4.5s
up to date, audited 80 packages in 4.6s
0 vulnerabilities
```

---

## 7. Running Tests

### Step 7.1: Run Test Suite

```powershell
npm test
```

This will:
1. Connect to your Atlas cluster
2. Create test products
3. Read them back
4. Update some records
5. Delete them
6. Show statistics

### Step 7.2: Expected Output

```
╔═══════════════════════════════════════════╗
║   MongoDB Atlas Connection Test Suite    ║
╚═══════════════════════════════════════════╝

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TEST 1: MongoDB Atlas Connection
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Connected to MongoDB Atlas

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TEST 2: CREATE - Insert Products into Atlas
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Created 3 products in Atlas

TEST 3: READ - Fetch Products from Atlas
✅ Retrieved 3 products from Atlas

TEST 4: UPDATE - Modify Product in Atlas
✅ Updated product in Atlas

TEST 5: DELETE - Remove Products from Atlas
✅ Deleted 3 products from Atlas

TEST 6: Database Statistics
✅ Products in collection: 0

═════════════════════════════════════════════════
✅ ALL TESTS PASSED!
═════════════════════════════════════════════════

🎉 Your MongoDB Atlas connection is working!

✅ Disconnected from Atlas
```

**If you see ✅ ALL TESTS PASSED! - Congratulations!** Your Atlas connection is working!

---

## 8. Starting Server

### Step 8.1: Start Express Server

```powershell
npm start
```

Expected output:
```
╔═══════════════════════════════════════════╗
║   DAY28: MongoDB Atlas Cloud Backend     ║
╚═══════════════════════════════════════════╝

📍 Server:    http://localhost:3028
🌐 Database:  MongoDB Atlas (Cloud)
💾 Data:      Persisted in Atlas cluster

📚 Documentation:
   - GET /health  → Server health
   - GET /info    → API information
   - GET /products → List all products
   - POST /products → Create product
   - PATCH /products/:id → Update product
   - DELETE /products/:id → Delete product

✅ Ready to accept requests from Atlas!
```

**Keep this terminal open!** The server needs to stay running while you test.

---

## 9. Testing Endpoints

### Step 9.1: Open New Terminal

Open a **NEW PowerShell window** (keep server running in first one)

### Step 9.2: Health Check

Test that server is running:

```powershell
curl http://localhost:3028/health
```

You should see:
```json
{
  "status": "up",
  "timestamp": "2024-11-14T10:30:00.000Z",
  "database": {
    "connected": true,
    "type": "MongoDB Atlas (Cloud)",
    "database": "unify_labs"
  }
}
```

### Step 9.3: Create a Product

```powershell
curl -X POST http://localhost:3028/products `
  -H "Content-Type: application/json" `
  -d '{"name":"Test Laptop","price":999.99,"stock":10}'
```

Expected response (201 Created):
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Test Laptop",
    "price": 999.99,
    "stock": 10,
    "createdAt": "2024-11-14T10:30:00.000Z",
    "updatedAt": "2024-11-14T10:30:00.000Z"
  }
}
```

**Save the `_id` value!** You'll use it in next tests.

### Step 9.4: Get All Products

```powershell
curl http://localhost:3028/products
```

You should see your created product in the list!

### Step 9.5: Update Product

Replace `PRODUCT_ID` with the `_id` from step 9.3:

```powershell
curl -X PATCH http://localhost:3028/products/PRODUCT_ID `
  -H "Content-Type: application/json" `
  -d '{"stock":100}'
```

Expected: Stock changes to 100

### Step 9.6: Delete Product

```powershell
curl -X DELETE http://localhost:3028/products/PRODUCT_ID
```

### Step 9.7: Verify Deletion

```powershell
curl http://localhost:3028/products
```

Product should no longer be in the list!

---

## ✅ Congratulations!

You've successfully:
1. ✓ Created MongoDB Atlas account
2. ✓ Built M0 Shared cluster
3. ✓ Created database user
4. ✓ Configured network access
5. ✓ Retrieved SRV connection string
6. ✓ Set up local environment
7. ✓ Installed dependencies
8. ✓ Tested Atlas connection
9. ✓ Started Express server
10. ✓ Tested CRUD endpoints

**Your Express app is now connected to real cloud database!** 🎉

---

## 🔍 Verify Data in Atlas Dashboard

To confirm data is actually in the cloud:

1. Open MongoDB Atlas Dashboard: https://cloud.mongodb.com/
2. Click "Databases"
3. Find "unify_labs" database
4. Click "Collections"
5. Find "products" collection
6. See all your created documents!

This proves data is persisted in the cloud! ☁️

---

## 💾 Keep Project Safe

Before committing to GitHub:

1. Ensure `.env` is in `.gitignore` ✓
2. Don't share `.env` file ✓
3. Never push connection strings ✓
4. Use `.env.example` as template ✓

Done! Your DAY28 project is complete and secure! 🔐

