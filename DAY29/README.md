# DAY 29: Full-Stack Blog Application

## 🎯 Learning Objectives

Build a **production-ready full-stack blog application** with modern web technologies:

- ✅ **Sleek Responsive Frontend** - Vanilla JavaScript with dark/light mode
- ✅ **Robust REST API** - Express.js with MongoDB Node Driver
- ✅ **Cloud Database** - MongoDB Atlas persistent storage
- ✅ **Serverless Deployment** - Vercel platform with API routes

---

## 📋 Project Overview

A modern, minimalist blog platform featuring:

### **Frontend Features**
- 📱 Fully responsive grid layout
- 🌓 Dark/Light theme toggle with localStorage
- ✨ Smooth animations and hover effects
- 📝 Rich text editor with character counter
- 🔍 Category-based organization
- ⚡ Loading states and error handling
- 💻 Clean, professional UI with Google Fonts

### **Backend Features**
- 🚀 Serverless API functions (Vercel)
- 🗄️ MongoDB Atlas cloud database
- 🔐 Request validation and sanitization
- 🌐 CORS-enabled endpoints
- ⚡ Connection pooling for performance
- 📊 Automatic timestamps (createdAt, updatedAt)

### **API Endpoints**
- `GET /api/posts` - Fetch all posts (sorted by newest)
- `GET /api/posts?id=<ID>` - Fetch single post
- `POST /api/posts` - Create new post
- `PATCH /api/posts?id=<ID>` - Update existing post
- `DELETE /api/posts?id=<ID>` - Delete post

---

## 🏗️ Project Structure

```
DAY29/
├── api/
│   └── posts.js              # Serverless API function (all CRUD operations)
├── lib/
│   └── mongodb.js            # Database connection with pooling
├── public/
│   ├── index.html            # Main blog grid view
│   ├── post.html             # Single post view
│   ├── editor.html           # Create/Edit post form
│   ├── css/
│   │   └── styles.css        # Complete styling (500+ lines)
│   └── js/
│       ├── theme.js          # Dark/Light mode toggle
│       ├── app.js            # Main page logic
│       ├── post.js           # Single post logic
│       └── editor.js         # Editor form logic
├── .env                      # Environment variables (not in Git)
├── .env.example              # Environment template
├── .gitignore                # Git ignore rules
├── package.json              # Dependencies and scripts
├── vercel.json               # Vercel configuration
└── README.md                 # This file
```

---

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+ and npm
- MongoDB Atlas account (free M0 tier)
- Vercel account (optional, for deployment)

### **1. Clone and Install**

```powershell
cd DAY29
npm install
```

### **2. Set Up MongoDB Atlas**

1. **Create a free cluster** at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. **Create a database user** (Database Access → Add New Database User)
3. **Whitelist your IP** (Network Access → Add IP Address → Allow Access from Anywhere)
4. **Get your connection string**:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)

### **3. Configure Environment**

Create `.env` file in the project root:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blog?retryWrites=true&w=majority
```

Replace `username` and `password` with your actual credentials.

### **4. Run Locally**

```powershell
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📚 Features Guide

### **1. Browse Posts (index.html)**
- View all blog posts in a responsive grid
- Click any post card to read the full article
- Filter by category badges
- See author and publish date

### **2. Read Post (post.html)**
- Full post content with formatting
- Edit button (navigates to editor)
- Delete button (with confirmation)
- Back to home navigation

### **3. Create/Edit Post (editor.html)**
- **Title**: Required, max 200 characters
- **Category**: 9 categories (Technology, Lifestyle, Travel, etc.)
- **Author**: Optional (defaults to "Anonymous")
- **Content**: Required, minimum 50 characters
- Real-time character counter
- Cancel with confirmation
- Loading state during save

### **4. Dark/Light Mode**
- Toggle via moon/sun icon in header
- Preference saved in localStorage
- Smooth transitions
- Optimized for readability in both modes

---

## 🔌 API Documentation

### **Base URL**
- Local: `http://localhost:3000/api/posts`
- Production: `https://your-app.vercel.app/api/posts`

### **Endpoints**

#### **GET /api/posts**
Fetch all posts (sorted by newest first)

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "My First Post",
      "category": "Technology",
      "author": "Jane Doe",
      "content": "Post content here...",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

#### **GET /api/posts?id=<POST_ID>**
Fetch single post by ID

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "My First Post",
    "category": "Technology",
    "author": "Jane Doe",
    "content": "Full post content...",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### **POST /api/posts**
Create a new post

