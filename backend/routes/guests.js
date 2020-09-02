let Guest = require("../models/guest.model");
const router = require("express").Router();

let allGuests = [];

// HÅRDKODADE VÄRDEN ENDAST FÖR ATT TESTA MED
let requiredGuestEmail = "mail@mail.se";

// HÄMTA ALLA GÄSTER I DB
router.route("/").get((req, res) => {
  Guest.find()
    .then((guests) => res.json(guests))
    .catch((err) => res.status(400).json("Error:" + err));
});

// HÄMTA EN GUEST MED SPECIFIK EMAIL
router.route("/guestid").get((req, res) => {
  Guest.findOne({
    email: requiredGuestEmail,
  })
    .then((guest) => res.json(guest.email))
    .catch((err) => res.status(400).json("Error:" + err));
});

module.exports = { router, allGuests };
