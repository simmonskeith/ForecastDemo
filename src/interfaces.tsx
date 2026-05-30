

export interface Period {
    number: number;
    icon: string;
    shortForecast: string;
    name: string;
    detailedForecast: string;
    temperature: number;
    temperatureUnit: string;
    windSpeed: string;
    windDirection: string;
}

export interface ForecastPeriodProps {
    period: Period;
}