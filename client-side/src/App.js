import React, {useState, useEffect} from 'react';
import './App.css';
import WeatherLogic from './components/WeatherLogic';

function App() {
  return (
    <div className="App">
      <WeatherLogic defaultLocation="Sydney, AU" />
      <WeatherLogic defaultLocation="Sydney, AU" />
    </div>
  );
}

export default App;
