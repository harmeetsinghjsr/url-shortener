import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders URL Shortener', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const titleElement = screen.getByText(/URL Shortener/i);
  expect(titleElement).toBeInTheDocument();
});
