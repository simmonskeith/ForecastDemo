// Test the ForecastWrapper component
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ForecastWrapper } from './ForecastWrapper';

describe('ForecastWrapper', () => {
  let fetchMock: any;

  beforeEach(() => {
    // Mock the global fetch function
    fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.unstubAllGlobals();
  });

  it('renders the component without crashing', () => {
    fetchMock.mockResolvedValueOnce({
      status: 200,
      json: async () => ({ places: [] }),
    });

    render(<ForecastWrapper />);
    expect(screen.getByTestId('forecast-wrapper')).toBeInTheDocument();
  });

  it('fetches location data when a valid zip code is provided', async () => {
    const user = userEvent.setup();
    // Mock for zip code API
    fetchMock.mockResolvedValueOnce({
      status: 200,
      json: async () => ({
        places: [
          {
            'latitude': '40.7128',
            'longitude': '-74.0060',
            'place name': 'New York',
            'state abbreviation': 'NY'
          },
        ],
      }),
    });
    // Mock for weather.gov points API
    fetchMock.mockResolvedValueOnce({
      status: 200,
      json: async () => ({
        properties: {
          forecast: 'https://api.weather.gov/gridpoints/OKX/33,35/forecast'
        }
      }),
    });
    // Mock for forecast API
    fetchMock.mockResolvedValueOnce({
      status: 200,
      json: async () => ({
        properties: {
          periods: []
        }
      }),
    });

    render(<ForecastWrapper />);
    // set the zip code input
    const input = screen.getByPlaceholderText('Enter Zip Code');
    await user.type(input, '10001');
    // click the Get Forecast button
    const button = screen.getByRole('button', { name: 'Get Forecast' });
    await user.click(button);
    // Verify fetch was called with the correct API
    expect(fetchMock).toHaveBeenCalled();
  });

  it('handles fetch errors gracefully', () => {
    fetchMock.mockRejectedValueOnce(new Error('Network error'));

    render(<ForecastWrapper />);
    expect(screen.getByTestId('forecast-wrapper')).toBeInTheDocument();
  });

  // test for when zip info places is null
  it('handles null places in zip info response', async () => {
    const user = userEvent.setup();
    fetchMock.mockResolvedValueOnce({
      status: 200,
      json: async () => ({ places: null }),
    });

    render(<ForecastWrapper />);
    const input = screen.getByPlaceholderText('Enter Zip Code');
    await user.type(input, '10001');
    const button = screen.getByRole('button', { name: 'Get Forecast' });
    await user.click(button);
    expect(screen.getByText('Please enter a valid zip code to get the forecast.')).toBeInTheDocument();
  });


  it('handles unsuccessful zip code lookup', async () => {
    const user = userEvent.setup();
    fetchMock.mockResolvedValueOnce({
      status: 500,
      json: async () => ({ places: null }),
    });

    render(<ForecastWrapper />);
    const input = screen.getByPlaceholderText('Enter Zip Code');
    await user.type(input, '10001');
    const button = screen.getByRole('button', { name: 'Get Forecast' });
    await user.click(button);
    expect(screen.getByText('Please enter a valid zip code to get the forecast.')).toBeInTheDocument();
  });

  it('handles errors during zip code fetch', async () => {
    const user = userEvent.setup();
    fetchMock.mockRejectedValueOnce(new Error('Network error'));

    render(<ForecastWrapper />);
    const input = screen.getByPlaceholderText('Enter Zip Code');
    await user.type(input, '10001');
    const button = screen.getByRole('button', { name: 'Get Forecast' });
    await user.click(button);
    expect(screen.getByText('Please enter a valid zip code to get the forecast.')).toBeInTheDocument();
  });
});
