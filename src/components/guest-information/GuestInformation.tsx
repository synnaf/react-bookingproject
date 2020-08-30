import React from "react";
import './GuestInformation.scss'; 

export default function GuestInformation() {

  //gästen fyller i sin information, sedan skickas datan till föräldraelementet CreateBookings som gör en post.
  function disable() {
    console.log("checked"); 
  } 

  return (
      <div className="placeholder">
        <div  className="form-container">
          <div className="booking-info">
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
              <input type="checkbox" name="gdpr" onChange={disable} checked={false} />
                <span>Gdpr text</span>
            </fieldset>
            {/* skicka datan till föräldern vid knapptryckning */}
            <div className="cta-book">
              <button type="button">Boka</button>
            </div>
             
          </form>
        </div>
    </div>
  );
}
