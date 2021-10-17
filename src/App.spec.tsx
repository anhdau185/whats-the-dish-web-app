import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import App from './App';

it('renders App correctly', () => {
  render(<App />);
  const appTitle = screen.getByText('What\'s the dish today?');
  expect(appTitle).toBeInTheDocument();
});
