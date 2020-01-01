import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import logger from "redux-logger";
import sessionReducer from "../reducers/session";
import groupsReducer from "../reducers/groups";
import { AppActions } from "../types/actions";

export const rootReducer = combineReducers({
  session: sessionReducer,
  groups: groupsReducer
});

export type AppState = ReturnType<typeof rootReducer>;

/*
  The store is created in this way to get redux debugging to work with React Native Debugger.
  You can access it via the standalone debugger @ https://github.com/jhen0409/react-native-debugger
  OR via the Chrome extension called Redux DevTools https://chrome.google.com/webstore/detail/redux-devtools
  The standalone debugger is fantastic, but I've only gotten it to work with Linux and Mac as of Dec, 2019.
  If you use it, you will need to open the config file for the debugger and change the port from 8081 to 19001 per Expo.
*/

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(logger, thunk as ThunkMiddleware<AppState, AppActions>)
  )
);
