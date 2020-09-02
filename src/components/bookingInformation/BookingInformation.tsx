import React, { useState, ChangeEvent, useReducer } from "react";
import './BookingInformation.scss'; 
import axios from 'axios'; 


export interface IBookingForm { 
  date: string;  
  seats: number; 
  time: string;  
}


export default function Booking(props: any) {
// props ska innehålla en funktion som vi tar emot från vår förälder.
// console.log(props); 

// TVÅ ST STATES VARS UPPDRAG ÄR ATT villkora rendering
  const [isAvailable, setIsAvailable] = useState(true);
  const [findTime, setFindTime] = useState(false); 
// FUNKTION FÖR: att villkora rendering
  function showTimeSlots() { setFindTime(true);}

//vi sätter formulärets defaultvalues, vi behöver använda useReducer eftersom dessa ska kunna uppdateras individuellt? 
  let defautValue: IBookingForm = {date:'', seats: 0, time: ''}; 
  
  const [requestedDate, setRequestedDate] = useReducer(
    (state: IBookingForm, newState: IBookingForm) => 
    ({...state, ...newState}), defautValue); 

//FUNKTION FÖR: hämta input-värden, spara i lokalt state 
  function handleInput(e: ChangeEvent<any>) {
    let element = e.target.name; 
    let value = e.target.value;  
    setRequestedDate({[element]: value} as any); 
  }


//FUNKTION FÖR: hantera värdena när man trycker på knappen
// denna funktion används för att uppdatera parent
  function createSearch(e: ChangeEvent<any>) {
    showTimeSlots(); //uppdatera state för 18 och 21
    handleInput(e); // uppdatera formulärstate 

    console.log(requestedDate); //statet för datum antal, tid 
    // let selectedDate = requestedDate.date; 
    let selectedDate = requestedDate.date;  // hämta datumet dynamiskt
    console.log("selected date = " + selectedDate); 
    
    //vi mappar ut för kl.18 och kl.21 
        axios.get('http://localhost:3001/bookings/')
        .then(currentBookings => { 
          let allBookings = currentBookings.data;  

            // loopa igenom listan och HITTA en matchning 
              let newArr = allBookings.filter((chosenDate: any) => chosenDate.date.includes(selectedDate)); 
              console.log(newArr);

            // kontrollera längden för valt datum
              if (newArr.length > 29) {
                console.log("fullbokat!!!")
                return setFindTime(false); 

              } else {
                setFindTime(true)
              
                //när längden är färre än 29 finns det platser, leta efter tider: 

                let timeSlotEarly = newArr.filter((t: Bookings)=> t.time.includes('18')); 
                let timeSlotLate = newArr.filter((t: Bookings)=> t.time.includes('21'));
                console.log(timeSlotEarly); 
                console.log(timeSlotLate); //denna blir tom eftersom inga bokningar finns
                
                timeSlotEarly.length > 14 ? setIsAvailable(false) : setIsAvailable(true);  
                timeSlotLate.length > 14 ? setIsAvailable(false) :  setIsAvailable(true);

              }
              
            });
  }; 

  return (
    <div className="placeholder">
      <div className="form-container">
      <form>
        <fieldset className="input-container">
          <label>Välj datum</label>
            <input type="date" onChange={handleInput} name="date"/>
        </fieldset>
        <fieldset className="select-container">
          <label>Välj antal</label>
          <select name="seats" onChange={handleInput}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
          </select>
        </fieldset>
        <div className="cta-search" onClick={createSearch}>
          <button type="button" onClick={createSearch}>Sök</button> 
        </div>
      </form>
      
      {findTime ?

        <div className="find-time">
          <fieldset className="select-time">         
              <label>Lediga tider:</label>
              
              {isAvailable ? 
              
              <div>
                <input type="radio" id="18" name="time" value="18" onChange={handleInput}/>
                <label htmlFor="18">18.00</label>
              </div>
            : <div>
                <h4>SORRY 18</h4>
              </div>  
            }
            
            {isAvailable ? 

              <div>
                <input type="radio" id="21" name="time" value="21" onChange={handleInput}/>
                <label htmlFor="21">21.00</label>
              </div>

            : <div>
                <h4>SORRY 21</h4>
              </div> 
            }


            </fieldset>
            <div className="cta-form">
              <button type="button" onClick={createSearch}>Nästa</button> 
            </div> 
          </div> 
            : null
        }
      </div>
    </div>
  );
} 
  
