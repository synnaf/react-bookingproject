import React, { useEffect } from "react"; 
import './DeletedBooking.scss'; 
import axios from 'axios'; 

export default function DeletedBooking() {

   useEffect(() => {
    axios.get("/delete/:bookingId").then((allBookings) => {
    console.log(allBookings) });
   }, []);

  return (
    <React.Fragment>
        <div className="deleted-booking">
            <h4>Du har avbokat :(</h4>
            <a href="/home">Tillbaka till startsidan</a> 
        </div>
    </React.Fragment>
  );
}
