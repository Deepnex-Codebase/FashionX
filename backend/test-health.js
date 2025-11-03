const axios = require('axios');

// Test health endpoint
async function testHealth() {
  try {
    
    const response = await axios.get('http://localhost:8080/health');
    
    // Now test registration
    const regResponse = await axios.post('http://localhost:8080/api/auth/signup', {
      firstName: 'Test',
      lastName: 'User', 
      email: 'test@example.com',
      password: 'password123'
    }, {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
  } catch (error) {
    
    if (error.response) {
    } else if (error.request) {
    }
  }
}

testHealth();