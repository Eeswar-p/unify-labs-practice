/**
 * Local Development Server
 * Simulates Vercel serverless environment locally
 */

// Load environment variables
require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from public directory
app.use(express.static('public'));

// API Routes - Import the serverless function
const postsHandler = require('./api/posts');

app.all('/api/posts', async (req, res) => {
  try {
    await postsHandler(req, res);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Serve index.html for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 DAY29 Blog App Running!`);
  console.log(`\n📍 Local: http://localhost:${PORT}`);
  console.log(`\n💡 Tip: Make sure you have created .env file with MONGODB_URI`);
  console.log(`\nPress Ctrl+C to stop\n`);
});
