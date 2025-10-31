const mongoose = require('mongoose');

const travelsSchema = new mongoose.Schema({
  name: { type: String, default: "M TRAVELS" },
  services: { type: String, default: "BUS Ticket, Car, Bus, Van Rent" },
  address: { 
    type: String, 
    default: "Karunya Guest House (Opp.), 4-613, Siruvani Main Road, Karunya Nagar, Coimbatore-641114" 
  },
  phone: { type: String, default: "9486386060 / 9894386060" }
});

module.exports = mongoose.model('Travels', travelsSchema);