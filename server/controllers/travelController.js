const Travels = require('../models/Travels');

// Get travels information
exports.getTravelsInfo = async (req, res) => {
  try {
    let travels = await Travels.findOne();
    
    if (!travels) {
      travels = await Travels.create({});
    }
    
    res.json(travels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get vehicles
exports.getVehicles = async (req, res) => {
  try {
    // Return static vehicle data as per your frontend
    const vehiclesData = {
      fleet: [
        { type: 'Sedan Cars', count: 15 },
        { type: 'Mini Buses', count: 12 },
        { type: 'SUV Vehicles', count: 8 },
        { type: 'Large Buses', count: 10 },
        { type: 'Luxury Cars', count: 5 },
        { type: 'Tempo Travelers', count: 6 }
      ]
    };
    
    res.json(vehiclesData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};