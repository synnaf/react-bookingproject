import React, { useState, useEffect } from "react"; 
import axios from 'axios'; 

export default function OneBooking() {
   const [booking, setBooking] = useState([]);

   useEffect(() => {
    axios.get("/bookings/:id").then((allBookings) => {
    console.log(allBookings.data);
    setBooking(
        allBookings.data.map((booking: any) => {
          return (<ul key={booking._id}>
            <button id="delete" onClick={() => deleteBooking()}>Delete</button>
            <li>Booking Id: {booking.bookingId}</li>
            <li>Seats: {booking.seats} <button id="update" onClick={() => updateBooking()}>Update</button></li>
                <input placeholder={booking.seats} />
            <li>Date: {booking.date.split('T')[0]}</li>
          </ul>);
        })
      );
    });
   }, []);

    function updateBooking() {

    }

    function deleteBooking() {

    }

  return (
    <React.Fragment>
        <div className="placeholder">
            Find one booking 
        </div>
        <div className="main-container">
          <div className="ulContainer">
            <li className="ulBooking">
              {booking}
            </li>
          </div>
        </div>

    </React.Fragment>
  );
}
