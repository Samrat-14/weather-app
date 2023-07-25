import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { searchData } from './redux/searchReducer';
import searchSaga from './redux/searchSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: combineReducers({
    searchData,
  }),
  middleware: () => [sagaMiddleware],
});

sagaMiddleware.run(searchSaga);

export default store;
