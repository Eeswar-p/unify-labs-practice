# 🛍️ DAY30 - Full-Stack E-Commerce Store

A modern, full-featured e-commerce store built with vanilla JavaScript, Express.js, and MongoDB. This project demonstrates persistent shopping cart functionality, product catalog with search and filtering, order management backend, and professional deployment to Vercel.

## 📋 Table of Contents

- [Features](#features)
- [Learning Objectives](#learning-objectives)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Seeding Sample Data](#seeding-sample-data)
- [API Documentation](#api-documentation)
- [Frontend Features](#frontend-features)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## ✨ Features

### Core Functionality
- **🛒 Persistent Shopping Cart**: Cart data stored in localStorage, survives page refreshes
- **🔍 Product Search**: Real-time search across product names and descriptions
- **📂 Category Filtering**: Browse products by Electronics, Clothing, Books, Home, Sports
- **➕➖ Quantity Management**: Adjust item quantities directly in cart
- **💰 Automatic Totals**: Real-time calculation with free shipping threshold
- **📝 Order Processing**: Form validation and secure order submission
- **📱 Responsive Design**: Mobile-first CSS with smooth animations
- **♿ Accessible**: Semantic HTML and ARIA labels

### User Experience
- Loading states with animated spinners
- Empty state messages for cart and search results
- Toast notifications for cart actions
- Smooth CSS transitions and hover effects
- Error handling with user-friendly messages
- Order confirmation with unique order ID

## 🎯 Learning Objectives

This project teaches:

1. **localStorage API**: Persistent client-side data storage
2. **Advanced Filtering**: Array methods for search and category filtering
3. **Form Validation**: Custom JavaScript validation logic
4. **REST API Integration**: Fetch API with error handling
5. **NoSQL Database Design**: Product and order schema design
6. **Input Sanitization**: Preventing NoSQL injection attacks
7. **Serverless Deployment**: Vercel configuration and deployment
8. **Mobile-First Design**: Responsive CSS with breakpoints

## 🛠️ Tech Stack

**Frontend:**
- HTML5 (semantic markup)
- CSS3 (custom properties, Grid, Flexbox, animations)
- Vanilla JavaScript (ES6+, localStorage, Fetch API)

**Backend:**
- Node.js v18+
- Express.js (REST API framework)
- MongoDB (NoSQL database)
- MongoDB Node Driver v4.17.0

**Deployment:**
- Vercel (serverless hosting)
- MongoDB Atlas (cloud database)

## 📁 Project Structure

```
DAY30/
├── api/
│   ├── products.js          # GET /api/products - Fetch with filters
│   └── orders.js            # POST /api/orders - Create order
├── lib/
│   └── mongodb.js           # Database connection pooling
├── public/
│   ├── index.html           # Product catalog page
│   ├── cart.html            # Shopping cart page
│   ├── checkout.html        # Checkout form
│   ├── css/
│   │   └── styles.css       # 700+ lines responsive CSS
│   └── js/
│       ├── products.js      # Catalog logic with search/filter
│       ├── cart.js          # Cart management with localStorage
│       └── checkout.js      # Order submission
├── seed-products.js         # Database seeding script
├── server.js                # Local development server
├── package.json             # Dependencies and scripts
├── vercel.json              # Serverless configuration
├── .env                     # Environment variables (local)
└── README.md                # This file
```

## 📦 Prerequisites

- **Node.js**: v18.0.0 or higher ([Download](https://nodejs.org/))
- **MongoDB**: Local installation OR [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
- **npm**: Comes with Node.js
- **Git**: For version control ([Download](https://git-scm.com/))

## 🚀 Installation

### 1. Clone or Navigate to Project

```bash
cd d:/Projects/unify-labs-practice/DAY30
```

### 2. Install Dependencies

```bash
npm install
```

This installs:
- `express` - Web framework
- `mongodb` - Database driver
- `dotenv` - Environment variable management
- `cors` - Cross-origin resource sharing

### 3. Verify Installation

```bash
node --version  # Should be v18+
npm list        # Shows installed packages
```

## ⚙️ Configuration

### Environment Variables

Create or edit `.env` file:

**For Local MongoDB:**

```env
MONGODB_URI=mongodb://127.0.0.1:27017/ecommerce
PORT=3000
```

**For MongoDB Atlas:**

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
PORT=3000
```

Replace `username`, `password`, and `cluster` with your MongoDB Atlas credentials.

### MongoDB Atlas Setup (if using cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database password
6. Add to `.env` file

### Local MongoDB Setup (if using local)

**Windows:**

```powershell
# Check if MongoDB is running
Get-Service MongoDB

# Start MongoDB service
Start-Service MongoDB
```

**macOS/Linux:**

```bash
# Start MongoDB
brew services start mongodb-community  # macOS with Homebrew
sudo systemctl start mongod            # Linux with systemd
```

## 🏃 Running the Application

### Method 1: Standard Development (Unix/Mac/Linux)

```bash
npm run dev
```

### Method 2: Windows Development

```bash
npm run dev:win
```

The `dev:win` script includes OpenSSL legacy provider flags for Node.js v23 compatibility.

### Method 3: Node.js Directly

```bash
node server.js
```

### Access the Application

Open your browser to:
- **Homepage**: http://localhost:3000
- **Cart**: http://localhost:3000/cart.html
- **Checkout**: http://localhost:3000/checkout.html

## 🌱 Seeding Sample Data

Populate the database with 23 sample products:

```bash
npm run seed
```

**What gets seeded:**
- 5 Electronics (headphones, smartwatch, keyboard, etc.)
- 5 Clothing items (t-shirt, jeans, shoes, etc.)
- 4 Books (programming and design)
- 4 Home & Garden items (coffee maker, plants, etc.)
- 5 Sports equipment (yoga mat, dumbbells, etc.)

**Output:**
```
✅ Successfully seeded 23 products!
```

## 📖 API Documentation

### GET /api/products

Fetch all products with optional filtering.

**Query Parameters:**
- `category` (optional): Filter by category (electronics, clothing, books, home, sports, all)
- `search` (optional): Search in name and description

**Examples:**

```bash
# Get all products
GET /api/products

# Filter by category
GET /api/products?category=electronics

# Search products
GET /api/products?search=laptop

# Combine filters
GET /api/products?category=books&search=javascript
```

**Response:**

```json
{
  "success": true,
  "count": 23,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Wireless Headphones",
      "category": "electronics",
      "price": 79.99,
      "description": "Premium wireless headphones...",
      "stock": 25,
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### POST /api/orders

Create a new order.

**Request Body:**

```json
{
  "customer": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "555-1234",
    "address": "123 Main St, City, State 12345"
  },
  "items": [
    {
      "productId": "507f1f77bcf86cd799439011",
      "name": "Wireless Headphones",
      "price": 79.99,
      "quantity": 2,
      "subtotal": 159.98
    }
  ],
  "total": 169.98
}
```

**Validation Rules:**
- `customer.name`: Required, minimum 3 characters
- `customer.email`: Required, valid email format
- `customer.address`: Required, minimum 10 characters
- `items`: Required, non-empty array
- `total`: Required, positive number

**Security:**
- Input sanitization prevents NoSQL injection
- Removes special characters: `{}[]$`

**Response:**

```json
{
  "success": true,
  "message": "Order placed successfully",
  "data": {
    "orderId": "507f1f77bcf86cd799439011",
    "customer": {...},
    "items": [...],
    "total": 169.98,
    "status": "pending",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

## 🎨 Frontend Features

### Product Catalog Page (index.html)

**Features:**
- Real-time search with debouncing
- Category dropdown filter
- Product grid with lazy loading
- Loading, error, and empty states
- Add to cart with animation
- Cart badge with item count

**localStorage Usage:**
```javascript
// Cart structure in localStorage
[
  {
    productId: "507f...",
    name: "Product Name",
    price: 29.99,
    quantity: 2,
    subtotal: 59.98,
    category: "electronics"
  }
]
```

### Shopping Cart Page (cart.html)

**Features:**
- Display all cart items
- Increment/decrement quantity
- Remove items with confirmation
- Clear entire cart
- Automatic subtotal calculation
- Free shipping threshold ($100)
- Persist across browser sessions

### Checkout Page (checkout.html)

**Features:**
- Customer information form
- Form validation (client-side)
- Order summary display
- Submit to API with error handling
- Success message with order ID
- Cart cleared on success

## 🌐 Deployment

### Deploy to Vercel

#### Prerequisites

1. [Vercel Account](https://vercel.com/signup)
2. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier)
3. [Vercel CLI](https://vercel.com/download) (optional)

#### Method 1: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

Follow the prompts:
- Link to existing project? No
- Project name? `day30-ecommerce`
- Directory? `./`
- Override settings? No

#### Method 2: GitHub Integration

1. Push code to GitHub repository
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "Import Project"
4. Select your GitHub repository
5. Configure project:
   - **Framework Preset**: Other
   - **Build Command**: (leave empty)
   - **Output Directory**: `public`

#### Environment Variables on Vercel

Add to Vercel project settings:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
```

⚠️ **Important**: Use MongoDB Atlas (cloud) for production, not local MongoDB.

#### Seed Production Database

After deployment:

```bash
# Set production MongoDB URI locally
echo "MONGODB_URI=mongodb+srv://..." > .env

# Seed the cloud database
npm run seed
```

#### Verify Deployment

Visit your Vercel URL:
- `https://your-project.vercel.app/`

## 🐛 Troubleshooting

### Issue: Cart not persisting

**Solution:**
```javascript
// Check localStorage in browser console
localStorage.getItem('cart')

// Clear corrupted data
localStorage.removeItem('cart')
```

### Issue: Products not loading

**Check:**
1. MongoDB is running: `Get-Service MongoDB` (Windows) or `mongod --version`
2. Connection string in `.env` is correct
3. Database seeded: `npm run seed`
4. Server logs for errors

### Issue: API 404 errors

**Common causes:**
- Incorrect API URL in JavaScript files
- Server not running (check terminal)
- CORS issues (already configured)

**Fix:**
```javascript
// In products.js, cart.js, checkout.js
const API_URL = '/api/products';  // For local development
// OR
const API_URL = 'https://your-app.vercel.app/api/products';  // For production
```

### Issue: MongoDB Connection Failed

**Local MongoDB:**
```powershell
# Windows - Start MongoDB
Start-Service MongoDB

# Check status
Get-Service MongoDB
```

**MongoDB Atlas:**
1. Check network access (whitelist IP `0.0.0.0/0` for development)
2. Verify database user credentials
3. Check connection string format

### Issue: Vercel Deployment 404

**Solution:**
1. Verify `vercel.json` configuration
2. Check build logs in Vercel dashboard
3. Ensure MongoDB Atlas URI is set in environment variables
4. Redeploy: `vercel --prod`

### Issue: Search/Filter not working

**Check browser console for:**
- JavaScript errors
- API response format
- Network requests in DevTools

## 🧪 Testing

### Manual Testing Checklist

**Products Page:**
- [ ] Products load on page load
- [ ] Search filters products correctly
- [ ] Category dropdown filters products
- [ ] Add to cart shows toast notification
- [ ] Cart badge updates with correct count
- [ ] Empty state shows when no results

**Cart Page:**
- [ ] Cart items display correctly
- [ ] Quantity increase/decrease works
- [ ] Remove item shows confirmation
- [ ] Clear cart empties all items
- [ ] Totals calculate correctly
- [ ] Free shipping applies at $100+
- [ ] Cart persists on page refresh

**Checkout Page:**
- [ ] Redirects to cart if empty
- [ ] Form validation works (name, email, address)
- [ ] Order summary matches cart
- [ ] Submit creates order in database
- [ ] Success message shows order ID
- [ ] Cart cleared after successful order

### Test Data

Use these test values for checkout:

```
Name: John Doe
Email: john.doe@example.com
Phone: 555-0123
Address: 123 Main Street, Anytown, ST 12345
```

## 📊 Database Schema

### Products Collection

```javascript
{
  _id: ObjectId,
  name: String,
  category: String,  // electronics, clothing, books, home, sports
  price: Number,
  description: String,
  stock: Number,
  createdAt: Date
}
```

### Orders Collection

```javascript
{
  _id: ObjectId,
  customer: {
    name: String,
    email: String,
    phone: String,
    address: String
  },
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number,
      subtotal: Number
    }
  ],
  total: Number,
  status: String,  // pending, processing, shipped, delivered
  createdAt: Date,
  updatedAt: Date
}
```

## 🎓 Key Concepts Demonstrated

### 1. localStorage Persistence

```javascript
// Save cart
localStorage.setItem('cart', JSON.stringify(cartArray));

// Retrieve cart
const cart = JSON.parse(localStorage.getItem('cart') || '[]');
```

### 2. Array Filtering

```javascript
// Multiple filter conditions
const filtered = products.filter(p => 
  (category === 'all' || p.category === category) &&
  (search === '' || p.name.includes(search))
);
```

### 3. Input Sanitization

```javascript
const sanitize = (str) => str.replace(/[{}\[\]$]/g, '');
```

### 4. Form Validation

```javascript
if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
  showError('Invalid email');
}
```

## 📝 Next Steps

- Add user authentication
- Implement product reviews and ratings
- Add image upload for products
- Create admin dashboard
- Add payment gateway integration (Stripe, PayPal)
- Implement order tracking
- Add email notifications
- Create inventory management

## 🤝 Contributing

This is an educational project. Feel free to:
- Fork and experiment
- Add new features
- Improve existing code
- Submit pull requests

## 📄 License

MIT License - Free to use for learning and commercial projects.

## 🙏 Acknowledgments

- MongoDB documentation
- Express.js guides
- Vercel deployment docs
- MDN Web Docs for JavaScript APIs

---

**Happy coding! 🚀**

For questions or issues, check the Troubleshooting section or review the code comments.
