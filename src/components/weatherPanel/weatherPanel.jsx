import React, { useState } from 'react';
import Search from '../search/search';
import { WEATHER_API_KEY, WEATHER_API_URL } from '../../api';
import useIsMobile from '../../utils/useIsMobile';

import {
  sun,
  favouriteOutlined,
  favouriteFilled,
  appLogo,
  appLogoMobile,
  moon,
} from '../../assets/index.js';
import './weatherPanel.css';
import AirQualityIndex from '../airQualityIndex/airQualityIndex';
import CurrentWeather from '../currentWeather/currentWeather';
import Forecast from '../forecast/forecast';

const WeatherPanel = ({
  favLocations,
  setFavLocations,
  favouriteToShow,
  isAuth,
  setShowProfilePanel,
}) => {
  const { isMobile } = useIsMobile();
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [aqi, setAqi] = useState(null);

  const [tempUnit, setTempUnit] = useState('metric');

  const handleOnSearchChange = (searchData) => {
    if (!searchData) return;

    const [lat, lon] = searchData.value.split(' ');

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=${tempUnit}`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=${tempUnit}`
    );
    const aqiFetch = fetch(
      `${WEATHER_API_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
    );

    Promise.all([currentWeatherFetch, forecastFetch, aqiFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        const aqiResponse = await response[2].json();

        setCurrentWeather({
          city: searchData.label,
          unit: tempUnit,
          ...weatherResponse,
        });
        setForecast({
          city: searchData.label,
          unit: tempUnit,
          ...forecastResponse,
        });
        setAqi({ city: searchData.label, ...aqiResponse });
      })
      .catch((err) => console.log(err));
  };

  // console.log(currentWeather);
  // console.log(forecast);
  // console.log(aqi);

  const handleFavourite = () => {
    const isFavourite = favLocations.find(
      (location) =>
        location.coord.lat === currentWeather.coord.lat &&
        location.coord.lon === currentWeather.coord.lon
    );

    if (!isFavourite) {
      setFavLocations([
        ...favLocations,
        {
          coord: {
            lat: currentWeather.coord.lat,
            lon: currentWeather.coord.lon,
          },
          city: currentWeather.city,
          weather: {
            temp: {
              value: currentWeather.main.temp,
              unit: tempUnit === 'metric' ? 'C' : 'F',
            },
            hum: currentWeather.main.humidity,
            wind: currentWeather.wind.speed,
          },
        },
      ]);
    } else {
      const newFav = favLocations.filter(
        (location) =>
          location.coord.lat !== currentWeather.coord.lat ||
          location.coord.lon !== currentWeather.coord.lon
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
        <Search
          onSearchChange={handleOnSearchChange}
          tempUnit={tempUnit}
          favouriteToShow={favouriteToShow}
        />
      </div>

      <div className="weather-panel__info">
        {currentWeather && (
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
            <h4 className="location-place">{currentWeather.city}</h4>
            {isAuth &&
              (favLocations.find(
                (location) =>
                  location.coord.lat === currentWeather.coord.lat &&
                  location.coord.lon === currentWeather.coord.lon
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
          <p className="temp-toggle-text">Celsius ⇔ Farhrenheit</p>
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
        <AirQualityIndex data={aqi} />
        <CurrentWeather data={currentWeather} />
      </div>

      {forecast && <Forecast data={forecast} />}
    </div>
  );
};

export default WeatherPanel;
