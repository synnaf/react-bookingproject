import { render } from "@testing-library/react";
import Home from "./Home";
import React from "react";

test('render contents of homepage', () => {
        const {getByText, getByAltText} = render(<Home />);
        const bookingElement = getByText('Boka');
        const imgElement = getByAltText('Placeholder img');
        const loremElementOne = getByText(/Lorem/i);
        const loremElementTwo = getByText(/Duis/i);
        expect(bookingElement).toBeInTheDocument();
        expect(imgElement).toBeInTheDocument();
        expect(loremElementOne).toBeInTheDocument();
        expect(loremElementTwo).toBeInTheDocument();
});