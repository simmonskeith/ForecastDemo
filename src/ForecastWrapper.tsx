import React from 'react';
import { Forecast } from './Forecast';


export function ForecastWrapper() {

    type Location = {
        latitude: string;
        longitude: string;
        name: string;
        stateabbreviation: string;
        zipCode: string;
    } | null;

    const [location, setLocation] = React.useState<Location>(null);
    const [zipCode, setZipCode] = React.useState("");
    const [tempZipCode, setTempZipCode] = React.useState("");

    const isValidZip = (zip: string) => {
        return zip.length === 5 && Number.isFinite(Number(zip));
    }
    
    React.useEffect(() => {

        const fetchZip = async () => {
            try {
                const response = await fetch(`http://api.zippopotam.us/us/${zipCode}`, { method: 'GET'});
                if (response.status === 200) {
                    const zipInfo = await response.json();
                    if (!zipInfo.places) {
                        setLocation(null);
                        return;
                    }
                    const updatedLocation = {
                        latitude: zipInfo.places[0]['latitude'],
                        longitude: zipInfo.places[0]['longitude'],
                        name: zipInfo.places[0]['place name'],
                        stateabbreviation: zipInfo.places[0]['state abbreviation'],
                        zipCode: zipCode
                    }
                    setLocation(updatedLocation);
                }
                else {
                    setLocation(null);
                }
            } catch (error) {
                console.error("Error fetching zip code info:", error);
            }
        }

        if (isValidZip(zipCode)) {
            console.log("Fetching zip code info for " + zipCode);
            fetchZip();
        }   
    }, [zipCode]);

    const updateZip = () => {
        if (isValidZip(tempZipCode)) {
            setZipCode(tempZipCode);
        }
    }
    
    return (
            
            <div data-testid="forecast-wrapper">
                <input type="text" placeholder="Enter Zip Code" onChange={(e) => setTempZipCode(e.target.value)} />
                <button onClick={updateZip} disabled={!isValidZip(tempZipCode)}>Get Forecast</button>
                <h2>Weather Forecast</h2>
               
                {location 
                    ? <div>
                        <h3>Forecast for {location.name}, {location.stateabbreviation} {location.zipCode}</h3>
                        <Forecast location={{
                            latitude: Number(location.latitude),
                            longitude: Number(location.longitude)
                        }} />
                    </div> 
                    : <p>Please enter a valid zip code to get the forecast.</p>}
            </div>
    );
}