import React, { useState } from "react";
import "./CreateBooking.scss";
import BookingInformation from "../bookingInformation/BookingInformation";
import Guest from "../../models/Guest";
import Booking from "../../models/Booking";
import GuestInformation from "../guest-information/GuestInformation";
import axios from "axios";
import { Link } from "react-router-dom";

export default function CreateBooking() {
  const [tableReservation, setTableReservation] = useState(new Booking());
  const [tableSaved, setTableSaved] = useState(false);
  const [guest, setGuest] = useState(new Guest());
  const [guestExist, setGuestExist] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  function saveBooking(booking: Booking) {
    setTableReservation(booking);
    setTableSaved(true);
  }

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
      axios
        .post(
          "http://localhost:3001/bookings/availability/addbooking",
          newReservation
        )
        .then(() => {
          setIsConfirmed(true);
          setIsSaved(!isSaved);
        });
    }
  }

  function saveNotes(n: string) {
    tableReservation.notes = n;
  }

  function refreshBooking() {
    setGuest(new Guest());
    setIsConfirmed(false);
    setIsSaved(false);
    setTableSaved(false);
  }

  if (isConfirmed) {
    return (
      <React.Fragment>
        <div className="confirmed-booking">
          <h2>Tack för din bokning {guest.firstName}!</h2>
          <p>Bokningsbekräftelse har skickats till {guest.email} </p>
          <button type="button" onClick={refreshBooking}>
            Gör ny bokning!
          </button>
          <button type="button">{<Link to={"/"}>Startsida</Link>}</button>
        </div>
      </React.Fragment>
    );
  }

  if (isSaved) {
    return (
      <React.Fragment>
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
          <p>Anteckningar: {tableReservation.notes} </p>
          <button type="button" onClick={createReservation}>
            BEKRÄFTA
          </button>
        </div>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <BookingInformation addBooking={saveBooking}></BookingInformation>
        {tableSaved ? (
          <GuestInformation
            addGuest={saveGuest}
            addNotes={saveNotes}
          ></GuestInformation>
        ) : null}
      </React.Fragment>
    );
  }
}
