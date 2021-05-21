import React, { useState, useEffect } from "react";
import HolidayNote from "./HolidayNote";

const HolidayLogic = ({ presetCountry }) => {
  const [holiday, setHoliday] = useState({
    country: null,
    holidayName: null,
    holidayStartDate: "2020-12-12",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getHoliday = async (a) => {
    const settings = {
      headers: {
        Authorization: `Bearer f39236376746483bb4f7922954f2f503`,
      }
    }
    setLoading(true);
    try {
      const apiRes = await fetch(
        `https://mastt-news-feed-server.azurewebsites.net/get${a}Holiday` , settings
      );
      const resJSON = await apiRes.json();
      console.log(resJSON)
    
      setHoliday({
        country: resJSON[0].city,
        holidayName: resJSON[0].title,
        holidayStartDate: resJSON[0].start_date,
        setLoading: true
      });
    }
    catch (error) {
      setError (true);
    }
    setLoading(false);
  };
useEffect(() => {
  getHoliday(presetCountry);
}, [presetCountry]);
  
  if (error) {
    return (
    <div> error</div>    )
  }
  if (loading) {
    <div>Now loading </div>
  }
  return (
    <div>
      <HolidayNote
        country={holiday.country}
        holidayName={holiday.holidayName}
        holidayStartDate={holiday.holidayStartDate}
      />
    </div>
  );
};

export default HolidayLogic;
