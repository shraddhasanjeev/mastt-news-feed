import React from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import HolidayLogic from './HolidayLogic';

const HolidayNote = ({ country, holidayName, holidayStartDate, holidayEndDate }) => {
  
  

  const Note = styled.div`
    background:white;
    width: 400px;
    height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-radius: 0px 0px 15px 15px;
  `;


  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Note>
        <h1>Up next in</h1> {country}
        {holidayName} starting from {holidayStartDate} ending in{holidayEndDate}
        {holidayEndDate}
      </Note>
    </motion.div>
  );
};
 
export default HolidayNote;
