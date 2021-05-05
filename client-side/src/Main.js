import React from "react";
import "./App.css";
import "./index.css";
import HolidayLogic from "./components/HolidayLogic";
import WeatherLogic from "./components/WeatherLogic";
import News from "./components/News";

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <header>Dashboard</header>

        <div id="infoHub">
          <div>Mastt DashBoard</div>
          <div class="nested">
            <div class="card">
              <WeatherLogic defaultLocation="Sydney, AU" />
            </div>
            <div class="card">
              <WeatherLogic defaultLocation="Brisbane, AU" />
            </div>
            <div class="card">
              <WeatherLogic defaultLocation="Manila, PH" />
            </div>
            <div class="card">
              <WeatherLogic defaultLocation="Hyderabad, IN" />
            </div>

            <div className="note">
              <HolidayLogic presetCity="Sydney" />
            </div>
            <div className="note">
              <HolidayLogic presetCity="Brisbane" />
            </div>
            <div className="note">
              <HolidayLogic presetCity="Hyderabad" />
            </div>
            <div className="note">
              <HolidayLogic presetCity="Manila" />
            </div>
          </div>
        </div>

        <div className="newsHub">
          <News />
        </div>
      </>
    );
  }
}
export default Main;
