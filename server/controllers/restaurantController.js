const Restaurant = require('../models/Restaurant');

// Get restaurant information
exports.getRestaurantInfo = async (req, res) => {
  try {
    let restaurant = await Restaurant.findOne();
    
    if (!restaurant) {
      restaurant = await Restaurant.create({});
    }
    
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add review
exports.addReview = async (req, res) => {
  try {
    const { customerName, rating, comment } = req.body;
    
    // For now, just return success
    res.status(201).json({ 
      message: 'Review added successfully',
      review: { customerName, rating, comment }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};