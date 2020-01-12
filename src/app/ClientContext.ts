import React from "react";
import WobblyClient from "../common/WobblyClient";

export interface IClientContext {
  state: {
    client?: WobblyClient;
  };
  setClient: (c: WobblyClient) => void;
}
/**
 * We don't want to put our `WobblyClient` into the redux tree
 * because it's not serializable. Instead, it's kept in a React context.
 */
export default React.createContext<IClientContext>({
  state: {},
  setClient: () => undefined
});
