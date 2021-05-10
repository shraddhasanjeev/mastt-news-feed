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
              <WeatherLogic
                defaultLocation="Sydney, AU"
                timezone="Australia/Sydney"
              />
            </div>
            <div class="card">
              <WeatherLogic
                defaultLocation="Brisbane, AU"
                timezone="Australia/Brisbane"
              />
            </div>
            <div class="card">
              <WeatherLogic
                defaultLocation="Manila, PH"
                timezone="Asia/Manila"
              />
            </div>
            <div class="card">
              <WeatherLogic
                defaultLocation="Hyderabad, IN"
                timezone="Asia/Kolkata"
              />
            </div>
            <div className="note">
              <HolidayLogic presetCountry="Australia" />
            </div>
            <div className="note">
              <HolidayLogic presetCountry="Argentina" />
            </div>
            <div className="note">
              <HolidayLogic presetCountry="India" />
            </div>
            <div className="note">
              <HolidayLogic presetCountry="Philippines" />
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
