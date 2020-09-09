import Booking from "../../models/Booking";
import { sign } from "crypto";

//en mock fil för bookingservice 
const mockData: Booking = 
    {
    bookingId: 1,
    date: '222', 
    time: '333',
    seats: 3, 
    notes: '',
    guestId: 1
    }; 

//funktionen som vi vill fakea 
//en asynkron funktion som returnerar löftets resultat
export default async (term: Booking) => {
    const response = await new Promise((resolve) => {
        resolve(mockData)
    }); 
}