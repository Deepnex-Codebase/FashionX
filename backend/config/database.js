const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // MongoDB connection options for Atlas
    const options = {
      serverSelectionTimeoutMS: 10000, // 10 seconds
      socketTimeoutMS: 45000, // 45 seconds
      connectTimeoutMS: 15000, // 15 seconds
      maxPoolSize: 10,
      minPoolSize: 2,
      retryWrites: true,
      w: 'majority',
      family: 4 // Force IPv4
    };
    const conn = await mongoose.connect(process.env.MONGODB_URI, options);
    
    // Handle connection events with better logging
    mongoose.connection.on('error', (err) => {
    });

    mongoose.connection.on('disconnected', () => {
    });

    mongoose.connection.on('reconnected', () => {
    });
    
    mongoose.connection.on('connecting', () => {
    });
    
    mongoose.connection.on('connected', () => {
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close();
        process.exit(0);
      } catch (error) {
        process.exit(1);
      }
    });

  } catch (error) {
    
    if (process.env.MONGODB_URI && process.env.MONGODB_URI.includes('localhost')) {
    } else {
    }
    
    // Don't exit the process, let the server continue running
    // The task polling service will handle the disconnected state gracefully
  }
};

module.exports = connectDB;