import React from "react";
import { Provider } from "react-redux";

import store from "./src/redux/store";
import Landing from "./src/components/screens/Landing";
import WobblyClient from "./src/common/WobblyClient";
import ClientContext from "./src/app/ClientContext";

interface IAppState {
  client?: WobblyClient;
}
/**
 * The main class of our app.
 * We don't want to put our `WobblyClient` into the redux tree
 * because it's not serializable. Instead, it's kept in a React context.
 * Because it won't be instantiated till a user logs in, this context
 * also includes a function for setting the client.
 */
class App extends React.Component<IAppState> {
  public constructor(props) {
    super(props);
    this.state = {};
  }

  public componentDidMount() {}

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
