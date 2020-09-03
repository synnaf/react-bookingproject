import React, { useState } from "react";
import BookingInformation from "../bookingInformation/BookingInformation";
import Guest from "../../models/Guest";
import Booking from "../../models/Booking";
import GuestInformation from "../guest-information/GuestInformation";

export default function CreateBooking() {
  const [reservation, setReservation] = useState(new Booking());
  const [guest, setGuest] = useState(new Guest());
  const [guestExist, setGuestExist] = useState(false);

  //FUNKTION FÖR ATT SPARA BOKNINGEN
  function saveBooking(test: Booking) {
    console.log(test);
  }

  function saveGuest(g: Guest, ge: boolean) {
    setGuestExist(ge);
    setGuest(g);
    console.log("Gäst sparad i db");
    console.log("GÄST ATT SPARA ÄR", g);
    console.log(ge);
  }

  return (
    <div>
      <BookingInformation addBooking={saveBooking}></BookingInformation>
      {<GuestInformation addGuest={saveGuest}></GuestInformation>}
    </div>
  );
}
