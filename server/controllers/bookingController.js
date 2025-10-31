const Booking = require('../models/Booking');

// Create new booking
exports.createBooking = async (req, res) => {
  try {
    const {
      customerName,
      customerPhone,
      customerEmail,
      vehicleType,
      pickupLocation,
      destination,
      pickupDate,
      pickupTime,
      passengers,
      totalAmount,
      specialRequests
    } = req.body;

    const booking = await Booking.create({
      customerName,
      customerPhone,
      customerEmail,
      vehicleType,
      pickupLocation,
      destination,
      pickupDate,
      pickupTime,
      passengers,
      totalAmount,
      specialRequests
    });

    res.status(201).json({
      status: 'success',
      message: 'Booking created successfully',
      data: {
        booking
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

// Get all bookings (for admin)
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      results: bookings.length,
      data: {
        bookings
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

// Update booking status
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: 'success',
      data: {
        booking
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};