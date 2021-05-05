import React, { useState, useEffect } from "react";
import HolidayNote from './HolidayNote';

const HolidayLogic = ({ presetCity }) => {
    const [holiday, setHoliday] = useState({
    
    city: null,
    holidayName: null,
    holidayDate: null,
    });
   

    const getHoliday = async (q) => {
        const apiRes = await fetch(`http://localhost:3000/holiday/`);
        const resJSON = await apiRes.json();
        setHoliday({
            city: q,
            holidayName: resJSON.holidayName,
            holidayDate: resJSON.holidayDate,
        });
    };

        useEffect(() => {
            getHoliday(presetCity);
        }, [presetCity]);

        return (
            <div>
                <HolidayNote
                    city={presetCity}
                    holidayName={holiday.title}
                    holidayDate={holiday.start_date}
                />
            </div>
        )
    };


export default HolidayLogic;
