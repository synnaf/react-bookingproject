import React, {
  useState,
  useEffect,
  MouseEvent,
  ChangeEvent,
  useReducer,
} from "react";
import './OneBooking.scss'; 
import { useParams } from "react-router-dom";
import axios from "axios";
import Booking from "../../models/Booking";

export default function OneBooking() {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const [booking, setBooking] = useReducer(
    (state: Booking, newState: Booking) => ({ ...state, ...newState }),
    new Booking()
  );
  let { bookingId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/bookings/${bookingId}`)
      .then((axiosRes) => {
        console.log(axiosRes.data);
        setBooking(axiosRes.data);
      });
  }, [bookingId]);

  function deleteBooking(e: MouseEvent<HTMLButtonElement>) {
    const bookingId = e;
    try {
      axios
        .delete(`http://localhost:3001/bookings/delete/${bookingId}`)
        .then((res) => {
          console.log(res);
          console.log(res.data);
        });
    } catch (e) {
      console.log(e);
    }
    setIsDeleted(true);
    setBooking(new Booking());
  }

  function updateInputValue(e: ChangeEvent<any>) {
    e.preventDefault();
    const { name, value } = e.target;

    setBooking({ [name]: value } as any);
  }

  function updateBooking() {
    axios
      .put(`http://localhost:3001/bookings/update/${bookingId}`, {
        booking,
      })
      .then((res) => console.log(res));
    setIsUpdated(true);
  }

  if (isDeleted) {
    return (
      <div>
        <h1>Tack, din bokning är borttagen!</h1>
      </div>
    );
  }

  if (isUpdated) {
    return <div>Bokning #{bookingId} har uppdaterats!</div>;
  } else {
    return (
      <React.Fragment>
        <div className="one-booking-container">
          <div className="one-booking-header">
            <h2>Ändra bokning #{bookingId}</h2>
          </div>
          <div className="main-container">
            <fieldset className="input-container">
              <label>Bokningsnummer</label>
              <input
                type="number"
                name="bookingId"
                value={booking.bookingId}
                disabled
              />

              <label>Datum</label>
              <input
                type="text"
                name="date"
                defaultValue={booking.date.split("T")[0]}
                disabled
              />
              <label>Tid</label>
              <input type="text" name="time" value={booking.time} disabled />
            </fieldset>
            <fieldset className="select-container">
              <label>Ändra antal</label>
              <select
                name="seats"
                defaultValue={booking.seats}
                onChange={updateInputValue}
              >
                <option value={booking.seats} disabled>
                  {booking.seats}
                </option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
              </select>
              <label>Ändra övrig info.</label>
              <textarea
                name="notes"
                placeholder="Ange eventuella allergier eller annan viktig info."
                defaultValue={booking.notes}
                onChange={updateInputValue}
              ></textarea>
              <button type="button" onClick={updateBooking}>
                Spara ändringar.
              </button>
              <button type="button" onClick={() => deleteBooking(bookingId)}>
                Avboka
              </button>
            </fieldset>
                     
          </div>
        </div>
      </React.Fragment>
    );
  }
}
