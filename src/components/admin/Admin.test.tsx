
import React from 'react';
import { render, wait } from '@testing-library/react';
import Admin from './Admin';
import axios from 'axios';
import { debug } from 'console';

jest.mock('axios');

describe('render a list of bookings', () => {
    test('render list of bookings', async() => {

            const { getAllByText } = render (<Admin />)

            expect(axios.get).toHaveBeenCalled();
        
             wait(() => {
                let divId = getAllByText(/booking Id: /i);
                let divSeats = getAllByText(/seats: /i);
                let divDate = getAllByText(/date: /i);
                expect(divId[0]).toBeInTheDocument();
                expect(divId[1]).toBeInTheDocument();
                expect(divId[2]).toBeInTheDocument();
                expect(divSeats[0]).toBeInTheDocument();
                expect(divSeats[1]).toBeInTheDocument();
                expect(divSeats[2]).toBeInTheDocument();
                expect(divDate[0]).toBeInTheDocument();
                expect(divDate[1]).toBeInTheDocument();
                expect(divDate[2]).toBeInTheDocument();
            debug();
        })  
    });
});    
