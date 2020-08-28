import React, { useState, useEffect } from 'react'; 
import GuestInformation from '../guest-information/GuestInformation';
import Booking from '../booking/Booking';
import FindTime from '../findTime/FindTime';
import axios from 'axios'; 

export default function CreateBooking() {

    //detta är vår föräldrakomponent som kommunicerar mot databasen när sökningar görs i booking, 
    //och när det finns lediga bokningar så renderas GuestInformation.
    //När guestinformation är ifyllt kommer createBooking att skicka en post-request med sitt state till databasen! 
    
    // const [newBooking, setNewBooking] = useState([]); //state är från början en tom lista när komponenten laddas


    // useEffect(() => {
    //     axios.get('http://localhost:3001/bookings/')
    //     .then(currentBookings => { 
    //         //kör funktionen som ska mappa ut objektet 
    //         presentAvailable(currentBookings.data); 
    //     }); 
    // }, []); 


    //här är funktionen som ska rendera komponenten findTime 
    function presentAvailable(availableTimes: any) {
        let newList = availableTimes.map((listitem: any) => {
            console.log(newList); 
            // setNewBooking(listitem);
     });  }


    //en funktion som uppdaterar state baserat på vad gästen fyller i formuläret?
 

        return(
            <div>
                {/* findTable är en funktion innuti Boooking */}
                <Booking ></Booking> 

                <FindTime></FindTime>


                <GuestInformation></GuestInformation>
            </div>
        );
}