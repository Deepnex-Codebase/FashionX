const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for frontend
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// Debug endpoint to check what frontend is sending
app.post('/debug/login', (req, res) => {
  
  // Always return success for debugging
  res.json({
    success: true,
    message: 'Debug login - this always succeeds',
    data: {
      user: {
        id: 'debug-user-id',
        email: req.body.email || 'debug@test.com',
        firstName: 'Debug',
        lastName: 'User'
      },
      token: 'debug-token-12345'
    }
  });
});

// Debug endpoint to check authentication status
app.get('/debug/auth-status', (req, res) => {
  
  res.json({
    success: true,
    message: 'Debug auth status',
    headers: req.headers,
    cookies: req.headers.cookie
  });
});

const PORT = 5001;
app.listen(PORT, () => {
});