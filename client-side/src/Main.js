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
        <page style={{ backgroudColor: "blue" }}>
          <div id="infoHub">
            <div class="nested">
              <div
                class="card"
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
              <div
                class="card"
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
                  timezone="Australia/Brisbane"
                />
              </div>
              <div
                class="card"
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
              <div
                class="card"
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
        </page>
      </>
    );
  }
}
export default Main;