**Request:**
```json
{
  "title": "My New Post",
  "category": "Technology",
  "author": "John Smith",
  "content": "This is the post content. It must be at least 50 characters long."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Post created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "My New Post",
    "category": "Technology",
    "author": "John Smith",
    "content": "This is the post content...",
    "createdAt": "2024-01-15T11:00:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

#### **PATCH /api/posts?id=<POST_ID>**
Update an existing post

**Request:**
```json
{
  "title": "Updated Title",
  "content": "Updated content..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Post updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Updated Title",
    "content": "Updated content...",
    "updatedAt": "2024-01-15T12:00:00.000Z"
  }
}
```

#### **DELETE /api/posts?id=<POST_ID>**
Delete a post

**Response:**
```json
{
  "success": true,
  "message": "Post deleted successfully"
}
```

### **Error Responses**

All errors follow this format:

```json
{
  "success": false,
  "message": "Error description here"
}
```

**Common Error Codes:**
- `400` - Bad Request (validation error)
- `404` - Post not found
- `500` - Server error

---

## 🎨 Customization

### **Change Theme Colors**

Edit `public/css/styles.css` CSS variables:

```css
:root[data-theme="light"] {
  --primary: #2563eb;      /* Primary color */
  --background: #ffffff;   /* Background color */
  --text-primary: #1a1a1a; /* Text color */
}
```

### **Add New Categories**

Edit the `<select>` in `public/editor.html`:

```html
<option value="Your Category">Your Category</option>
```

### **Modify Post Schema**

Edit `api/posts.js` to add new fields in the insert/update operations.

---

## 🌐 Deployment

### **Deploy to Vercel**

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

**Quick Deploy:**

```powershell
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Set Environment Variables** in Vercel Dashboard:
- `MONGODB_URI` - Your MongoDB Atlas connection string

---

## 🧪 Testing

### **Test API Locally**

Use PowerShell to test endpoints:

```powershell
# Create a post
Invoke-RestMethod -Uri "http://localhost:3000/api/posts" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"title":"Test Post","category":"Technology","author":"Tester","content":"This is a test post with enough content to meet the minimum requirement."}'

# Fetch all posts
Invoke-RestMethod -Uri "http://localhost:3000/api/posts"

# Fetch single post (replace ID)
Invoke-RestMethod -Uri "http://localhost:3000/api/posts?id=YOUR_POST_ID"

# Update post (replace ID)
Invoke-RestMethod -Uri "http://localhost:3000/api/posts?id=YOUR_POST_ID" `
  -Method PATCH `
  -ContentType "application/json" `
  -Body '{"title":"Updated Title"}'

# Delete post (replace ID)
Invoke-RestMethod -Uri "http://localhost:3000/api/posts?id=YOUR_POST_ID" `
  -Method DELETE
```

### **Test Frontend**

1. Open http://localhost:3000
2. Create a new post via "New Post" button
3. View the post in the grid
4. Click to view full post
5. Edit and update the post
6. Delete the post
7. Toggle dark/light mode

---

## 📦 Dependencies

### **Production**
- `express` (4.18.0) - Web framework
- `mongodb` (6.3.0) - MongoDB Node.js driver
- `cors` (2.8.5) - CORS middleware

### **Development**
- `vercel` (33.0.0) - Local development server

---

## 🔧 Troubleshooting

### **"Cannot connect to database"**
- Verify your `MONGODB_URI` in `.env`
- Check MongoDB Atlas network access (whitelist IP)
- Ensure database user has read/write permissions

### **"Module not found" errors**
```powershell
rm -r node_modules
rm package-lock.json
npm install
```

### **Vercel deployment fails**
- Ensure `MONGODB_URI` is set in Vercel environment variables
- Check build logs for specific errors
- Verify `vercel.json` configuration

### **Dark mode not persisting**
- Check browser localStorage is enabled
- Clear browser cache and reload

---

## 🎓 Learning Resources

- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Vercel Serverless Functions](https://vercel.com/docs/serverless-functions/introduction)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [MongoDB Node Driver](https://www.mongodb.com/docs/drivers/node/current/)

---

## ✅ Project Checklist

- [x] Set up MongoDB Atlas cluster
- [x] Configure environment variables
- [x] Implement serverless API
- [x] Build responsive frontend
- [x] Add dark/light mode toggle
- [x] Deploy to Vercel
- [ ] Add user authentication (future enhancement)
- [ ] Implement markdown support (future enhancement)
- [ ] Add image uploads (future enhancement)

---

## 📝 License

This project is part of a MongoDB learning series and is free to use for educational purposes.

---

## 🤝 Contributing

This is a learning project, but suggestions are welcome! Feel free to:
- Report bugs
- Suggest features
- Improve documentation

---

**Happy Coding! 🚀**
