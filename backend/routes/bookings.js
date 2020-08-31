let Booking = require("../models/booking.model");
let Guest = require("../models/guest.model");
const router = require("express").Router();

// HÅRDKODADE VÄRDEN ENDAST FÖR TEST.
let name = "Förnamn";
let lName = "Efternamn";
let email = "mail@mail.se";
let phoneNo = 0o70555444555;
let gId = 2;
let requiredDate = "2020-08-27";

let requiredTimeSlot = "18";
// HÄMTA ALLA BOKNINGAR (BOOKINGS) I DB
router.route("/").get((req, res) => {
  Booking.find()
    .then((bookings) => res.json(bookings))
    .catch((err) => res.status(400).json("Error:" + err));
  //console.log(allBookings);
});

// HÄMTA ALLA BOOKINGS FÖR ETT SPECIFIKT DATUM
router.route("/availability").get((req, res) => {
  Booking.find({
    date: requiredDate /* req.body.date */,
  })
    .then((bookings) => res.json(bookings))
    .catch((err) => res.status(400).json("Error:" + err));
});

// HÄMTA ALLA BOOKINGS FÖR ETT SPECIFIKT DATUM OCH VALD TID
router.route("/availability/:date").get((req, res) => {
  Booking.find({
    date: requiredDate /* req.params.date */,
    time: requiredTimeSlot /* req.body.time */,
  })

    // NÄR SVARET KOMMER FRÅN DATABAS REDIRECT TILL URL SOM INNEHÅLLER BOKNINGENS VALDA DATUM OCH TID.
    .then((bookings) =>
      res.json(bookings).redirect("/availability/:date/:time")
    )
    .catch((err) => res.status(400).json("Error:" + err));
});

// VISA BOKNINGEN FÖR VALD DATUM OCH TID
router.route("/availability/:date/:time").get((req, res) => {
  Booking.find({
    date: requiredDate /* req.params.date */,
    time: requiredTimeSlot /* req.params.time */,
  })
    .then((bookings) => res.json(bookings))
    .catch((err) => res.status(400).json("Error:" + err));
});

// SKICKA DATA HÄMTAD FRÅN REQ BODY TILL DB
// ENDPOINT ÄR DYNAMISK MED VÄRDEN SOM GÄSTEN MATAR IN
router.route("/availability/:date/:time/addbooking").post((req, res) => {
  //const name = req.body.name;
  //const lName = req.body.lName;
  //const email = req.body.email;

  //req.body.bookingId;

  const newGuest = new Guest({
    guestId: gId,
    firstName: name,
    lastName: lName,
    email: email,
    phoneNumber: phoneNo,
  });
  const newBooking = new Booking({
    bookingId: 13,
    date: "2020-08-27T00:00:00.000Z" /* req.params.date */,
    time: "21" /* req.params.time */,
    seats: 2,
    notes: "NO CARBS",
    guestId: 2,
  });

  // SPARA BOKNING MED VÄRDEN SOM HÄMTAS FRÅN REQ BODY
  newBooking
    .save()
    .then(() => res.json(newBooking))
    .catch((err) => res.status(400).json("Error:" + err));

  /* SPARA GÄST MED INFO HÄMTAD FRÅN FORMULÄRETS BODY*/
  newGuest
    .save()
    .then(() => res.json(newGuest))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/delete/:bookingId").delete((req, res) => {
  Booking.find({
    bookingId: req.params.bookingId
  })
    .then(() => res.redirect('/'))
    .catch((err) => res.status(400).json("Error:" + err));
});
router.route("/delete/:bookingId").delete((req, res) => {
  Booking.find({
    bookingId: req.params.bookingId
  })
    .then(() => res.redirect('/'))
    .catch((err) => res.status(400).json("Error:" + err));
});
module.exports = router;
