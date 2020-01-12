import { configureStore, Action } from "@reduxjs/toolkit";
import rootReducer, { IRootState } from "./rootReducer";
import { ThunkAction } from "redux-thunk";

// configureStore() sets up DevTools and redux-thunk by default
// See https://redux-toolkit.js.org/api/getdefaultmiddleware/ for a full list
const store = configureStore({
  reducer: rootReducer
});

export type IAppDispatch = typeof store.dispatch;
export default store;

export type IAppThunk = ThunkAction<void, IRootState, null, Action<string>>;
