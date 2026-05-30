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
        <table>
            {props.forecast['properties']['periods'].map((item) => 
            <tbody>
                <ForecastPeriod period={item} />
            </tbody>
        )}
        </table>
    )
}