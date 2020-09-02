import React, { useState } from 'react'; 
import BookingInformation from '../bookingInformation/BookingInformation';
import Guest from '../../models/Guest';
import Booking from '../../models/Booking';
import GuestInformation from '../guest-information/GuestInformation';


export default function CreateBooking() {
    
    const [reservation, setReservation] = useState(new Booking()); 
    const [guest, setGuest] = useState(new Guest()); 


    //FUNKTION FÖR ATT SPARA BOKNINGEN
    function saveBooking(test: Booking) {
        console.log(test); 
    }
  
    function saveGuest() {
      console.log("Gäst sparad i db");
    }

    return(
        <div>
            <BookingInformation addBooking={saveBooking}></BookingInformation> 
            {<GuestInformation addGuest={saveGuest}></GuestInformation>}
        </div>
    );

}
