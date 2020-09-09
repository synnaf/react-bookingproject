const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const schemaGuest = new Schema({
  guestId: { type: Number, required: true },
  firstName: {
    type: String,
    minlength: 2,
    required: true,
  },
  lastName: {
    type: String,
    minlength: 2,
    required: true,
  },
  email: {
    type: String,
    minlength: 4,
    required: true,
    unique: true,
    trim: true,
  },
  phoneNumber: { type: Number, required: true },
});

const Guest = mongoose.model("Guest", schemaGuest);
module.exports = Guest;
