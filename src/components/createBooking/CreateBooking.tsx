import React, { useState } from "react";
import BookingInformation from "../bookingInformation/BookingInformation";
import Guest from "../../models/Guest";
import Booking from "../../models/Booking";
import GuestInformation from "../guest-information/GuestInformation";

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
    console.log("Gäst sparad i db");
    console.log("GÄST ATT SPARA ÄR", g);
    console.log(ge);
  }
  console.log(reservation);

  return (
    <div>
      <BookingInformation addBooking={saveBooking}></BookingInformation>
      {<GuestInformation addGuest={saveGuest}></GuestInformation>}
    </div>
  );
}
