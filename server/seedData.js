const mongoose = require('mongoose');
const Restaurant = require('./models/Restaurant');
const Travels = require('./models/Travels');
require('dotenv').config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jm-business');
    console.log('✅ Connected to MongoDB for seeding');

    // Clear existing data
    await Restaurant.deleteMany({});
    await Travels.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create Restaurant with default data
    const restaurantData = {
      name: "JM Restaurant",
      address: "Katarina Nagar, Coimbatore",
      phone: "9486386060 / 9894386060",
      since: "40",
      type: "REG. NON VEG",
      menu: []
    };

    // Create Travels with default data
    const travelsData = {
      name: "M TRAVELS",
      services: "BUS Ticket, Car, Bus, Van Rent",
      address: "Karunya Guest House (Opp.), 4-613, Siruvani Main Road, Karunya Nagar, Coimbatore-641114",
      phone: "9486386060 / 9894386060"
    };

    // Insert data
    await Restaurant.create(restaurantData);
    await Travels.create(travelsData);

    console.log('✅ Sample data seeded successfully');
    console.log('🍽️  Restaurant data created');
    console.log('🚗 Travels data created');
    
    // Close connection
    await mongoose.connection.close();
    console.log('📊 MongoDB connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

// Run the seed function
seedData();