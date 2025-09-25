const axios = require('axios');

// Test registration endpoint
async function testRegistration() {
  try {
    
    const response = await axios.post('http://localhost:8080/api/auth/signup', {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'password123'
    });
  } catch (error) {
    
    if (error.response?.status === 500) {
    }
  }
}

testRegistration();