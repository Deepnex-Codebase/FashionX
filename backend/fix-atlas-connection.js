const mongoose = require('mongoose');
require('dotenv').config();

// Current IP address
const CURRENT_IP = '89.39.107.193';

// Atlas connection string
const ATLAS_URI = 'mongodb+srv://prashantdesale259:jDMqLOlRZJhOztx8@cluster0.fobyotd.mongodb.net/deepnex-fashionX-31?retryWrites=true&w=majority&appName=Cluster0';

async function fixAtlasConnection() {
  
  // Wait for user to potentially fix the issue
  await new Promise(resolve => setTimeout(resolve, 30000));
  
  try {
    const options = {
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 30000,
      connectTimeoutMS: 15000,
      maxPoolSize: 5,
      minPoolSize: 1
    };
    
    const conn = await mongoose.connect(ATLAS_URI, options);
    
    // Test basic operations
    const collections = await conn.connection.db.listCollections().toArray();
    
    await mongoose.connection.close();
    
    return true;
    
  } catch (error) {
    
    if (error.message.includes('IP')) {
    }
    
    return false;
  }
}

// Create .env update script
function createEnvUpdateScript() {
  const fs = require('fs');
  const path = require('path');
  
  const envPath = path.join(__dirname, '.env');
  
  try {
    let envContent = fs.readFileSync(envPath, 'utf8');
    
    // Comment out localhost URI
    envContent = envContent.replace(
      /^MONGODB_URI=mongodb:\/\/localhost/m,
      '# MONGODB_URI=mongodb://localhost'
    );
    
    // Uncomment Atlas URI
    envContent = envContent.replace(
      /^# MONGODB_URI=mongodb\+srv:/m,
      'MONGODB_URI=mongodb+srv:'
    );
    
    // Write updated content
    fs.writeFileSync(envPath + '.atlas', envContent);
    
  } catch (error) {
  }
}

// Run the fix
fixAtlasConnection().then((success) => {
  if (success) {
    createEnvUpdateScript();
  } else {
  }
  
  process.exit(success ? 0 : 1);
}).catch((error) => {
  process.exit(1);
});