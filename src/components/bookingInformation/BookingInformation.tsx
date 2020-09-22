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
    //steg 1: kontrollera antal rader i DB för valt datum (max 15) 
    //steg 2: räkna ut hur många platser som är upptagna 

    setFindTime(true);

    let selectedDate = bookingInfo.date;
    let selectedSeats = bookingInfo.seats; 

    axios.get("http://localhost:3001/bookings/").then((currentBookings) => {
      //hämta alla bokningar
      let allBookings = currentBookings.data;
      let newArr = allBookings.filter((chosenDate: any) =>
        chosenDate.date.includes(selectedDate)
      );

      if (newArr.length > 29) {
        setFindTime(false);
        setFullyBooked(true);

      } else {
        setFindTime(true);
        setFullyBooked(false);

        //skapa en array av bokningarna som innehåller kl.18
        let timeSlotEarly = newArr.filter((t: Booking) => t.time.includes("18"));
        let tableEarly = 0; 
        timeSlotEarly.map((bookedTable: any) => {
          let amT = Math.ceil(bookedTable.seats / 6); 
          console.log("AMOUNT OF TABLES 18 IS" + amT); 
          return (tableEarly += amT); 
        }); 
        //om det finns ledigt kl 18
        tableEarly < 15 
        ? setIsAvailable18(true) 
        : setIsAvailable18(false); 
        
  
        //skapa en array av bokningarna som innehåller kl.18
        let timeSlotLate = newArr.filter((t: Booking) => t.time.includes("21"));
        let tableLate = 0; 
        timeSlotLate.map((bookedTable: any) => {
          let amT = Math.ceil(bookedTable.seats / 6); 
          console.log("AMOUNT OF TABLES 21 IS" + amT); 
          return (tableLate += amT); 
        }); 

        console.log("AMOUNT OF TABLES 21 IS" + tableLate) ; 
        //om det finns ledigt kl 21
        tableLate < 15 
        ? setIsAvailable21(true) 
        : setIsAvailable21(false); 

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
            <label id="date">Välj datum:</label>
            <input type="date" onChange={update} name="date" aria-label="date" />
          </fieldset>

          <fieldset className="select-container">
            <label>Välj antal:</label>
            <input type="number" placeholder="1" onChange={update} name="seats" min="1"/>
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
            <h1>Tyvärr, vi är fullbokade. Välj en annan dag!</h1>
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
