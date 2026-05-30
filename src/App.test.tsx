import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('renders the app component', () => {
    render(<App />);
    const linkElement = screen.getByText(/Weather Forecast/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('renders the search input', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/Enter Zip Code/i);
    expect(inputElement).toBeInTheDocument();
  });

  it('renders the Get Forecast button', () => {
    render(<App />);
    const buttonElement = screen.getByRole('button', { name: /Get Forecast/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it('renders the instructions', () => {
    render(<App />);
    const tableElement = screen.getByText(/Please enter a valid zip code to get the forecast./i);
    expect(tableElement).toBeInTheDocument();
  });
});

