import React, { useState, useEffect, MouseEvent } from "react";
import axios from "axios";
import "./Admin.scss";
import { Link, BrowserRouter } from "react-router-dom";

export default function Admin() {
  const [bookings, setBookings] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  function deleteBooking(e: MouseEvent<HTMLButtonElement>) {
    const id = e;
    try {
      axios
        .delete(`http://localhost:3001/bookings/delete/${id}`)
        .then((res) => {
          setIsDeleted(true);
        });
    } catch (e) {}
  }

  useEffect(() => {
    axios.get("http://localhost:3001/bookings").then((allBookings) => {
      setBookings(
        allBookings.data.map((booking: any) => {
          return (
            <li key={booking._id} className="each-booking">
              <p>Bokningsnummer: {booking.bookingId}</p>
              <p>Datum: {booking.date.split("T")[0]}</p>
              <p>Tid: {booking.time}</p>
              <p>Antal: {booking.seats}</p>
              <p>Anteckningar: {booking.notes}</p>
              <div className="edit-btn">
                <button
                  type="button"
                  id="delete"
                  onClick={() => deleteBooking(booking.bookingId)}
                >
                  Ta bort
                </button>
                         
                <button type="button" id="update">
               
                  <Link to={`/booking/${booking.bookingId}`}>Ändra</Link>
              
                </button>
              </div>
            </li>
          );
        })
      );
      setIsDeleted(false);
    });
  }, [isDeleted]);
  return (
    <div className="main-container">
      {bookings.length === 0 ? (
        <h1>Det finns inga bokningar att visa!</h1>
      ) : (
        <div className="ulContainer">
          <ul className="ulBooking">{bookings}</ul>
        </div>
      )}
    </div>
  );
}
