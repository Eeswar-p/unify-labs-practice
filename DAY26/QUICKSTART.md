# 🚀 DAY26: Quick Start Guide

## ⏱️ 5-Minute Setup

### Step 1: Dependencies Already Installed ✅
```bash
cd d:\Projects\unify-labs-practice\DAY26
npm install  # Already done!
```

Installed packages:
- ✅ express (^4.18.0)
- ✅ mongodb (^6.3.0)
- ✅ dotenv (^16.0.0)

### Step 2: Start the Server
```bash
npm start
```

Wait for output:
```
════════════════════════════════════════════════════════
🚀 DAY26: Express + MongoDB API
════════════════════════════════════════════════════════
✅ Server running on http://localhost:3026
✅ API Info: http://localhost:3026/api/info
✅ Health Check: http://localhost:3026/health
════════════════════════════════════════════════════════
```

### Step 3: Test the API
```bash
# Test health endpoint
curl http://localhost:3026/health

# Get API info
curl http://localhost:3026/api/info

# Test 404 error
curl http://localhost:3026/unknown
```

---

## 📂 Project Structure

| File | Purpose |
|------|---------|
| **package.json** | npm configuration |
| **db.js** | MongoDB connection |
| **index.js** | Express server |
| **README.md** | Full documentation |

---

## 🔌 Database Connection

### When You Start Server:
1. Express server initializes
2. Connects to `mongodb://localhost:27017`
3. Selects database: `unify_labs`
4. Prints: `✅ Database connected successfully`

### If MongoDB isn't running:
```
❌ Database connection failed: connect ECONNREFUSED
```

**Fix**: Start MongoDB first
```powershell
net start MongoDB
```

---

## 🧪 Test Responses

### Health Check
```bash
curl http://localhost:3026/health
```
Returns: `{"status": "API is running", ...}`

### API Info
```bash
curl http://localhost:3026/api/info
```
Returns: API endpoints and version info

### Invalid Route
```bash
curl http://localhost:3026/api/products
```
Returns: `{"error": "Endpoint not found"}` (will change in Phase 2)

---

## 📝 Key Requirements Met ✅

- ✅ `npm init -y` completed
- ✅ `npm install mongodb` completed
- ✅ `db.js` created with MongoClient connection
- ✅ Connects to `mongodb://localhost:27017`
- ✅ Prints 'Database connected successfully' on success
- ✅ Express server configured
- ✅ Port: 3026
- ✅ Error handling implemented
- ✅ Graceful shutdown working

---

## 🛑 Stop the Server

Press `Ctrl+C` to gracefully shutdown:
```
⏹️ Shutting down gracefully...
✅ Database disconnected successfully
```

---

## 📞 Commands at a Glance

```bash
npm install      # Install dependencies
npm start        # Start server
npm run dev      # Same as start
Ctrl+C           # Stop server
```

---

## 🎯 Phase 2: Next Steps

When ready, we'll add:
- [ ] GET /api/products
- [ ] POST /api/products
- [ ] PUT /api/products/:id
- [ ] DELETE /api/products/:id

---

**5-minute setup complete!** ✨
