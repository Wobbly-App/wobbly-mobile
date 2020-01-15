import React, { useEffect, useState } from "react";
import { jid } from "@xmpp/client";
import WobblyClient from "../common/WobblyClient";
import { loadCredentials } from "../redux/modules/auth";
import { messageAdded, IMessage } from "../redux/modules/messages";
import { connect, ConnectedProps } from "react-redux";

export const ClientContext = React.createContext<WobblyClient | undefined>(
  undefined
);

const mapDispatch = {
  loadCredentials,
  messageAdded
};
const connector = connect(undefined, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

interface IClientProviderProps {
  userJid?: string;
  userPassword?: string;
  children: React.ReactNode;
}
/**
 * We don't want to put our `WobblyClient` into the redux tree
 * because it's not serializable. Instead, it's kept in a React context
 * through this component.
 */
const ClientProvider: React.FC<IClientProviderProps & PropsFromRedux> = ({
  loadCredentials,
  children,
  userJid,
  userPassword,
  messageAdded
}) => {
  // On mount, try to load existing credentials
  useEffect(() => {
    loadCredentials();
  }, []);

  // Our XMPP client is stored in the state here, and child components can access
  // it through a React context.
  const [client, setClient] = useState<WobblyClient | undefined>(undefined);

  useEffect(() => {
    // If we were not passed either of these components, it could be because
    // the user signed out. Clear the client.
    if (!userJid || !userPassword) {
      if (!!client) {
        client.stop();
        setClient(undefined);
      }
    } else {
      // We have credentials, so initialize a client and set it in the state.
      const mh = (msg: IMessage) => {
        messageAdded(msg);
      };
      const jidObj = jid(userJid);
      const newClient = new WobblyClient(
        `wss://${jidObj.domain}:5443/ws`,
        jidObj.domain,
        "wobbly-1", // resource. TODO: generate randomly and save
        jidObj.local,
        userPassword,
        mh
      );
      newClient.start();
      setClient(newClient);
    }
  }, [userJid, userPassword]);

  return (
    <ClientContext.Provider value={client}>{children}</ClientContext.Provider>
  );
};
export default connector(ClientProvider);
