import React, { useState, useEffect, MouseEvent } from "react";
import axios from 'axios';

export default function Admin() {

  function deleteBooking(e: MouseEvent<HTMLButtonElement>) {
    const id = e;
      try{
        axios.delete(`http://localhost:3001/bookings/delete/${id}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      } catch (e){}  
  }
  
   const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/bookings/").then((allBookings) => {
    console.log(allBookings.data);
    setBookings(
      allBookings.data.map((booking: any) => {
        return (<li key={booking._id}>
          <button id="delete" onClick={() => deleteBooking(booking.bookingId)}>Delete</button>
          <div>Booking Id: {booking.bookingId}</div>
          <div>Seats: {booking.seats}</div>
          {booking.date && (
            <div>Date: {booking.date.split('T')[0]}</div>
          )}
          </li>);
        })
      );
    });
   }, []);

  return (
    <div className="main-container">
      <div className="ulContainer">
        <ul className="ulBooking">
          {bookings}
        </ul>
      </div>
    </div>
  );
}


