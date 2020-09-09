const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const schemaBooking = new Schema({
  bookingId: { type: Number, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  seats: { type: Number, required: true },
  notes: String,
  guestId: { type: Number, required: true, unique: true },
});

const Booking = mongoose.model("Booking", schemaBooking);

module.exports = Booking;
