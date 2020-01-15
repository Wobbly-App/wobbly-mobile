import React from "react";
import { Provider } from "react-redux";

import store from "./src/redux/store";
import Navigation from "./src/app/Navigation";

export default () => (
  <Provider store={store}>
    <Navigation />
  </Provider>
);
