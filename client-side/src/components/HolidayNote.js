import React from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import HolidayLogic from './HolidayLogic';

const HolidayNote = ({ country, holidayName, holidayStartDate, holidayEndDate }) => {
  
  

  const Note = styled.div`
    background: blue;
    width: 200px;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-radius: 40px;
  `;


  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Note>Up next in {country}:<br/>
        {holidayName} starting from {holidayStartDate} ending in {holidayEndDate}
       
      </Note>
    </motion.div>
  );
};

export default HolidayNote;
