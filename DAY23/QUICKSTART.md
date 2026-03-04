# DAY23 MongoDB Setup - Quick Start

**⏱️ Estimated Time:** 30-45 minutes

---

## 🚀 Fastest Path to Completion

### 1. Install MongoDB (15 mins)

1. **Download:** [MongoDB Community Server](https://www.mongodb.com/try/download/community)
   - Choose: Latest version, Windows, MSI
   
2. **Install:**
   - Run MSI → Accept License → Complete Installation
   - ✅ Check "Install MongoDB as a Service"
   - ✅ Check "Install MongoDB Compass"
   - Click Install → Wait → Finish

3. **Verify:**
   ```powershell
   mongosh --version
   Get-Service MongoDB
   ```

---

### 2. Open MongoDB Compass (2 mins)

1. Launch **MongoDB Compass** from Start Menu
2. Connection URI: `mongodb://localhost:27017`
3. Click **Connect**

✅ You should see: `admin`, `config`, `local` databases

---

### 3. Create Database (1 min)

1. Click **"+ CREATE DATABASE"**
2. Database Name: `unify_labs`
3. Collection Name: `interns`
4. Click **"Create Database"**

✅ You should see: `unify_labs` in left sidebar

---

### 4. Insert 3 Documents (5 mins)

Click on `unify_labs` → `interns` → **"ADD DATA"** → **"Insert Document"**

**Document 1:**
```json
{
  "name": "Alice Johnson",
  "role": "Frontend Developer",
  "joinedDate": "2024-01-15"
}
```
Click **Insert**

**Document 2:**
```json
{
  "name": "Bob Smith",
  "role": "Backend Developer",
  "joinedDate": "2024-02-01"
}
```
Click **Insert**

**Document 3:**
```json
{
  "name": "Carol Martinez",
  "role": "Full Stack Developer",
  "joinedDate": "2024-03-10"
}
```
Click **Insert**

✅ You should see: **"Documents: 3"** in top right

---

## ✅ Success Criteria

You're done when you can see all of these:

- ✅ MongoDB Compass connected to `mongodb://localhost:27017`
- ✅ Database `unify_labs` exists
- ✅ Collection `interns` shows 3 documents
- ✅ Each document has: `name`, `role`, `joinedDate` fields

---

## 🎯 Test Your Setup

### Option 1: Quick Visual Test (Compass)

1. In Compass, click on `interns` collection
2. In the Filter bar, type: `{ "role": "Frontend Developer" }`
3. Press Enter
4. **Expected:** Only Alice Johnson's document appears

### Option 2: Command Line Test (mongosh)

```powershell
mongosh

use unify_labs
db.interns.find().pretty()
db.interns.countDocuments()
```

**Expected Output:** 3 documents displayed

### Option 3: Automated Test (Node.js)

```powershell
cd d:\Projects\unify-labs-practice\DAY23
npm install
npm run verify
```

**Expected:** ✅ All tests passed

---

## 📚 Need More Help?

- **Detailed Instructions:** See [README.md](README.md)
- **Visual Guide:** See [COMPASS-GUIDE.md](COMPASS-GUIDE.md)
- **CLI Commands:** See [mongosh-commands.txt](mongosh-commands.txt)
- **Completion Checklist:** See [CHECKLIST.md](CHECKLIST.md)

---

## 🛠️ Troubleshooting

| Problem | Solution |
|---------|----------|
| `mongosh: command not found` | Add to PATH: `C:\Program Files\MongoDB\Server\7.0\bin` |
| Service not running | `Start-Service MongoDB` |
| Can't connect in Compass | Ensure service is running, check URI is correct |
| Compass not installed | Download separately from mongodb.com |

---

## 🎉 You're Done!

**Congratulations!** You now have:
- ✅ MongoDB installed and running
- ✅ A database with structured data
- ✅ Hands-on experience with NoSQL databases

**Next:** Connect MongoDB to a Node.js application and build a REST API! 🚀
