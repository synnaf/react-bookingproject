import { render } from "@testing-library/react";
import GuestInformation from "./GuestInformation";
import  saveGuest  from "../createBooking/CreateBooking";
import saveNotes from "../createBooking/CreateBooking";
import React from "react";



test('render contents of booking form', () => {
    const {getByText} = render(<GuestInformation addGuest={saveGuest} addNotes={saveNotes}></GuestInformation>);
        const labelElement = getByText(/Fyll i e-mailadress/i);
        const buttonElement = getByText(/Nästa/i);
        expect(labelElement).toBeInTheDocument();
        expect(buttonElement).toBeInTheDocument();
});