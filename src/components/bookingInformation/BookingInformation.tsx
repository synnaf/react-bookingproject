import React, { useState, ChangeEvent, useReducer } from "react";
import './BookingInformation.scss'; 
import axios from 'axios'; 
import Booking from '../../models/Booking';

export interface IBookingInformationProps {
  addBooking(booking: Booking): void; 
}

export default function BookinInformation(props: IBookingInformationProps) {

// TVÅ ST STATES VARS UPPDRAG ÄR ATT villkora rendering
  const [isAvailable18, setIsAvailable18] = useState(true);
  const [isAvailable21, setIsAvailable21] = useState(true);
  const [findTime, setFindTime] = useState(true);

  let defaultValue: Booking = {bookingId: 0, time: '', date: '', seats: 0, notes: '', guestId: 33}; 
  const [test, setTest] = useReducer(
    (test: Booking, newTest: Booking) => ({
      ...test, ...newTest
    }), defaultValue
  );

  function update(e: ChangeEvent<any>) {
    let element = e.target.name; 
    let value = e.target.value; 
    setTest({[element]: value} as any); 
  }


// FUNKTION FÖR: att villkora rendering
  function showTimeSlots() { 
    setFindTime(true);
  }
  
//FUNKTION FÖR: hantera värdena när man trycker på knappen
  function createSearch() {    
    showTimeSlots(); //uppdatera state för 18 och 21
    let selectedDate = test.date; 
    let selectedSeats = test.seats; 

    //vi mappar ut för kl.18 och kl.21 
        axios.get('http://localhost:3001/bookings/')
        .then(currentBookings => { 
          let allBookings = currentBookings.data;  
          let newArr = allBookings.filter((chosenDate: any) => chosenDate.date.includes(selectedDate)); 
          
          // kontrollera längden för valt datum
          if (newArr.length > 29) {
            console.log("fullbokat!!!")
            console.log(newArr); 
            return setFindTime(false); 
          } else {
            setFindTime(true); 
            let timeSlotEarly = newArr.filter((t: Booking)=> t.time.includes('18')); 
            let timeSlotLate = newArr.filter((t: Booking)=> t.time.includes('21'));
            
            timeSlotEarly.length > 14 ? setIsAvailable18(false) : setIsAvailable18(true);  
            timeSlotLate.length > 14 ? setIsAvailable21(false) :  setIsAvailable21(true);
          }    
        });
  }

  function sendBooking() {
    console.log(test);
    props.addBooking(test); 
  }


  return (
    <div className="placeholder">
      <div className="form-container">
      <form>
        <fieldset className="input-container">
          <label>Välj datum</label>
            <input type="date" onChange={update} name="date"/>
        </fieldset>
        <fieldset className="select-container">
          <label>Välj antal</label>
          <select name="seats" onChange={update}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
          </select>
        </fieldset>
        <div className="cta-search">
          <button type="button" onClick={createSearch}>Sök</button> 
        </div>
      </form>
      
      {findTime ?
        <div className="find-time">
          <fieldset className="select-time">         
              <label>Välj tid:</label>
                             
              {isAvailable18 ? 
                <div>
                  <input type="radio" id="18" name="time" value="18" onChange={update}/>
                  <label htmlFor="18">18.00</label>
                </div>
              : <div>
                <h4>18.00 FULLT</h4>
                </div>  
              }
              {isAvailable21 ?
                <div>
                  <input type="radio" id="21" name="time" value="21" onChange={update}/>
                  <label htmlFor="21">21.00</label>
                </div>
              : <div>
                  <h4>21.00 FULLT</h4>
                </div> 
              }
          </fieldset>
            <div className="cta-form">
              <button type="button" onClick={() => sendBooking()}>Nästa</button> 
            </div> 
          </div> 
        : <h1>FULLT</h1> }
      </div>
    </div>
  );
} 
  
