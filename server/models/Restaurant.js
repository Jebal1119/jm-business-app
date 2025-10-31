const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  type: String // veg/non-veg
});

const restaurantSchema = new mongoose.Schema({
  name: { type: String, default: "JM Restaurant" },
  address: { type: String, default: "Katarina Nagar, Coimbatore" },
  phone: { type: String, default: "9486386060 / 9894386060" },
  since: { type: String, default: "40" },
  type: { type: String, default: "REG. NON VEG" },
  menu: [menuItemSchema]
});

module.exports = mongoose.model('Restaurant', restaurantSchema);