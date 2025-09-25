const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./models/User');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/FashionX')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

async function generateToken() {
  try {
    // Find the test user
    const user = await User.findOne({ email: 'test@example.com' });
    
    if (!user) {
      process.exit(1);
    }
    
    // Generate token with correct secret
    const token = jwt.sign(
      { 
        userId: user._id,
        email: user.email 
      },
      'your-super-secret-jwt-key-change-this-in-production',
      { expiresIn: '24h' }
    );
    
    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
}

generateToken();