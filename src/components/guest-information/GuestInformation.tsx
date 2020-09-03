import React, { useState, ChangeEvent, KeyboardEvent, useReducer } from "react";
import "./GuestInformation.scss";
import axios from "axios";
import Guest from "../../models/Guest";

export interface IGuestInformationProps {
  addGuest(guest: Guest, isGuest: boolean): void;
}

export default function GuestInformation(props: IGuestInformationProps) {
  const [gdpr, setGdpr] = useState(false);

  const [isGuest, setIsGuest] = useState(false);
  const [registeredGuest, setRegisteredGuest] = useState(new Guest());

  const [emailInput, setEmailInput] = useState("");
  const [gId, setGId] = useState(0);

  const [newGuest, setNewGuest] = useReducer(
    (state: Guest, newState: Guest) => ({ ...state, ...newState }),
    new Guest()
  );

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
        setEmailInput("");
        console.log(selectedGuest);
        return;
      }
      if (!selectedGuest) {
        console.log("Guest needs to be added");
        setGId(Math.floor(Math.random() * 10000) + 1);
        setIsGuest(false);
      }
    });
  }

  function checkIfEnterPressed(e: KeyboardEvent) {
    if (e.which === 13) {
      e.preventDefault();
      findGuest();
    }
  }

  function updateEmailInputValue(e: ChangeEvent<HTMLInputElement>) {
    setEmailInput(e.target.value);
    console.log(emailInput);
  }

  function updateInputValue(e: ChangeEvent<HTMLInputElement>) {
    let element = e.target.name;
    let value = e.target.value;

    setNewGuest({
      [element]: value,
      guestId: gId,
    } as any);
  }

  function handleGdpr(e: any) {
    if (e.target.checked === true) {
      return setGdpr(true);
    } else {
      return setGdpr(false);
    }
  }

  function createGuest() {
    console.log("GDPR is approved");
    if (isGuest) {
      props.addGuest(registeredGuest, isGuest);
      console.log(registeredGuest);
    }
    if (!isGuest) {
      props.addGuest(newGuest, isGuest);
      console.log(newGuest);
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
            value={emailInput || ""}
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
                name="firstName"
                defaultValue={registeredGuest.firstName}
                readOnly
              />

              <label>Efternamn</label>
              <input
                type="text"
                name="lastName"
                defaultValue={registeredGuest.lastName}
                readOnly
              />

              <label>Telefonnr</label>
              <input
                type="number"
                name="phoneNumber"
                defaultValue={registeredGuest.phoneNumber}
                readOnly
              />

              <label>Mail</label>
              <input
                type="email"
                name="email"
                defaultValue={registeredGuest.email}
                readOnly
              />
            </fieldset>
          ) : (
            <fieldset className="input-container">
              <label>Förnamn</label>
              <input
                type="text"
                name="firstName"
                value={newGuest.firstName}
                onChange={updateInputValue}
              />

              <label>Efternamn</label>
              <input
                type="text"
                name="lastName"
                value={newGuest.lastName}
                onChange={updateInputValue}
              />

              <label>Mobilnummer</label>
              <input
                type="number"
                name="phoneNumber"
                value={newGuest.phoneNumber}
                onChange={updateInputValue}
              />

              <label>Mail</label>
              <input
                type="email"
                name="email"
                defaultValue={emailInput}
                disabled
              />
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
