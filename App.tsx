import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import { Provider } from "react-redux";

import { store } from "./src/store/configureStore";
import Landing from "./src/components/screens/Landing";
import { WobblyClient } from "./src/client";
import ClientContext from "./src/ClientContext";

interface IAppState {
  client?: WobblyClient;
}
class App extends React.Component {
  public constructor(props) {
    super(props);
    this.state = {};
  }

  public render() {
    const updateClient = (c: WobblyClient) => this.setClient(c);
    return (
      <ClientContext.Provider
        value={{ state: this.state, setClient: updateClient }}
      >
        <Provider store={store}>
          <Landing />
        </Provider>
      </ClientContext.Provider>
    );
  }

  private setClient = (client: WobblyClient) => {
    this.setState({ client });
  };
}

export default App;
