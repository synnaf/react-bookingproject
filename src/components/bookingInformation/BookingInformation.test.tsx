import React from 'react';
import { render, fireEvent, getByDisplayValue, getByRole } from '@testing-library/react';
import BookingInformation from './BookingInformation';
import CreateBooking from '../createBooking/CreateBooking'; 
import Enzyme, {shallow } from 'enzyme'; 

jest.mock("../services/bookingService"); 

  
test('Find the first instances of the booking form', () => {
const {container, getByText } = render(<BookingInformation addBooking={CreateBooking} />); 

let bookingForm = container.querySelector('.form-container'); 
let datePicker = getByText('Välj datum'); 
let searchButton = getByText('Sök'); 

expect(datePicker).toBeInTheDocument(); 
expect(bookingForm).toBeVisible(); 
expect(searchButton).toBeInTheDocument(); 

//vad vill vi som användare se? 
//sök-knappen
//formulärfälten - Datum, Antal 
  
});

test('Render the next part of the form, when date has available seats', () => {
    const {container, getByLabelText, getByText } = render(<BookinInformation addBooking={CreateBooking} />); 
    
 
    fireEvent.click(getByText('Sök')); 
    let secondPartOfForm = getByText('Välj tid'); 
    
    //Välj datum, välj antal, klicka på sök: 
    expect(secondPartOfForm).toBeVisible(); 
      
});

test('Find functions', () => {
    expect(BookingInformation.addBooking(l)).toBe('l'); 
})

/// vårt api-test, mock-test, 
test('fetches fake data', (done) => {
    const wrapper = shallow(<BookingInformation addBooking={CreateBooking} />); 
    //render our component 
    // const wrapper = render(<BookingInformation></BookingInformation>)

    //vi väntar på att vårt promise to resolve, innan vi kan testa resultatet 
    setTimeout(()=> {

        // KONTROLLERA HÄR HUR VI GÖR UTAN ENZYME, WRAPPER ÄR ENZYME 
        wrapper.update(); 

        //kontrollera vårt state
        const state = wrapper.instance().state; 
        expect(state.term).toEqual("Mountains"); 
        expect(state.status).toEqual("Done"); 
        expect(state.images.length).toEqual(1); 

        // förvänta oss att rendera datalistan, ett objekt finns i listan
        expect(wrapper.find("listofdata").length).toEqual(1); 

        //när testet är avlustat 
        done(); 
    }); 
    
})

// await waitFor(() => expect(mockAPI).toHaveBeenCalledTimes(1))
