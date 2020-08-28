import React from "react";
import './GuestInformation.scss'; 

export default function GuestInformation() {

  //gästen fyller i sin information, sedan skickas datan till föräldraelementet CreateBookings som gör en post.
  function disable() {
    console.log("checked"); 
  } 

  return (

    <div className="main-container">
      <div className="placeholder">
        <div>
          <p>Datum: XXX</p>
          <p>Tid: XXXX</p>
        </div>
        <h2>Kontaktuppgifter</h2>
        
        <form>
          <fieldset className="input-container">
            <label>Förnamn</label>
            <input type="text" />
            <label>Efternamn</label>
            <input type="text" />
            <label>Telefonnr</label>
            <input type="text" />
            <label>Mail</label>
            <input type="email" />
          </fieldset>
          <fieldset className="additional-info">
            <label>Övrig information:</label>
            <textarea></textarea>
          </fieldset>
          <input type="checkbox" name="gdpr" onChange={disable} checked={false} />Gdpr text

          {/* skicka datan till föräldern vid knapptryckning */}
          <button type="button">Boka</button> 
        </form>
    </div>
  </div>

  );
}
