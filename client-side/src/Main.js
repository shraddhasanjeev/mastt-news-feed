import React from 'react';


import './App.css';
import HolidayLogic from './components/HolidayLogic';
import WeatherLogic from './components/WeatherLogic';

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <div className="card">
                    <WeatherLogic defaultLocation="Sydney, AU" />
                    <WeatherLogic defaultLocation="Brisbane, AU" />
                    <WeatherLogic defaultLocation="Hyderabad, IN" />
                    <WeatherLogic defaultLocation="Manila, PH" />
                </div>

                <div className="note">
                    <HolidayLogic presetCity="Sydney" />
                    <HolidayLogic presetCity="Brisbane" />
                    <HolidayLogic presetCity="Hyderabad" />
                    <HolidayLogic presetCity="Manila" />
                </div>
            </>
        );
    }
}export default Main;