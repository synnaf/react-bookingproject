import { AxiosResponse } from 'axios'

const axiosResponse: AxiosResponse = {
    data: [
        {_id: 0,bookingId: 1, seats: 5, date: "27/5T", time: '18:00', notes: 'Nothing'},
    ],
    status: 200,
    statusText: 'OK',
    config: {},
    headers: {},
  };

export default {
    default: {
      get: jest.fn().mockImplementation(() => Promise.resolve(axiosResponse)),
    },
    get: jest.fn(() => Promise.resolve(axiosResponse)),
  };
