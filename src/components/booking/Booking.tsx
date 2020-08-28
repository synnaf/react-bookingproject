import React, { useState, ChangeEvent, useReducer } from "react";
import './Booking.scss'; 
import FindTime from '../findTime/FindTime';
import axios from "axios";


export interface BookingForm { 
  date: string;  
  seats: number; 
  time: string;  
}

export default function Booking(props: any) {
  //props värdet från parents state, innehåller alla current bokningar
  console.log(props)  

  // //vi sätter formulärets defaultvalues, vi behöver använda useReducer eftersom dessa ska kunna uppdateras individuellt? 
  let defautValue: BookingForm = {date:'', seats: 0, time: ''}; 
  const [available, setAvailable] = useReducer(
    (state: BookingForm, newState: BookingForm) => 
    ({...state, ...newState}), 
    defautValue); 

  // //set state ska göras med värden från db, så första anropet borde göras här.
  function findTable(e: ChangeEvent<any>) {
    let element = e.target.name; 
    let value = e.target.value;  
    setAvailable({[element]: value} as any); 
    console.log(available); //värdet här vill vi skicka upp till parent 
  }

  function handleInput(e: ChangeEvent<any>) {
    // props.test(e.target.value); 
    console.log(available); 
  }

  return (
    <div className="main-container">
    <div className="placeholder">
      <form>
        <fieldset className="input-container">
          <label>Välj datum</label>
            <input type="date" onChange={findTable} name="date"/>
        </fieldset>
       
        <fieldset className="select-container">
          <label>Välj antal</label>
          <select name="seats" onChange={findTable}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
          </select>
        </fieldset>
        <button type="button" onClick={handleInput}>Sök</button> 
      </form>
    </div>
  </div>
  );
} 
  
