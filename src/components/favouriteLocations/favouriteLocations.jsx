import React from 'react';
import useIsMobile from '../../utils/useIsMobile.js';

import { humidity, windspeed, location } from '../../assets/index.js';
import './favouriteLocations.css';

const FavouriteLocations = ({
  favLocations,
  setFavouriteToShow,
  setShowProfilePanel,
}) => {
  const { isMobile } = useIsMobile();

  return (
    <>
      <div className="flex-col fav-loc">
        <div className="fav-loc-title font">
          <h5>Favourite locations</h5>
          <h6>{`${5 - favLocations.length} favourite slots remaining`}</h6>
        </div>
        <div className="fav-loc-wrapper flex-col">
          {favLocations.length !== 0 ? (
            favLocations.map((place, idx) => (
              <div
                key={idx}
                className="fav-loc-box cursor-pointer"
                onClick={() => {
                  setFavouriteToShow({
                    value: `${place.coord.lat} ${place.coord.lon}`,
                    label: place.city,
                  });
                  setShowProfilePanel((curr) => !curr);
                }}
              >
                <div className="fav-loc-weather-label flex-col">
                  <div className="fav-loc-weather flex-row">
                    <img
                      src={humidity}
                      alt="humidity-icon"
                      width={isMobile ? 20 : 16}
                      height={isMobile ? 20 : 16}
                    />
                    {!isMobile && <p className="fav-loc-humidity">Hum</p>}
                  </div>
                  <div className="fav-loc-weather flex-row">
                    <img
                      src={windspeed}
                      alt="windspeed-icon"
                      width={isMobile ? 20 : 16}
                      height={isMobile ? 20 : 16}
                    />
                    {!isMobile && <p className="fav-loc-windspeed">Wind</p>}
                  </div>
                </div>
                <div className="fav-loc-weather-value flex-col">
                  <p className="fav-loc-humidity-val">{place.weather.hum}%</p>
                  <p className="fav-loc-windspeed-val">
                    {place.weather.wind}m/s
                  </p>
                </div>
                <div className="fav-loc-info flex-col">
                  <div className="fav-loc-place flex-row">
                    <img src={location} alt="location-icon" />
                    <p className="fav-loc-location">
                      {place.city.split(',').length >= 1
                        ? place.city.split(',')[0]
                        : place.city}
                    </p>
                  </div>
                  <p className="fav-loc-temp">{`${Math.round(
                    place.weather.temp.value
                  )}°${place.weather.temp.unit}`}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="no-data-to-display">
              <p>No favourite locations to display!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FavouriteLocations;
