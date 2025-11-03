const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

async function checkData() {
  try {
    // Check users
    const users = await User.find({});
    
    if (users.length > 0) {
      users.forEach(user => {
      });
    }
    
    // Check for any duplicate emails or invalid users
    const duplicateEmails = await User.aggregate([
      { $group: { _id: '$email', count: { $sum: 1 } } },
      { $match: { count: { $gt: 1 } } }
    ]);
    
    if (duplicateEmails.length > 0) {
      duplicateEmails.forEach(dup => {
      });
    } else {
    }
    
    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
}

checkData();