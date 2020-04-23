import { jid } from '@xmpp/client';
import React, { useEffect, useState, useContext } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import WobblyClient from '../common/WobblyClient';
import { loadCredentials, clientWasInitialized } from '../redux/modules/auth';
import { messageReceived, Message } from '../redux/modules/messages';

export const ClientContext = React.createContext<WobblyClient | undefined>(
  undefined,
);
/**
 * Custom React hook that returns the `WobblyClient` from its context.
 * Throws an error if the client isn't found.
 */
export const useWobblyClient = () => {
  const client = useContext(ClientContext);
  if (!client) {
    throw new Error('Client is undefined!');
  }
  return client;
};

const mapDispatch = {
  loadCredentials,
  messageReceived,
  clientWasInitialized,
};
const connector = connect(undefined, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

interface ClientProviderProps {
  userJid?: string;
  userPassword?: string;
  children: React.ReactNode;
}
/**
 * We don't want to put our `WobblyClient` into the redux tree
 * because it's not serializable. Instead, it's kept in a React context
 * through this component.
 */
const ClientProvider: React.FC<ClientProviderProps & PropsFromRedux> = ({
  loadCredentials,
  children,
  userJid,
  userPassword,
  messageReceived,
  clientWasInitialized,
}) => {
  // On mount, try to load existing credentials
  useEffect(() => {
    loadCredentials();
  }, [loadCredentials]);

  // Our XMPP client is stored in the state here, and child components can access
  // it through a React context.
  const [client, setClient] = useState<WobblyClient | undefined>(undefined);

  useEffect(() => {
    // If we were not passed either of these components, it could be because
    // the user signed out. Clear the client.
    if (!userJid || !userPassword) {
      if (client) {
        client.stop();
        setClient(undefined);
      }
    } else {
      // We have credentials, so initialize a client and set it in the state.
      const incomingMessageHandler = (msg: Message): void => {
        messageReceived(msg);
      };
      const jidObj = jid(userJid);
      const newClient = new WobblyClient(
        `wss://${jidObj.domain}:5443/ws`,
        jidObj.domain,
        'wobbly-mobile', // resource. TODO: generate randomly and save
        jidObj.local,
        userPassword,
        incomingMessageHandler,
      );
      newClient.start();
      setClient(newClient);
      clientWasInitialized();
    }
  }, [userJid, userPassword]);

  return (
    <ClientContext.Provider value={client}>{children}</ClientContext.Provider>
  );
};
export default connector(ClientProvider);
