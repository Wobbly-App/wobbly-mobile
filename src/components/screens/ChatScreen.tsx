import { RouteProp } from '@react-navigation/native';
import { createSelector } from '@reduxjs/toolkit';
import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { ConnectedProps, connect } from 'react-redux';

import { useWobblyClient } from '../../app/ClientProvider';
import { MainStackParamList } from '../../app/Navigation';
import { sendMessage } from '../../redux/modules/messages';
import { RootState } from '../../redux/rootReducer';

type ChatScreenRouteProp = RouteProp<MainStackParamList, 'Chat'>;

const messageIdsSelector = (
  state: RootState,
  { route }: { route: ChatScreenRouteProp },
) => state.chats.byId[route.params.chatId].messageIds;
const messagesByIdSelector = (state: RootState) => state.messages.byId;
const messagesSelector = createSelector(
  [messageIdsSelector, messagesByIdSelector],
  (messageIds, byId) =>
    messageIds.map((id: string) => {
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

const mapState = (state: RootState, props) => ({
  messages: messagesSelector(state, props),
  userJid: jidSelector(state),
});

const mapDispatch = {
  sendMessage,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

interface ChatScreenProps extends PropsFromRedux {
  route: ChatScreenRouteProp;
}

const ChatScreen: React.FC<ChatScreenProps> = ({
  messages,
  userJid,
  sendMessage,
  route,
}) => {
  const client = useWobblyClient();
  const recipientJid = route.params.chatId;
  const send = (messagesToSend) => {
    messagesToSend.forEach((m) => {
      sendMessage(client, recipientJid, m.text);
    });
  };
  const bottomOffset = isIphoneX ? 36 : 0;
  return (
    <GiftedChat
      messages={messages}
      user={{ _id: userJid }}
      onSend={send}
      bottomOffset={bottomOffset}
    />
  );
};

export default connector(ChatScreen);
