import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import "./GuestInformation.scss";
import axios from "axios";
import Guest from "../../models/Guest";

export interface IGuestInformationProps {
  addGuest(guest: Guest): void;
}

export default function GuestInformation(props: IGuestInformationProps) {
  const [gdpr, setGdpr] = useState(false);

  const [isGuest, setIsGuest] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [registeredGuest, setRegisteredGuest] = useState(new Guest());
  const [newGuest, setNewGuest] = useState(new Guest());

  function handleGdpr(e: any) {
    if (e.target.checked === true) {
      return setGdpr(true);
    } else {
      return setGdpr(false);
    }
  }

  function createGuest() {
    console.log("GDPR is approved");
    props.addGuest(newGuest);
  }

  function updateEmailInputValue(e: ChangeEvent<HTMLInputElement>) {
    setEmailInput(e.target.value);
  }

  function findGuest() {
    console.log(emailInput);
    axios.get("http://localhost:3001/guests/").then((g) => {
      console.log(g.data);
      let allGuests = g.data;
      let selectedGuest = allGuests.find(
        (guest: Guest) => guest.email === emailInput
      );
      if (selectedGuest) {
        setRegisteredGuest({ ...selectedGuest });
        setIsGuest(true);
        console.log(selectedGuest);
        return;
      }
      if (!selectedGuest) {
        console.log("Guest needs to be added");
      }
      setEmailInput("");
    });
  }
  function checkIfEnterPressed(e: KeyboardEvent) {
    if (e.which === 13) {
      findGuest();

      e.preventDefault();
    }
  }

  return (
    <div className="placeholder">
      <form className="email-input-form">
        <fieldset className="email-input-container">
          <label htmlFor="email">Fyll i e-mailadress</label>
          <input
            type="email"
            name="email"
            value={emailInput}
            onChange={updateEmailInputValue}
            onKeyPress={checkIfEnterPressed}
          />
        </fieldset>
        <button type="button" onClick={findGuest}>
          Nästa
        </button>
      </form>
      <div className="form-container">
        <div className="booking-info">
          <p>Datum: XXX</p>
          <p>Tid: XXXX</p>
        </div>

        <h2>Kontaktuppgifter</h2>
        <form>
          {isGuest ? (
            <fieldset className="input-container">
              <label>Förnamn</label>
              <input
                type="text"
                name="name"
                defaultValue={registeredGuest.firstName}
                disabled
              />

              <label>Efternamn</label>
              <input
                type="text"
                name="lName"
                defaultValue={registeredGuest.lastName}
                disabled
              />

              <label>Telefonnr</label>
              <input
                type="text"
                name="phone"
                defaultValue={registeredGuest.phoneNumber}
                disabled
              />

              <label>Mail</label>
              <input
                type="email"
                name="email"
                defaultValue={registeredGuest.email}
                disabled
              />
            </fieldset>
          ) : (
            <fieldset className="input-container">
              <label>Förnamn</label>
              <input type="text" name="name" />

              <label>Efternamn</label>
              <input type="text" name="lName" />

              <label>Telefonnr</label>
              <input type="text" name="phone" />

              <label>Mail</label>
              <input type="email" name="email" />
            </fieldset>
          )}
          <fieldset className="additional-info">
            <label>Övrig information:</label>
            <textarea></textarea>
            <input type="checkbox" name="gdpr" onChange={handleGdpr} />
            <span>Gdpr text</span>
          </fieldset>
          {/* skicka datan till föräldern vid knapptryckning */}
          <div className="cta-book">
            <button
              type="button"
              disabled={gdpr === false}
              onClick={() => createGuest()}
            >
              Boka
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
