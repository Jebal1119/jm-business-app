const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true
  },
  customerPhone: {
    type: String,
    required: [true, 'Customer phone is required']
  },
  customerEmail: {
    type: String,
    trim: true
  },
  vehicleType: {
    type: String,
    required: [true, 'Vehicle type is required']
  },
  pickupLocation: {
    type: String,
    required: [true, 'Pickup location is required']
  },
  destination: {
    type: String,
    required: [true, 'Destination is required']
  },
  pickupDate: {
    type: Date,
    required: [true, 'Pickup date is required']
  },
  pickupTime: {
    type: String,
    required: [true, 'Pickup time is required']
  },
  passengers: {
    type: Number,
    required: [true, 'Number of passengers is required'],
    min: 1
  },
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required']
  },
  specialRequests: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);