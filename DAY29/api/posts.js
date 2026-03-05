/**
 * DAY29: Blog Posts API - Serverless Function
 * 
 * Endpoints:
 * - GET    /api/posts       - Fetch all blog posts
 * - POST   /api/posts       - Create new blog post
 * - PATCH  /api/posts/:id   - Update blog post
 * - DELETE /api/posts/:id   - Delete blog post
 */

const { connectToDatabase } = require('../lib/mongodb');
const { ObjectId } = require('mongodb');

/**
 * CORS Headers for API responses
 */
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

/**
 * Main API Handler
 */
module.exports = async (req, res) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('posts');

    // Extract ID from query parameters if present
    const postId = req.query.id;

    // Route to appropriate handler
    switch (req.method) {
      case 'GET':
        return await handleGet(collection, postId, res);
      
      case 'POST':
        return await handlePost(collection, req.body, res);
      
      case 'PATCH':
        return await handlePatch(collection, postId, req.body, res);
      
      case 'DELETE':
        return await handleDelete(collection, postId, res);
      
      default:
        return res.status(405).json({
          error: 'Method not allowed',
          allowedMethods: ['GET', 'POST', 'PATCH', 'DELETE']
        });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
};

/**
 * GET - Fetch all posts or single post
 */
async function handleGet(collection, postId, res) {
  try {
    if (postId) {
      // Fetch single post
      if (!ObjectId.isValid(postId)) {
        return res.status(400).json({ error: 'Invalid post ID' });
      }

      const post = await collection.findOne({ _id: new ObjectId(postId) });
      
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      return res.status(200).json({
        success: true,
        data: post
      });
    } else {
      // Fetch all posts (sorted by newest first)
      const posts = await collection
        .find({})
        .sort({ createdAt: -1 })
        .toArray();

      return res.status(200).json({
        success: true,
        count: posts.length,
        data: posts
      });
    }
  } catch (error) {
    throw error;
  }
}

/**
 * POST - Create new blog post
 */
async function handlePost(collection, body, res) {
  try {
    const { title, category, content, author } = body;

    // Validation
    if (!title || !content) {
      return res.status(400).json({
        error: 'Validation failed',
        message: 'Title and content are required'
      });
    }

    // Create post object
    const post = {
      title: title.trim(),
      category: category?.trim() || 'Uncategorized',
      content: content.trim(),
      author: author?.trim() || 'Anonymous',
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 0,
      likes: 0
    };

    // Insert into database
    const result = await collection.insertOne(post);

    return res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: { _id: result.insertedId, ...post }
    });
  } catch (error) {
    throw error;
  }
}

/**
 * PATCH - Update blog post
 */
async function handlePatch(collection, postId, body, res) {
  try {
    if (!postId || !ObjectId.isValid(postId)) {
      return res.status(400).json({ error: 'Invalid post ID' });
    }

    const { title, category, content, author } = body;

    // Build update object (only update provided fields)
    const updateFields = { updatedAt: new Date() };
    
    if (title) updateFields.title = title.trim();
    if (category) updateFields.category = category.trim();
    if (content) updateFields.content = content.trim();
    if (author) updateFields.author = author.trim();

    if (Object.keys(updateFields).length === 1) {
      return res.status(400).json({
        error: 'No fields to update',
        message: 'Provide at least one field to update'
      });
    }

    // Update post
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(postId) },
      { $set: updateFields },
      { returnDocument: 'after' }
    );

    if (!result.value) {
      return res.status(404).json({ error: 'Post not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Post updated successfully',
      data: result.value
    });
  } catch (error) {
    throw error;
  }
}

/**
 * DELETE - Remove blog post
 */
async function handleDelete(collection, postId, res) {
  try {
    if (!postId || !ObjectId.isValid(postId)) {
      return res.status(400).json({ error: 'Invalid post ID' });
    }

    const result = await collection.deleteOne({
      _id: new ObjectId(postId)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Post deleted successfully',
      deletedCount: result.deletedCount
    });
  } catch (error) {
    throw error;
  }
}
