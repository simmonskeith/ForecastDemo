// Test ForecastList component
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ForecastList } from './ForecastList';
import type { Period } from './interfaces';

describe('ForecastList', () => {
  const mockPeriod: Period = {
    number: 1,
    icon: 'https://example.com/icon.png',
    shortForecast: 'Sunny',
    name: 'Tonight',
    detailedForecast: 'Sunny tonight with clear skies.',
    temperature: 72,
    temperatureUnit: '°F',
    windSpeed: '10 mph',
    windDirection: 'N',
  };

  const mockForecast = {
    properties: {
      periods: [mockPeriod],
    },
  };

  const mockLocation = {
    latitude: 40.7128,
    longitude: -74.0060,
  };

  it('renders the component without crashing', () => {
    render(<ForecastList forecast={mockForecast} location={mockLocation} />);
    expect(screen.getByTestId('forecast-table')).toBeInTheDocument();
  });

  it('displays the correct number of forecast periods', () => {
    render(<ForecastList forecast={mockForecast} location={mockLocation} />);
    expect(screen.getAllByRole('row')).toHaveLength(1);
  });

  it('displays the period name and detailed forecast', () => {
    render(<ForecastList forecast={mockForecast} location={mockLocation} />);
    expect(screen.getByText('Tonight')).toBeInTheDocument();
    expect(screen.getByText('Sunny tonight with clear skies.')).toBeInTheDocument();
  });
});