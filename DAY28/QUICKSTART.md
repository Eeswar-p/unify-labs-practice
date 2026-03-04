# DAY28 Quick Start Guide

Get your MongoDB Atlas connected Express app running in 5 minutes!

## 📋 Prerequisites

- Node.js v14+ installed
- npm package manager
- MongoDB Atlas account (free at https://www.mongodb.com/cloud/atlas)

## ⚡ Quick Start (5 Steps)

### Step 1: Set Up MongoDB Atlas (2 minutes)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create new "Shared Cluster" (M0 - Free tier)
4. Create Database User:
   - Go to "Database Access"
   - Click "Add New User"
   - Username: `day28_user`
   - Password: Generate strong password (save this!)
   - Role: "Read and write to any database"
5. Configure Network Access:
   - Go to "Network Access"
   - Click "Add IP Address"
   - Enter: `0.0.0.0/0` (for development)
   - Click "Confirm"

### Step 2: Get Connection String (1 minute)

1. Click "Connect" on your cluster
2. Choose "Drivers" → "Node.js"
3. Copy the connection string
4. It looks like:
   ```
   mongodb+srv://day28_user:PASSWORD@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 3: Create .env File (1 minute)

Create file named `.env` in project root:

```
MONGO_URL=mongodb+srv://day28_user:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/?retryWrites=true&w=majority
DB_NAME=unify_labs
PORT=3028
NODE_ENV=development
```

**Replace with your actual values from Atlas!**

### Step 4: Install Dependencies & Test (1 minute)

```bash
# Install npm packages
npm install

# Test Atlas connection (should show "✅ ALL TESTS PASSED!")
npm test
```

### Step 5: Start Server (instant)

```bash
# Start Express server
npm start
```

You should see:
```
╔═══════════════════════════════════════════╗
║   DAY28: MongoDB Atlas Cloud Backend     ║
╚═══════════════════════════════════════════╝

📍 Server:    http://localhost:3028
🌐 Database:  MongoDB Atlas (Cloud)
✅ Ready to accept requests from Atlas!
```

## 🧪 Test Your API

### Health Check
```powershell
curl http://localhost:3028/health
```

### Create Product
```powershell
curl -X POST http://localhost:3028/products `
  -H "Content-Type: application/json" `
  -d '{"name":"Laptop","price":999.99,"stock":10}'
```

### Get All Products
```powershell
curl http://localhost:3028/products
```

### Update Product (copy ID from create response)
```powershell
curl -X PATCH http://localhost:3028/products/PRODUCT_ID `
  -H "Content-Type: application/json" `
  -d '{"stock":50}'
```

### Delete Product
```powershell
curl -X DELETE http://localhost:3028/products/PRODUCT_ID
```

## 📊 What's Running

| Component | Details |
|-----------|---------|
| **Server** | Express.js on port 3028 |
| **Database** | MongoDB Atlas (Cloud) |
| **Tier** | M0 Shared (Free) |
| **Data** | Persisted in Atlas cluster |
| **Connection** | SRV (mongodb+srv://) |

## ✅ Verification Checklist

After completing Quick Start:

- [ ] Registered MongoDB Atlas account
- [ ] Created M0 Shared Cluster
- [ ] Created database user (day28_user)
- [ ] Configured Network Access (0.0.0.0/0)
- [ ] Created .env file with MONGO_URL
- [ ] Ran `npm install` successfully
- [ ] Ran `npm test` - all tests passed
- [ ] Started server with `npm start`
- [ ] Got 200 response from `/health` endpoint
- [ ] Created product with POST request
- [ ] Retrieved products with GET request
- [ ] Data persists in Atlas cluster

## 🆘 Troubleshooting

### "MONGO_URL environment variable not set"
Solution: Create `.env` file with your Atlas connection string

### "Authentication failed"
Solution: Check username and password in connection string match database user

### "Command failed: Connection refused"
Solution: Check Network Access in Atlas includes your IP (or 0.0.0.0/0)

### "No suitable servers found"
Solution: 
1. Wait 1-2 minutes after creating cluster
2. Verify internet connection
3. Check firewall allows HTTPS outbound

### "Database not connected" error
Solution: 
1. Verify MONGO_URL in .env file
2. Run `npm test` to check connection
3. Check Atlas Network Access config

## 📚 More Info

- **Full Guide**: Read [README.md](./README.md) for detailed information
- **API Docs**: See [index.js](./index.js) for route documentation
- **DB Module**: Check [db.js](./db.js) for connection code
- **Test Script**: Run [test-atlas.js](./test-atlas.js) directly

## 🚀 Next Steps

After getting this working:

1. **Experiment**: Try different product names and prices
2. **Scale**: Add more routes and collections
3. **Learn**: Study the db.js connection code
4. **Deploy**: Deploy to cloud platform (Heroku, Render, Vercel)

---

**DAY28 Quick Start Complete!** 🎉

Your Express app is now connected to MongoDB Atlas cloud database!
