
import React from 'react';
import { render, wait } from '@testing-library/react';
import Admin from './Admin';
import axios from 'axios';
import { debug } from 'console';

jest.mock('axios');

describe('render a list of bookings', () => {
    test('render list of bookings', async() => {
        // @ts-ignore
        // axios.get.mockImplementationOnce(() =>
        //     Promise.resolve({ data: bookings } )
        // );

        // await act ( async ()  => {
            
        const { getByText, getAllByText, getAllByDisplayValue } = render (<Admin />)

        expect(axios.get).toHaveBeenCalled();
    
        await wait(() => {
            let divId = getAllByText(/booking Id: /i);
            // let divIdTwo = getByText(/booking Id: 2/i);
            // let divIdThree = getByText(/booking Id: 3/i);
            let divSeats = getAllByText(/seats: /i);
            // let divSeatsTwo = getByText(/seats: 3/i);
            // let divSeatsThree = getByText(/seats: 2/i);
            let divDate = getAllByText(/date: /i);
            // let divDateTwo = getByText('date: 18/12');
            // let divDateThree = getByText('date: 27/11');
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
    });
        // let firstLiElement = getByText(/Booking Id: 1/i);
        // expect(firstLiElement).toBeInTheDocument();
        // });

        // screen.debug() 
    });


  });    



// export const API = 'https://hn.algolia.com/api/v3';

// export const fetchData = async (query: string) => {
//   const url = `${API}/search?query=${query}`;
 
//   return await axios.get(url);
// };
 
// fetchData('react');


 
// test('fetches successfully data from an API', async () => {
//     const data = {
//         data: {
//           hits: [
//             {
//               objectID: '1',
//               title: 'a',
//             },
//             {
//               objectID: '2',
//               title: 'b',
//             },
//           ],
//         },
//       };
//       await expect(fetchData('react')).resolves.toEqual(data);
//       expect(axios.get).toHaveBeenCalledWith(
//         `${API}/search?query=react`,
//       );
        
//       console.log(data)
// });



// test('renders list when loading',()=>{
//     const {getByText} = render (<AdminMock id = {5} time = {18}  seats = {2} ></AdminMock>);
//     const {getByText} = render (<Admin></Admin>)
//     const liElement = getByText(/Booking Id/i)
//     const button = getByText(/Hej/i);
//     const liElement= getByText(/5/i);
//     const liElement2= getByText(/18/i); 
//     const liElement3= getByText(/2/i); 
//     let liResults = {liElement, liElement2, liElement3}
//     expect(button).toBeInTheDocument()
//     expect(liElement).toBeInTheDocument();
//     expect(liElement2).toBeInTheDocument();
//     expect(liElement3).toBeInTheDocument();

// });
