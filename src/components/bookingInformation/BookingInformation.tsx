import React, { useState, ChangeEvent, useReducer } from "react";
import "./BookingInformation.scss";
import axios from "axios";
import Booking from "../../models/Booking";

export interface IBookingInformationProps {
  addBooking(booking: Booking): void;
}

export default function BookinInformation(props: IBookingInformationProps) {
  const [isAvailable18, setIsAvailable18] = useState(true);
  const [isAvailable21, setIsAvailable21] = useState(true);
  const [findTime, setFindTime] = useState(false);
  const [fullyBooked, setFullyBooked] = useState(false);

  const [bookingInfo, setBookingInfo] = useReducer(
    (bookingInfo: Booking, newBookingInfo: Booking) => ({
      ...bookingInfo,
      ...newBookingInfo,
    }),
    new Booking()
  );

  function update(e: ChangeEvent<any>) {
    let element = e.target.name;
    let value = e.target.value;
    setBookingInfo({ [element]: value } as any);
  }

  function createSearch() {

    //funktion för att skapa en sökning, inkludera öppet val av platser 

    setFindTime(true);

    let selectedDate = bookingInfo.date;
    let selectedSeats = bookingInfo.seats; 
    console.log(selectedSeats); 

    axios.get("http://localhost:3001/bookings/").then((currentBookings) => {
    
    //hämta alla bokningar
    let allBookings = currentBookings.data;
      let newArr = allBookings.filter((chosenDate: any) =>
        chosenDate.date.includes(selectedDate)
      );

      //om det finns fler än 29, fullbokat
      if (newArr.length > 29) {
        setFindTime(false);
        setFullyBooked(true);

      } else {
        //om det finns färre rader än 29, finns det lediga bord 
        setFindTime(true);
        setFullyBooked(false);

        //skapa en array av bokningarna som innehåller 18
        //loopa igenom på de som matchar datum + tid 
        let timeSlotEarly = newArr.filter((t: Booking) =>
          t.time.includes("18") //hittar de som innehåller 18 och sparar i timeSlotEarly
        );
        timeSlotEarly.map((time: any) => {
          let table = 0; 
          // 28:e 2 bokningar 10 pers + 3 pers kräver 3 bord
          // totalt antal platser: 15 x 6 = 90 
          let amT = Math.ceil(time.seats / 6); //rundar upp till heltal
          console.log("AMOUNT OF TABLES IS" + amT); 
          return (table += amT); 
        }); 

        //skapa en array av bokningar som innehåller 21 
        let timeSlotLate = newArr.filter((t: Booking) => 
          t.time.includes("21")
        );

        //här ändrar vi värdet på variabeln tables 
        let table = 0; 
        timeSlotLate.map((time: any) => {
          let amT = Math.ceil(time.seats / 6);
          console.log("AMOUNT OF TABLES IS" + amT); 
          return (table += amT); 
        });
        
        //om det finns ledigt kl 18
        table < 15 
          ? setIsAvailable18(true)
          : setIsAvailable18(false); 

        
        // timeSlotEarly.length > 14
        //   ? setIsAvailable18(false)
        //   : setIsAvailable18(true);

        //om det finns ledigt kl 21 
        timeSlotLate.length > 14
          ? setIsAvailable21(false)
          : setIsAvailable21(true);
      }
    });
  }

  function sendBooking() {
    props.addBooking(bookingInfo);
  }

  return (
    <div className="placeholder">
      <div className="form-container">
        <form>
          <fieldset className="input-container">
            <label id="date">Välj datum</label>
            <input type="date" onChange={update} name="date" aria-label="date" />
          </fieldset>
          <fieldset className="select-container">
            {/* adding new type of input field */}
            <label>Välj antal</label>
            <input type="number" placeholder="1" onChange={update} name="seats"/>
          </fieldset>
          {bookingInfo.date === "" ? (
            <div className="cta-search">
              <button type="button" disabled>
                Sök
              </button>
            </div>
          ) : (
            <div className="cta-search">
              <button type="button" onClick={createSearch}>
                Sök
              </button>
            </div>
          )}
          {fullyBooked ? (
            <h1>fullbokat</h1>
          ) : findTime ? (
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
          ) : null}
        </form>
      </div>
    </div>
  );
}
