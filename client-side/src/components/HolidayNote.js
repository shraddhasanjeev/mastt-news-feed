import React from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

const HolidayNote = ({ country, holidayName, holidayStartDate }) => {



    const Note = styled.div`
    background: white;
    width: 100%;
    height: 72px;
    border-radius: 0px 0px 15px 15px;
    margin: auto;
  `;

    const openInNewTab = (url) => {
        const newWindow = window.open(url, "_blank");
        if (newWindow) newWindow.opener = null;
    };


    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Note>
          <p> </p>
          <h2
            style={{
              fontFamily: "'Quicksand', sans-serif",
              justifyContent: "center",
            }}
            onClick={() => openInNewTab(`'https://google.com/${holidayName}'`)}
          >
            {country}:&nbsp;
            {holidayName}
          </h2>
          <h2
            style={{
              fontFamily: "'Montserrat Alternates', sans-serif",
              justifyContent: "center",
            }}
          >
            {holidayStartDate.substr(5, 5)}-
            {holidayStartDate.substr(0, 4)}
          </h2>
        </Note>
      </motion.div>
    );
};

export default HolidayNote;
