let Booking = require("../models/booking.model");
let Guest = require("../models/guest.model");
const router = require("express").Router();

// HÅRDKODADE VÄRDEN ENDAST FÖR TEST.
let name = "Förnamn";
let lName = "Efternamn";
let email = "mail@mail.se";
let phoneNo = 0o70555444555;
let gId = 2;

// HÄMTA ALLA BOKNINGAR (BOOKINGS) I DB
router.route("/").get((req, res) => {
  Booking.find()
    .then((bookings) => res.json(bookings))
    .catch((err) => res.status(400).json("Error:" + err));
  //console.log(allBookings);
});

// SKICKA DATA HÄMTAD FRÅN REQ BODY TILL DB
// ENDPOINT ÄR DYNAMISK MED VÄRDEN SOM GÄSTEN MATAR IN
router.route("/availability/addbooking").post((req, res) => {
  //const name = req.body.name;
  //const lName = req.body.lName;
  //const email = req.body.email;

  //req.body.bookingId;

  const newGuest = new Guest({
    guestId: gId /* req.body.guestId*/,
    firstName: name /* req.body.name */,
    lastName: lName /* req.body.lName*/,
    email: email /* req.body.email*/,
    phoneNumber: phoneNo /* req.body.phone*/,
  });
  const newBooking = new Booking({
    bookingId: 46,
    date: "2020-08-26T00:00:00.000Z" /* req.body.date */,
    time: "18" /* req.body.time */,
    seats: 4,
    notes: "",
    guestId: 1,
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

router.route("/delete/:bookingId").delete(async(req, res) => {
  /// .then ersatt av async/await
  try {
    const booking = await Booking.deleteOne({
      bookingId: req.params.bookingId  
    })
    console.log(booking) 
     res.status(200).json("Success!")
  } catch (e) {
     res.status(400).json("Error:" + e)
  }


    // .then(() => res.redirect('/'))
    // .catch((err) => res.status(400).json("Error:" + err));
});
module.exports = router;
