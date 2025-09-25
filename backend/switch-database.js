const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');

function switchToAtlas() {
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
    
    fs.writeFileSync(envPath, envContent);
    
  } catch (error) {
  }
}

function switchToLocalhost() {
  try {
    let envContent = fs.readFileSync(envPath, 'utf8');
    
    // Comment out Atlas URI
    envContent = envContent.replace(
      /^MONGODB_URI=mongodb\+srv:/m,
      '# MONGODB_URI=mongodb+srv:'
    );
    
    // Uncomment localhost URI
    envContent = envContent.replace(
      /^# MONGODB_URI=mongodb:\/\/localhost/m,
      'MONGODB_URI=mongodb://localhost'
    );
    
    fs.writeFileSync(envPath, envContent);
    
  } catch (error) {
  }
}

function showCurrentConfig() {
  try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const mongoUriMatch = envContent.match(/^MONGODB_URI=(.+)$/m);
    
    if (mongoUriMatch) {
      const uri = mongoUriMatch[1];
      if (uri.includes('localhost')) {
      } else if (uri.includes('mongodb+srv')) {
      } else {
      }
    } else {
    }
  } catch (error) {
  }
}

// Parse command line arguments
const command = process.argv[2];

switch (command) {
  case 'atlas':
    switchToAtlas();
    break;
    
  case 'localhost':
  case 'local':
    switchToLocalhost();
    break;
    
  case 'status':
  case 'current':
    showCurrentConfig();
    break;
    
  default:
    showCurrentConfig();
    break;
}