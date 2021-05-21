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
              <div className="label">
                <div
                  className="card"
                  style={{
                    backgroundImage: "url(" + "./buenosaires.jpg" + ")",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    borderRadius: "15px 15px 0px 0px",
                  }}
                >
                  <WeatherLogic
                    defaultLocation="Buenos Aires,AR"
                    timezone="America/Argentina/Buenos_Aires"
                  />
                </div>
                <div className="note">
                  <HolidayLogic presetCountry="Argentina" />
                </div>
              </div>
              <div className="label">
                <div
                  className="card"
                  style={{
                    backgroundImage: "url(" + "./hyderabad.jpg" + ")",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    borderRadius: "15px 15px 0px 0px",
                  }}
                >
                  <WeatherLogic
                    defaultLocation="Hyderabad, IN"
                    timezone="Asia/Kolkata"
                  />
                </div>
                <div className="note">
                  <HolidayLogic presetCountry="Philippines" />
                </div>
              </div>
              <div className="label">
                <div
                  className="card"
                  style={{
                    backgroundImage: "url(" + "./manila.jpg" + ")",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    borderRadius: "15px 15px 0px 0px ",
                  }}
                >
                  <WeatherLogic
                    defaultLocation="Manila, PH"
                    timezone="Asia/Manila"
                  />
                </div>
                <div className="note">
                  <HolidayLogic presetCountry="India" />
                </div>
              </div>
              <div className="label">
                <div
                  className="card"
                  style={{
                    backgroundImage: "url(" + "./australia.jpg" + ")",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    borderRadius: "15px 15px 0px 0px",
                  }}
                >
                  <WeatherLogic
                    defaultLocation="Sydney, AU"
                    timezone="Australia/Sydney"
                  />
                </div>
                <div className="note">
                  <HolidayLogic presetCountry="Australia" />
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
