const mongoose = require('mongoose');
const User = require('./models/User');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/fashionx-deepnex-31')
  .then(() => console.log('Connected to MongoDB fashionx-deepnex-31'))
  .catch(err => console.error('MongoDB connection error:', err));

async function debugUser() {
  try {
    const targetUserId = '6894b50c57a427dac104d79d';
    
    // Try different ways to find the user
    const user1 = await User.findById(targetUserId);
    
    const user2 = await User.findOne({ _id: targetUserId });
    
    const user3 = await User.findOne({ _id: new mongoose.Types.ObjectId(targetUserId) });
    
    // List all users
    const allUsers = await User.find({});
    allUsers.forEach(user => {
    });
    
    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
}

debugUser();