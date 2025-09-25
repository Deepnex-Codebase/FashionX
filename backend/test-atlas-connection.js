const mongoose = require('mongoose');
require('dotenv').config();

// Atlas connection string
const ATLAS_URI = 'mongodb+srv://prashantdesale259:jDMqLOlRZJhOztx8@cluster0.fobyotd.mongodb.net/deepnex-fashionX-31?retryWrites=true&w=majority&appName=Cluster0';

async function testAtlasConnection() {
  
  try {
    // Test with different timeout configurations
    const options = {
      serverSelectionTimeoutMS: 10000, // 10 seconds
      socketTimeoutMS: 20000, // 20 seconds
      connectTimeoutMS: 10000, // 10 seconds
      maxPoolSize: 5,
      minPoolSize: 1,
      retryWrites: true,
      w: 'majority'
    };
    
    const conn = await mongoose.connect(ATLAS_URI, options);
    
    // Test a simple query
    const collections = await conn.connection.db.listCollections().toArray();
    
    // Test creating a simple document
    const testCollection = conn.connection.db.collection('connection_test');
    const result = await testCollection.insertOne({
      test: true,
      timestamp: new Date(),
      message: 'Atlas connection test successful'
    });
    
    // Clean up test document
    await testCollection.deleteOne({ _id: result.insertedId });
    
    await mongoose.connection.close();
    
  } catch (error) {
    
    if (error.code) {
    }
    
    if (error.codeName) {
    }
    
    // Specific error analysis
    if (error.message.includes('IP')) {
    }
    
    if (error.message.includes('authentication')) {
    }
    
    if (error.message.includes('timeout') || error.message.includes('ENOTFOUND')) {
    }
  }
}

// Run the test
testAtlasConnection().then(() => {
  process.exit(0);
}).catch((error) => {
  process.exit(1);
});