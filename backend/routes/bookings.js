let Booking = require("../models/booking.model");
let Guest = require("../models/guest.model");
const { getDefaultSettings } = require("http2");
const router = require("express").Router();

router.route("/").get((req, res) => {
  Booking.find()
    .then((bookings) => res.json(bookings))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/availability").get((req, res) => {
  /* get lista med bokningar filtrerat på datum */

  let requiredDate = "2020-08-27";

  Booking.find({
    date: requiredDate /* req.body.date */,
  })
    .then((bookings) => res.json(bookings))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/availability/addbooking").post((req, res) => {
  const name = req.body.name;
  const lName = req.body.lName;
  const email = req.body.email;

  //req.body.bookingId;

  /* get lista med bokningar för att generera bookingId */

  /* get lista med gäster för att generera guestId */

  /* get lista med gäster filtrera med email */

  const newGuest = new Guest({
    guestId: 2,
    firstName: "Förnamn",
    lastName: "Efternamn",
    email: "mail@mail.se",
    phoneNumber: 123,
  });
  const newBooking = new Booking({
    bookingId: 13,
    date: "2020-08-27T00:00:00.000Z" /* Date().toString() */,
    time: "18",
    seats: 2,
    notes: "Vegan",
    guestId: 2,
  });

  /* spara bokning med värden hämtat från req.body */
  newBooking
    .save()
    .then(() => res.json(newBooking))
    .catch((err) => res.status(400).json("Error:" + err));

  /* spara gäst med värden hämtat från formulär */
  newGuest
    .save()
    .then(() => res.json("Guest added"))
    .catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
