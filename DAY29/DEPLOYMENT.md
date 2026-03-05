# Deployment Guide: Vercel

## 🚀 Deploy Your Full-Stack Blog to Vercel

This guide walks you through deploying your blog application to Vercel's serverless platform.

---

## 📋 Prerequisites

- [x] Completed local development setup
- [x] MongoDB Atlas cluster configured
- [x] GitHub account
- [x] Vercel account (free tier available)

---

## 🎯 Deployment Options

### **Option 1: Deploy via Vercel Dashboard (Recommended)**

Perfect for beginners - no CLI required.

### **Option 2: Deploy via Vercel CLI**

For developers who prefer terminal workflows.

---

## 🌟 Option 1: Vercel Dashboard Deployment

### **Step 1: Push to GitHub**

1. **Create a new repository** on GitHub:
   - Go to [github.com/new](https://github.com/new)
   - Name: `my-blog-app` (or your preferred name)
   - Keep it **Public** or **Private**
   - Do NOT initialize with README (we already have one)

2. **Push your code:**

```powershell
# Navigate to your project
cd d:\Projects\unify-labs-practice\DAY29

# Initialize Git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Full-stack blog app"

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/my-blog-app.git

# Push to GitHub
git push -u origin main
```

> **Note:** If you get an error about `master` vs `main`, use:
> ```powershell
> git branch -M main
> git push -u origin main
> ```

### **Step 2: Connect to Vercel**

1. **Sign up/Login** at [vercel.com](https://vercel.com)

2. **Import Project:**
   - Click "Add New..." → "Project"
   - Click "Import" next to your GitHub repository
   - If you don't see it, click "Adjust GitHub App Permissions"

3. **Configure Project:**
   - **Framework Preset:** Other
   - **Root Directory:** `./` (default)
   - **Build Command:** Leave empty (we're using serverless functions)
   - **Output Directory:** `public` (default is fine)
   - **Install Command:** `npm install`

### **Step 3: Set Environment Variables**

⚠️ **CRITICAL STEP** - Your app won't work without this!

1. In the "Environment Variables" section:
   - **Key:** `MONGODB_URI`
   - **Value:** Your MongoDB Atlas connection string
     ```
     mongodb+srv://username:password@cluster.mongodb.net/blog?retryWrites=true&w=majority
     ```
   - **Environment:** Production (and optionally Preview & Development)

2. Click "Add" to save the variable

### **Step 4: Deploy**

1. Click **"Deploy"**
2. Wait 1-2 minutes for the build to complete
3. You'll see a success screen with your live URL!

### **Step 5: Verify Deployment**

1. **Visit your live site:**
   - URL format: `https://my-blog-app.vercel.app`
   - Or click "Visit" button in Vercel dashboard

2. **Test functionality:**
   - [ ] Homepage loads with grid layout
   - [ ] Click "New Post" button
   - [ ] Create a test post
   - [ ] Post appears on homepage
   - [ ] Click post to view full content
   - [ ] Edit the post
   - [ ] Delete the post
   - [ ] Toggle dark/light mode

3. **Check API endpoints:**
   ```powershell
   # Fetch all posts (replace YOUR_APP with your actual domain)
   Invoke-RestMethod -Uri "https://YOUR_APP.vercel.app/api/posts"
   ```

---

## 🔧 Option 2: Vercel CLI Deployment

### **Step 1: Install Vercel CLI**

```powershell
npm i -g vercel
```

### **Step 2: Login to Vercel**

```powershell
vercel login
```

Follow the prompts to authenticate (email verification).

### **Step 3: Deploy**

```powershell
# Navigate to your project
cd d:\Projects\unify-labs-practice\DAY29

# Deploy (first time)
vercel

# Answer prompts:
# ? Set up and deploy "DAY29"? Yes
# ? Which scope? Your username
# ? Link to existing project? No
# ? What's your project's name? my-blog-app
# ? In which directory is your code located? ./
```

### **Step 4: Add Environment Variables**

```powershell
# Add MongoDB connection string
vercel env add MONGODB_URI

# Paste your connection string when prompted
# mongodb+srv://username:password@cluster.mongodb.net/blog?retryWrites=true&w=majority

# Select: Production
```

### **Step 5: Deploy to Production**

```powershell
vercel --prod
```

You'll get a production URL like: `https://my-blog-app.vercel.app`

---

## 🔐 Environment Variables Reference

Vercel needs these environment variables:

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | ✅ Yes | MongoDB Atlas connection string |

### **Managing Environment Variables**

**Via Dashboard:**
1. Go to your project in Vercel
2. Settings → Environment Variables
3. Add/Edit/Delete variables
4. Redeploy for changes to take effect

**Via CLI:**
```powershell
# Add variable
vercel env add VARIABLE_NAME

# List variables
vercel env ls

# Remove variable
vercel env rm VARIABLE_NAME
```

---

## 🌐 Custom Domain (Optional)

### **Add a Custom Domain**

1. **Purchase a domain** (from Namecheap, GoDaddy, etc.)

2. **Add to Vercel:**
   - Project Settings → Domains
   - Enter your domain: `myblog.com`
   - Click "Add"

3. **Configure DNS:**
   - Add these records at your domain registrar:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   
   Type: A
   Name: @
   Value: 76.76.21.21
   ```

4. **Wait for DNS propagation** (5 minutes to 48 hours)

5. **Automatic HTTPS** - Vercel provides free SSL certificates!

---

## 🔄 Continuous Deployment

**Automatic Deployments:**
- Every push to `main` branch triggers a production deployment
- Pull requests get preview deployments
- Rollback to previous deployments with one click

**Preview Deployments:**
```powershell
# Push to a new branch
git checkout -b feature-branch
git push origin feature-branch
```

Vercel automatically creates a preview URL for this branch!

---

## 📊 Monitoring & Analytics

### **View Deployment Logs**

1. **Dashboard:** Project → Deployments → Click deployment
2. **CLI:**
   ```powershell
   vercel logs YOUR_DEPLOYMENT_URL
   ```

### **Runtime Logs**

View API function logs in real-time:
```powershell
vercel logs --follow
```

### **Analytics (Vercel Pro)**

- Traffic analysis
- Performance metrics
- Error tracking

---

## 🐛 Troubleshooting

### **Deployment Succeeds but App Doesn't Work**

**1. Check Environment Variables:**
```powershell
vercel env ls
```
Ensure `MONGODB_URI` is set for Production.

**2. Check Build Logs:**
- Vercel Dashboard → Deployments → Click failed deployment
- Look for errors in "Build Logs" and "Functions" tabs

**3. Test MongoDB Connection:**
- Verify MongoDB Atlas network access (0.0.0.0/0 for Vercel)
- Test connection string locally

### **"Cannot GET /api/posts"**

Check `vercel.json` configuration:
```json
{
  "rewrites": [
    { "source": "/api/:path*", "destination": "/api/:path*" },
    { "source": "/(.*)", "destination": "/public/$1" }
  ]
}
```

### **CORS Errors**

Ensure `api/posts.js` includes CORS headers:
```javascript
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
```

### **MongoDB Connection Timeout**

**Solution 1:** Whitelist all IPs in MongoDB Atlas:
- Network Access → Add IP Address → `0.0.0.0/0`

**Solution 2:** Increase timeout in `lib/mongodb.js`:
```javascript
const client = new MongoClient(uri, {
  serverSelectionTimeoutMS: 10000 // 10 seconds
});
```

### **Function Timeout**

Vercel free tier limits: 10-second execution time.

If you hit this limit:
- Optimize database queries
- Add indexes in MongoDB
- Consider upgrading to Vercel Pro

### **Large Payload Errors**

Vercel limits:
- Request body: 5MB
- Response body: 5MB

For large content posts, consider:
- Storing content in MongoDB GridFS
- Implementing pagination

---

## 🚦 Deployment Checklist

Before deploying, ensure:

- [ ] `.env` file is NOT committed to Git
- [ ] `.gitignore` includes `.env`
- [ ] MongoDB Atlas network access allows Vercel IPs (0.0.0.0/0)
- [ ] Connection string is in Vercel environment variables
- [ ] `vercel.json` is configured correctly
- [ ] All dependencies are in `package.json`
- [ ] Tested locally with `vercel dev`

---

## 📈 Performance Optimization

### **1. Enable Caching**

Add cache headers to `api/posts.js`:
```javascript
res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
```

### **2. Optimize Images**

Use Vercel Image Optimization (if adding images later):
```html
<img src="/_vercel/image?url=/path/to/image.jpg&w=640&q=75" />
```

### **3. Database Indexing**

Add MongoDB indexes for better performance:
```javascript
await db.collection('posts').createIndex({ createdAt: -1 });
```

---

## 💰 Pricing

**Vercel Free Tier:**
- Unlimited deployments
- 100 GB bandwidth/month
- 100 hours serverless function execution/month
- Automatic HTTPS
- Perfect for personal projects!

**Vercel Pro ($20/month):**
- More bandwidth and execution time
- Team collaboration
- Analytics
- Priority support

---

## 🎓 Next Steps

After successful deployment:

1. **Share your app** with friends and collect feedback
2. **Monitor usage** in Vercel analytics
3. **Add features:**
   - User authentication
   - Comments section
   - Search functionality
   - Rich text editor (Markdown)
4. **Optimize performance** based on real-world usage
5. **Set up custom domain** for professional look

---

## 📚 Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [Serverless Functions Guide](https://vercel.com/docs/serverless-functions/introduction)
- [Environment Variables](https://vercel.com/docs/environment-variables)
- [Custom Domains](https://vercel.com/docs/custom-domains)

---

## ✅ Success!

Once deployed, your blog is:
- 🌍 **Live** and accessible worldwide
- ⚡ **Fast** with edge caching
- 🔒 **Secure** with HTTPS
- 📈 **Scalable** automatically
- 🆓 **Free** to host (on free tier)

**Your production URL:** `https://YOUR_APP.vercel.app`

---

**Congratulations! You've deployed a full-stack application to the cloud! 🎉**
