let Booking = require("../models/booking.model");
let Guest = require("../models/guest.model");
const router = require("express").Router();
const MAIL_KEY = process.env.MAIL_KEY; 
require("dotenv").config();

//mailet för bokningen
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const transport = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        MAIL_KEY,
    },
  })
);

// HÄMTA ALLA BOKNINGAR (BOOKINGS) I DB
router.route("/").get((req, res) => {
  Booking.find()
    .then((bookings) => res.json(bookings))
    .catch((err) => res.status(400).json("Error:" + err));
});

// SKICKA DATA HÄMTAD FRÅN REQ BODY TILL DB
router.route("/availability/addbooking").post((req, res) => {
  console.log(req.body);

  if (req.body.guestExist === false) {
    const newGuest = new Guest({
      guestId: req.body.guest.guestId,
      firstName: req.body.guest.firstName,
      lastName: req.body.guest.lastName,
      email: req.body.guest.email,
      phoneNumber: Number(req.body.guest.phoneNumber),
    });

    newGuest
      .save()
      .then(() => console.log(newGuest))
      .catch((err) => res.status(400).json("Error:" + err));
  }

  const newBooking = new Booking({
    bookingId: Math.floor(Math.random() * 10000) + 1,
    date: req.body.reservation.date,
    time: req.body.reservation.time,
    seats: req.body.reservation.seats,
    notes: req.body.reservation.notes,
    guestId: req.body.guest.guestId,
  });

  newBooking
    .save()
    .then((data) => res.send(data))
    .then(
      transport.sendMail({
        to: req.body.guest.email,
        from: "f.vforsman@gmail.com",
        subject: "Bokningsbekräftelse",
        html: `
      <h2>Tack för din bokning!<h2>
      <p>Du har bokat: ${req.body.reservation.date}, för: ${newBooking.seats} personer<p>
      <h5>Klicka på länken för att avboka:<h5>
      <a href="http://localhost:3000/delete/${newBooking.bookingId}">Avboka :(</a> 
      `,
      })
    )
    .catch((err) => res.status(400).json("Error:" + err));
});

// HÄMTA EN BOKNING MED ANGIVEN BOOKINGID
router.route("/:bookingId").get((req, res) => {
  Booking.findOne({
    bookingId: req.params.bookingId,
  })
    .then((booking) => res.json(booking))
    .catch((err) => res.status(400).json("Error in get bookingId: " + err));
});

// RADERA EN BOKNING
router.route("/delete/:bookingId").delete(async (req, res) => {
  //lägg in här så att den tar bort
  /* if() ett email finns
  
    else() {

    }

  */
  try {
    const booking = await Booking.deleteOne({
      bookingId: req.params.bookingId,
    });
    res.status(200).json("Deleted booking: " + booking);
  } catch (e) {
    res.status(400).json("Error:" + e);
  }
});

// UPPDATERA EN BOKNING
router.put("/update/:bookingId", (req, res, next) => {
  Booking.findOne({
    bookingId: req.params.bookingId,
  })
    .then(
      (foundBooking) =>
        foundBooking.updateOne({
          seats: req.body.booking.seats,
          notes: req.body.booking.notes,
        }),
      console.log(req.body.booking.notes)
    )
    .catch((e) => res.status(400).json("Error:" + e));
});

module.exports = router;
