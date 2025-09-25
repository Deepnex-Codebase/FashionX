const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

async function testLogin() {
  try {
    // Test with non-existent email
    const nonExistentEmail = 'nonexistent@test.com';
    
    const user = await User.findOne({ email: nonExistentEmail.toLowerCase() }).select('+passwordHash');
    
    if (!user) {
    } else {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      });
    }
    
    // Test with existing email but wrong password
    const existingEmail = 'prashantdesale2611@gmail.com';
    
    const existingUser = await User.findOne({ email: existingEmail.toLowerCase() }).select('+passwordHash');
    
    if (existingUser) {
        id: existingUser._id,
        email: existingUser.email,
        isActive: existingUser.isActive,
        isEmailVerified: existingUser.isEmailVerified
      });
      
      // Test password comparison with wrong password
      const wrongPassword = 'wrongpassword123';
      const isPasswordValid = await existingUser.comparePassword(wrongPassword);
    }
    
    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
}

testLogin();