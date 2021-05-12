import React from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import HolidayLogic from './HolidayLogic';

const HolidayNote = ({ country, holidayName, holidayStartDate }) => {
  
  

  const Note = styled.div`
    background: white;
    width: 400px;
    height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 0px 0px 15px 15px;
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
        <h2
          style={{
            fontFamily: "'Quicksand', sans-serif",
            display: "flex",
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
            display: "flex",
            justifyContent: "center",
          }}
        >
          {holidayStartDate.substr(0, 10)}
        </h2>
      </Note>
    </motion.div>
  );
};
 
export default HolidayNote;
