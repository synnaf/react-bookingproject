import React, { useState } from "react";
import BookingInformation from "../bookingInformation/BookingInformation";
import Guest from "../../models/Guest";
import Booking from "../../models/Booking";
import GuestInformation from "../guest-information/GuestInformation";
import axios from "axios";

export default function CreateBooking() {
  //VÅRT TABLE-STATE, kommer bestå av ett boka-objekt.
  const [reservation, setReservation] = useState(new Booking());

  //VÅR GUEST-STATE, kommer bestå av ett gäst-objekt
  const [guest, setGuest] = useState(new Guest());

  const [guestExist, setGuestExist] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  //FUNKTION FÖR ATT SPARA BOKNINGEN
  function saveBooking(booking: Booking) {
    setReservation(booking);
  }

  //FUNKTION FÖR ATT SPARA GÄSTEN
  function saveGuest(g: Guest, ge: boolean) {
    setGuestExist(ge);
    setGuest(g);
    setIsSaved(true);
  }

  function createReservation() {
    if (reservation && guest) {
      let newReservation = {
        guest: guest,
        reservation: reservation,
        guestExist: guestExist,
      };
      console.log("NYTT OBJEKT ÄR", newReservation);
      axios
        .post(
          "http://localhost:3001/bookings/availability/addbooking",
          newReservation
        )
        .then(() => {
          console.log(newReservation.guest.email, "has been sent");
        });
      setIsConfirmed(true);
      setIsSaved(!isSaved);
    }
  }
  return (
    <React.Fragment>
      {isConfirmed ? (
        <div>
          <h2>Tack för din bokning {guest.firstName}!</h2>
        </div>
      ) : (
        <div>
          <BookingInformation addBooking={saveBooking}></BookingInformation>
          <GuestInformation addGuest={saveGuest}></GuestInformation>
        </div>
      )}
      {isSaved ? (
        <div className="confirmation-container">
          <h3>Stämmer dessa uppgifter?</h3>
          <p>Datum: {reservation.date} </p>
          <p>Tid: {reservation.time} </p>
          <p>Antal gäster: {reservation.seats} </p>
          <p>
            Gäst: {guest.firstName} {guest.lastName}
          </p>
          <p>Telefonnummer: {guest.phoneNumber}</p>
          <p>Email: {guest.email}</p>

          <button type="button" onClick={createReservation}>
            BEKRÄFTA!
          </button>
        </div>
      ) : (
        console.log("BOOKING YET TO BE CONFIRMED")
      )}
    </React.Fragment>
  );
}
