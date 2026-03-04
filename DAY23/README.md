# DAY23: MongoDB Installation & Setup

## 📚 Learning Objectives

- ✅ Install MongoDB Community Server & Compass
- ✅ Establish a connection via local 27017 port
- ✅ Create a database named 'unify_labs' and a collection named 'interns'
- ✅ Insert 3 sample documents via GUI

---

## 🎯 Project Requirements

### Environment Setup
- Download and install MongoDB MSI
- Verify installation by typing `mongosh --version` in terminal
- Successfully connect using MongoDB Compass

### Data Creation
- Create a database: `unify_labs`
- Add a collection: `interns`
- Insert documents with fields: `name`, `role`, and `joinedDate`

---

## 📦 Installation Guide

### Step 1: Download MongoDB Community Server

1. Visit the official MongoDB download page:
   - URL: [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)

2. Select your configuration:
   - **Version**: Latest stable (7.0 or higher recommended)
   - **Platform**: Windows
   - **Package**: MSI

3. Click **Download** button

### Step 2: Install MongoDB Community Server

1. **Run the MSI Installer**
   - Double-click the downloaded `.msi` file
   - Click "Next" on the welcome screen

2. **Accept License Agreement**
   - Check "I accept the terms in the License Agreement"
   - Click "Next"

3. **Choose Setup Type**
   - Select **"Complete"** installation
   - Click "Next"

4. **Service Configuration**
   - ✅ Install MongoDB as a Service
   - Service Name: `MongoDB`
   - Data Directory: `C:\Program Files\MongoDB\Server\7.0\data\`
   - Log Directory: `C:\Program Files\MongoDB\Server\7.0\log\`
   - Click "Next"

5. **Install MongoDB Compass** (GUI Tool)
   - ✅ Check "Install MongoDB Compass"
   - Click "Next"

6. **Complete Installation**
   - Click "Install"
   - Wait for installation to complete (may take 2-5 minutes)
   - Click "Finish"

### Step 3: Verify MongoDB Installation

Open **PowerShell** or **Command Prompt** and run:

```powershell
# Check MongoDB Shell version
mongosh --version
```

**Expected Output:**
```
2.1.5
```

If you see a version number, MongoDB is successfully installed! ✅

### Step 4: Verify MongoDB Service is Running

```powershell
# Check if MongoDB service is running
Get-Service -Name MongoDB
```

**Expected Output:**
```
Status   Name               DisplayName
------   ----               -----------
Running  MongoDB            MongoDB
```

If the status is **"Stopped"**, start it:

```powershell
# Start MongoDB service
Start-Service MongoDB
```

---

## 🖥️ Using MongoDB Compass

### Step 1: Launch MongoDB Compass

1. Open **MongoDB Compass** from Start Menu
2. You'll see the connection screen

### Step 2: Connect to Local MongoDB

1. The default connection string should already be filled:
   ```
   mongodb://localhost:27017
   ```

2. Click **"Connect"** button

3. You should now see the MongoDB Compass interface with a list of default databases (admin, config, local)

✅ **Connection Successful!**

---

## 📊 Creating Database & Collection

### Method 1: Using MongoDB Compass GUI (Recommended for Beginners)

#### Create Database

1. Click the **"+"** button next to "Databases" or click **"Create Database"**

2. Fill in the form:
   - **Database Name**: `unify_labs`
   - **Collection Name**: `interns`

3. Click **"Create Database"**

4. You should now see `unify_labs` in your database list!

#### Insert Sample Documents

1. Click on `unify_labs` database in the left panel

2. Click on `interns` collection

3. Click the **"ADD DATA"** dropdown button

4. Select **"Insert Document"**

5. **Insert Document #1:**
   ```json
   {
     "name": "Alice Johnson",
     "role": "Frontend Developer",
     "joinedDate": "2024-01-15"
   }
   ```
   Click **"Insert"**

6. **Insert Document #2:**
   Click "ADD DATA" → "Insert Document" again
   ```json
   {
     "name": "Bob Smith",
     "role": "Backend Developer",
     "joinedDate": "2024-02-01"
   }
   ```
   Click **"Insert"**

7. **Insert Document #3:**
   Click "ADD DATA" → "Insert Document" again
   ```json
   {
     "name": "Carol Martinez",
     "role": "Full Stack Developer",
     "joinedDate": "2024-03-10"
   }
   ```
   Click **"Insert"**

✅ **You should now see 3 documents in your interns collection!**

---

### Method 2: Using MongoDB Shell (mongosh)

If you prefer the command line:

```powershell
# Open MongoDB Shell
mongosh

# Switch to unify_labs database (creates it if it doesn't exist)
use unify_labs

