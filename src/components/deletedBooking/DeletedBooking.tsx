import React, { useEffect } from "react"; 
import axios from 'axios'; 

export default function DeletedBooking() {

   useEffect(() => {
    axios.get("/delete/:bookingId").then((allBookings) => {
    console.log(allBookings) });
   }, []);

  return (
    <React.Fragment>
        <div className="placeholder">
            Du har avbokat :(
            <a href="/home">Tillbaka till startsidan</a> 
        </div>
    </React.Fragment>
  );
}
