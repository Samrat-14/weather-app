import React from 'react';
import useIsMobile from '../../utils/useIsMobile';
import { useSelector } from 'react-redux';

import { location, windspeed } from '../../assets/index.js';
import './airQualityIndex.css';

const AQI_COLOR_TABLE = {
  1: '#00BE65',
  2: '#D6C100',
  3: '#D64D00',
};

const AQI_INDEX = {
  1: {
    comment: 'Good',
    msg: 'A perfect day for a walk!',
    color: '#00BE65',
  },
  2: {
    comment: 'Fair',
    msg: 'Great to play out in tha lawn!',
    color: '#76BE00',
  },
  3: {
    comment: 'Moderate',
    msg: 'May want to consider mask when moving out!',
    color: '#D6C100',
  },
  4: {
    comment: 'Poor',
    msg: 'Taking precaution would be good for health!',
    color: '#D68D00',
  },
  5: {
    comment: 'Very Poor',
    msg: 'Stay indoors and take proper care!',
    color: '#D64D00',
  },
};

const AirQualityIndex = () => {
  const data = useSelector((state) => state.searchData)?.aqiData;
  const { isMobile } = useIsMobile();
  const qualityIndex = (sub, amt) => {
    switch (sub) {
      case 'SO2':
        if (0 <= amt && amt < 20) return 1;
        else if (20 <= amt && amt < 80) return 2;
        else return 3;
        break;
      case 'NO2':
        if (0 <= amt && amt < 40) return 1;
        else if (40 <= amt && amt < 70) return 2;
        else return 3;
        break;
      case 'PM10':
        if (0 <= amt && amt < 20) return 1;
        else if (20 <= amt && amt < 50) return 2;
        else return 3;
        break;
      case 'PM2_5':
        if (0 <= amt && amt < 10) return 1;
        else if (10 <= amt && amt < 25) return 2;
        else return 3;
        break;
      case 'O3':
        if (0 <= amt && amt < 60) return 1;
        else if (60 <= amt && amt < 100) return 2;
        else return 3;
        break;
      case 'CO':
        if (0 <= amt && amt < 4400) return 1;
        else if (4400 <= amt && amt < 9400) return 2;
        else return 3;
        break;

      default:
        return 2;
        break;
    }
  };

  const air_pollutants_data = [
    {
      sub: 'SO2',
      amt: data ? data.list[0].components.so2 : 0,
    },
    {
      sub: 'NO2',
      amt: data ? data.list[0].components.no2 : 0,
    },
    {
      sub: 'PM10',
      amt: data ? data.list[0].components.pm10 : 0,
    },
    {
      sub: 'PM2.5',
      amt: data ? data.list[0].components.pm2_5 : 0,
    },
    {
      sub: 'O3',
      amt: data ? data.list[0].components.o3 : 0,
    },
    {
      sub: 'CO',
      amt: data ? data.list[0].components.co : 0,
    },
  ];

  return (
    <>
      <div className="air-quality-index flex-col justify-space-between">
        {data ? (
          <>
            <div className="flex-row justify-space-between">
              <h4 className="aqi">Air Quality Index</h4>
              <div className="aiq-place flex-row align-center">
                <img src={location} alt="location-icon" />
                <p className="aiq-location">
                  {data.city.split(',').slice(0, 2).join(',')}
                </p>
              </div>
            </div>

            <div className="air-quality flex-row">
              {!isMobile && (
                <img
                  src={windspeed}
                  alt="air-quality-icon"
                  height={60}
                  width={60}
                />
              )}
              <div className="aqi-data flex-col">
                <h4
                  className="aqi-data-label"
                  style={{ color: AQI_INDEX[data.list[0].main.aqi].color }}
                >
                  {AQI_INDEX[data.list[0].main.aqi].comment}
                </h4>
                <p className="aqi-data-desc">
                  {AQI_INDEX[data.list[0].main.aqi].msg}
                </p>
              </div>
            </div>

            <div className="air-quality-pollutants">
              {air_pollutants_data.map((pollutant, idx) => (
                <div
                  key={idx}
                  className="aqi-box"
                  style={{
                    backgroundColor:
                      AQI_COLOR_TABLE[
                        qualityIndex(pollutant.sub, pollutant.amt)
                      ],
                  }}
                >
                  <div className="aqi-pollutants flex-col align-center">
                    <h5 className="aqi-pollutants-amount">{pollutant.amt}</h5>
                    <p className="aqi-pollutants-name">{pollutant.sub}</p>
                    <p className="aqi-pollutants-unit">
                      {`(μg/m`}
                      <sup>3</sup>
                      {`)`}
                    </p>
                  </div>
                </div>
              ))}
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

export default AirQualityIndex;
