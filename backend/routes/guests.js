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

// vår post request ska egentligen ligga i en route, men testar här att den funkar innan vi flyttar över? 
router.route("/").post( async (req, res) => {

  const guest = await Guest.findOne({
    email: req.body.email
  })

  if(!guest) {
    let newGuest = new Guest({
      guestId: /*rendera ett nr i en funktion och sätt här*/, 
      firstName: req.body.firstName, 
      lastName: req.body.lastName, 
      email: req.body.email, 
      phoneNumber: req.body.phoneNumber
    }) 
    
    await newGuest.save(); 

    let newBooking = new Booking({
      bookingId: /* rendera nr i funktion och sätt här*/,
      date: req.body.date, 
      seats: req.body.seats, 
      guestId: newGuest.guestId,  
    })

    await newBooking.save(); 

    //här skickas sedan mailet! 
  }

})

module.exports = { router, allGuests };
