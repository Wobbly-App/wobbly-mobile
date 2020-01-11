import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

// configureStore() sets up DevTools and redux-thunk by default
// See https://redux-toolkit.js.org/api/getdefaultmiddleware/ for a full list
const store = configureStore({
  reducer: rootReducer
});

export type AppDispatch = typeof store.dispatch;
export default store;
