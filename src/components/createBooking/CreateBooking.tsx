import React, { useState } from "react";
import BookingInformation from "../bookingInformation/BookingInformation";
import Guest from "../../models/Guest";
import Booking from "../../models/Booking";
import GuestInformation from "../guest-information/GuestInformation";
import axios from "axios";

export default function CreateBooking() {
  //VÅRT TABLE-STATE, kommer bestå av ett boka-objekt.
  const [reservation, setReservation] = useState({
    bookingId: 0,
    time: "",
    date: "",
    seats: 0,
    notes: "",
    guestId: 33,
  });

  //VÅR GUEST-STATE, kommer bestå av ett gäst-objekt
  const [guest, setGuest] = useState(new Guest());

  // FINNS GÄSTEN REDAN I DB?
  const [guestExist, setGuestExist] = useState(false);

  //FUNKTION FÖR ATT SPARA BOKNINGEN
  // vår funktion tar emotr ett objekt som är som interfacet
  function saveBooking(booking: Booking) {
    setReservation(booking);
  }

  //FUNKTION FÖR ATT SPARA GÄSTEN
  function saveGuest(g: Guest, ge: boolean) {
    setGuestExist(ge);
    setGuest(g);
    console.log("GÄST ATT SPARA ÄR", g);
    console.log(ge);

    //efter att gästen blivit sparad i statet: 
    if(reservation && guest) {
        //skapa ett objekt får vår gäst och dennes bokning, skicka med det till API
      let newGuestWithBooking = {
          //sätt egenskaperna utifrån det som finns i staten
          test: test 
        }
        axios.post('', newGuestWithBooking).then(sendData => {
            //check if booking-objekt is correct
            console.log(sendData); 
        });
    }
  }




  return (
    <div>
      <BookingInformation addBooking={saveBooking}></BookingInformation>
      {<GuestInformation addGuest={saveGuest}></GuestInformation>}
    </div>
  );
}
