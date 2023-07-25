import React from 'react';
import useIsMobile from '../../utils/useIsMobile.js';

import { sun, temperature, humidity, windspeed } from '../../assets/index.js';
import './currentWeather.css';

const CurrentWeather = ({ data }) => {
  const { isMobile } = useIsMobile();

  return (
    <>
      <div className="current-weather">
        {data ? (
          <>
            <div className=" flex-col align-center">
              <img
                src={`icons/${data.weather[0].icon}.png`}
                alt="weather-icon"
                height={isMobile ? 80 : 120}
                width={isMobile ? 80 : 120}
              />
              <div className="current-weather__data flex-col align-center">
                <h1 className="weather-temp">{`${Math.round(data.main.temp)}°${
                  data.unit === 'metric' ? 'C' : 'F'
                }`}</h1>
                <h4 className="weather-type">{data.weather[0].description}</h4>
              </div>
            </div>
            <div className="weather-data">
              <div className="weather-data-info flex-row">
                <img
                  src={temperature}
                  alt="temperature-icon"
                  height={isMobile ? 20 : 16}
                  width={isMobile ? 20 : 16}
                />
                {!isMobile && <p className="weather-data-label">Feels like</p>}
              </div>
              <p className="weather-data-value">{`${Math.round(
                data.main.feels_like
              )}°${data.unit === 'metric' ? 'C' : 'F'}`}</p>
              <div className="weather-data-info flex-row">
                <img
                  src={humidity}
                  alt="temperature-icon"
                  height={isMobile ? 20 : 16}
                  width={isMobile ? 20 : 16}
                />
                {!isMobile && <p className="weather-data-label">Humidity</p>}
              </div>
              <p className="weather-data-value">{`${data.main.humidity}%`}</p>
              <div className="weather-data-info flex-row">
                <img
                  src={windspeed}
                  alt="temperature-icon"
                  height={isMobile ? 20 : 16}
                  width={isMobile ? 20 : 16}
                />
                {!isMobile && <p className="weather-data-label">Windspeed</p>}
              </div>
              <p className="weather-data-value">{`${data.wind.speed}m/s`}</p>
            </div>
          </>
        ) : (
          <div className="no-data-to-display">
            <p>Please search for a location to view its weather!</p>
          </div>
        )}
      </div>
    </>
  );
};

export default CurrentWeather;
