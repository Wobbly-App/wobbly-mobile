import { createSelector } from '@reduxjs/toolkit';
import React, { useContext } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { ConnectedProps, connect } from 'react-redux';

import { ClientContext } from '../../app/ClientProvider';
import { sendMessage } from '../../redux/modules/messages';
import { RootState } from '../../redux/rootReducer';

const messageIdsSelector = (state: RootState) => state.messages.allIds;
const messagesByIdSelector = (state: RootState) => state.messages.byId;
const allMessagesSelector = createSelector(
  [messageIdsSelector, messagesByIdSelector],
  (allIds, byId) =>
    allIds.map((id: string) => {
      const m = byId[id];
      return {
        _id: m.id,
        text: m.text,
        createdAt: m.timestamp,
        user: {
          _id: m.fromJid,
          name: m.fromJid,
        },
        sent: m.sent,
      };
    }),
);

const jidSelector = (state: RootState) =>
  (state.auth.credentials && state.auth.credentials.jid) || '';

const mapState = (state: RootState) => ({
  messages: allMessagesSelector(state),
  userJid: jidSelector(state),
});

const mapDispatch = {
  sendMessage,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const ChatScreen: React.FC<PropsFromRedux> = ({
  messages,
  userJid,
  sendMessage,
}) => {
  const client = useContext(ClientContext);
  if (!client) {
    throw new Error('Client is undefined!');
  }
  const send = messagesToSend => {
    messagesToSend.forEach(m => {
      sendMessage(client, 'dev@xmpp.wobbly.app', m.text);
    });
  };
  return (
    <GiftedChat messages={messages} user={{ _id: userJid }} onSend={send} />
  );
};

export default connector(ChatScreen);
