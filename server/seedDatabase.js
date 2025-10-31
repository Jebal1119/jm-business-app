const Restaurant = require('../models/Restaurant');

// Get restaurant information
exports.getRestaurantInfo = async (req, res) => {
  try {
    let restaurant = await Restaurant.findOne();
    
    if (!restaurant) {
      return res.status(404).json({ 
        message: 'Restaurant data not found. Please run the seeding script.' 
      });
    }
    
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get menu
exports.getMenu = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne();
    
    if (!restaurant) {
      return res.status(404).json({ 
        message: 'Menu not found. Please run the seeding script.' 
      });
    }
    
    res.json(restaurant.menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add review
exports.addReview = async (req, res) => {
  try {
    const { customerName, rating, comment } = req.body;
    
    if (!customerName || !rating) {
      return res.status(400).json({ message: 'Customer name and rating are required' });
    }

    const restaurant = await Restaurant.findOne();
    
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    
    restaurant.reviews.push({ customerName, rating, comment });
    await restaurant.save();
    
    res.json({ message: 'Review added successfully', reviews: restaurant.reviews });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};