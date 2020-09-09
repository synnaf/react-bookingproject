import { render } from "@testing-library/react";
import GuestInformation from "./GuestInformation";
import { saveGuest } from "../createBooking/CreateBooking";
import React from "react";



test('render contents of homepage', () => {
    const {getByText} = render(<GuestInformation addGuest={saveGuest}></GuestInformation>);
        const labelElement = getByText(/Fyll i e-mailadress/i);
        const buttonElement = getByText(/Nästa/i);
        const contactElement = getByText(/Kontaktuppgifter/i);
        const otherElement = getByText(/Övrig information/i);
        const gdprElement = getByText(/Boka/i);
        expect(labelElement).toBeInTheDocument();
        expect(buttonElement).toBeInTheDocument();
        expect(contactElement).toBeInTheDocument();
        expect(otherElement).toBeInTheDocument();
        expect(gdprElement).toBeInTheDocument();
});