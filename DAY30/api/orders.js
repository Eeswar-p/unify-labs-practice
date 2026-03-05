/**
 * Orders API - POST /api/orders
 * Save customer orders to database
 */

const { connectToDatabase } = require('../lib/mongodb');

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    const { customer, items, total } = req.body;

    // Validation
    if (!customer || !customer.name || !customer.email) {
      return res.status(400).json({
        success: false,
        message: 'Customer name and email are required'
      });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Order must contain at least one item'
      });
    }

    if (!total || total <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order total'
      });
    }

    // Sanitize inputs to prevent NoSQL injection
    const sanitizeString = (str) => {
      if (typeof str !== 'string') return str;
      return str.replace(/[{}\[\]$]/g, '');
    };

    const sanitizedCustomer = {
      name: sanitizeString(customer.name),
      email: sanitizeString(customer.email),
      address: sanitizeString(customer.address || ''),
      phone: sanitizeString(customer.phone || '')
    };

    // Create order object
    const order = {
      customer: sanitizedCustomer,
      items: items.map(item => ({
        productId: item.productId,
        name: sanitizeString(item.name),
        price: parseFloat(item.price),
        quantity: parseInt(item.quantity),
        subtotal: parseFloat(item.subtotal)
      })),
      total: parseFloat(total),
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Save to database
    const { db } = await connectToDatabase();
    const result = await db.collection('orders').insertOne(order);

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: {
        orderId: result.insertedId,
        ...order
      }
    });

  } catch (error) {
    console.error('Orders API Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create order'
    });
  }
};
