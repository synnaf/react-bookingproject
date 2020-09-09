import { AxiosResponse } from 'axios'

// export interface MockData {
//     bookingId: number;
//     seats: number;
//     date: string;
// }

// const bookings: MockData [] = [
//     { bookingId: 1, seats: 5, date: "27/5T"},
//     { bookingId: 2, seats: 3, date: "18/12T"},
//     { bookingId: 3, seats: 2, date: "27/11T"}
// ];

const axiosResponse: AxiosResponse = {
    data: [
        {bookingId: 1, seats: 5, date: "27/5T"},
        {bookingId: 2, seats: 3, date: "18/12T"},
        {bookingId: 3, seats: 2, date: "27/11T"}
    ],
    status: 200,
    statusText: 'OK',
    config: {},
    headers: {},
  };

// axios mocked
export default {
    // Typescript requires a 'default'
    default: {
      get: jest.fn().mockImplementation(() => Promise.resolve(axiosResponse)),
    },
    get: jest.fn(() => Promise.resolve(axiosResponse)),
  };
// export default bookings;