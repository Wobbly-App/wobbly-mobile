import React, { useContext, useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { IRootState } from "../../redux/rootReducer";
import { sendMessage, IMessage } from "../../redux/modules/messages";
import { createSelector } from "@reduxjs/toolkit";
import { GiftedChat } from "react-native-gifted-chat";
import { ClientContext } from "../../app/ClientProvider";

const messageIdsSelector = (state: IRootState) => state.messages.allIds;
const messagesByIdSelector = (state: IRootState) => state.messages.byId;
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
          name: m.fromJid
        },
        sent: m.sent
      };
    })
);

const jidSelector = (state: IRootState) =>
  (state.auth.credentials && state.auth.credentials.jid) || "";

const mapState = (state: IRootState) => ({
  messages: allMessagesSelector(state),
  userJid: jidSelector(state)
});

const mapDispatch = {
  sendMessage
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const ChatScreen: React.FC<PropsFromRedux> = ({
  messages,
  userJid,
  sendMessage
}) => {
  const client = useContext(ClientContext);
  const send = messagesToSend => {
    messagesToSend.forEach(m => {
      sendMessage(client!, "dev@xmpp.wobbly.app", m.text);
    });
  };
  return (
    <GiftedChat messages={messages} user={{ _id: userJid }} onSend={send} />
  );
};

export default connector(ChatScreen);
