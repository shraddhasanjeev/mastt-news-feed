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
        bg = `linear-gradient(to top, rgba(255,${highColor},0,0.6), rgba(255,${Math.abs(
            lowColor
        )},0,0.6));`;
    } else if (temp <= 22) {
        highColor = (1 - (temp + 22) / 40) * 255;
        lowColor = highColor - 200;
        bg = `linear-gradient(to top, rgb(0,${highColor},255,0.6), rgb(0,${Math.abs(
            lowColor
        )},255,0.6));`;
    }

    const Card1 = styled.div`
    @import url("https://fonts.googleapis.com/css2?family=Merriweather+Sans&display=swap");
    background: ${bg};
    font-family: merriweather;
    font-size: 15px;
    width: 100%;
    height: 288px;
    display: grid;
    grid-template-columns: repeat(2, 50%);
    grid-template-rows: repeat(4, 25%);
    grid-column-gap: px;
    grid-row-gap: 0px;
    grid-auto-flow: column;
    border-radius: 15px 15px 0px 0px;
    color: white;
  `;
    return (
        
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
        >
            <Card1>
                <Location getWeather={getWeather} city={city} country={country} />
                <p
                    style={{
                        fontSize: "2em",
                        display: "flex",
                        justifyContent: "center",
                        gridColumn: "1/span 1",
                        gridRow: "3/span 1",
                    }}
                >
                    <Clock format={"HH:mm:ss"} ticking={true} timezone={timezone} />
                </p>

            <Condition temp={temp} condition={condition}/>
                <Icon condition={condition} />
            </Card1>
        </motion.div>
    );
};

export default WeatherCard;
