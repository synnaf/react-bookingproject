import React, { useState } from 'react'; 
import BookingInformation from '../bookingInformation/BookingInformation';
import Guest from '../../models/Guest';
import Booking from '../../models/Booking';


export default function CreateBooking() {
    
    const [reservation, setReservation] = useState(new Booking()); 
    const [guest, setGuest] = useState(new Guest()); 


    //FUNKTION FÖR ATT SPARA BOKNINGEN
    function saveBooking(test: Booking) {
        console.log(test); 
    }

    return(
        <div>
            <BookingInformation addBooking={saveBooking}></BookingInformation> 
        </div>
    );

}