# Insert 3 sample documents
db.interns.insertMany([
  {
    name: "Alice Johnson",
    role: "Frontend Developer",
    joinedDate: "2024-01-15"
  },
  {
    name: "Bob Smith",
    role: "Backend Developer",
    joinedDate: "2024-02-01"
  },
  {
    name: "Carol Martinez",
    role: "Full Stack Developer",
    joinedDate: "2024-03-10"
  }
])

# Verify documents were inserted
db.interns.find()

# Count documents
db.interns.countDocuments()
```

---

## ✅ Verification Checklist

Run through this checklist to ensure everything is set up correctly:

- [ ] MongoDB Community Server installed
- [ ] `mongosh --version` returns a version number
- [ ] MongoDB service is running (`Get-Service MongoDB` shows "Running")
- [ ] MongoDB Compass is installed and opens
- [ ] Successfully connected to `mongodb://localhost:27017`
- [ ] Database `unify_labs` exists
- [ ] Collection `interns` exists
- [ ] 3 documents inserted with fields: `name`, `role`, `joinedDate`

---

## 🔍 Viewing Your Data

### In MongoDB Compass:

1. Navigate to: `unify_labs` → `interns`
2. You should see all 3 documents displayed
3. Each document will have an auto-generated `_id` field (this is MongoDB's unique identifier)

### Document Structure:

```json
{
  "_id": ObjectId("..."),
  "name": "Alice Johnson",
  "role": "Frontend Developer",
  "joinedDate": "2024-01-15"
}
```

---

## 🎓 Key Concepts Learned

### 1. **MongoDB Architecture**
   - **Database**: Container for collections (like `unify_labs`)
   - **Collection**: Group of documents (like `interns`)
   - **Document**: JSON-like data structure (like individual intern records)

### 2. **Default Port**
   - MongoDB runs on port `27017` by default
   - Connection string format: `mongodb://localhost:27017`

### 3. **Document Structure**
   - MongoDB stores data in BSON (Binary JSON) format
   - Each document gets a unique `_id` field automatically
   - Fields are flexible - no strict schema required (NoSQL)

### 4. **Tools**
   - **mongosh**: Command-line shell for MongoDB
   - **MongoDB Compass**: GUI tool for visual database management

---

## 🚀 Next Steps

Now that you have MongoDB set up, you can:

1. **Explore CRUD Operations**:
   - Create: `db.collection.insertOne()`, `insertMany()`
   - Read: `db.collection.find()`, `findOne()`
   - Update: `db.collection.updateOne()`, `updateMany()`
   - Delete: `db.collection.deleteOne()`, `deleteMany()`

2. **Learn Querying**:
   ```javascript
   // Find interns with specific role
   db.interns.find({ role: "Frontend Developer" })
   
   // Find interns who joined after a certain date
   db.interns.find({ joinedDate: { $gte: "2024-02-01" } })
   ```

3. **Practice with More Data**:
   - Add more intern documents
   - Create additional collections (projects, tasks, etc.)
   - Experiment with different data structures

---

## 🛠️ Troubleshooting

### Issue: `mongosh: command not found`

**Solution**: Add MongoDB to your system PATH

1. Find MongoDB installation directory (usually `C:\Program Files\MongoDB\Server\7.0\bin`)
2. Add to System Environment Variables:
   - Search "Environment Variables" in Windows
   - Edit "Path" under System Variables
   - Add: `C:\Program Files\MongoDB\Server\7.0\bin`
3. Restart your terminal

### Issue: MongoDB Service won't start

**Solution**: Check data directory permissions

1. Navigate to `C:\Program Files\MongoDB\Server\7.0\data`
2. Ensure the directory exists and has proper permissions
3. Try starting service manually:
   ```powershell
   net start MongoDB
   ```

### Issue: Can't connect in Compass

**Solution**: Verify service is running

```powershell
# Check service status
Get-Service MongoDB

# If stopped, start it
Start-Service MongoDB
```

---

## 📚 Resources

- [MongoDB Official Documentation](https://docs.mongodb.com/)
- [MongoDB Compass Guide](https://docs.mongodb.com/compass/current/)
- [MongoDB Shell (mongosh) Documentation](https://docs.mongodb.com/mongodb-shell/)
- [MongoDB University (Free Courses)](https://university.mongodb.com/)

---

## 🎉 Congratulations!

You've successfully:
- ✅ Installed MongoDB Community Server
- ✅ Connected via localhost:27017
- ✅ Created the `unify_labs` database
- ✅ Created the `interns` collection
- ✅ Inserted 3 sample documents

You're now ready to work with MongoDB in your applications! 🚀

---

**DAY23 Complete** | Next: Connect MongoDB with Node.js/Express
