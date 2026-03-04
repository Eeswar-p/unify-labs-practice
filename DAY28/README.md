# DAY28: MongoDB Atlas Cloud Database Migration

**Learning Project**: Migrate from local MongoDB to MongoDB Atlas free tier cloud cluster

## 📚 Learning Objectives

✓ Create a free tier cluster on MongoDB Atlas  
✓ Configure Network Access (0.0.0.0/0 or specific IP)  
✓ Create a database user with Read/Write access  
✓ Update your `db.js` file with the new Atlas SRV string  
✓ Verify data flow by fetching products from the cloud  

## 📋 Project Requirements

### Atlas Setup
- Register at mongodb.com/atlas
- Build a 'Shared Cluster' (M0)
- Add a Database User and save the password
- Configure Network Access

### Code Migration
- Replace `mongodb://localhost:27017` with your Atlas SRV string
- Update username/password in connection string
- Run your app and fetch data from cloud cluster

---

## 🚀 Step-by-Step: Setup MongoDB Atlas

### Step 1: Register and Create Account

1. Go to **https://www.mongodb.com/cloud/atlas**
2. Click **"Try Free"** or **"Sign Up"**
3. Create account with:
   - Email
   - Password
   - Accept terms of service
4. Verify your email address

### Step 2: Create Your First Cluster

1. Click **"Create a Deployment"** or **"Build a Cluster"**
2. Select **"Shared"** (M0 - Free tier)
3. Choose **Cloud Provider & Region**:
   - Provider: AWS (or preferred)
   - Region: Pick closest to you (e.g., us-east-1)
4. Click **"Create Deployment"**

> This takes 1-2 minutes to set up

### Step 3: Create a Database User

1. In the "Security" section, click **"Quick Start"** or go to **"Database Access"**
2. Click **"Add New Database User"**
3. Create credentials:
   - **Username**: `day28_user` (or your choice)
   - **Password**: Generate or create strong password
   - **Built-in Role**: Select **"Read and write to any database"**
4. Click **"Add User"**

> **IMPORTANT**: Save your username and password! You'll need it for the connection string.

### Step 4: Configure Network Access

1. Go to **"Network Access"** in left sidebar
2. Click **"Add IP Address"** or **"Access List Entry"**
3. Choose one option:
   - **Allow Access from Anywhere**: Enter `0.0.0.0/0` (for testing/learning)
   - **Allow Current IP**: Click "Add My Current IP Address"
4. Click **"Confirm"**

> For production, use specific IP addresses. For learning, `0.0.0.0/0` is fine.

### Step 5: Get Your Connection String

1. Go back to **"Clusters"** dashboard
2. Click **"Connect"** on your cluster
3. Select **"Drivers"** (Node.js)
4. You'll see your SRV connection string:

```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
```

5. Copy this string
6. Replace `<username>` with your database user
7. Replace `<password>` with your database password

**Example**:
```
mongodb+srv://day28_user:MySecurePassword123@cluster0.abcd1234.mongodb.net/?retryWrites=true&w=majority
```

---

## 💻 Code Migration: Update db.js

### Before (Local MongoDB)
```javascript
const MONGO_URL = 'mongodb://localhost:27017';
const DB_NAME = 'local_database';
```

### After (MongoDB Atlas)
```javascript
// Your Atlas SRV string with credentials
const MONGO_URL = 'mongodb+srv://day28_user:MyPassword@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority';
const DB_NAME = 'unify_labs'; // Your database name
```

### Updated Connection Code

