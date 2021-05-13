import React, { useState, useEffect } from "react";
import HolidayNote from './HolidayNote';

const HolidayLogic = ({ presetCity }) => {
    const [holiday, setHoliday] = useState({
    
    city: null,
    holidayName: null,
    holidayDate: null,
    });
   

    const getHoliday = async (q) => {
        const apiRes = await fetch(``);
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
                UP NEXT
                <HolidayNote
                    city={presetCity}
                    holidayName={holiday.holidayName}
                    holidayDate={holiday.holidayDate}
                />
            </div>
        )
    };


export default HolidayLogic;
