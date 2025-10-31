const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working!', timestamp: new Date() });
});

// Test signup route
app.post('/api/auth/signup', (req, res) => {
  console.log('Signup data received:', req.body);
  res.json({ 
    message: 'Signup successful (test)', 
    user: req.body 
  });
});

app.listen(PORT, () => {
  console.log(`✅ Test server running on http://localhost:${PORT}`);
});