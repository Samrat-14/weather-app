export const actions = {
  SEARCH_LOCATION: 'SEARCH_LOCATION',
  GET_WEATHER_DETAILS: 'GET_WEATHER_DETAILS',
};

export const onSearchChange = (data) => {
  return {
    type: actions.SEARCH_LOCATION,
    data,
  };
};
