const express = require('express');
const router = express.Router();

// Temporary menu data
const menuItems = [
  {
    id: 1,
    name: 'Butter Chicken',
    description: 'Tender chicken in rich tomato gravy',
    price: 320,
    category: 'main-course',
    available: true
  },
  {
    id: 2,
    name: 'Biryani',
    description: 'Fragrant rice with spices',
    price: 280,
    category: 'main-course',
    available: true
  },
  {
    id: 3,
    name: 'Gulab Jamun',
    description: 'Sweet milk dumplings',
    price: 120,
    category: 'desserts',
    available: true
  }
];

router.get('/', (req, res) => {
  res.json(menuItems);
});

module.exports = router;