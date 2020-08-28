import React, { useState, ChangeEvent, useReducer } from "react";
import './Booking.scss'; 
import axios from "axios";


export interface BookingForm { 
  date: string;  
  seats: number; 
  time: string;  
}

export default function Booking() {

  //vi sätter formulärets defaultvalues, vi behöver använda useReducer eftersom dessa ska kunna uppdateras individuellt? 
  let defautValue: BookingForm = {date:'', seats: 0, time: ''}; 
  const [available, setAvailable] = useReducer(
    (state: BookingForm, newState: BookingForm) => 
    ({...state, ...newState}), 
    defautValue); 

  //set state ska göras med värden från db, så första anropet borde göras här.
  function findTable(e: ChangeEvent<any>) {
    let element = e.target.name; 
    let value = e.target.value;  
    
    //här vill vi köra funktionen som hämtar lediga bord i vår förälder 
    setAvailable({[element]: value} as any); //vi vill uppdatera kompopnentens state med värden ifrån formuläret 
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
          <select onChange={findTable} name="seats">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
          </select>
        </fieldset>
        <button type="button" onClick={findTable}>Sök</button> 
      </form>
    </div>
  </div>
  );
} 
  