```javascript
const { MongoClient } = require('mongodb');

const MONGO_URL = 'mongodb+srv://day28_user:MyPassword@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority';
const DB_NAME = 'unify_labs';

let db = null;
let client = null;

async function connectDB() {
  try {
    // Reuse existing connection
    if (client && db) {
      console.log('Using existing Atlas connection');
      return db;
    }

    // Create client with Atlas connection string
    client = new MongoClient(MONGO_URL, {
      serverSelectionTimeoutMS: 5000
    });
    
    // Connect to Atlas
    await client.connect();
    
    // Get database instance
    db = client.db(DB_NAME);
    
    // Verify connection
    await db.admin().ping();
    
    console.log('✅ Connected to MongoDB Atlas');
    console.log(`   Database: ${DB_NAME}`);
    
    return db;
  } catch (error) {
    console.error('❌ Atlas connection failed:', error.message);
    throw error;
  }
}

async function disconnectDB() {
  try {
    if (client) {
      await client.close();
      client = null;
      db = null;
      console.log('✅ Disconnected from Atlas');
    }
  } catch (error) {
    console.error('Error disconnecting:', error.message);
    throw error;
  }
}

function getDB() {
  if (!db) {
    throw new Error('Database not connected');
  }
  return db;
}

module.exports = {
  connectDB,
  disconnectDB,
  getDB,
  MONGO_URL,
  DB_NAME
};
```

---

## 🌐 Connection String Formats

### SRV Connection String (Recommended)
```
mongodb+srv://username:password@cluster.mongodb.net/dbname
```
- **Advantages**: Automatic failover, load balancing
- **Used for**: Atlas clusters

### Standard Connection String
```
mongodb://username:password@host1,host2,host3/dbname
```
- **Used for**: Self-hosted or replica sets

### Local Development
```
mongodb://localhost:27017/dbname
```
- **Used for**: Local testing only

---

## 🔐 Security Best Practices

### ⚠️ DO NOT commit credentials to GitHub!

**Bad** ❌
```javascript
const MONGO_URL = 'mongodb+srv://user:password@cluster.mongodb.net/db';
```

**Good** ✅
```javascript
// Use environment variables
const MONGO_URL = process.env.MONGO_URL;
```

### Using Environment Variables (.env file)

1. Create `.env` file in project root:
```
MONGO_URL=mongodb+srv://day28_user:MyPassword@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
DB_NAME=unify_labs
```

2. Install dotenv:
```bash
npm install dotenv
```

3. Use in code:
```javascript
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME;
```

4. Add `.env` to `.gitignore`:
```
.env
.env.local
node_modules/
```

---

## 📊 Common Issues & Solutions

