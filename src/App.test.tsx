import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('render navigation bar with links', () => {
      const {getByText} = render(<App />);
      const linkElement = getByText('Home');
      const linkElement2 = getByText('Booking');
      const linkElement3 = getByText('Admin');
      expect(linkElement).toBeInTheDocument();
      expect(linkElement2).toBeInTheDocument();
      expect(linkElement3).toBeInTheDocument();
  });
  