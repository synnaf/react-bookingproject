import React, { useState } from "react";
import './GuestInformation.scss'; 

export default function GuestInformation() {

  const [gdpr, setGdpr] = useState(false); 

  function forceUpdate(e: any) {
    if(e.target.checked === true) {
      return setGdpr(true)
    } else {
      return setGdpr(false) }; 
  } 

  function enableBooking() {
    console.log("GDPR is approved"); 
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
              <input type="checkbox" name="gdpr" onChange={forceUpdate}/>
                <span>Jag godkänner att mina kontaktuppgifter lagras och sparas enligt GDPR. <a href="https://www.datainspektionen.se/lagar--regler/dataskyddsforordningen/">Läs mer</a></span>
            </fieldset>
            {/* skicka datan till föräldern vid knapptryckning */}
            <div className="cta-book">
              <button type="button" disabled={gdpr === false} onClick={enableBooking}>Boka</button>
            </div>
             
          </form>
        </div>
    </div>
  );
}
