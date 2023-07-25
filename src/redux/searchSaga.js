import { takeEvery, put } from 'redux-saga/effects';
import { actions } from './searchAction';
import { WEATHER_API_KEY, WEATHER_API_URL } from '../api';

function* getWeatherDetails({ data }) {
  if (!data.value || !data.label) return;

  const [lat, lon] = data.value.split(' ');
  const tempUnit = data.tempUnit;

  let currentWeatherData = yield fetch(
    `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=${tempUnit}`
  );
  let forecastData = yield fetch(
    `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=${tempUnit}`
  );
  let aqiData = yield fetch(
    `${WEATHER_API_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
  );
  currentWeatherData = yield currentWeatherData.json();
  forecastData = yield forecastData.json();
  aqiData = yield aqiData.json();

  currentWeatherData = {
    city: data.label,
    unit: data.tempUnit,
    ...currentWeatherData,
  };
  forecastData = {
    city: data.label,
    unit: data.tempUnit,
    ...forecastData,
  };
  aqiData = {
    city: data.label,
    ...aqiData,
  };

  yield put({
    type: actions.GET_WEATHER_DETAILS,
    result: { currentWeatherData, forecastData, aqiData },
  });
}

function* searchSaga() {
  yield takeEvery(actions.SEARCH_LOCATION, getWeatherDetails);
}

export default searchSaga;
