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
  function saveNotes(n: string) {
    tableReservation.notes = n;
  }

  //spara gästen som finns i guestinfo 
  function saveGuest(g: Guest, ge: boolean) {
    console.log(ge); //här finns all info
    //värdet på ge avgör vad som ska hända sen. 
    // om ge === false, så ska ny gäst sparas nedan 
    //om ge === true, så ska ingen ny gäst sparas

    setGuestExist(ge);
    setGuest(g);
    setIsSaved(true);

    //lägg en timeout här så att den körs efter några millisekunder? 
    createReservation(g, ge); //kör create reservation efter 1 sek?
  }




  //denna funktion körs från barnet, nät addGuest körs tar vi emot två saker
  //newGuest/registeredGuest och isGuest 
  function createReservation(g: Guest, ge: boolean) {
    console.log(guestExist); //hämta gäst från state 
    console.log(guest); //hämta gäst från state som är tomt
    //ta emot guest från saveGuest, förutsätter att det inte finns en gäst sedan innan 
    console.log(g); 
    //guest följer inte med hit, men lyckas ändå sparas i db? 
    console.log(tableReservation); 

    //här SKA det existera, dvs finnas innehåll
    if (tableReservation && guest) {
      let newReservation = {
        guest: g,
        reservation: tableReservation,
        guestExist: ge,
      };
      axios
        .post(
          "http://localhost:3001/bookings/availability/addbooking",
          newReservation
        )
        .then(() => {
          setIsConfirmed(true);
          setIsSaved(!isSaved); //isSaved blur true så att bekfrätelsen inte visas 
        });
    }
  }



  //bokningsbekräftelse
  function refreshBooking() {
    setGuest(new Guest());
    setIsConfirmed(false);
    setIsSaved(false);
    setTableSaved(false);
  }
  //bokningsbekräftelse
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

  //returnera bekräftelse om bokningen skickats hit
  //isSaved, vart sätts det?  
  if (isSaved) {
    return (
     <div>hej</div>
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
