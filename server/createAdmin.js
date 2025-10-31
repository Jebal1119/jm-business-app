const mongoose = require('mongoose');
require('dotenv').config();

const createAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const User = require('./models/User');
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@jmbusiness.com' });
    
    if (existingAdmin) {
      console.log('✅ Admin user already exists');
      await mongoose.connection.close();
      return;
    }

    // Create admin user
    const adminUser = {
      name: 'JM Business Admin',
      email: 'admin@jmbusiness.com',
      phone: '9486386060',
      password: 'admin123',
      passwordConfirm: 'admin123',
      role: 'admin'
    };

    const user = await User.create(adminUser);
    console.log('✅ Admin user created successfully:', user.email);
    
    await mongoose.connection.close();
    console.log('✅ Database connection closed');
    
  } catch (error) {
    console.log('❌ Error creating admin user:', error.message);
  }
};

createAdminUser();