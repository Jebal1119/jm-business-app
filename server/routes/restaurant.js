const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurant/restaurantController');
const menuController = require('../controllers/restaurant/menuController');

// Restaurant info routes
router.get('/', restaurantController.getRestaurantInfo);
router.post('/reviews', restaurantController.addReview);
router.get('/reviews', restaurantController.getReviews);

// Menu routes
router.get('/menu', menuController.getMenu);
router.post('/menu', menuController.addMenuItem);
router.put('/menu/:id', menuController.updateMenuItem);
router.delete('/menu/:id', menuController.deleteMenuItem);

module.exports = router;