import { ForecastPeriod } from './ForecastPeriod';
import type { Period } from './interfaces';

type ForecastListProps = {
    forecast: {
        properties: {
            periods: Period[];
        };
    };
    location: {
        latitude: number;
        longitude: number;
    };
};

export function ForecastList(props: ForecastListProps) {
    return (
        <table data-testid="forecast-table">
            <tbody>
                {props.forecast['properties']['periods'].map((item) => 
                    <ForecastPeriod period={item} />
                )}
            </tbody>
        </table>
    )
}