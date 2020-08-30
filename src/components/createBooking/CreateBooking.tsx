import React, { useState, useEffect } from 'react'; 
import GuestInformation from '../guest-information/GuestInformation';
import Booking from '../booking/Booking';
import axios from 'axios'; 

export interface Bookings { 
    guestId: string; 
    bookingId: string; 
    date: string;  
    seats: number; 
    time: string;  
  }

export default function CreateBooking() {

    //detta är vår föräldrakomponent som kommunicerar mot databasen när sökningar görs i booking, 
    //och när det finns lediga bokningar så renderas GuestInformation.
    //När guestinformation är ifyllt kommer createBooking att skicka en post-request med sitt state till databasen! 

    //listan över bokningar finns i vårt state 
    let defaultValue: Bookings[] = [{guestId: "1", bookingId:'T7', date: 'hhhh', seats: 3, time: '18'}]; 
    const [currentBookings, setCurrentBookings] = useState(defaultValue);

    //hämta bookings från vår databas 
    useEffect(() => {
        axios.get('http://localhost:3001/bookings/')
        .then(currentBookings => { 
            // //kör funktionen som ska mappa ut objektet 
            // presentAvailable(currentBookings.data); 
            let newList = currentBookings.data.filter((t: Bookings) => { return t}); 
            console.log(newList); 
            //vi sparar nya listan i vårt state
            setCurrentBookings([...newList]); 
        }); 
    }, []); 

    // //här är funktionen som ska rendera komponenten findTime 
    function presentAvailable(availableTimes: Bookings[]) {

        // vi kör en filterfunktion som filtrerar vår lista, och returnerar alla objekt utöver den med rätt id 
        // här kan vi välja att filtrera ut i frontend om vi vill? 
        let newList = availableTimes.filter((t: Bookings) => { return t}); 
        console.log(newList)
        //vi sparar nya listan i vårt state
        setCurrentBookings([...newList]); 
    }; 

    function test(data: any) {
        console.log(data)
    }

    console.log(currentBookings); //currentbookings finns i state i vår komponent 

            return(
                <div>
                    {/* findTable är en funktion innuti Boooking */}
                    {/* vi skickar med värdet på current state */}
                    {/* <Booking presentAvailable={currentBookings}></Booking>  */}
                    <GuestInformation></GuestInformation>
                </div>
            );

}