### Issue 1: "Authentication failed"
**Cause**: Wrong username or password  
**Solution**: 
- Verify credentials match database user you created
- Check password doesn't have special characters that need URL encoding
- If password has special chars, use [URL encoder](https://www.urlencoder.org/)

**Example with special chars**:
```
Password: P@ssw0rd!123
Encoded: P%40ssw0rd%21123
URL: mongodb+srv://user:P%40ssw0rd%21123@cluster.mongodb.net
```

### Issue 2: "Connection refused" or timeout
**Cause**: Network access not configured  
**Solution**:
1. Go to "Network Access" in Atlas
2. Make sure your IP is added (or use 0.0.0.0/0 for testing)
3. Wait if you just added IP (takes 1-2 minutes)

### Issue 3: "No suitable servers found"
**Cause**: Network/firewall blocking connection  
**Solution**:
1. Verify internet connection
2. Check if firewall allows outbound HTTPS connections
3. Try on different network to test
4. Verify connection string is correct

### Issue 4: Database doesn't exist
**Cause**: MongoDB Atlas doesn't require creating database first  
**Solution**:
- It will be created automatically when you insert first document
- You can also create in Atlas UI under "Databases"

---

## ✅ Verification: Test Your Atlas Connection

### Test 1: Direct Connection Test

Create a test file `test-atlas.js`:

```javascript
const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;

async function testConnection() {
  let client;
  try {
    console.log('Connecting to MongoDB Atlas...');
    client = new MongoClient(MONGO_URL);
    await client.connect();
    
    const db = client.db('unify_labs');
    const result = await db.admin().ping();
    
    console.log('✅ Connection successful!');
    console.log('Ping result:', result);
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  } finally {
    if (client) await client.close();
  }
}

testConnection();
```

Run it:
```bash
node test-atlas.js
```

Expected output:
```
Connecting to MongoDB Atlas...
✅ Connection successful!
Ping result: { ok: 1 }
```

### Test 2: CRUD Operations Test

```javascript
const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;

async function testCRUD() {
  let client;
  try {
    client = new MongoClient(MONGO_URL);
    await client.connect();
    
    const db = client.db('unify_labs');
    const collection = db.collection('products');
    
    // CREATE
    console.log('Testing CREATE...');
    const insertResult = await collection.insertOne({
      name: 'Test Product',
      price: 99.99,
      stock: 10
    });
    console.log('✅ Product created:', insertResult.insertedId);
    
    // READ
    console.log('Testing READ...');
    const product = await collection.findOne({ _id: insertResult.insertedId });
    console.log('✅ Product found:', product);
    
    // UPDATE
    console.log('Testing UPDATE...');
    const updateResult = await collection.updateOne(
      { _id: insertResult.insertedId },
      { $set: { stock: 20 } }
    );
    console.log('✅ Product updated:', updateResult.modifiedCount, 'document(s)');
    
    // DELETE
    console.log('Testing DELETE...');
    const deleteResult = await collection.deleteOne({ _id: insertResult.insertedId });
    console.log('✅ Product deleted:', deleteResult.deletedCount, 'document(s)');
    
    console.log('\n✅ ALL TESTS PASSED!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    if (client) await client.close();
  }
}

testCRUD();
```

---

## 📝 Migration Checklist

- [ ] Registered MongoDB Atlas account
- [ ] Created M0 Shared Cluster
- [ ] Configured Network Access (0.0.0.0/0 or your IP)
- [ ] Created database user with Read/Write role
- [ ] Got SRV connection string from Atlas
- [ ] Replaced `mongodb://localhost:27017` with SRV string
- [ ] Updated username and password in connection string
- [ ] Created `.env` file with `MONGO_URL`
- [ ] Added `.env` to `.gitignore`
- [ ] Installed `dotenv` package
- [ ] Updated `db.js` to use environment variable
- [ ] Ran test and verified connection works
- [ ] Tested CREATE, READ, UPDATE, DELETE operations
- [ ] Verified data persists in Atlas cluster
- [ ] Tested from Express app

---

## 🔄 Migration Steps Summary

### Step 1: Get Connection String from Atlas
```
mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
```

### Step 2: Create .env file
```
MONGO_URL=mongodb+srv://day28_user:MyPassword@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
DB_NAME=unify_labs
```

### Step 3: Update db.js
```javascript
require('dotenv').config();
const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME;
```

### Step 4: Install dotenv
```bash
npm install dotenv
```

### Step 5: Test connection
```bash
node test-atlas.js
```

### Step 6: Run your Express app
```bash
npm start
```

---

## 🎯 What You'll Learn

- ✅ Cloud database deployment concepts
- ✅ Free tier cloud services (MongoDB Atlas M0)
- ✅ Security best practices (credentials, IP whitelisting)
- ✅ Connection string formats and SRV protocol
- ✅ Environment variables for sensitive data
- ✅ Database user management
- ✅ Network access configuration
- ✅ Migrating from local to cloud database
- ✅ Testing cloud database connections
- ✅ CRUD operations with cloud MongoDB

---

## 📚 Additional Resources

- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com/
- **Connection String Guide**: https://docs.mongodb.com/manual/reference/connection-string/
- **Atlas Security Best Practices**: https://docs.atlas.mongodb.com/security/
- **API Reference**: https://mongodb.github.io/node-mongodb-native/

---

## 💾 Free Atlas Limits (M0 Tier)

| Feature | Limit |
|---------|-------|
| Storage | 512 MB |
| Connections | 100 concurrent |
| Throughput | Shared |
| Backup | Nightly snapshots (7 days) |
| Cost | **FREE** |

> Perfect for learning and prototyping!

---

## 🎓 Next Steps After DAY28

1. **DAY29**: Build microservices with multiple MongoDB collections
2. **DAY30**: Implement authentication with JWT and MongoDB users
3. **DAY31**: Create API with rate limiting and caching
4. **DAY32**: Deploy Express app to cloud (Heroku, Vercel, Render)

---

**DAY28 Complete!** 🎉 You've successfully migrated to MongoDB Atlas cloud database!
