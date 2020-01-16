import { Action, configureStore } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';

import rootReducer, { RootState } from './rootReducer';

// configureStore() sets up DevTools and redux-thunk by default
// See https://redux-toolkit.js.org/api/getdefaultmiddleware/ for a full list
const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export default store;

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
