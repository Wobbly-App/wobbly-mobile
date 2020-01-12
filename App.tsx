import React from "react";
import { Provider } from "react-redux";

import store from "./src/redux/store";
import WobblyClient from "./src/common/WobblyClient";
import ClientContext from "./src/app/ClientContext";
import Navigation from "./src/app/Navigation";

interface IAppState {
  client?: WobblyClient;
}
/**
 * The main class of our app.
 * Because the WobblyClient won't be instantiated till a user logs in, the ClientContext
 * also includes a function for setting the client.
 */
class App extends React.Component<IAppState> {
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
          <Navigation />
        </Provider>
      </ClientContext.Provider>
    );
  }

  private setClient = (client: WobblyClient) => {
    this.setState({ client });
  };
}

export default App;
