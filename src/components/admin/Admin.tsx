import React, { useState, useEffect, MouseEvent } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Admin() {
  const [bookings, setBookings] = useState([]);

  function deleteBooking(e: MouseEvent<HTMLButtonElement>) {
    const id = e;
    console.log(e);
    try {
      axios
        .delete(`http://localhost:3001/bookings/delete/${id}`)
        .then((res) => {
          console.log(res);
          console.log(res.data);
        });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    axios.get("http://localhost:3001/bookings").then((allBookings) => {
      console.log(allBookings.data);
      setBookings(
        allBookings.data.map((booking: any) => {
          return (
            <li key={booking._id}>
              <p>Bokningsnummer: {booking.bookingId}</p>
              <p>Datum: {booking.date.split("T")[0]}</p>
              <p>Tid: {booking.time}</p>
              <p>Anteckningar: {booking.notes}</p>
              <button
                type="button"
                id="delete"
                onClick={() => deleteBooking(booking.bookingId)}
              >
                Ta bort
              </button>
                        
              <button type="button" id="update">
                {<Link to={`/booking/${booking.bookingId}`}>Ändra</Link>}
              </button>
                    
            </li>
          );
        })
      );
    });
  }, []);
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
