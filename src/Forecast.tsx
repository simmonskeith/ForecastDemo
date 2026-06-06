import React from 'react';
import { ForecastList } from './ForecastList';

interface ForecastProps {
    location: {
        latitude: number;
        longitude: number;
    };
}

export function Forecast(props: ForecastProps) {
    
    const [forecast, setForecast] = React.useState(null); 

    React.useEffect(() => {

        const fetchForecast = async () => {
            setForecast(null);
            const requestUrl = `https://api.weather.gov/points/${props.location.latitude},${props.location.longitude}`
            const forecastResponse = await fetch(requestUrl, { method: 'GET'});
            const boxResponse = await forecastResponse.json();
            const boxForecast = await fetch(boxResponse['properties']['forecast'], { method: 'GET'});
            const forecastJson = await boxForecast.json();
            setForecast(forecastJson);
        }

        fetchForecast();
    }, [props.location]);

    return (
            
            <div>
                
                {forecast && forecast['properties'] && forecast['properties']['periods'] ? (
                    <ForecastList location={props.location} forecast={forecast} />
                ) : (
                    <p>No forecast data available.</p>
                )}
            </div>
    );
}

