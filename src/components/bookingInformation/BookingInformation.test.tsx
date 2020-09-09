import React from 'react';
import { render, getByPlaceholderText, getByLabelText } from '@testing-library/react';
import BookingInformation from './BookingInformation';
import CreateBooking from '../createBooking/CreateBooking'; 
import userEvent from '@testing-library/user-event'



test('Find the first instances of the booking form', () => {
const {container, getByText } = render(<BookingInformation addBooking={CreateBooking} />); 

let bookingForm = container.querySelector('.form-container'); 
let datePicker = getByText('Välj datum'); 
let searchButton = getByText('Sök'); 

expect(datePicker).toBeInTheDocument(); 
expect(bookingForm).toBeVisible(); 
expect(searchButton).toBeInTheDocument(); 
 
});

test('When button is clicked, next element should no be rendered', () => {

    const {container, getByText } = render(<BookingInformation addBooking={CreateBooking} />);
    let searchButton = getByText('Sök'); 
    userEvent.click(searchButton)
    expect(searchButton).toBeDisabled(); 

}); 
