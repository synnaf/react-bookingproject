import React from "react";
import './Booking.scss'; 

export default function Booking() {
  return (
    <div className="placeholder">
      <form>
        <fieldset className="input-container">
          <label>Välj datum</label>
            <input type="date" />
        </fieldset>
        <fieldset className="select-container">
          <label>Välj tid</label>
          <select>
            <option>18.00</option>
            <option>21.00</option>
          </select>
        </fieldset>
        <fieldset className="select-container">
          <label>Välj antal</label>
          <select >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
          </select>
        </fieldset>
        <button type="button">Sök</button>
      </form>
    

  </div>
  );
}
