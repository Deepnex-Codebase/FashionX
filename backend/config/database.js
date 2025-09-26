const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // MongoDB connection options for Atlas - with compatible options
    const options = {
      serverSelectionTimeoutMS: 30000, // 30 seconds
      socketTimeoutMS: 60000, // 60 seconds
      connectTimeoutMS: 30000, // 30 seconds
      maxPoolSize: 10,
      minPoolSize: 2,
      retryWrites: true,
      w: 'majority',
      family: 4 // Force IPv4
    };
    
    console.log('Connecting to MongoDB...');
    const conn = await mongoose.connect(process.env.MONGODB_URI, options);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Handle connection events with better logging
    mongoose.connection.on('error', (err) => {
      console.error(`MongoDB connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected, attempting to reconnect...');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected successfully');
    });
    
    mongoose.connection.on('connecting', () => {
      console.log('Establishing connection to MongoDB...');
    });
    
    mongoose.connection.on('connected', () => {
      console.log('MongoDB connection established');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close();
        console.log('MongoDB connection closed through app termination');
        process.exit(0);
      } catch (error) {
        console.error(`Error during MongoDB shutdown: ${error.message}`);
        process.exit(1);
      }
    });

  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    
    if (process.env.MONGODB_URI && process.env.MONGODB_URI.includes('localhost')) {
      console.log('Check if local MongoDB server is running');
    } else {
      console.log('Check your MongoDB Atlas connection string and network connectivity');
    }
    
    // Don't exit the process, let the server continue running with retry logic
    setTimeout(() => {
      console.log('Attempting to reconnect to MongoDB...');
      connectDB();
    }, 5000); // Retry after 5 seconds
    // The task polling service will handle the disconnected state gracefully
  }
};

module.exports = connectDB;