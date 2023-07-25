import React from 'react';
import { useSelector } from 'react-redux';

import './forecast.css';

const WEEK_DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const Forecast = () => {
  const data = useSelector((state) => state.searchData)?.forecastData;
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );

  return (
    <>
      <div className="forecast-wrapper">
        {data.list.slice(0, 7).map((item, idx) => (
          <div className="forecast-box" key={idx}>
            <img
              src={`icons/${item.weather[0].icon}.png`}
              alt="weather-icon"
              width={80}
              height={80}
            />
            <div className="forecast-info">
              <h5 className="forecast-day">{forecastDays[idx].slice(0, 3)}</h5>
              <p className="forecast-temp">{`${Math.round(item.main.temp)}°${
                data.unit === 'metric' ? 'C' : 'F'
              }`}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Forecast;
