import React, { useState } from "react";
import GuestInformation from "../guest-information/GuestInformation";
import BookingInformation from "../bookingInformation/BookingInformation";
import Booking from "../../models/Booking";
import Guest from "../../models/Guest";

export default function CreateBooking() {
  //detta är vår föräldrakomponent som kommunicerar mot databasen när sökningar görs i booking,
  //och när det finns lediga bokningar så renderas GuestInformation.
  //När guestinformation är ifyllt kommer createBooking att skicka en post-request med sitt state till databasen!

  const [reservation, setReservation] = useState(new Booking());
  const [guest, setGuest] = useState(new Guest());

  function saveGuest() {
    console.log("Gäst sparad i db");
  }

  return (
    <div>
      {/* findTable är en funktion innuti Boooking */}
      {/* vi skickar med värdet på current state */}
      <BookingInformation></BookingInformation>
      {<GuestInformation addGuest={saveGuest}></GuestInformation>}
    </div>
  );
}
