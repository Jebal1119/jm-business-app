const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['starters', 'main-course', 'desserts', 'beverages', 'specials']
  },
  image: {
    type: String,
    default: '/images/default-food.jpg'
  },
  available: {
    type: Boolean,
    default: true
  },
  ingredients: [String],
  spiceLevel: {
    type: String,
    enum: ['mild', 'medium', 'hot', 'very-hot'],
    default: 'medium'
  },
  preparationTime: {
    type: Number, // in minutes
    default: 15
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('MenuItem', menuItemSchema);