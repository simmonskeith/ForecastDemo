
import type { ForecastPeriodProps } from './interfaces'



export function ForecastPeriod({period}: ForecastPeriodProps) {
    return (
        <tr key={period.number} style={{border: '1px solid black', margin: '10px', padding: '10px'}}>
            <td>
                <img src={period.icon} alt={period.shortForecast} />
            </td>
            <td>
                <h3>{period.name}</h3>
                <p>{period.detailedForecast}</p>
                <p>Temperature: {period.temperature} {period.temperatureUnit}</p>
                <p>Wind: {period.windSpeed} {period.windDirection}</p>
            </td>
        </tr>
    )
}