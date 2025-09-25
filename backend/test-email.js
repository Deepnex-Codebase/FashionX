const { sendVerificationEmail } = require('./services/emailService');
require('dotenv').config();

// Test email sending
const testEmail = async () => {
  try {
    
    const testToken = 'test-verification-token-123';
    const result = await sendVerificationEmail(
      'test@example.com', // Replace with your test email
      'Test User',
      testToken
    );
  } catch (error) {
  }
};

testEmail();