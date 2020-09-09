/* eslint-disable no-fallthrough */
import React, { useState, ChangeEvent, KeyboardEvent, useReducer } from "react";
import "./GuestInformation.scss";
import axios from "axios";
import Guest from "../../models/Guest";

export interface IGuestInformationProps {
  addGuest(guest: Guest, isGuest: boolean): void;
  addNotes(notes: string): void;
}

export default function GuestInformation(props: IGuestInformationProps) {
  const [gdpr, setGdpr] = useState(false);

  const [isGuest, setIsGuest] = useState(false);
  const [registeredGuest, setRegisteredGuest] = useState(new Guest());

  const [emailInput, setEmailInput] = useState("");
  const [emailConfirmed, setEmailConfirmed] = useState(false);
  const [gId, setGId] = useState(0);
  const [isValid, setIsvalid] = useState(false);
  const [contactFormRender, setContactFormRender] = useState(false);

  const [newGuest, setNewGuest] = useReducer(
    (state: Guest, newState: Guest) => ({ ...state, ...newState }),
    new Guest()
  );

  function findGuest() {
    console.log(emailInput);
    setContactFormRender(true);

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
    e.preventDefault();
    const { name, value } = e.target;

    let errors = newGuest.errors;

    switch (name) {
      case "firstName":
        errors.errFirstName =
          value.length < 2 ? "Förnamn ska innehålla minst 2 bostäver!" : " ";
        break;
      case "lastName":
        errors.errLastName =
          value.length < 2 ? "Efternamn ska innehålla minst 2 bokstäver!" : " ";
        break;
      case "phoneNumber":
        errors.errPhoneNumber =
          /^[0-9]*$/.test(value) && value.length > 9
            ? " "
            : "Mobilnummer får endast innehålla siffror och vara minst 10 siffror långt";
      default:
        break;
    }

    setNewGuest({
      [name]: value,
      guestId: gId,
      email: emailInput,
    } as any);

    errors.errFirstName &&
    errors.errLastName &&
    errors.errPhoneNumber === (" " || undefined)
      ? setIsvalid(true)
      : setIsvalid(false);
  }

  function handleGdpr(e: ChangeEvent<HTMLInputElement>) {
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

  function addNotes(e: ChangeEvent<HTMLTextAreaElement>) {
    props.addNotes(e.target.value);
  }

  return (
    <div className="placeholder">
      {contactFormRender ? (
        <div className="form-container">
          <div className="booking-info">
            <h2>Kontaktuppgifter:</h2>
          </div>
          <form>
            {isGuest ? (
              <fieldset className="input-container">
                <label>Mail</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={registeredGuest.email}
                  disabled
                />

                <label>Förnamn</label>
                <input
                  type="text"
                  name="firstName"
                  defaultValue={registeredGuest.firstName}
                  disabled
                />

                <label>Efternamn</label>
                <input
                  type="text"
                  name="lastName"
                  defaultValue={registeredGuest.lastName}
                  disabled
                />

                <label>Telefonnr</label>
                <input
                  type="text"
                  name="phoneNumber"
                  defaultValue={registeredGuest.phoneNumber}
                  disabled
                />
              </fieldset>
            ) : (
              <fieldset className="input-container">
                <label>Mail</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={emailInput}
                  disabled
                />

                <label>Förnamn</label>
                <input
                  type="text"
                  name="firstName"
                  value={newGuest.firstName}
                  formNoValidate
                  onChange={updateInputValue}
                  //onBlur={handleValidation}
                />
                <p>{newGuest.errors.errFirstName}</p>
                <label>Efternamn</label>
                <input
                  type="text"
                  name="lastName"
                  value={newGuest.lastName}
                  formNoValidate
                  onChange={updateInputValue}
                  //onBlur={handleValidation}
                />
                <p>{newGuest.errors.errLastName}</p>
                <label>Mobilnummer</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={newGuest.phoneNumber}
                  formNoValidate
                  onChange={updateInputValue}
                  //onBlur={handleValidation}
                />
                <p>{newGuest.errors.errPhoneNumber}</p>
              </fieldset>
            )}
            <fieldset className="additional-info">
              <label>Övrig information:</label>
              <textarea onChange={addNotes}></textarea>
              <input type="checkbox" name="gdpr" onChange={handleGdpr} />
              <span>Jag godkänner att mina uppgifter sparas enligt GDPR</span>
            </fieldset>
            {isValid ? (
              <div className="cta-book">
                <button type="button" onClick={() => createGuest()}>
                  Boka
                </button>
              </div>
            ) : (
              <div className="cta-book">
                <button
                  type="button"
                  disabled={gdpr === false}
                  onClick={() => createGuest()}
                >
                  Boka
                </button>
              </div>
            )}
          </form>
        </div>
      ) : (
        <form className="email-input-form">
          <fieldset className="email-input">
            <label htmlFor="email">Fyll i e-mailadress</label>
            <input
              type="email"
              name="email"
              value={emailInput || ""}
              onChange={updateEmailInputValue}
              onKeyPress={checkIfEnterPressed}
            />
          </fieldset>
          {emailInput === "" ? (
            <div className="cta-find-time">
              <button type="button" disabled>
                Nästa
              </button>
            </div>
          ) : (
            <div className="cta-find-time">
              <button type="button" onClick={findGuest}>
                Nästa
              </button>
            </div>
          )}
        </form>
      )}
    </div>
  );
}