
import React from 'react';
import { render, wait } from '@testing-library/react';
import Admin from './Admin';
import axios from 'axios';

jest.mock('axios');

describe('render a list of bookings', () => {
    test('render list of bookings', async() => {

            const { getByText } = render (<Admin />)

            expect(axios.get).toHaveBeenCalled();
        
            wait(() => {
                let divId = getByText(/booking Id: /i);
                let divSeats = getByText(/seats: /i);
                let divDate = getByText(/date: /i);
                let divTime = getByText(/date: /i);
                let divNotes = getByText(/date: /i);
                expect(divId).toBeInTheDocument();
                expect(divSeats).toBeInTheDocument();
                expect(divDate).toBeInTheDocument();
                expect(divTime).toBeInTheDocument();
                expect(divNotes).toBeInTheDocument();
        });
    });
});    
