# DAY26: Express.js + MongoDB REST API

## 📚 Learning Objectives

- ✅ Set up Express.js server
- ✅ Connect to MongoDB using MongoClient
- ✅ Create REST API endpoints
- ✅ Implement CRUD operations for products
- ✅ Add error handling and validation

---

## 🎯 Project Requirements

### Phase 1: Project Initialization (Today)
- ✅ Run `npm init -y`
- ✅ Install MongoDB driver: `npm install mongodb`
- ✅ Create `db.js` for connection logic
- ✅ Use MongoClient to connect to `mongodb://localhost:27017`
- ✅ Print 'Database connected successfully' on success

### Phase 2: Express Setup (This session)
- ✅ Install Express.js: `npm install express`
- ✅ Create `index.js` main entry point
- ✅ Set up basic routes
- ✅ Add middleware for JSON parsing
- ✅ Create health check endpoint

### Phase 3: CRUD Endpoints (Next)
- Product listing: `GET /api/products`
- Create product: `POST /api/products`
- Update product: `PUT /api/products/:id`
- Delete product: `DELETE /api/products/:id`

---

## 📁 Project Structure

```
DAY26/
├── package.json           # npm dependencies & scripts
├── index.js              # Main Express server
├── db.js                 # MongoDB connection logic
├── models/               # Data models (coming soon)
│   └── Product.js
├── routes/               # API route handlers (coming soon)
│   └── products.js
└── README.md             # This file
```

---

## 🚀 Quick Start

### Step 1: Install Dependencies
```bash
cd d:\Projects\unify-labs-practice\DAY26
npm install
```

This will install:
- **express** - Web framework
- **mongodb** - Database driver
- **dotenv** - Environment variables

### Step 2: Start the Server (Requires MongoDB running)
```bash
npm start
```

Or for development:
```bash
npm run dev
```

### Expected Output
```
════════════════════════════════════════════════════════
🚀 DAY26: Express + MongoDB API
════════════════════════════════════════════════════════
✅ Server running on http://localhost:3026
✅ API Info: http://localhost:3026/api/info
✅ Health Check: http://localhost:3026/health
════════════════════════════════════════════════════════
```

---

## 📝 File Descriptions

### `package.json`
- npm project metadata
- Lists dependencies: express, mongodb, dotenv
- Defines scripts: `npm start`, `npm run dev`

### `db.js` - MongoDB Connection
```javascript
// Key functions:
connectDB()      // Connect to MongoDB, print success message
disconnectDB()   // Close connection gracefully
getDB()          // Get database instance
getClient()      // Get MongoClient instance
```

**Connection Details:**
- URL: `mongodb://localhost:27017`
- Database: `unify_labs`
- Port: 27017 (default MongoDB port)

### `index.js` - Express Server
- Creates Express app on port 3026
- Sets up middleware for JSON parsing
- Provides health check: `GET /health`
- Provides API info: `GET /api/info`
- Includes error handling
- Graceful shutdown on SIGINT (Ctrl+C)

---

## 🧪 Testing the Server

### 1. Health Check
```bash
curl http://localhost:3026/health
```

**Response:**
```json
{
  "status": "API is running",
  "timestamp": "2026-03-05T...",
  "uptime": 5.234
}
```

### 2. API Info
```bash
curl http://localhost:3026/api/info
```

**Response:**
```json
{
  "name": "DAY26: Express + MongoDB API",
  "version": "1.0.0",
  "description": "REST API for Product Management",
  "endpoints": {
    "health": "GET /health",
    "apiInfo": "GET /api/info",
    "products": "GET /api/products (coming soon)",
    ...
  }
}
```

### 3. Invalid Endpoint
```bash
curl http://localhost:3026/api/unknown
```

**Response:**
```json
{
  "error": "Endpoint not found",
  "path": "/api/unknown",
  "method": "GET"
}
```

---

## 🔌 Database Connection Details

