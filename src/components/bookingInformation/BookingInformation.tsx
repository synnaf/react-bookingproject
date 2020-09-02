import React, { useState, ChangeEvent, useReducer } from "react";
import axios from "axios";

export interface BookingForm {
  date: string;
  seats: number;
  time: string;
}

export default function Booking(props: any) {
  // console.log(props)
  const [findTime, setFindTime] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  function showTimeSlots() {
    setFindTime(true);
  }

  //vi sätter formulärets defaultvalues, vi behöver använda useReducer eftersom dessa ska kunna uppdateras individuellt?
  let defautValue: BookingForm = { date: "", seats: 0, time: "" };
  const [available, setAvailable] = useReducer(
    (state: BookingForm, newState: BookingForm) => ({ ...state, ...newState }),
    defautValue
  );

  //set state ska göras med värden från db, så första anropet borde göras här.
  function findAvailableTable(e: ChangeEvent<any>) {
    let element = e.target.name;
    let value = e.target.value;
    setAvailable({ [element]: value } as any);
    console.log(available); //värdet här vill vi skicka upp till parent
  }

  function handleInput(e: ChangeEvent<any>) {
    showTimeSlots();
    findAvailableTable(e);

    let selectedDate = available.date;
    console.log("selected date = " + selectedDate);
  }

  return (
    <div className="placeholder">
      <div className="form-container">
        <form>
          <fieldset className="input-container">
            <label>Välj datum</label>
            <input type="date" onChange={findAvailableTable} name="date" />
          </fieldset>
          <fieldset className="select-container">
            <label>Välj antal</label>
            <select name="seats" onChange={findAvailableTable}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
            </select>
          </fieldset>
          <div className="cta-search" onClick={handleInput}>
            <button type="button" onClick={handleInput}>
              Sök
            </button>
          </div>
        </form>

        {findTime ? (
          <div className="find-time">
            <fieldset className="select-time">
              <label>Lediga tider:</label>

              {isAvailable ? (
                <div>
                  <input
                    type="radio"
                    id="18"
                    name="time"
                    value="18"
                    onChange={findAvailableTable}
                  />
                  <label htmlFor="18">18.00</label>
                </div>
              ) : (
                <div>
                  <h4>SORRY 18</h4>
                </div>
              )}
              {isAvailable ? (
                <div>
                  <input
                    type="radio"
                    id="21"
                    name="time"
                    value="21"
                    onChange={findAvailableTable}
                  />
                  <label htmlFor="21">21.00</label>
                </div>
              ) : (
                <div>
                  <h4>SORRY 21</h4>
                </div>
              )}
            </fieldset>
            <div className="cta-form">
              <button type="button" onClick={findAvailableTable}>
                Nästa
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
