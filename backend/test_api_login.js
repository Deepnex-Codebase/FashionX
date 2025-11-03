const axios = require('axios');
require('dotenv').config();

const API_BASE_URL = 'http://localhost:5000';

async function testLoginAPI() {
  
  try {
    // Test 1: Non-existent email
    const nonExistentEmail = 'nonexistent@test.com';
    const testPassword = 'password123';
    
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email: nonExistentEmail,
        password: testPassword
      });
    } catch (error) {
      if (error.response) {
      } else {
      }
    }
    
    // Test 2: Existing email but wrong password
    const existingEmail = 'prashantdesale2611@gmail.com';
    const wrongPassword = 'wrongpassword123';
    
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email: existingEmail,
        password: wrongPassword
      });
    } catch (error) {
      if (error.response) {
      } else {
      }
    }
    
    // Test 3: Empty credentials
    
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email: '',
        password: ''
      });
    } catch (error) {
      if (error.response) {
      } else {
      }
    }
    
    // Test 4: Missing fields
    
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email: 'test@example.com'
        // password field missing
      });
    } catch (error) {
      if (error.response) {
      } else {
      }
    }
    
  } catch (error) {
  }
}

// Check if server is running first
async function checkServer() {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/auth/verify`, {
      timeout: 5000
    });
    return true;
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      return false;
    } else {
      return true;
    }
  }
}

async function main() {
  
  const serverRunning = await checkServer();
  if (!serverRunning) {
    process.exit(1);
  }
  
  await testLoginAPI();
}

main().catch(console.error);