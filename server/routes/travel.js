const express = require('express');
const { Vehicle, BusRoute, Booking } = require('../models/Travel');
const auth = require('../middleware/auth');

const router = express.Router();

// Get available vehicles
router.get('/vehicles', async (req, res) => {
  try {
    const { type, lat, lng } = req.query;
    let query = { available: true };
    
    if (type) query.type = type;
    
    const vehicles = await Vehicle.find(query).populate('driver', 'username phone');
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get bus routes
router.get('/bus-routes', async (req, res) => {
  try {
    const routes = await BusRoute.find();
    res.json(routes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create booking
router.post('/book', auth, async (req, res) => {
  try {
    const { vehicleId, pickupLocation, destination, distance, scheduledTime } = req.body;
    
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    
    const estimatedPrice = distance * vehicle.pricePerKm;
    
    const booking = new Booking({
      user: req.userId,
      vehicle: vehicleId,
      pickupLocation,
      destination,
      distance,
      estimatedPrice,
      scheduledTime
    });
    
    await booking.save();
    
    // Emit real-time event for drivers
    req.app.get('io').emit('new_booking', booking);
    
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update driver location
router.put('/driver-location', auth, async (req, res) => {
  try {
    const { vehicleId, lat, lng } = req.body;
    
    await Vehicle.findByIdAndUpdate(vehicleId, {
      currentLocation: { lat, lng }
    });
    
    res.json({ message: 'Location updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;