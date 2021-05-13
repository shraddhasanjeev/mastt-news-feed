import React, { useState, useEffect } from 'react';
import WeatherCard from './WeatherCard/component';
import PulseLoader from 'react-spinners/PulseLoader'

const WeatherLogic = ({ defaultLocation, timezone }) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [weather, setWeather] = useState({
    
        temp: null,
        city: null,
        condition: null,
        country: null,
    });
    
    
    const getWeather = async (q) => {
        
        setLoading(true);
        try {
            const apiRes = await fetch(
                `http://api.openweathermap.org/data/2.5/weather?q=${q}&units=metric&APPID=ba21ad3c5ee233cb6ed93a261f758fc5`
            );
            const resJSON = await apiRes.json();
            setWeather({
                temp: resJSON.main.temp,
                city: resJSON.name,
                condition: resJSON.weather[0].main,
                country: resJSON.country,
            });
        } catch (error) {
            setError(true);
        }
        setLoading(false);
    };
   

  
    useEffect(() => {
        getWeather(defaultLocation)
    
    }, [defaultLocation]);

    if (error) {
        return (
            <div>
                An error has occured
                <button onClick={() => setError(false)}>RESET!</button>
            </div>
        );
    }
    
    if (loading) {
        return (
            <div style={{ width: "200px", height: "240px" }}>
                <PulseLoader color="lightgreen" />
            </div>
        );
    }

    return (
            <div>
                <WeatherCard
                    temp={weather.temp}
                    condition={weather.condition}
                    city={weather.city}
                    country={weather.country}
                getWeather={getWeather}
                timezone={timezone}
                />

                    
            </div>
           
           
    
        )
    }

 
export default WeatherLogic;