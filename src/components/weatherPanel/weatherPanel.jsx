import React, { useEffect, useState } from 'react';
import Search from '../search/search';
import useIsMobile from '../../utils/useIsMobile';

import {
  sun,
  favouriteOutlined,
  favouriteFilled,
  appLogo,
  appLogoMobile,
  moon,
  gps,
} from '../../assets/index.js';
import './weatherPanel.css';
import AirQualityIndex from '../airQualityIndex/airQualityIndex';
import CurrentWeather from '../currentWeather/currentWeather';
import Forecast from '../forecast/forecast';
import { useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';

const WeatherPanel = ({
  favLocations,
  setFavLocations,
  favouriteToShow,
  setShowProfilePanel,
}) => {
  const searchResult = useSelector((state) => state.searchData);
  const { isAuthenticated, user } = useAuth0();

  const { isMobile } = useIsMobile();
  const [isGps, setIsGps] = useState(false);
  const [tempUnit, setTempUnit] = useState('metric');

  const handleFavourite = () => {
    const isFavourite = favLocations.find(
      (location) =>
        location.coord.lat === searchResult.currentWeatherData.coord.lat &&
        location.coord.lon === searchResult.currentWeatherData.coord.lon
    );

    if (!isFavourite) {
      const newFav = {
        coord: {
          lat: searchResult.currentWeatherData.coord.lat,
          lon: searchResult.currentWeatherData.coord.lon,
        },
        city: searchResult.currentWeatherData.city,
        weather: {
          temp: {
            value: searchResult.currentWeatherData.main.temp,
            unit: tempUnit === 'metric' ? 'C' : 'F',
          },
          hum: searchResult.currentWeatherData.main.humidity,
          wind: searchResult.currentWeatherData.wind.speed,
        },
      };
      setFavLocations([...favLocations, newFav]);
    } else {
      const newFav = favLocations.filter(
        (location) =>
          location.coord.lat !== searchResult.currentWeatherData.coord.lat ||
          location.coord.lon !== searchResult.currentWeatherData.coord.lon
      );
      setFavLocations(newFav);
    }
  };

  return (
    <div className="weather-panel container">
      <div className="weather-panel__info-logo flex-row align-center justify-space-between">
        <div
          className="app-logo-wrapper"
          onClick={() =>
            setShowProfilePanel((curr) => (isMobile ? !curr : curr))
          }
        >
          {!isMobile ? (
            <img src={appLogo} alt="app-logo" />
          ) : (
            <img src={appLogoMobile} alt="app-logo" height={40} width={40} />
          )}
        </div>
        <div className="search-wrapper flex-row align-center">
          <Search
            tempUnit={tempUnit}
            favouriteToShow={favouriteToShow}
            isGps={isGps}
          />
          <img
            src={gps}
            alt="current-gps"
            height={30}
            width={30}
            className="cursor-pointer"
            onClick={() => setIsGps((curr) => !curr)}
          />
        </div>
      </div>

      <div className="weather-panel__info">
        {searchResult?.currentWeatherData && (
          <div className="location flex-row align-center">
            {!isMobile && (
              <img
                src={
                  new Date().getHours() > 6 && new Date().getHours() < 18
                    ? sun
                    : moon
                }
                alt="day-night-icon"
                height={30}
                width={30}
              />
            )}
            <h4 className="location-place">
              {searchResult.currentWeatherData.city}
            </h4>
            {isAuthenticated &&
              (favLocations.find(
                (location) =>
                  location.coord.lat ===
                    searchResult.currentWeatherData.coord.lat &&
                  location.coord.lon ===
                    searchResult.currentWeatherData.coord.lon
              ) ? (
                <img
                  src={favouriteFilled}
                  alt="favourite-icon"
                  onClick={handleFavourite}
                  className="cursor-pointer"
                />
              ) : (
                favLocations.length < 5 && (
                  <img
                    src={favouriteOutlined}
                    alt="favourite-icon"
                    onClick={handleFavourite}
                    className="cursor-pointer"
                  />
                )
              ))}
          </div>
        )}
        <div className="temp-toggle-wrapper toggle-wrapper flex-row align-center">
          <p className="temp-toggle-text">Celsius ⇔ Fahrenheit</p>
          <input
            type="checkbox"
            name="temp-toggle"
            id="temp-toggle"
            className="toggle temp-toggle"
            onChange={() =>
              setTempUnit((curr) => (curr === 'metric' ? 'imperial' : 'metric'))
            }
          />
          <label htmlFor="temp-toggle"></label>
        </div>
      </div>

      <div
        className={`${
          isMobile ? 'weather-panel__flex-col' : 'weather-panel__flex-row'
        }`}
      >
        <AirQualityIndex />
        <CurrentWeather />
      </div>

      {searchResult?.forecastData && <Forecast />}
    </div>
  );
};

export default WeatherPanel;
