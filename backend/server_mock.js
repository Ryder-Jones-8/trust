const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'trust_secret_key_2024';

// Middleware
app.use(cors());
app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  if (req.method === 'POST' || req.method === 'PUT') {
    console.log('Request body:', JSON.stringify(req.body, null, 2));
  }
  next();
});

// Mock shop data for testing
const mockShops = [
  {
    id: 1,
    name: 'Demo Surf Shop',
    email: 'admin@demo.com',
    password: 'password', // In real app, this would be hashed
    location: 'California, USA'
  },
  {
    id: 2,
    name: 'Test Skate Shop',
    email: 'test@test.com',
    password: 'test123',
    location: 'New York, USA'
  }
];

// Mock products data
const mockProducts = [
  {
    id: 1,
    name: 'Professional Surfboard',
    category: 'surfing',
    subcategory: 'boards',
    price: 599.99,
    brand: 'WaveRider',
    description: 'High-performance surfboard for experienced surfers',
    stock: 15,
    shop_id: 1
  },
  {
    id: 2,
    name: 'Skateboard Deck',
    category: 'skating',
    subcategory: 'decks',
    price: 89.99,
    brand: 'StreetPro',
    description: 'Premium maple deck for street skating',
    stock: 25,
    shop_id: 1
  },
  {
    id: 3,
    name: 'Ski Helmet',
    category: 'skiing',
    subcategory: 'helmets',
    price: 149.99,
    brand: 'SnowSafe',
    description: 'Lightweight helmet with advanced protection',
    stock: 12,
    shop_id: 1
  }
];

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

// Registration route
app.post('/api/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    console.log('Registration attempt for:', email);

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and shop name are required' });
    }

    // Check if shop already exists
    const existingShop = mockShops.find(s => s.email === email);
    if (existingShop) {
      return res.status(409).json({ error: 'Shop with this email already exists' });
    }

    // Create new shop
    const newShop = {
      id: mockShops.length + 1,
      name,
      email,
      password, // In real app, this would be hashed
      location: 'New Location'
    };

    mockShops.push(newShop);

    // Generate JWT token
    const token = jwt.sign(
      { shopId: newShop.id, email: newShop.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('Registration successful for:', email);
    res.status(201).json({
      token,
      shop: {
        id: newShop.id,
        name: newShop.name,
        email: newShop.email,
        location: newShop.location
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for:', email);

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find shop in mock data
    const shop = mockShops.find(s => s.email === email && s.password === password);

    if (!shop) {
      console.log('Invalid credentials for email:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { shopId: shop.id, email: shop.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('Login successful for:', email);
    res.json({
      token,
      shop: {
        id: shop.id,
        name: shop.name,
        email: shop.email,
        location: shop.location
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Products routes
app.get('/api/products', authenticateToken, (req, res) => {
  try {
    const shopProducts = mockProducts.filter(p => p.shop_id === req.user.shopId);
    res.json(shopProducts);
  } catch (error) {
    console.error('Products fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.post('/api/products', authenticateToken, (req, res) => {
  try {
    const newProduct = {
      id: mockProducts.length + 1,
      ...req.body,
      shop_id: req.user.shopId
    };
    mockProducts.push(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Product creation error:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// PUT route for updating products
app.put('/api/products/:id', authenticateToken, (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const productIndex = mockProducts.findIndex(p => p.id === productId && p.shop_id === req.user.shopId);
    
    if (productIndex === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }

    mockProducts[productIndex] = {
      ...mockProducts[productIndex],
      ...req.body,
      id: productId,
      shop_id: req.user.shopId
    };

    res.json(mockProducts[productIndex]);
  } catch (error) {
    console.error('Product update error:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// DELETE route for removing products
app.delete('/api/products/:id', authenticateToken, (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const productIndex = mockProducts.findIndex(p => p.id === productId && p.shop_id === req.user.shopId);
    
    if (productIndex === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }

    mockProducts.splice(productIndex, 1);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Product deletion error:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Analytics route
app.get('/api/analytics/overview', authenticateToken, (req, res) => {
  try {
    const shopProducts = mockProducts.filter(p => p.shop_id === req.user.shopId);
    
    // Mock analytics data
    const totalRevenue = shopProducts.reduce((sum, p) => sum + (p.price * 5), 0); // Mock sales
    const totalSales = shopProducts.length * 5; // Mock sales count
    const averageOrderValue = totalRevenue / Math.max(totalSales, 1);
    
    const categoryBreakdown = shopProducts.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = { count: 0, value: 0 };
      }
      acc[product.category].count += 5; // Mock sales
      acc[product.category].value += product.price * 5;
      return acc;
    }, {});

    res.json({
      totalRevenue,
      totalSales,
      averageOrderValue,
      revenueChange: 12.5, // Mock percentage change
      salesChange: 8.3,
      categoryBreakdown
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Mock Server running on port ${PORT}`);
  console.log(`📊 Test credentials:`);
  console.log(`   Email: admin@demo.com`);
  console.log(`   Password: password`);
  console.log(`   OR`);
  console.log(`   Email: test@test.com`);
  console.log(`   Password: test123`);
});

module.exports = app;