### Connection Flow
1. **Start Server**: `npm start`
2. **Initialize MongoClient**: `connectDB()` in index.js
3. **Verify Connection**: Ping database to confirm
4. **Print Success**: `✅ Database connected successfully`
5. **Get DB Instance**: Used by route handlers
6. **Shutdown**: Gracefully close on Ctrl+C

### Error Handling
If MongoDB isn't running:
```
❌ Database connection failed: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution**: Start MongoDB first
```powershell
# Windows
net start MongoDB

# Or if using WSL2
# mongod --dbpath "C:\data\db"
```

---

## 📊 API Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "status": 400
}
```

---

## 🛠️ Development Workflow

### Add New Route
1. Create file in `routes/`
2. Define route handler
3. Import in `index.js`
4. Test with curl or Postman

### Add New Model
1. Create file in `models/`
2. Define data schema/validation
3. Use in route handlers

### Environment Variables
Create `.env` file:
```
PORT=3026
MONGO_URL=mongodb://localhost:27017
DB_NAME=unify_labs
```

Load in code:
```javascript
require('dotenv').config();
const PORT = process.env.PORT || 3026;
```

---

## 🎯 What's Next (DAY26 Progress)

### ✅ Completed Today
- Express server initialization
- MongoDB connection logic
- Basic endpoints (health, info)
- Error handling
- Graceful shutdown

### 🔄 Coming Soon
- Product CRUD endpoints
- Request validation
- Data models
- Error responses
- Testing with real MongoDB

### 🚀 Future Features
- Authentication (JWT)
- Authorization (roles)
- Advanced queries
- Pagination
- Filtering & sorting
- Rate limiting
- API documentation (Swagger)

---

## 📚 Learning Resources

### Key Concepts
- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database
- **MongoClient**: Node.js driver for MongoDB
- **REST API**: Stateless API using HTTP methods
- **Middleware**: Functions that process requests

### Documentation
- [Express.js Docs](https://expressjs.com/)
- [MongoDB Node.js Driver](https://www.mongodb.com/docs/drivers/node/)
- [REST API Best Practices](https://restfulapi.net/)

---

## 🐛 Troubleshooting

### MongoDB Connection Failed
```
❌ Database connection failed: connect ECONNREFUSED
```
**Solution**: Ensure MongoDB is running
```bash
Get-Service MongoDB | Start-Service
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::3026
```
**Solution**: Change PORT in code or kill existing process
```bash
netstat -ano | findstr :3026
taskkill /PID <PID> /F
```

### Module Not Found
```
Error: Cannot find module 'express'
```
**Solution**: Install dependencies
```bash
npm install
```

---

## ✅ Completion Checklist

- [ ] Run `npm init -y` successfully
- [ ] Run `npm install mongodb express dotenv`
- [ ] Create `db.js` with MongoClient
- [ ] Test DB connection prints "Database connected successfully"
- [ ] Create `index.js` with Express server
- [ ] Start server with `npm start`
- [ ] Test `/health` endpoint
- [ ] Test `/api/info` endpoint
- [ ] Verify error handling for unknown routes
- [ ] Graceful shutdown with Ctrl+C works

---

## 🎉 Success Indicators

You'll know it's working when:
1. `npm start` produces no errors
2. Server starts listening on port 3026
3. "Database connected successfully" appears
4. Health check returns status
5. API info endpoint lists all endpoints
6. Invalid routes return 404 error
7. Ctrl+C gracefully shuts down server

---

**DAY26 Phase 1 Complete!** ✅

Ready for Phase 2: CRUD Endpoint Implementation 🚀

---

## 📞 Quick Reference

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `npm start` | Start production server |
| `npm run dev` | Start development server |
| `Ctrl+C` | Graceful shutdown |

| Endpoint | Purpose |
|----------|---------|
| `GET /health` | Health check |
| `GET /api/info` | API information |
| `POST /api/products` | Create product (coming soon) |
| `GET /api/products` | List products (coming soon) |
| `GET /api/products/:id` | Get product (coming soon) |
| `PUT /api/products/:id` | Update product (coming soon) |
| `DELETE /api/products/:id` | Delete product (coming soon) |

---

**DAY26: Express.js + MongoDB REST API Foundation** 🎯
