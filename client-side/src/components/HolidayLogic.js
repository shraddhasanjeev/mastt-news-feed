import React, { useState, useEffect } from "react";
import HolidayNote from "./HolidayNote";

const HolidayLogic = ({ presetCountry }) => {
  const [holiday, setHoliday] = useState({
    country: null,
    holidayName: null,
    holidayStartDate: null,
    holidayEndDate: null,
  });

  const getHoliday = async (a) => {
    const apiRes = await fetch(
      `https://mastt-news-feed-server.azurewebsites.net/get${a}Holiday`
    );
    const resJSON = await apiRes.json();
    setHoliday({
      country: resJSON.city,
      holidayName: resJSON.title,
      holidayStartDate: resJSON.start_date,
      holidayStartDate: resJSON.end_date,
    });
  };
useEffect(() => {
  getHoliday(presetCountry);
}, [presetCountry]);
  

  return (
    <div>
      <HolidayNote
        country={holiday.country}
        holidayName={holiday.holidayName}
        holidayStartDate={holiday.holidayStartDate}
        holidayEndDate={holiday.holidayEndDate}
      />
    </div>
  );
};

export default HolidayLogic;
