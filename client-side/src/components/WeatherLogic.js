import React, { useState, useEffect } from 'react';
import WeatherCard from './WeatherCard/component';

const WeatherLogic = ({ defaultLocation }) => {
    const [query, setQuery] = useState("");
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
   
    const handleSearch = (e) => {
        e.preventDefault();
        getWeather(query);
    };
  
    useEffect(() => {
        getWeather(defaultLocation)
    
    }, [defaultLocation]);

    return (
        <div>
            {!loading && !error ? (
                <div>
                    <WeatherCard
                        temp={weather.temp}
                        condition={weather.condition}
                        city={weather.city}
                        country={weather.counrty}
                    />

                    <form>
                        <input value={query} onChange={(e) => setQuery(e.target.value)} />
                        <button onClick={(e) => handleSearch(e)}>Search</button>
                    </form>
                </div>
            ) : loading ? (
                <div>loading</div>
            ) : !loading && error ? (
                <div>
                    An error has occured
                     
                    <button onClick={() => setError(false)}>RESET!</button>
                </div>
            ) : null}

        </div>
           
    
    )
}
 
export default WeatherLogic;