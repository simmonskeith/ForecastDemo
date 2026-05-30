import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ForecastPeriod } from './ForecastPeriod';
import type { Period } from './interfaces';

describe('ForecastPeriod', () => {
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

  it('renders the component without crashing', () => {
    render(
      <table>
        <tbody>
          <ForecastPeriod period={mockPeriod} />
        </tbody>
      </table>
    );
    expect(screen.getByRole('row')).toBeInTheDocument();
  });

  it('displays the period name', () => {
    render(
      <table>
        <tbody>
          <ForecastPeriod period={mockPeriod} />
        </tbody>
      </table>
    );
    expect(screen.getByText('Tonight')).toBeInTheDocument();
  });

  it('displays the detailed forecast', () => {
    render(
      <table>
        <tbody>
          <ForecastPeriod period={mockPeriod} />
        </tbody>
      </table>
    );
    expect(screen.getByText('Sunny tonight with clear skies.')).toBeInTheDocument();
  });

  it('displays temperature with unit', () => {
    render(
      <table>
        <tbody>
          <ForecastPeriod period={mockPeriod} />
        </tbody>
      </table>
    );
    expect(screen.getByText(/Temperature: 72 °F/)).toBeInTheDocument();
  });

  it('displays wind information', () => {
    render(
      <table>
        <tbody>
          <ForecastPeriod period={mockPeriod} />
        </tbody>
      </table>
    );
    expect(screen.getByText(/Wind: 10 mph N/)).toBeInTheDocument();
  });

  it('renders weather icon with correct src and alt text', () => {
    render(
      <table>
        <tbody>
          <ForecastPeriod period={mockPeriod} />
        </tbody>
      </table>
    );
    const icon = screen.getByAltText('Sunny');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', 'https://example.com/icon.png');
  });

  it('renders with different period data', () => {
    const differentPeriod: Period = {
      number: 2,
      icon: 'https://example.com/rain.png',
      shortForecast: 'Rainy',
      name: 'Tomorrow',
      detailedForecast: 'Rain expected throughout the day.',
      temperature: 65,
      temperatureUnit: '°F',
      windSpeed: '15 mph',
      windDirection: 'S',
    };

    render(
      <table>
        <tbody>
          <ForecastPeriod period={differentPeriod} />
        </tbody>
      </table>
    );

    expect(screen.getByText('Tomorrow')).toBeInTheDocument();
    expect(screen.getByText('Rain expected throughout the day.')).toBeInTheDocument();
    expect(screen.getByText(/Temperature: 65 °F/)).toBeInTheDocument();
    expect(screen.getByText(/Wind: 15 mph S/)).toBeInTheDocument();
  });

  it('renders with negative temperature', () => {
    const coldPeriod: Period = {
      number: 3,
      icon: 'https://example.com/snow.png',
      shortForecast: 'Snow',
      name: 'Next Day',
      detailedForecast: 'Heavy snow expected.',
      temperature: -5,
      temperatureUnit: '°F',
      windSpeed: '20 mph',
      windDirection: 'NW',
    };

    render(
      <table>
        <tbody>
          <ForecastPeriod period={coldPeriod} />
        </tbody>
      </table>
    );

    expect(screen.getByText(/Temperature: -5 °F/)).toBeInTheDocument();
  });

  it('renders with Celsius temperature unit', () => {
    const celsiusPeriod: Period = {
      number: 4,
      icon: 'https://example.com/icon.png',
      shortForecast: 'Mild',
      name: 'Evening',
      detailedForecast: 'Mild conditions expected.',
      temperature: 22,
      temperatureUnit: '°C',
      windSpeed: '8 km/h',
      windDirection: 'E',
    };

    render(
      <table>
        <tbody>
          <ForecastPeriod period={celsiusPeriod} />
        </tbody>
      </table>
    );

    expect(screen.getByText(/Temperature: 22 °C/)).toBeInTheDocument();
  });

  it('renders all table cells', () => {
    render(
      <table>
        <tbody>
          <ForecastPeriod period={mockPeriod} />
        </tbody>
      </table>
    );

    const cells = screen.getAllByRole('cell');
    expect(cells).toHaveLength(2);
  });
});
