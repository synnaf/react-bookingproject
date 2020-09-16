let Booking = require("../models/booking.model");
let Guest = require("../models/guest.model");
const router = require("express").Router();
const MAIL_KEY = process.env.MAIL_KEY;
require("dotenv").config();

const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const transport = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: MAIL_KEY,
    },
  })
);

router.route("/").get((req, res) => {
  Booking.find()
    .then((bookings) => res.json(bookings))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/availability/addbooking").post((req, res) => {
  console.log(req.body.guestExist); //guest är empty! så den sätter inga värden i nästa

  //om guestExist är false, skapa en ny gäst  
  if (req.body.guestExist === false) {
    const newGuest = new Guest({
      guestId: req.body.guest.guestId,
      firstName: req.body.guest.firstName,
      lastName: req.body.guest.lastName,
      email: req.body.guest.email,
      phoneNumber: Number(req.body.guest.phoneNumber),
    });
    return newGuest
      .save()
      .then((data) => res.send(data))
      .catch((err) => res.status(400).json("Error:" + err));
  } else {
      //om guestExist är true 
      const newBooking = new Booking({
        bookingId: Math.floor(Math.random() * 10000) + 1,
        date: req.body.reservation.date,
        time: req.body.reservation.time,
        seats: req.body.reservation.seats,
        notes: req.body.reservation.notes,
        guestId: req.body.guest.guestId,
      });
      return newBooking
        .save()
        .then((data) => res.send(data))
        // .then(
        //   transport.sendMail({
        //     to: req.body.guest.email,
        //     from: "f.vforsman@gmail.com",
        //     subject: "Bokningsbekräftelse",
        //     html: `
        //   <h2>Tack för din bokning!<h2>
        //   <p>Du har bokat: ${req.body.reservation.date}, för: ${newBooking.seats} personer<p>
        //   <h5>Klicka på länken för att avboka:<h5>
        //   <a href="http://localhost:3000/delete/${newBooking.bookingId}">Avboka :(</a> 
        //   `,
        //   })
        // )
        .catch((err) => res.status(400).json("Error:" + err));
  }
  //här blir det ett fel, där felet inte hanteras? 
  //(node:22187) UnhandledPromiseRejectionWarning: Error [ERR_HTTP_HEADERS_SENT]

});

router.route("/:bookingId").get((req, res) => {
  Booking.findOne({
    bookingId: req.params.bookingId,
  })
    .then((booking) => res.json(booking))
    .catch((err) => res.status(400).json("Error in get bookingId: " + err));
});

router.route("/delete/:bookingId").delete(async (req, res) => {
  try {
    const booking = await Booking.deleteOne({
      bookingId: req.params.bookingId,
    });
    res.status(200).json("Deleted booking: " + booking);
  } catch (e) {
    res.status(400).json("Error:" + e);
  }
});

router.put("/update/:bookingId", (req, res, next) => {
  Booking.findOne({
    bookingId: req.params.bookingId,
  })
    .then((foundBooking) =>
      foundBooking.updateOne({
        seats: req.body.booking.seats,
        notes: req.body.booking.notes,
      })
    )
    .catch((e) => res.status(400).json("Error:" + e));
});

module.exports = router;
