import React, { useState } from "react";
import "./CreateBooking.scss";
import BookingInformation from "../bookingInformation/BookingInformation";
import Guest from "../../models/Guest";
import Booking from "../../models/Booking";
import GuestInformation from "../guest-information/GuestInformation";
import axios from "axios";

export default function CreateBooking() {
  //VÅRT TABLE-STATE, kommer bestå av ett boka-objekt.
  const [tableReservation, setTableReservation] = useState(new Booking());

  //VÅR GUEST-STATE, kommer bestå av ett gäst-objekt
  const [guest, setGuest] = useState(new Guest());

  const [guestExist, setGuestExist] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  //FUNKTION FÖR ATT SPARA BOKNINGEN
  function saveBooking(booking: Booking) {
    setTableReservation(booking);
  }

  //FUNKTION FÖR ATT SPARA GÄSTEN
  function saveGuest(g: Guest, ge: boolean) {
    setGuestExist(ge);
    setGuest(g);
    setIsSaved(true);
  }

  function createReservation() {
    if (tableReservation && guest) {
      let newReservation = {
        guest: guest,
        reservation: tableReservation,
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

  function saveNotes(n: string) {
    tableReservation.notes = n;
    console.log(tableReservation);
  }

  return (
    <React.Fragment>
      {isConfirmed ? (
        <div className="confirmed-booking">
          <h2>Tack för din bokning {guest.firstName}!</h2>
        </div>
      ) : (
        <div>
          {tableReservation.date === "" ? (
            <BookingInformation addBooking={saveBooking}></BookingInformation>
          ) : (
            <GuestInformation
              addGuest={saveGuest}
              addNotes={saveNotes}
            ></GuestInformation>
          )}
        </div>
      )}
      {isSaved ? (
        <div className="confirmation-container" id="confirm">
          <h3>Stämmer dessa uppgifter?</h3>
          <p>Datum: {tableReservation.date} </p>
          <p>Tid: {tableReservation.time} </p>
          <p>Antal gäster: {tableReservation.seats} </p>
          <p>
            Gäst: {guest.firstName} {guest.lastName}
          </p>
          <p>Telefonnummer: {guest.phoneNumber}</p>
          <p>Email: {guest.email}</p>
          <button type="button" onClick={createReservation}>
            BEKRÄFTA
          </button>
        </div>
      ) : (
        console.log("BOOKING YET TO BE CONFIRMED")
      )}
    </React.Fragment>
  );
}
