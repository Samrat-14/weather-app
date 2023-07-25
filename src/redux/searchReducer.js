import { actions } from './searchAction';

export const searchData = (data = null, action) => {
  switch (action.type) {
    case actions.GET_WEATHER_DETAILS:
      return action.result;

    default:
      return data;
  }
};
