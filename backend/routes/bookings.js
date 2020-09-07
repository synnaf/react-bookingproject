let Booking = require("../models/booking.model");
let Guest = require("../models/guest.model");
const router = require("express").Router();

//mailet för bokningen 
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const transport = nodemailer.createTransport(sendgridTransport({
  auth: {api_key: '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'}
})); 

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
    .then(transport.sendMail({
      to: 'fanny.varnbrinkforsman@medieinstitutet.se',
      from: "f.vforsman@gmail.com",
      subject: "Ändra ditt lösenord!",
      html: `
      <h2>Tack för din bokning!<h2>
      <p>Du är välkommen: </p>
      <h5>Klicka på länken för att avboka!<h5>
      http://localhost:3000/bookings/${newBooking.bookingId} 
      `
    }))
    .catch((err) => res.status(400).json("Error:" + err));
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
    console.log(booking);
    res.status(200).json("Success!");
  } catch (e) {
    res.status(400).json("Error:" + e);
  }
});

router.route("/:bookingId").get((req, res) => {
  const selectedBooking = Booking.findOne({
    bookingId: req.params.bookingId,
  })
    .then((booking) => res.json(booking))
    .catch((err) => res.status(400).json("Error in get bookingId: " + err));
  console.log(selectedBooking);
});

module.exports = router;
