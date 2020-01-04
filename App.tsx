import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";

import { store } from "./src/store/configureStore";
import Landing from "./src/components/screens/Landing";
import { WobblyClient, ClientContext } from "./src/client";
import { config } from "./src/config";

const App: React.FC = () => {
  const client = new WobblyClient(config.backendUrl);
  return (
    <ClientContext.Provider value={client}>
      <Provider store={store}>
        <Landing />
      </Provider>
    </ClientContext.Provider>
  );
};

export default App;
