const mongoose = require('mongoose');
require('dotenv').config();

const testMongo = async () => {
  try {
    console.log('🔗 Attempting to connect to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jm-business');
    console.log('✅ MongoDB connected successfully!');
    
    // List databases
    const adminDb = mongoose.connection.db.admin();
    const result = await adminDb.listDatabases();
    console.log('📊 Available databases:');
    result.databases.forEach(db => console.log(`  - ${db.name}`));
    
    await mongoose.connection.close();
    console.log('✅ Test completed');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.log('💡 Make sure MongoDB is running on localhost:27017');
  }
};

testMongo();