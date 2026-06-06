

// Renders the Forecast when no forecast data is available
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Forecast } from './Forecast';


describe('Forecast Component', () => {
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

  it('renders "No forecast data available." when there is no forecast data', async () => {
    // Mock the fetch response to return no forecast data
    // First fetch: points API -> returns a forecast URL
    fetchMock.mockResolvedValueOnce({
      status: 200,
      json: async () => ({ properties: { forecast: 'https://api.weather.gov/gridpoints/OKX/33,35/forecast' } }),
    });
    // Second fetch: forecast API -> returns no periods (so component shows no data)
    fetchMock.mockResolvedValueOnce({
      status: 200,
      json: async () => ({ properties: {} }),
    });

    render(<Forecast location={{ latitude: 40.7128, longitude: -74.0060 }} />);

    // Wait for the component to update after fetching data
    const noDataMessage = await screen.findByText('No forecast data available.');
    expect(noDataMessage).toBeInTheDocument();
  });

  it('renders "No forecast data available." when there are no forecast properties', async () => {
    // Mock the fetch response to return no forecast data
    // First fetch: points API -> returns a forecast URL
    fetchMock.mockResolvedValueOnce({
      status: 200,
      json: async () => ({ properties: {  } }),
    });

    render(<Forecast location={{ latitude: 40.7128, longitude: -74.0060 }} />);

    // Wait for the component to update after fetching data
    const noDataMessage = await screen.findByText('No forecast data available.');
    expect(noDataMessage).toBeInTheDocument();
  });
});