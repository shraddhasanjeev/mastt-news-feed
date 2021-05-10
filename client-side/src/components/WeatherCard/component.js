import React from "react";
import styled from "@emotion/styled";
import Location from "./Location";
import Condition from "./Condition";
import Icon from "./Icon";
import { motion } from "framer-motion";
import Clock from "react-live-clock";

const WeatherCard = ({
  temp,
  condition,
  city,
  country,
  timezone,
  getWeather,
}) => {
  let highColor = 0;
  let lowColor = 0;
  let bg = null;
  if (temp > 22) {
    // hot weather
    highColor = (1 - (temp - 22) / 40) * 255;
    lowColor = highColor - 150;
    bg = `linear-gradient(to top, rgb(255,${highColor},0), rgb(255,${Math.abs(
      lowColor
    )},0));`;
  } else if (temp <= 22) {
    highColor = (1 - (temp + 22) / 40) * 255;
    lowColor = highColor - 200;
    bg = `linear-gradient(to top, rgb(0,${highColor},255), rgb(0,${Math.abs(
      lowColor
    )},255));`;
  }

  const Card = styled.div`
    @import url("https://fonts.googleapis.com/css2?family=Merriweather+Sans&display=swap");
    background: ${bg};
    font-size: 1.1rem;
    font-family: merriweather;
    width: 200px;
    height: 350px;
    display: grid;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-radius: 15px;
    display: flex;
    color: white;
  `;

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <Location getWeather={getWeather} city={city} country={country} />
        <p>
          TIME:
          <Clock format={"HH:mm:ss"} ticking={true} timezone={timezone} />
        </p>
        <Icon condition={condition} />
        <Condition temp={temp} condition={condition} />
      </Card>
    </motion.div>
  );
};

export default WeatherCard;
