import React from "react";
import styled from "@emotion/styled";

const Icon = (props) => {
  const Icon = styled.img`
    width: 90%;
    grid-column: 2;
    grid-row: 1 / span 2;
    display: flex;
    justify-content: center;
  `;

  var icon = "";
  switch (props.condition) {
    case "Clouds":
      icon = `./icons/Mostly Cloudy-2x.png`;
      break;
    case "Clear":
      icon = `./icons/Mostly Sunny-2x.png`;
      break;
    case "Haze":
      icon = `./icons/Haze-2x.png`;
      break;
    case "Hail":
      icon = `./icons/Hail-2x.png`;
      break;
    case "Fog":
      icon = `./icons/Fog-2x.png`;
      break;
    case "Tornado":
      icon = `./icons/Tornado-2x.png`;
      break;
    case "Dust":
      icon = `./icons/Dust-2x.png`;
      break;
    case "Mist":
      icon = `./icons/Fog-2x.png`;
      break;
    case "Snow":
      icon = `./icons/Snow-2x.png`;
      break;
    case "Rain":
      icon = `./icons/Rain-2x.png`;
      break;
    case "Drizzle":
      icon = `./icons/Drizzle-2x.png`;
      break;
    case "Thunderstorm":
      icon = `./icons/Severe Thunderstorm-2x.png`;
      break;
    default:
      icon = `./icons/Fog-2x.png`;
      break;
  }
  return <Icon src={icon} alt="Weather Icon" />;
};

export default Icon;
