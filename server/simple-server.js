const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Add this line
require('dotenv').config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Now this will work
app.use(express.json());

// Fix deprecation warning
mongoose.set('strictQuery', false);

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jm-business')
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.log('❌ MongoDB connection error:', err));

// Simple test routes (no controllers needed)
app.get('/', (req, res) => {
  res.json({ 
    message: 'JM Business Backend Server is running!',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API test endpoint is working!',
    status: 'success'
  });
});

app.get('/api/restaurant', (req, res) => {
  res.json({
    name: "JM Restaurant",
    address: "Katarina Nagar, Coimbatore", 
    phone: "9486386060 / 9894386060",
    since: "40",
    type: "REG. NON VEG"
  });
});

app.get('/api/travels', (req, res) => {
  res.json({
    name: "M TRAVELS",
    services: "BUS Ticket, Car, Bus, Van Rent",
    address: "Karunya Guest House (Opp.), Coimbatore",
    phone: "9486386060 / 9894386060"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Simple test server running on http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
});