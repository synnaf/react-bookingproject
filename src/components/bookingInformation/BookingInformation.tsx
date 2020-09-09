import React, { useState, ChangeEvent, useReducer } from "react";
import "./BookingInformation.scss";
import axios from "axios";
import Booking from "../../models/Booking";

export interface IBookingInformationProps {
  addBooking(booking: Booking): void;
}

export default function BookinInformation(props: IBookingInformationProps) {
  // TVÅ ST STATES VARS UPPDRAG ÄR ATT villkora rendering
  const [isAvailable18, setIsAvailable18] = useState(true);
  const [isAvailable21, setIsAvailable21] = useState(true);
  const [findTime, setFindTime] = useState(false);
  const [fullyBooked, setFullyBooked] = useState(false); 

  let defaultValue: Booking = {
    bookingId: 0,
    time: "",
    date: "",
    seats: 0,
    notes: "",
    guestId: 33,
  };
  const [test, setTest] = useReducer(
    (test: Booking, newTest: Booking) => ({
      ...test,
      ...newTest,
    }),
    defaultValue
  );

  function update(e: ChangeEvent<any>) {
    let element = e.target.name;
    let value = e.target.value;
    setTest({ [element]: value } as any);
  }


  //FUNKTION FÖR: hantera värdena när man trycker på knappen
  function createSearch() {

    setFindTime(true); 
   
    let selectedDate = test.date;
    let selectedSeats = test.seats;

    //vi mappar ut för kl.18 och kl.21
    axios.get("http://localhost:3001/bookings/").then((currentBookings) => {
      let allBookings = currentBookings.data;
      let newArr = allBookings.filter((chosenDate: any) =>
        chosenDate.date.includes(selectedDate)
      );

      // kontrollera längden för valt datum
      if (newArr.length > 29) {
        setFindTime(false);
        console.log("fullbokat!!!");
        console.log(newArr);
        setFullyBooked(true); 
      } else {
        setFindTime(true);
        setFullyBooked(false);
        let timeSlotEarly = newArr.filter((t: Booking) =>
          t.time.includes("18")
        );
        let timeSlotLate = newArr.filter((t: Booking) => t.time.includes("21"));

        timeSlotEarly.length > 14
          ? setIsAvailable18(false)
          : setIsAvailable18(true);
        timeSlotLate.length > 14
          ? setIsAvailable21(false)
          : setIsAvailable21(true);
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
            <input type="date" onChange={update} name="date" />
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
          { test.date === "" 
          ? <div className="cta-search">
              <button type="button" disabled>
                Sök
              </button>
            </div>
          : <div className="cta-search">
              <button type="button" onClick={createSearch}>
                Sök
              </button>
            </div>
          }
          { fullyBooked //hämta in bokningslistan? 
          ? <h1>fullbokat</h1>
          : findTime ? (
            <div className="time-container">
              <fieldset className="find-time">
                <h4>Välj tid:</h4>
                {isAvailable18 && findTime ? (
                  <div className="available-time">
                    <input
                      type="radio"
                      id="18"
                      name="time"
                      value="18"
                      onChange={update}
                      onInput={() => setTimeout(sendBooking, 500)}
                    />
                    <label htmlFor="18">18.00</label>
                  </div>
                ) : (
                  <div className="not-available">
                    <h4>18.00 FULLT</h4>
                  </div>
                )}
                {isAvailable21 && findTime ? (
                  <div className="available-time">
                    <input
                      type="radio"
                      id="21"
                      name="time"
                      value="21"
                      onChange={update}
                      onInput={() => setTimeout(sendBooking, 500)}
                    />
                    <label htmlFor="21">21.00</label>
                  </div>
                ) : (
                  <div className="not-available">
                    <h4>21.00 FULLT</h4>
                  </div>
                )}
              </fieldset>
            </div>
          ) : null
          }
        </form>
      </div>
    </div>
  );
}
