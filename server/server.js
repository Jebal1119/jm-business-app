const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Fix deprecation warning
mongoose.set('strictQuery', false);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jm-business')
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.log('❌ MongoDB connection error:', err));

// Import controllers
const restaurantController = require('./controllers/restaurantController');
const travelController = require('./controllers/travelController');
const menuController = require('./controllers/menuController');
const authController = require('./controllers/authController');
const contactController = require('./controllers/contactController');
const bookingController = require('./controllers/bookingController');

// Basic route for testing
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'JM Business API is working!',
    timestamp: new Date().toISOString()
  });
});

// ==================== RESTAURANT ROUTES ====================
app.get('/api/restaurant', restaurantController.getRestaurantInfo);
app.get('/api/restaurant/menu', menuController.getMenu);
app.post('/api/restaurant/reviews', restaurantController.addReview);

// ==================== TRAVELS ROUTES ====================
app.get('/api/travels', travelController.getTravelsInfo);
app.get('/api/travels/vehicles', travelController.getVehicles);

// ==================== AUTH ROUTES ====================
app.post('/api/auth/signup', authController.signup);
app.post('/api/auth/login', authController.login);

// ==================== CONTACT ROUTES ====================
app.post('/api/contact', contactController.submitContact);
app.get('/api/contact/messages', contactController.getContacts);
app.patch('/api/contact/:id', contactController.updateContactStatus);

// ==================== BOOKING ROUTES ====================
app.post('/api/travels/bookings', bookingController.createBooking);
app.get('/api/travels/bookings', bookingController.getBookings);
app.patch('/api/travels/bookings/:id', bookingController.updateBookingStatus);

// ==================== ADMIN ROUTES ====================
app.get('/api/admin/data', async (req, res) => {
  try {
    const User = require('./models/User');
    const Contact = require('./models/Contact');
    const Booking = require('./models/Booking');
    const Restaurant = require('./models/Restaurant');
    const Travels = require('./models/Travels');
    
    const users = await User.find().select('-password');
    const contacts = await Contact.find().sort({ createdAt: -1 });
    const bookings = await Booking.find().sort({ createdAt: -1 });
    const restaurants = await Restaurant.find();
    const travels = await Travels.find();
    
    res.json({
      status: 'success',
      database: 'jm-business',
      data: {
        users,
        contacts,
        bookings,
        restaurants,
        travels
      },
      counts: {
        users: users.length,
        contacts: contacts.length,
        bookings: bookings.length,
        restaurants: restaurants.length,
        travels: travels.length
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error',
      message: error.message 
    });
  }
});

// ==================== ROOT ROUTE ====================
app.get('/', (req, res) => {
  res.json({ 
    message: 'JM Business Backend Server is running!',
    version: '1.0.0',
    endpoints: {
      auth: {
        signup: 'POST /api/auth/signup',
        login: 'POST /api/auth/login'
      },
      restaurant: {
        info: 'GET /api/restaurant',
        menu: 'GET /api/restaurant/menu',
        reviews: 'POST /api/restaurant/reviews'
      },
      travels: {
        info: 'GET /api/travels',
        vehicles: 'GET /api/travels/vehicles',
        bookings: 'POST /api/travels/bookings'
      },
      contact: {
        submit: 'POST /api/contact',
        messages: 'GET /api/contact/messages'
      },
      admin: {
        data: 'GET /api/admin/data'
      }
    },
    timestamp: new Date().toISOString()
  });
});

// ==================== ERROR HANDLING ====================
// Handle undefined routes
app.all('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Can't find ${req.originalUrl} on this server!`
  });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('🚨 Error:', err.stack);
  
  res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// ==================== START SERVER ====================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log('🚀 JM Business Server Started Successfully!');
  console.log('='.repeat(50));
  console.log(`📍 Server URL: http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
  console.log(`🗄️  Database: ${process.env.MONGODB_URI}`);
  console.log(`⏰ Started at: ${new Date().toLocaleString()}`);
  console.log('='.repeat(50));
  console.log('📋 Available Endpoints:');
  console.log('   GET  /api/test - Test API connection');
  console.log('   POST /api/auth/signup - User registration');
  console.log('   POST /api/auth/login - User login');
  console.log('   GET  /api/restaurant - Restaurant info');
  console.log('   GET  /api/restaurant/menu - Menu items');
  console.log('   GET  /api/travels - Travels info');
  console.log('   POST /api/contact - Submit contact form');
  console.log('   POST /api/travels/bookings - Create booking');
  console.log('   GET  /api/admin/data - View all data');
  console.log('='.repeat(50));
});